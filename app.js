// Les écrans de l'app : l'accueil (écran 1) et la liste des recettes (écran 2), plus la barre d'onglets.
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
  temps:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M10 2.5h4"/>'
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

/* ---------- Barre d'onglets (seul « Accueil » est construit pour l'instant) ---------- */
const CLES = ['accueil','explorer','frigo','favoris','courses'];
$('onglets').insertAdjacentHTML('beforeend', T.onglets.map((t,i)=>
  `<button type="button" role="tab" aria-selected="${i===0}" ${i ? 'data-bientot' : 'id="onglet-accueil"'}>${svg(CLES[i])}${t}</button>`).join(''));
$('onglet-accueil').addEventListener('click', ()=>{ location.hash = ''; });
new ResizeObserver(()=>choisirOnglet(0)).observe($('onglets'));

/* ---------- Les morceaux de page ---------- */
// La carte recette est un lien vers sa future page (mission 6).
function carte(r){ return `<div class="tilt js-tilt" data-max="8"><a class="rc" href="#recette/${r.id}" data-bientot>
  <span class="img" aria-hidden="true">${emoji(r)}</span>
  <span class="body"><h3>${r.nom}</h3><span class="z">${r.zone}</span>
    <span class="meta"><span>⏱ ${duree(r.tempsTotal)}</span><span>${prix(r.prixParPersonne)}</span><span class="bdg">${r.budget}</span></span></span>
  </a></div>`; }

function vedette(r, saison){ return `<div class="vedette js-tilt" data-max="9">
  <div class="ly-bg" data-depth="0.4"><span class="ring"></span><span class="sun"></span></div>
  <div class="ly-mid" data-depth="1.3" aria-hidden="true">${emoji(r)}</div>
  <div class="ly-top" data-depth="2.2">
    <span class="kick">${A.vedette} · ${T.saisons[saison]}</span>
    <h2>${r.nom}</h2>
    <span class="badges"><span class="bdg">${r.budget}</span><span class="tm">⏱ ${duree(r.tempsTotal)}</span>${saisons(r)}</span>
    <button class="see" type="button" data-bientot>${A.voirRecette}</button>
  </div></div>`; }

// Raccourcis : les 3 premiers mènent à des écrans à venir, les 2 derniers ouvrent la liste déjà triée.
const RACCOURCIS = [['france','data-bientot'], ['monde','data-bientot'], ['frigo','data-bientot'],
  ['budget','data-lien="#recettes?budget=€"'], ['temps','data-lien="#recettes?temps=30"']];
const raccourcis = () => `<ul class="raccourcis">` + A.raccourcis.map((t,i)=>
  `<li><button class="rac" type="button" ${RACCOURCIS[i][1]}><span class="voile"></span><span class="ic">${svg(RACCOURCIS[i][0])}</span>${t}</button></li>`).join('') + `</ul>`;

/* ---------- Écran 1 : l'accueil (fabriqué une seule fois) ---------- */
function construireAccueil(recettes){
  const auj = new Date(), saison = saisonDuJour(auj);
  // La recette vedette : tirée parmi celles de la saison, elle change chaque jour.
  let choix = recettes.filter(r=>r.saisons.includes(saison));
  if (!choix.length) choix = recettes;
  const jour = Math.floor(new Date(auj.getFullYear(),auj.getMonth(),auj.getDate()) / 864e5);
  const star = choix[jour % choix.length];
  // Les dernières ajoutées : la fin du sommaire, sans répéter la vedette.
  const dernieres = recettes.slice().reverse().filter(r=>r!==star).slice(0,6);
  $('accueil').innerHTML = `<div class="duo">${vedette(star, saison)}${raccourcis()}</div>
    <section class="bloc"><h2>${A.dernieres}</h2><div class="cartes">${dernieres.map(carte).join('')}</div>
    <p class="note">${T.prixEstime}</p></section>`;
  $('accueil').querySelectorAll('[data-lien]').forEach(b=>b.addEventListener('click',()=>{ location.hash = b.dataset.lien; }));
  brancherEffets($('accueil'));
  ecrireIdees(recettes);
}

/* ---------- Écran 2 : la liste des recettes ---------- */
const PAR_PAQUET = 30;   // au-delà de 30 recettes, les suivantes arrivent quand on descend
let observeur = null;
function afficherListe(params){
  const q = (params.get('q')||'').trim();
  let recettes = q ? chercher(q) : DONNEES.recettes, titre = q ? L.resultatsPour(q) : L.toutes;
  if (params.get('budget')){ recettes = recettes.filter(r=>r.budget===params.get('budget')); titre = L.petitBudget; }
  if (params.get('temps')){ recettes = recettes.filter(r=>r.tempsTotal<=+params.get('temps')); titre = L.moins30; }
  document.title = `${titre} · ${T.appNom}`;
  const liste = $('liste');
  liste.innerHTML = `<div class="liste-tete"><h1></h1><span class="compteur">${L.compteur(recettes.length)}</span></div>`
    + (recettes.length ? `<div class="cartes" id="cartes"></div><div class="suite" id="suite"></div><p class="note">${T.prixEstime}</p>`
      : `<div class="encadre"><p>${L.vide}</p><button class="btn" type="button" id="enlever">${L.enleverFiltres}</button></div>`);
  liste.querySelector('h1').textContent = titre;   // textContent : ce que tape le visiteur reste du texte
  if (observeur) observeur.disconnect();
  if (!recettes.length){ $('enlever').addEventListener('click',()=>{ $('recherche').value=''; location.hash='recettes'; }); return; }
  let montrees = 0;
  function paquet(){
    const zone = document.createElement('div');
    zone.innerHTML = recettes.slice(montrees, montrees += PAR_PAQUET).map(carte).join('');
    brancherEffets(zone);
    $('cartes').append(...zone.children);
    if (montrees >= recettes.length) observeur.disconnect();
  }
  observeur = new IntersectionObserver(es=>{ if (es[0].isIntersecting) paquet(); }, {rootMargin:'600px'});
  paquet();
  if (montrees < recettes.length) observeur.observe($('suite'));
}

/* ---------- Recherche : Entrée ouvre la liste ; sur la liste, les résultats suivent la frappe ---------- */
const versListe = v => 'recettes' + (v.trim() ? '?q=' + encodeURIComponent(v.trim()) : '');
$('form-recherche').addEventListener('submit', e=>{ e.preventDefault(); location.hash = versListe($('recherche').value); $('recherche').blur(); });
$('recherche').addEventListener('input', ()=>{
  if (document.body.dataset.ecran !== 'liste') return;
  history.replaceState(null, '', '#' + versListe($('recherche').value));
  afficherListe(new URLSearchParams(versListe($('recherche').value).split('?')[1]));
});

/* ---------- Quel écran montrer ? On lit l'adresse (#recettes?q=crêpe), comme l'intercalaire d'un classeur ---------- */
function router(){
  const [nom, reste] = location.hash.slice(1).split('?');
  const ecran = nom === 'recettes' ? 'liste' : 'accueil';
  const avant = document.body.dataset.ecran;
  document.body.dataset.ecran = ecran;
  $('accueil').hidden = ecran !== 'accueil';
  $('liste').hidden = ecran !== 'liste';
  if (ecran === 'liste'){
    const params = new URLSearchParams(reste);
    $('recherche').value = params.get('q') || '';
    afficherListe(params);
  } else {
    document.title = T.titrePage;
    $('recherche').value = '';
  }
  if (avant !== ecran) scrollTo(0, 0);
  choisirOnglet(0); demarrer(); relancerIdees();
}

/* ---------- Démarrage ---------- */
function lancer(){
  chargerRecettes().then(d=>{ construireAccueil(d.recettes); router(); }).catch(()=>{
    document.body.dataset.ecran = 'erreur';
    $('liste').hidden = true; $('accueil').hidden = false;
    $('accueil').innerHTML = `<div class="encadre" role="alert"><p>${T.erreurChargement}</p><button class="btn" type="button" id="retry">${T.reessayer}</button></div>`;
    $('retry').addEventListener('click', lancer);
  });
}
addEventListener('hashchange', router);
appliquerTheme(); lancer();
