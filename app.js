// Les écrans de l'app : l'accueil (écran 1) et la liste des recettes (écran 2), plus la barre d'onglets.
// La page d'une recette (écran 3) est dans recette.js.
const T = TEXTES, A = T.accueil, L = T.liste;

/* ---------- Petites icônes (trait fin, couleur du texte) ---------- */
const ICONES = {
  accueil:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  explorer:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  frigo:'<rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M6 10h12M9 6v2M9 13v3"/>',
  favoris:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  courses:'<path d="M4 9h16l-1.5 10a2 2 0 0 1-2 1.7h-9a2 2 0 0 1-2-1.7zM8 9l4-6 4 6"/>',
  france:'<path d="M9 3l5 1.5 4.5 3.5-1 4.5 2 4-3.5 4-5-1.5-4 2-3-3.5 1-5L3 8.5 6 4.5z"/>',
  monde:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
  budget:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5a4.5 4.5 0 1 0 0 7M7 11h6.5M7 13.5h6.5"/>',
  temps:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M10 2.5h4"/>',
  saison:'<path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14zM5 19l8-8"/>',
  type:'<circle cx="14.5" cy="12" r="6.5"/><circle cx="14.5" cy="12" r="3"/><path d="M3.5 4v5a1.5 1.5 0 0 0 3 0V4M5 10v10"/>'
};
const svg = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONES[k]}</svg>`;
const saisons = r => r.saisons.map(s=>`<span class="sea">${T.saisons[s]}</span>`).join('');

/* ---------- Les textes fixes de la page ---------- */
$('nom').textContent = T.appNom;
$('phrase').textContent = A.phrase;
$('recherche').placeholder = A.recherche;
$('recherche').setAttribute('aria-label', A.recherche);

/* ---------- Petit message en bas de l'écran ---------- */
let tmToast;
function message(texte){ $('toast').textContent = texte; $('toast').classList.add('show');
  clearTimeout(tmToast); tmToast = setTimeout(()=>$('toast').classList.remove('show'), 1800); }
// Tout ce qui porte data-bientot mène à un écran des missions suivantes.
document.addEventListener('click', e=>{ if (e.target.closest('[data-bientot]')){ e.preventDefault(); message(T.bientot); } });

/* ---------- Jour / nuit : suit le téléphone, l'interrupteur le change (gardé dans le navigateur) ---------- */
const sombre = matchMedia('(prefers-color-scheme: dark)');
let choixTheme = null;
try { choixTheme = localStorage.getItem('gustora-theme'); } catch(e){}
function appliquerTheme(){
  const nuit = choixTheme ? choixTheme==='dark' : sombre.matches;
  if (choixTheme) document.documentElement.dataset.theme = choixTheme; else delete document.documentElement.dataset.theme;
  document.documentElement.classList.toggle('nuit', nuit);
  $('sw').querySelector('i').textContent = nuit ? '☾' : '☀';
  $('sw').setAttribute('aria-label', nuit ? T.modeJour : T.modeNuit);
  couleurs();
}
$('sw').addEventListener('click',()=>{
  choixTheme = document.documentElement.classList.contains('nuit') ? 'light' : 'dark';
  try { localStorage.setItem('gustora-theme', choixTheme); } catch(e){}
  appliquerTheme();
});
sombre.addEventListener('change', appliquerTheme);

/* ---------- Barre d'onglets (« Accueil » et « Explorer » sont construits pour l'instant) ---------- */
const CLES = ['accueil','explorer','frigo','favoris','courses'];
$('onglets').insertAdjacentHTML('beforeend', T.onglets.map((t,i)=>
  `<button type="button" role="tab" aria-selected="${i===0}" ${i > 1 ? 'data-bientot' : `id="onglet-${CLES[i]}"`}>${svg(CLES[i])}${t}</button>`).join(''));
$('onglet-accueil').addEventListener('click', ()=>{ location.hash = ''; });
$('onglet-explorer').addEventListener('click', ()=>{ location.hash = 'explorer'; });
const ongletActif = () => ['explorer','zone'].includes(document.body.dataset.ecran) ? 1 : 0;
new ResizeObserver(()=>choisirOnglet(ongletActif())).observe($('onglets'));

/* ---------- Les morceaux de page ---------- */
// La carte recette est un lien vers sa page (avec, dans le groupe « Adaptables », combien d'ingrédients la version adaptée remplace).
function carte(r, adaptee){ return `<div class="tilt js-tilt" data-max="8" data-id="${r.id}"><a class="rc" href="#recette/${r.id}">
  <span class="img" aria-hidden="true">${emoji(r)}</span>
  <span class="body"><h3>${r.nom}</h3><span class="z">${r.zone}</span>
    <span class="meta"><span>⏱ ${duree(r.tempsTotal)}</span><span>${prix(r.prixParPersonne)}</span><span class="bdg">${r.budget}</span></span>${logosCarte(r)}${adaptee ? `<span class="adaptee">${L.versionAdaptee(ingredientsRemplaces(r))}</span>` : ''}</span>
  </a></div>`; }

function vedette(r, saison){ return `<div class="vedette js-tilt" data-max="9">
  <div class="ly-bg" data-depth="0.4"><span class="ring"></span><span class="sun"></span></div>
  <div class="ly-mid" data-depth="1.3" aria-hidden="true">${emoji(r)}</div>
  <div class="ly-top" data-depth="2.2">
    <span class="kick">${A.vedette} · ${T.saisons[saison]}</span>
    <h2>${r.nom}</h2>
    <span class="badges"><span class="bdg">${r.budget}</span><span class="tm">⏱ ${duree(r.tempsTotal)}</span>${saisons(r)}</span>
    <a class="see" href="#recette/${r.id}">${A.voirRecette}</a>
    <a class="toute-saison" href="#recettes?saison=${encodeURIComponent(saison)}">${A.toutesSaison(saison)}</a>
  </div></div>`; }

// Raccourcis : la France et le monde ouvrent Explorer, « Dans mon frigo » arrive plus tard, les 2 derniers ouvrent la liste déjà triée.
const RACCOURCIS = [['france','data-lien="#explorer"'], ['monde','data-lien="#explorer?monde"'], ['frigo','data-bientot'],
  ['budget','data-lien="#recettes?budget=€"'], ['temps','data-lien="#recettes?temps=30"']];
const raccourcis = () => `<ul class="raccourcis">` + A.raccourcis.map((t,i)=>
  `<li><button class="rac" type="button" ${RACCOURCIS[i][1]}><span class="voile"></span><span class="ic">${svg(RACCOURCIS[i][0])}</span>${t}</button></li>`).join('') + `</ul>`;

// En bas de l'accueil : la légende des 5 petits logos.
function legendeLogos(){ const G = T.regimes, P = T.logos;
  return `<section class="bloc logos-bloc"><h2>${P.titre}</h2><ul class="legendes">${REGIMES.map(k=>
    `<li>${logoRegime(k,'oui')}<span><b>${G[k].nom}</b>${G[k].legende}</span></li>`).join('')}</ul>
    <p class="plein-contour"><span>${logoRegime('vegetarien','oui')}${P.plein}</span><span>${logoRegime('vegetarien','adaptable')}${P.contour}</span></p>
    <p class="note">${P.attention}</p></section>`; }

// Sous la recherche, si « Mes régimes » est actif : « Mes régimes : sans gluten · sans lactose · strict ✕ ».
const minuscule = t => t[0].toLowerCase() + t.slice(1);
const cleRegimes = () => MES_REGIMES.regimes.join(',') + (MES_REGIMES.strict ? '+strict' : '');
function bandeauRegimes(){ const M = MES_REGIMES;
  if (!M.regimes.length) return '';
  const noms = [...M.regimes.map(k=>minuscule(T.regimes[k].nom)), ...(M.strict ? [T.filtres.regime.strictCourt] : [])].join(' · ');
  return `<div class="mes-regimes"><a href="#recettes"><span class="logos">${M.regimes.map(k=>logoRegime(k,'oui')).join('')}</span>
    <span><b>${A.mesRegimes}</b> ${noms}</span></a><button type="button" class="x" id="enlever-regimes" aria-label="${A.enleverRegimes}">✕</button></div>`; }

/* ---------- Écran 1 : l'accueil (refait seulement quand « Mes régimes » change) ---------- */
function construireAccueil(tout){
  const auj = new Date(), saison = saisonDuJour(auj);
  // Avec « Mes régimes », l'accueil ne montre que les recettes compatibles ou adaptables.
  const recettes = tout.filter(r=>passeRegimes(r));
  // La recette vedette : tirée parmi celles de la saison, elle change chaque jour.
  let choix = recettes.filter(r=>r.saisons.includes(saison));
  if (!choix.length) choix = recettes.length ? recettes : tout;
  const jour = Math.floor(new Date(auj.getFullYear(),auj.getMonth(),auj.getDate()) / 864e5);
  const star = choix[jour % choix.length];
  // Les dernières ajoutées : la fin du sommaire, sans répéter la vedette.
  const dernieres = recettes.slice().reverse().filter(r=>r!==star).slice(0,6);
  $('accueil').dataset.regimes = cleRegimes();
  $('accueil').innerHTML = `${bandeauRegimes()}<div class="duo">${vedette(star, saison)}${raccourcis()}</div>
    <section class="bloc"><h2>${A.dernieres}</h2><div class="cartes">${dernieres.map(r=>carte(r)).join('')}</div>
    <p class="note">${T.prixEstime}</p></section>${legendeLogos()}`;
  $('accueil').querySelectorAll('[data-lien]').forEach(b=>b.addEventListener('click',()=>{ location.hash = b.dataset.lien; }));
  if ($('enlever-regimes')) $('enlever-regimes').addEventListener('click', ()=>{ changerMesRegimes({ regimes: [] }); construireAccueil(tout); });
  brancherEffets($('accueil'));
}

/* ---------- Écran 2 : la liste des recettes (et l'écran 5 : les recettes d'une zone, avec son intro) ---------- */
const PAR_PAQUET = 30;   // au-delà de 30 recettes, les suivantes arrivent quand on descend
let observeur = null;
const etatListe = { params: new URLSearchParams(), zone: null, base: [] };   // ce que la liste montre en ce moment
// Le titre dit d'où l'on vient : une recherche, une zone, un raccourci de l'accueil, la saison de la carte vedette.
function titreListe(q, Z, params){
  if (q) return L.resultatsPour(q);
  if (Z) return Z.nom;
  // Un seul filtre avec un seul choix : le titre le dit ; sinon, « Toutes les recettes » (les puces montrent le reste).
  const actifs = CLES_FILTRES.filter(k=>valeurs(params, k).length), v = actifs.length === 1 && valeurs(params, actifs[0]).length === 1 && valeurs(params, actifs[0])[0];
  if (actifs[0] === 'budget' && v === '€') return L.petitBudget;
  if (actifs[0] === 'temps' && v === '30') return L.moins30;
  if (actifs[0] === 'saison' && v) return L.saison(v);
  return L.toutes;
}
// animer = un filtre vient de changer : on garde l'en-tête et les puces, seules les cartes bougent (effet 232).
function afficherListe(params, zone, animer){
  const q = (params.get('q')||'').trim(), Z = zone && (T.regions[zone] || T.pays[zone]);
  let base = q ? chercher(q) : DONNEES.recettes;
  if (Z) base = base.filter(r=>r.zone===Z.nom);
  const recettes = filtrer(base, params), titre = titreListe(q, Z, params), liste = $('liste');
  Object.assign(etatListe, { params, zone: zone || null, base });
  document.title = `${titre} · ${T.appNom}`;
  if (!animer){
    const zoneVide = Z && !DONNEES.recettes.some(r=>r.zone===Z.nom);
    liste.innerHTML = `<div class="liste-tete"><h1></h1><span class="compteur" id="compteur"></span>${Z ? `<p class="intro">${Z.intro}</p>` : ''}</div>`
      + (zoneVide ? `<div class="encadre"><p>${T.regions[zone] ? T.explorer.videRegion : T.explorer.videPays}</p></div>`
        : `<div class="filtres" id="filtres"></div><div id="resultats"></div>`);
    if (!zoneVide) poserFiltres($('filtres'), etatListe, changerFiltres);
  }
  liste.querySelector('h1').textContent = titre;   // textContent : ce que tape le visiteur reste du texte
  $('compteur').textContent = L.compteur(recettes.length);
  if (observeur) observeur.disconnect();
  if (!$('resultats')) return;
  majFiltres($('filtres'), params);
  const montrer = () => montrerCartes(recettes, params);
  animer ? glisserCartes($('resultats'), new Set(recettes.map(r=>r.id)), montrer) : montrer();
}
function montrerCartes(recettes, params){
  const boite = $('resultats');
  if (observeur) observeur.disconnect();
  if (!recettes.length){
    boite.innerHTML = `<div class="encadre"><p>${L.vide}</p><button class="btn" type="button" id="enlever">${L.enleverFiltres}</button></div>`;
    $('enlever').addEventListener('click',()=>{
      if (aDesFiltres(params)) return changerFiltres(sansFiltres(params));
      if (MES_REGIMES.regimes.length){ changerMesRegimes({ regimes: [] }); return changerFiltres(params); }
      $('recherche').value=''; location.hash='recettes';
    });
    return;
  }
  boite.innerHTML = `<div class="cartes" id="cartes"></div><div class="suite" id="suite"></div><p class="note">${T.prixEstime}</p>`;
  // Avec « Mes régimes » : 2 groupes, « Déjà compatibles » (logo plein) puis « Adaptables » (logo en contour).
  const M = MES_REGIMES.regimes, deja = M.length ? recettes.filter(dejaCompatible) : [];
  if (M.length) recettes = [...deja, ...recettes.filter(r=>!deja.includes(r))];
  const groupe = (titre, etat, n) => `<h2 class="groupe">${logoRegime(M[0], etat)}${titre}<span class="compteur">${n}</span></h2>`;
  const tete = i => !M.length ? '' : i === 0 && deja.length ? groupe(L.compatibles, 'oui', deja.length)
    : i === deja.length ? groupe(L.adaptables, 'adaptable', recettes.length - deja.length) : '';
  let montrees = 0;
  function paquet(){
    const lot = document.createElement('div'), debut = montrees;
    lot.innerHTML = recettes.slice(montrees, montrees += PAR_PAQUET).map((r,i)=>tete(debut+i) + carte(r, M.length && debut+i >= deja.length)).join('');
    brancherEffets(lot);
    $('cartes').append(...lot.children);
    if (montrees >= recettes.length) observeur.disconnect();
  }
  observeur = new IntersectionObserver(es=>{ if (es[0].isIntersecting) paquet(); }, {rootMargin:'600px'});
  paquet();
  if (montrees < recettes.length) observeur.observe($('suite'));
}
// Un filtre change : on met à jour l'adresse (sans créer de nouvelle page dans l'historique) et les cartes.
const adresseListe = (zone, p) => '#' + (zone ? 'zone/' + zone : 'recettes') + (p.toString() ? '?' + p : '');
function changerFiltres(p){
  history.replaceState(null, '', adresseListe(etatListe.zone, p));
  afficherListe(p, etatListe.zone, true);
}

/* ---------- Recherche : Entrée ouvre la liste ; sur la liste, les résultats suivent la frappe (les filtres restent) ---------- */
const versListe = v => 'recettes' + (v.trim() ? '?q=' + encodeURIComponent(v.trim()) : '');
$('form-recherche').addEventListener('submit', e=>{ e.preventDefault(); location.hash = versListe($('recherche').value); $('recherche').blur(); });
$('recherche').addEventListener('input', ()=>{
  if (document.body.dataset.ecran !== 'liste') return;
  const p = new URLSearchParams(etatListe.params), v = $('recherche').value.trim();
  v ? p.set('q', v) : p.delete('q');
  history.replaceState(null, '', adresseListe(null, p));
  afficherListe(p);
});

/* ---------- Quel écran montrer ? On lit l'adresse (#recettes?q=crêpe), comme l'intercalaire d'un classeur ---------- */
function router(){
  const [nom, reste] = location.hash.slice(1).split('?');
  const ecran = nom === 'recettes' ? 'liste' : nom.startsWith('recette/') ? 'recette'
    : nom === 'explorer' ? 'explorer' : nom.startsWith('zone/') ? 'zone' : 'accueil';
  const avant = document.body.dataset.ecran, zone = ecran === 'zone' && nom.slice(5);
  if (zone && !T.regions[zone] && !T.pays[zone]) return location.replace('#explorer');   // zone inconnue : retour à la carte
  document.body.dataset.ecran = ecran;
  $('accueil').hidden = ecran !== 'accueil';
  $('liste').hidden = ecran !== 'liste' && ecran !== 'zone';   // l'écran 5 est une liste filtrée par zone
  $('recette').hidden = ecran !== 'recette';
  $('explorer').hidden = ecran !== 'explorer';
  if (ecran === 'liste'){
    const params = new URLSearchParams(reste);
    $('recherche').value = params.get('q') || '';
    afficherListe(params);
  } else {
    $('recherche').value = '';
    if (ecran === 'recette') afficherRecette(decodeURIComponent(nom.slice(8)));
    else if (ecran === 'zone') afficherListe(new URLSearchParams(reste), zone);
    else if (ecran === 'explorer') afficherExplorer(reste === 'monde' ? 'monde' : 'france', avant !== ecran);
    else document.title = T.titrePage;
  }
  if (ecran === 'accueil' && $('accueil').dataset.regimes !== cleRegimes()) construireAccueil(DONNEES.recettes);
  if (avant !== ecran || ecran === 'recette' || ecran === 'zone') scrollTo(0, 0);
  choisirOnglet(ongletActif()); demarrer(); relancerIdees();
}

/* ---------- Démarrage ---------- */
function lancer(){
  chargerRecettes().then(d=>{ construireAccueil(d.recettes); ecrireIdees(d.recettes); router(); }).catch(()=>{
    document.body.dataset.ecran = 'erreur';
    $('liste').hidden = $('recette').hidden = $('explorer').hidden = true; $('accueil').hidden = false;
    $('accueil').innerHTML = `<div class="encadre" role="alert"><p>${T.erreurChargement}</p><button class="btn" type="button" id="retry">${T.reessayer}</button></div>`;
    $('retry').addEventListener('click', lancer);
  });
}
addEventListener('hashchange', router);
appliquerTheme(); lancer();
