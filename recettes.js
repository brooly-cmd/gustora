// Le chargement des recettes, leur mise en forme et la recherche.

/* ---------- Un emoji par plat (en attendant les images de la mission 13) ---------- */
const EMOJI = {
  "auvergne-rhone-alpes-salade-lyonnaise":"🥗", "bretagne-crepes-froment":"🥞", "grand-est-tarte-flambee":"🫓",
  "inde-dal-lentilles-corail":"🍛", "italie-spaghetti-carbonara":"🍝", "japon-gyozas-porc-chou":"🥟",
  "maroc-couscous-poulet-legumes":"🍲", "mexique-tacos-carnitas":"🌮", "nouvelle-aquitaine-poulet-basquaise":"🍗",
  "provence-alpes-cote-d-azur-ratatouille":"🍆"
};
const emoji = r => EMOJI[r.id] || "🍽️";

/* ---------- Chargement : le sommaire léger + les noms des ingrédients (pour chercher « œuf ») ---------- */
const DONNEES = { recettes: [], nomsIngredients: {} };
function chargerRecettes(){
  const lire = url => fetch(url).then(r=>{ if(!r.ok) throw new Error(url); return r.json(); });
  return Promise.all([lire('recettes/index.json'), lire('ingredients.json')]).then(([index, ing])=>{
    DONNEES.recettes = index.recettes;
    // sel, poivre, huile, eau : présents partout, on ne les cherche pas.
    ing.ingredients.forEach(i=>{ if(!i.deBase) DONNEES.nomsIngredients[i.id] = i.nom + ' ' + i.nomPluriel; });
    return DONNEES;
  });
}

/* ---------- Mise en forme : temps, prix, saison du jour ---------- */
function duree(min){ const h=Math.floor(min/60), m=min%60; return h ? `${h} h${m?' '+String(m).padStart(2,'0'):''}` : `${m} min`; }
function prix(e){ return '~' + e.toLocaleString('fr-FR',{minimumFractionDigits:e%1?2:0, maximumFractionDigits:2}) + ' € ' + TEXTES.parPersonne; }
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
