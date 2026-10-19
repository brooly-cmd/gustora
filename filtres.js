// Les puces de filtre (Saison, Temps, Budget, Type) de la liste des recettes, et le tiroir où l'on choisit.
// Chaque filtre est un tamis : une recette doit passer TOUS les tamis choisis pour rester dans la liste.
// Les choix sont rangés dans l'adresse (#recettes?budget=€&temps=30), comme une étiquette sur un bocal.

const FILTRES = {
  saison: { choix: ["printemps", "été", "automne", "hiver", "toute l'année"], garde: (r,v) => r.saisons.includes(v) },
  temps:  { choix: ["15", "30", "60", "plus"], garde: (r,v) => v === 'plus' ? r.tempsTotal > 60 : r.tempsTotal <= +v },
  budget: { choix: ["€", "€€", "€€€"], garde: (r,v) => r.budget === v },
  type:   { choix: ["Entrée", "Plat", "Dessert"], garde: (r,v) => r.type === v }
};
const CLES_FILTRES = Object.keys(FILTRES);
// La valeur d'un filtre dans l'adresse, seulement si elle fait partie des choix prévus.
const valeurFiltre = (params, k) => FILTRES[k].choix.includes(params.get(k)) ? params.get(k) : null;
const nomChoix = (k, v) => k === 'saison' ? TEXTES.saisons[v] : TEXTES.filtres[k].choix[v];

// Garde les recettes qui passent tous les filtres choisis (sauf un, pour compter les choix du tiroir).
function filtrer(recettes, params, sauf){
  return recettes.filter(r => CLES_FILTRES.every(k => { const v = k !== sauf && valeurFiltre(params, k); return !v || FILTRES[k].garde(r, v); }));
}

/* ---------- Les puces : posées une fois, puis mises à jour sur place (l'onde du doigt n'est pas coupée) ---------- */
function poserFiltres(boite, etat, changer){
  const F = TEXTES.filtres;
  boite.innerHTML = CLES_FILTRES.map(k => `<span class="puce" data-f="${k}">
    <button type="button" class="ouvrir" aria-haspopup="dialog" aria-expanded="false">${svg(k)}<span class="t"></span><span class="fl" aria-hidden="true">▾</span></button>
    <button type="button" class="x" aria-label="${F.enlever(F[k].puce)}" hidden>✕</button></span>`).join('')
    // La place de la puce « Régime ▾ » (elle arrive à la mission 9)
    + `<span class="puce place"><button type="button" class="ouvrir" aria-label="${F.regime} : ${F.regimeBientot}">${logoRegime('sansGluten','adaptable')}<span class="t">${F.regime}</span><span class="fl" aria-hidden="true">▾</span></button></span>`;
  boite.querySelectorAll('.puce[data-f]').forEach(p => {
    const k = p.dataset.f;
    p.querySelector('.ouvrir').addEventListener('click', e => ouvrirTiroir(k, e.currentTarget, etat, changer));
    p.querySelector('.x').addEventListener('click', () => { const n = new URLSearchParams(etat.params); n.delete(k); changer(n); });
  });
  boite.querySelector('.place button').addEventListener('click', () => message(F.regimeBientot));
  brancherOnde(boite);
}
function majFiltres(boite, params){
  boite.querySelectorAll('.puce[data-f]').forEach(p => {
    const k = p.dataset.f, v = valeurFiltre(params, k);
    p.classList.toggle('on', !!v);
    p.querySelector('.t').textContent = v ? nomChoix(k, v) : TEXTES.filtres[k].puce;
    p.querySelector('.x').hidden = !v;
  });
}
const aDesFiltres = params => CLES_FILTRES.some(k => valeurFiltre(params, k));
function sansFiltres(params){ const n = new URLSearchParams(params); CLES_FILTRES.forEach(k => n.delete(k)); return n; }

/* ---------- Le tiroir des choix : monte du bas sur iPhone, bulle sous la puce sur PC ---------- */
let tiroir = null, puceOuverte = null;
function fabriquerTiroir(){
  document.body.insertAdjacentHTML('beforeend', `<div class="voile-filtre" id="voile-filtre"></div>
    <div class="tiroir" id="tiroir" role="dialog" aria-labelledby="tiroir-titre">
      <div class="tiroir-tete"><h2 id="tiroir-titre"></h2><button type="button" class="tiroir-x" aria-label="${TEXTES.filtres.fermer}">✕</button></div>
      <ul class="choix" id="tiroir-choix"></ul><p class="note" id="tiroir-note"></p></div>`);
  tiroir = $('tiroir');
  $('voile-filtre').addEventListener('click', fermerTiroir);
  tiroir.querySelector('.tiroir-x').addEventListener('click', fermerTiroir);
  addEventListener('keydown', e => { if (e.key === 'Escape' && puceOuverte) fermerTiroir(); });
  addEventListener('hashchange', fermerTiroir);
}
function ouvrirTiroir(k, bouton, etat, changer){
  if (!tiroir) fabriquerTiroir();
  const F = TEXTES.filtres, choisi = valeurFiltre(etat.params, k), autour = filtrer(etat.base, etat.params, k);
  $('tiroir-titre').textContent = F[k].question;
  $('tiroir-note').textContent = k === 'budget' ? TEXTES.prixEstime : '';
  $('tiroir-choix').innerHTML = FILTRES[k].choix.map(v => {
    const n = autour.filter(r => FILTRES[k].garde(r, v)).length, aide = k === 'budget' ? `<small>${F.budget.aide[v]}</small>` : '';
    return `<li><button type="button" data-v="${v}" aria-pressed="${v === choisi}" class="${n ? '' : 'zero'}">
      <span class="ct"><b>${nomChoix(k, v)}</b>${aide}</span><span class="n">${TEXTES.liste.compteur(n)}</span>
      <span class="coche" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5"/></svg></span></button></li>`; }).join('');
  // Effet 46 : la coche se dessine, puis le tiroir se ferme et la liste suit
  let fait = false;   // un seul choix par ouverture
  $('tiroir-choix').querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    if (fait) return; fait = true;
    const v = b.dataset.v === choisi ? null : b.dataset.v, n = new URLSearchParams(etat.params);
    $('tiroir-choix').querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b && !!v)));
    v ? n.set(k, v) : n.delete(k);
    setTimeout(() => { fermerTiroir(); changer(n); }, reduce ? 0 : 420);
  }));
  if (puceOuverte) puceOuverte.setAttribute('aria-expanded', 'false');
  puceOuverte = bouton; bouton.setAttribute('aria-expanded', 'true');
  // Sur PC, la bulle se pose sous la puce (sans sortir de l'écran)
  if (matchMedia('(min-width: 700px)').matches){
    const r = bouton.getBoundingClientRect();
    tiroir.style.top = (r.bottom + scrollY + 10) + 'px';
    tiroir.style.left = Math.max(16, Math.min(r.left, innerWidth - 340)) + 'px';
  } else tiroir.style.top = tiroir.style.left = '';
  document.body.classList.add('tiroir-ouvert');
  (tiroir.querySelector('[aria-pressed="true"]') || tiroir.querySelector('.choix button')).focus({ preventScroll: true });
}
function fermerTiroir(){
  if (!puceOuverte) return;
  document.body.classList.remove('tiroir-ouvert');
  puceOuverte.setAttribute('aria-expanded', 'false');
  if (puceOuverte.isConnected) puceOuverte.focus({ preventScroll: true });
  puceOuverte = null;
}
