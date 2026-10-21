// Le chargement des recettes, leur mise en forme et la recherche.

/* ---------- Un emoji par plat (en attendant les images de la mission 17) ---------- */
const EMOJI = {
  "auvergne-rhone-alpes-salade-lyonnaise":"🥗", "bretagne-crepes-froment":"🥞", "grand-est-tarte-flambee":"🫓",
  "inde-dal-lentilles-corail":"🍛", "italie-spaghetti-carbonara":"🍝", "japon-gyozas-porc-chou":"🥟",
  "maroc-couscous-poulet-legumes":"🍲", "mexique-tacos-carnitas":"🌮", "nouvelle-aquitaine-poulet-basquaise":"🍗",
  "provence-alpes-cote-d-azur-ratatouille":"🍆"
};
const emoji = r => EMOJI[r.id] || "🍽️";

/* ---------- Les petits dessins animés (dossier dessins/) : le plat dessiné, sur un champ de couleur ---------- */
// Chaque dessin a sa couleur de champ (DESIGN.md). Les autres plats gardent leur emoji, sur Pistache ou Curcuma selon leur place.
const DESSIN_PLAT = { "mexique-tacos-carnitas":"piment", "nouvelle-aquitaine-poulet-basquaise":"piment",
  "italie-spaghetti-carbonara":"spaghetti", "inde-dal-lentilles-corail":"dal" };
const CHAMP_DESSIN = { piment:"ac", spaghetti:"fx", dal:"fx" };
const DESSINS_PLATS = {};   // le code de chaque dessin, une fois chargé
function chargerDessins(){   // un dessin qui manque n'empêche rien : le plat garde son emoji
  return Promise.all(Object.keys(CHAMP_DESSIN).map(n=>fetch(`dessins/${n}.svg?v=12`)
    .then(r=>r.ok ? r.text() : '').then(t=>{ if (t) DESSINS_PLATS[n] = t; }).catch(()=>{})));
}
const illustration = r => DESSINS_PLATS[DESSIN_PLAT[r.id]] || `<span class="emo">${emoji(r)}</span>`;
const champ = (r, place = 0) => DESSINS_PLATS[DESSIN_PLAT[r.id]] ? CHAMP_DESSIN[DESSIN_PLAT[r.id]] : place % 2 ? 'ac' : 'fx';

/* ---------- Chargement : le sommaire léger + les noms des ingrédients (pour chercher « œuf ») ---------- */
const DONNEES = { recettes: [], zones: [], nomsIngredients: {}, ingredients: {}, conversions: {} };
const lire = url => fetch(url).then(r=>{ if(!r.ok) throw new Error(url); return r.json(); });
function chargerRecettes(){
  return Promise.all([lire('recettes/index.json'), lire('ingredients.json'), chargerDessins()]).then(([index, ing])=>{
    DONNEES.recettes = index.recettes; DONNEES.zones = index.zones; DONNEES.conversions = ing.conversions;
    // sel, poivre, huile, eau : présents partout, on ne les cherche pas.
    ing.ingredients.forEach(i=>{ DONNEES.ingredients[i.id] = i; if(!i.deBase) DONNEES.nomsIngredients[i.id] = i.nom + ' ' + i.nomPluriel; });
    return DONNEES;
  });
}

// Une zone (ses recettes complètes) se charge seulement quand on ouvre une de ses recettes, puis reste en mémoire.
const ZONES = {};
function chargerZone(nom){
  const z = DONNEES.zones.find(z=>z.nom===nom);
  if (!z) return Promise.resolve({ recettes: [] });
  return ZONES[nom] = ZONES[nom] || lire('recettes/' + z.fichier).catch(e=>{ delete ZONES[nom]; throw e; });
}

/* ---------- Mise en forme : temps, prix, saison du jour ---------- */
function duree(min){ const h=Math.floor(min/60), m=min%60; return h ? `${h} h${m?' '+String(m).padStart(2,'0'):''}` : `${m} min`; }
// Un prix toujours « à peu près » : arrondi à 5 centimes (ou au pas choisi), avec « ~ » devant.
function euros(e, pas=.05){ e = Math.round(e/pas)*pas; return '~' + e.toLocaleString('fr-FR',{minimumFractionDigits:e%1?2:0, maximumFractionDigits:2}) + ' €'; }
function prix(e){ return euros(e) + ' ' + TEXTES.parPersonne; }
function saisonDuJour(d){ const m=d.getMonth(); return m<2||m===11 ? 'hiver' : m<5 ? 'printemps' : m<8 ? 'été' : 'automne'; }

/* ---------- Recherche : nom, zone ou ingrédient, sans se soucier des accents ni des majuscules ---------- */
const simple = s => s.toLowerCase().replace(/œ/g,'oe').replace(/æ/g,'ae').normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
function chercher(texte){
  const mots = simple(texte).split(/\s+/).filter(Boolean);
  return DONNEES.recettes.filter(r=>{
    const fiche = simple([r.nom, r.zone, ...r.ingredients.map(id=>DONNEES.nomsIngredients[id]||'')].join(' '));
    return mots.every(m=>fiche.includes(m));   // chaque mot tapé doit se trouver quelque part
  });
}
