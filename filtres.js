// Les puces de filtre (Saison, Temps, Budget, Type, Régime) de la liste des recettes, et le tiroir où l'on choisit.
// Chaque filtre est un tamis : une recette doit passer TOUS les tamis choisis pour rester dans la liste.
// Dans un même filtre, on peut cocher plusieurs choix (Hiver ou Automne) : la recette doit en respecter au moins un.
// Les choix sont rangés dans l'adresse (#recettes?saison=hiver,automne&budget=€), comme une étiquette sur un bocal.
// Sauf le régime : c'est « Mes régimes » (regimes.js), gardé sur le téléphone, et la recette doit respecter TOUS les régimes cochés.

const FILTRES = {
  saison: { choix: ["printemps", "été", "automne", "hiver", "toute l'année"], garde: (r,v) => r.saisons.includes(v) },
  temps:  { choix: ["15", "30", "60", "plus"], garde: (r,v) => v === 'plus' ? r.tempsTotal > 60 : r.tempsTotal <= +v },
  budget: { choix: ["€", "€€", "€€€"], garde: (r,v) => r.budget === v },
  type:   { choix: ["Entrée", "Plat", "Dessert"], garde: (r,v) => r.type === v }
};
const CLES_FILTRES = Object.keys(FILTRES);
const FILTRE_REGIME = { choix: REGIMES, garde: (r,v) => etatRegime(r, v, niveauChoisi()) !== 'non' };
const filtre = k => k === 'regime' ? FILTRE_REGIME : FILTRES[k];
const choisis = (params, k) => k === 'regime' ? MES_REGIMES.regimes : valeurs(params, k);
// Les choix d'un filtre dans l'adresse (« hiver,automne » → [hiver, automne]), seulement ceux qui sont prévus, dans l'ordre du tiroir.
const valeurs = (params, k) => { const v = (params.get(k) || '').split(','); return FILTRES[k].choix.filter(c => v.includes(c)); };
const nomChoix = (k, v) => k === 'saison' ? TEXTES.saisons[v] : k === 'regime' ? TEXTES.regimes[v].nom : TEXTES.filtres[k].choix[v];

// Garde les recettes qui passent tous les filtres choisis et « Mes régimes » (sauf un filtre, pour compter les choix du tiroir).
function filtrer(recettes, params, sauf){
  return recettes.filter(r => (sauf === 'regime' || passeRegimes(r))
    && CLES_FILTRES.every(k => { const v = k === sauf ? [] : valeurs(params, k); return !v.length || v.some(x => FILTRES[k].garde(r, x)); }));
}

/* ---------- Les puces : posées une fois, puis mises à jour sur place (l'onde du doigt n'est pas coupée) ---------- */
function poserFiltres(boite, etat, changer){
  const F = TEXTES.filtres;
  boite.innerHTML = [...CLES_FILTRES, 'regime'].map(k => `<span class="puce" data-f="${k}">
    <button type="button" class="ouvrir" aria-haspopup="dialog" aria-expanded="false">${k === 'regime' ? logoRegime('sansGluten','adaptable') : svg(k)}<span class="t"></span><span class="fl" aria-hidden="true">▾</span></button>
    <button type="button" class="x" aria-label="${F.enlever(F[k].puce)}" hidden>✕</button></span>`).join('');
  boite.querySelectorAll('.puce[data-f]').forEach(p => {
    const k = p.dataset.f;
    p.querySelector('.ouvrir').addEventListener('click', e => ouvrirTiroir(k, e.currentTarget, etat, changer));
    p.querySelector('.x').addEventListener('click', () => { const n = new URLSearchParams(etat.params);
      k === 'regime' ? changerMesRegimes({ regimes: [] }) : n.delete(k); changer(n); });
  });
  brancherOnde(boite);
}
function majFiltres(boite, params){
  boite.querySelectorAll('.puce[data-f]').forEach(p => {
    const k = p.dataset.f, v = choisis(params, k), strict = k === 'regime' && MES_REGIMES.strict ? ` · ${TEXTES.filtres.regime.strictCourt}` : '';
    p.classList.toggle('on', v.length > 0);
    // 1 choix : « Hiver » ; 2 choix : « Hiver, Automne » ; plus : « Hiver +2 » (et « · strict » pour le régime en mode strict)
    p.querySelector('.t').textContent = !v.length ? TEXTES.filtres[k].puce : (v.length > 2 ? `${nomChoix(k, v[0])} +${v.length - 1}` : v.map(x => nomChoix(k, x)).join(', ')) + strict;
    p.querySelector('.x').hidden = !v.length;
  });
}
const aDesFiltres = params => CLES_FILTRES.some(k => valeurs(params, k).length);
function sansFiltres(params){ const n = new URLSearchParams(params); CLES_FILTRES.forEach(k => n.delete(k)); return n; }

/* ---------- Le tiroir des choix : sur iPhone, une feuille qui monte du bas (effet 192 : on la tire vers le bas pour la fermer) ;
   sur PC, une bulle sous la puce ---------- */
let tiroir = null, puceOuverte = null;
function fabriquerTiroir(){
  document.body.insertAdjacentHTML('beforeend', `<div class="voile-filtre" id="voile-filtre"></div>
    <div class="tiroir" id="tiroir" role="dialog" aria-labelledby="tiroir-titre">
      <div class="tiroir-prise"><span class="poignee" aria-hidden="true"></span>
        <div class="tiroir-tete"><h2 id="tiroir-titre"></h2><button type="button" class="tiroir-x" aria-label="${TEXTES.filtres.fermer}">✕</button></div></div>
      <ul class="choix" id="tiroir-choix"></ul><div id="tiroir-plus"></div><p class="note" id="tiroir-note"></p>
      <button type="button" class="btn principal" id="tiroir-ok"></button></div>`);
  tiroir = $('tiroir');
  $('voile-filtre').addEventListener('click', fermerTiroir);
  tiroir.querySelector('.tiroir-x').addEventListener('click', fermerTiroir);
  $('tiroir-ok').addEventListener('click', fermerTiroir);
  tirerPourFermer(tiroir.querySelector('.tiroir-prise'));
  addEventListener('keydown', e => { if (e.key === 'Escape' && puceOuverte) fermerTiroir(); });
  addEventListener('hashchange', fermerTiroir);
}
function ouvrirTiroir(k, bouton, etat, changer){
  if (!tiroir) fabriquerTiroir();
  const F = TEXTES.filtres, deja = choisis(etat.params, k), regime = k === 'regime', choix = $('tiroir-choix');
  $('tiroir-titre').textContent = F[k].question;
  $('tiroir-note').textContent = k === 'budget' ? TEXTES.prixEstime : regime ? TEXTES.logos.attention : '';
  // Le nombre de recettes à côté de chaque choix. Pour le régime, la recette doit respecter les cases déjà cochées ET celle-ci.
  const compter = v => { const autour = filtrer(etat.base, etat.params, k);
    return autour.filter(r => regime ? passeRegimes(r) && FILTRE_REGIME.garde(r, v) : FILTRES[k].garde(r, v)).length; };
  choix.innerHTML = filtre(k).choix.map(v => {
    const n = compter(v), aide = k === 'budget' ? `<small>${F.budget.aide[v]}</small>` : regime ? `<small>${TEXTES.regimes[v].legende}</small>` : '';
    return `<li><button type="button" data-v="${v}" aria-pressed="${deja.includes(v)}" class="${n ? '' : 'zero'}">
      ${regime ? logoRegime(v, 'oui') : ''}<span class="ct"><b>${nomChoix(k, v)}</b>${aide}</span><span class="n">${TEXTES.liste.compteur(n)}</span>
      <span class="coche" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5"/></svg></span></button></li>`; }).join('');
  // Sous les 5 régimes : l'interrupteur « Mode strict » (le rond safran, comme jour / nuit) et la case « Garder mes régimes ».
  $('tiroir-plus').innerHTML = !regime ? '' : `<button type="button" class="strict" role="switch" aria-checked="${MES_REGIMES.strict}">
      <span class="ct"><b>${F.regime.strict}</b><small>${F.regime.strictAide}</small></span><span class="bascule" aria-hidden="true"><i></i></span></button>
    <button type="button" class="garder" aria-pressed="${MES_REGIMES.garder}"><span class="coche" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5"/></svg></span>${F.regime.garder}</button>`;
  // Après chaque choix : la liste suit derrière, les nombres et le bouton « Voir les N recettes » aussi.
  const voir = () => { $('tiroir-ok').textContent = F.voir(filtrer(etat.base, etat.params).length); };
  const apres = n => { changer(n); voir();
    choix.querySelectorAll('button').forEach(b => { const c = compter(b.dataset.v);
      b.classList.toggle('zero', !c); b.querySelector('.n').textContent = TEXTES.liste.compteur(c); }); };
  // Effet 46 : la coche se dessine (ou s'efface) ; le tiroir reste ouvert pour cocher d'autres choix
  choix.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
    const v = [...choix.querySelectorAll('[aria-pressed="true"]')].map(x => x.dataset.v), n = new URLSearchParams(etat.params);
    if (regime) changerMesRegimes({ regimes: v }); else v.length ? n.set(k, v.join(',')) : n.delete(k);
    apres(n);
  }));
  $('tiroir-plus').querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    const strict = b.classList.contains('strict'), attr = strict ? 'aria-checked' : 'aria-pressed', oui = b.getAttribute(attr) !== 'true';
    b.setAttribute(attr, String(oui));
    changerMesRegimes(strict ? { strict: oui } : { garder: oui });
    apres(new URLSearchParams(etat.params));
  }));
  voir();
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
  tiroir.style.transform = tiroir.style.transition = '';
  puceOuverte.setAttribute('aria-expanded', 'false');
  if (puceOuverte.isConnected) puceOuverte.focus({ preventScroll: true });
  puceOuverte = null;
}

// Effet 192 (iPhone) : on attrape le haut de la feuille et on la tire vers le bas ; lâchée assez bas, elle se ferme, sinon elle remonte.
function tirerPourFermer(prise){
  let y0 = null;
  prise.addEventListener('pointerdown', e => {
    if (e.target.closest('button') || matchMedia('(min-width: 700px)').matches) return;
    y0 = e.clientY; prise.setPointerCapture(e.pointerId); tiroir.style.transition = 'none';
  });
  prise.addEventListener('pointermove', e => { if (y0 !== null) tiroir.style.transform = `translateY(${Math.max(0, e.clientY - y0)}px)`; });
  const lacher = e => { if (y0 === null) return; const d = e.clientY - y0; y0 = null;
    tiroir.style.transition = ''; tiroir.style.transform = '';
    if (d > 80) fermerTiroir(); };
  prise.addEventListener('pointerup', lacher); prise.addEventListener('pointercancel', lacher);
}
