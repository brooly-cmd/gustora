// Écran 4 : Explorer (la carte de France et les pays). L'écran 5 (une zone) réutilise la liste, dans app.js.

// Un plat emblématique par pays (en attendant les images de la mission 15).
const PLAT_PAYS = { italie:"🍝", espagne:"🥘", maroc:"🍲", japon:"🍣", mexique:"🌮",
  inde:"🍛", liban:"🧆", grece:"🫒", thailande:"🍜", "etats-unis":"🍔" };

// Le nom d'une zone → son adresse courte (« Bretagne » → « bretagne »).
function slugZone(nom){
  return Object.keys({...TEXTES.regions, ...TEXTES.pays}).find(k=>(TEXTES.regions[k]||TEXTES.pays[k]).nom===nom);
}
const nbRecettes = nom => DONNEES.recettes.filter(r=>r.zone===nom).length;
const combien = n => `<span class="nb">${n ? TEXTES.liste.compteur(n) : TEXTES.explorer.bientot}</span>`;
// Une région de la liste, avec son nombre de recettes (ou « Bientôt »).
const lienRegion = (k, nom) => { const n = nbRecettes(nom);
  return `<a href="#zone/${k}" class="${n ? '' : 'vide'}"><b>${nom}</b>${combien(n)}</a>`; };
// Effet 66 (tuiles bento) : des cases de tailles différentes, comme un plateau-repas. Chaque tuile est en couches
// (fond avec son soleil, plat qui flotte devant, nom) et penche sous le doigt.
// Tailles : g = grande (2 × 2), h = haute, l = large ; choisies pour que les cases s'emboîtent sans trou
// (sur iPhone 6 rangées de 3, sur PC 3 rangées de 6 : voir style.css).
const TUILES = { italie:'g', maroc:'h', mexique:'l', liban:'h', grece:'h', 'etats-unis':'l' };
const cartePays = (k, nom) => { const n = nbRecettes(nom);
  return `<li class="${TUILES[k] || ''}" data-k="${k}"><div class="tilt js-tilt" data-max="7"><a href="#zone/${k}" class="bt ${n ? '' : 'vide'}">
    <span class="fond" data-depth="0.4" aria-hidden="true"><span class="sun"></span></span>
    <span class="emo" data-depth="1.8" aria-hidden="true">${PLAT_PAYS[k]}</span>
    <span class="txt" data-depth="0.8"><b>${nom}</b>${combien(n)}</span></a></div></li>`; };

/* ---------- L'écran, fabriqué une seule fois ---------- */
let carteChargee = null;
function construireExplorer(){
  const E = TEXTES.explorer, boite = $('explorer');
  boite.innerHTML = `<div class="liste-tete"><h1>${E.titre}</h1></div>
    <div class="bascule" role="tablist">
      <button type="button" role="tab" data-vue="france">${E.france}</button>
      <button type="button" role="tab" data-vue="monde">${E.monde}</button>
    </div>
    <div class="vue-france">
      <figure class="carte" id="carte" role="group" aria-label="${E.carte}"></figure>
      <section><h2>${E.regions}</h2><ul class="zones">${Object.entries(TEXTES.regions).map(([k,z])=>`<li>${lienRegion(k, z.nom)}</li>`).join('')}</ul></section>
    </div>
    <ul class="vue-monde pays">${Object.entries(TEXTES.pays).map(([k,z])=>cartePays(k, z.nom)).join('')}</ul>`;
  brancherEffets(boite.querySelector('.pays'));
  boite.querySelectorAll('[data-vue]').forEach(b=>b.addEventListener('click', ()=>{
    history.replaceState(null, '', b.dataset.vue==='monde' ? '#explorer?monde' : '#explorer'); router(); }));
  // La carte (un fichier à part) arrive par internet ; si elle manque, la liste des régions suffit.
  carteChargee = fetch('carte-france.svg?v=9').then(r=>r.ok ? r.text() : '').then(dessinerCarte).catch(()=>{});
}

function dessinerCarte(svg){
  const carte = $('carte');
  carte.innerHTML = svg;
  carte.querySelectorAll('a').forEach(a=>{
    const z = TEXTES.regions[a.dataset.zone], n = nbRecettes(z.nom);
    a.setAttribute('aria-label', `${z.nom} · ${n ? TEXTES.liste.compteur(n) : TEXTES.explorer.bientot}`);
    if (n) a.querySelector('text').textContent = n; else { a.classList.add('vide'); a.querySelector('.tampon').remove(); }
    // Toucher une région : elle se remplit de terracotta, puis on part vers sa page.
    a.addEventListener('click', e=>{ e.preventDefault(); a.classList.add('choisie');
      setTimeout(()=>{ location.hash = a.getAttribute('href'); }, reduce ? 0 : 500); });
  });
}

/* ---------- Effet 36 : la carte se dessine trait par trait quand elle arrive à l'écran ---------- */
const guetteur = new IntersectionObserver(es=>es.forEach(e=>{
  if (e.isIntersecting){ e.target.classList.replace('attend', 'trace'); guetteur.unobserve(e.target); } }), {threshold:.3});

function afficherExplorer(vue, nouvelleVisite){
  if (!$('explorer').innerHTML) construireExplorer();
  document.title = `${TEXTES.explorer.titre} · ${TEXTES.appNom}`;
  const boite = $('explorer');
  boite.dataset.vue = vue;
  boite.querySelectorAll('[data-vue]').forEach(b=>b.setAttribute('aria-selected', String(b.dataset.vue===vue)));
  lancerHerbes(nouvelleVisite);
  if (vue !== 'france' || reduce) return;
  carteChargee.then(()=>{
    const carte = $('carte');
    carte.querySelectorAll('.choisie').forEach(a=>a.classList.remove('choisie'));
    if (!nouvelleVisite && carte.classList.contains('trace')) return;
    carte.classList.remove('trace'); carte.classList.add('attend');
    guetteur.observe(carte);
  });
}

/* ---------- Effet 152 : des herbes aromatiques poussent autour de l'écran Explorer ---------- */
// Romarin, basilic et thym poussent du bas et des bords, ondulent au vent et se penchent vers le doigt.
// Toucher le fond (pas un lien) fait pousser un nouveau brin. Chaque plante est un petit arbre de tiges :
// la tige pousse, puis ses branches, puis leurs feuilles, comme dans un vrai pot d'herbes.
const cvH = $('herbes'), ctxH = cvH.getContext('2d'), doigtH = {x:0, y:0, on:false};
let plantes = [], WH = 0, HH = 0, rafH = 0;
const surExplorer = () => !document.hidden && document.body.dataset.ecran === 'explorer';
const HERBES = {   // nombre de branches, leur écart, densité et forme des feuilles
  romarin: {branches:2, ecart:.45, feuilles:1.6, forme:'aiguille'},
  basilic: {branches:2, ecart:.75, feuilles:.35, forme:'large'},
  thym:    {branches:3, ecart:.6,  feuilles:1.1, forme:'petite'}
};
// L'arbre d'une plante : chaque tige a sa longueur, son angle, ses branches et le moment où elle commence à pousser.
function tige(sorte, long, prof, debut){
  const H = HERBES[sorte], t = {long, prof, debut, da:0, branches:[], feuilles:Math.max(2, Math.round(long/10*H.feuilles))};
  if (prof < 2) for (let i=0; i<H.branches - prof; i++){
    const ou = .35 + Math.random()*.5, b = tige(sorte, long*(.42 + Math.random()*.2), prof+1, debut + long*ou);
    b.da = (i%2 ? 1 : -1)*H.ecart*(.7 + Math.random()*.5); b.ou = ou; t.branches.push(b);
  }
  return t;
}
const planter = (x, y, angle, taille, sorte) => ({x, y, angle, sorte, arbre: tige(sorte, taille, 0, 0), pousse: 0, max: taille*1.9, phase: Math.random()*6, vent: 0});
const auHasard = () => Object.keys(HERBES)[Math.floor(Math.random()*3)];
function semer(){
  const d = Math.min(devicePixelRatio||1, 2), n = Math.max(5, Math.round(innerWidth/70));
  WH = innerWidth; HH = innerHeight; cvH.width = WH*d; cvH.height = HH*d; ctxH.setTransform(d,0,0,d,0,0);
  const haut = Math.min(HH*.2, 170);
  plantes = [];
  for (let i=0; i<n; i++) plantes.push(planter((i + .5)*WH/n + (Math.random()-.5)*24, HH + 6,
    -Math.PI/2 + (Math.random()-.5)*.35, haut*(.6 + Math.random()*.5), Object.keys(HERBES)[i%3]));
  // Quelques brins sur les côtés, penchés vers l'intérieur
  for (const [x, a] of [[-6, -.55], [WH+6, -Math.PI+.55]]) for (const y of [.62, .8])
    plantes.push(planter(x, HH*y, a + (Math.random()-.5)*.2, haut*.55, auHasard()));
}
// Un point sur la tige courbe (u entre 0 et 1)
const surCourbe = (u, x, y, mx, my, x2, y2) => [(1-u)*(1-u)*x + 2*(1-u)*u*mx + u*u*x2, (1-u)*(1-u)*y + 2*(1-u)*u*my + u*u*y2];
function dessinerHerbes(t){
  ctxH.clearRect(0,0,WH,HH);
  const tiges = [new Path2D(), new Path2D(), new Path2D()], aiguilles = new Path2D(), larges = new Path2D(), petites = new Path2D();
  function branche(p, b, x, y, a){
    const vu = Math.min(1, (p.pousse - b.debut)/b.long); if (vu <= 0) return;
    const a2 = a + b.da + p.vent*(1 + b.prof*.6), L = b.long*vu, x2 = x + Math.cos(a2)*L, y2 = y + Math.sin(a2)*L;
    const courbe = p.vent*L*.5, mx = x + Math.cos(a2)*L*.5 - Math.sin(a2)*courbe, my = y + Math.sin(a2)*L*.5 + Math.cos(a2)*courbe;
    tiges[b.prof].moveTo(x, y); tiges[b.prof].quadraticCurveTo(mx, my, x2, y2);
    // Les feuilles, de la base vers le bout ; elles grandissent juste après le passage de la tige
    const forme = HERBES[p.sorte].forme;
    for (let k=1; k<=b.feuilles; k++){
      const f = k/(b.feuilles + .6); if (f > vu) break;
      const g = Math.min(1, (vu - f)*4), [fx, fy] = surCourbe(f*vu, x, y, mx, my, x2, y2), fa = a2 + (k%2 ? 1 : -1)*(forme === 'aiguille' ? .55 : .9);
      if (forme === 'aiguille'){ const l = 7*g*(1.1 - f*.4); aiguilles.moveTo(fx, fy); aiguilles.lineTo(fx + Math.cos(fa)*l, fy + Math.sin(fa)*l); }
      else { const l = (forme === 'large' ? 8.5 : 3.2)*g*(1.15 - f*.35), cx = fx + Math.cos(fa)*l, cy = fy + Math.sin(fa)*l, chemin = forme === 'large' ? larges : petites;
        chemin.moveTo(cx + Math.cos(fa)*l, cy + Math.sin(fa)*l); chemin.ellipse(cx, cy, l, l*(forme === 'large' ? .52 : .45), fa, 0, Math.PI*2); }
    }
    for (const c of b.branches) if (vu >= c.ou){ const [cx, cy] = surCourbe(c.ou, x, y, mx, my, x2, y2); branche(p, c, cx, cy, a2); }
  }
  for (const p of plantes){
    if (p.pousse < p.max) p.pousse = reduce ? p.max : p.pousse + Math.max(.5, p.max*.006);
    // Le vent (deux vagues lentes), plus le doigt qui attire les tiges proches
    let vent = reduce ? 0 : Math.sin(t*.0011 + p.phase)*.05 + Math.sin(t*.0023 + p.x*.01)*.025;
    if (doigtH.on){ const dx = doigtH.x - p.x, dy = doigtH.y - p.y, d = Math.hypot(dx, dy);
      let e = Math.atan2(dy, dx) - p.angle; e = Math.atan2(Math.sin(e), Math.cos(e));   // le plus court chemin
      if (d < 260) vent += Math.max(-.35, Math.min(.35, e))*(1 - d/260)*.45; }
    p.vent += (vent - p.vent)*.08;   // la tige suit en douceur
    branche(p, p.arbre, p.x, p.y, p.angle);
  }
  ctxH.lineCap = 'round'; ctxH.lineJoin = 'round'; ctxH.strokeStyle = C.tx;
  [2.2, 1.5, 1].forEach((l, i)=>{ ctxH.globalAlpha = .38 - i*.06; ctxH.lineWidth = l; ctxH.stroke(tiges[i]); });
  ctxH.globalAlpha = .62; ctxH.strokeStyle = C.pr; ctxH.lineWidth = 1.6; ctxH.stroke(aiguilles);
  ctxH.globalAlpha = .55; ctxH.fillStyle = C.ac; ctxH.fill(larges);
  ctxH.globalAlpha = .6; ctxH.fillStyle = C.pr; ctxH.fill(petites);
  ctxH.globalAlpha = 1;
}
function boucleHerbes(t){ dessinerHerbes(t); rafH = surExplorer() ? requestAnimationFrame(boucleHerbes) : 0; }
// À chaque arrivée sur Explorer, les herbes repoussent depuis la terre (« Réduire les animations » : déjà poussées, immobiles).
function lancerHerbes(repousser){
  if (!WH) semer();
  else if (repousser) plantes = plantes.filter(p=>!p.ajoutee).map(p=>(p.pousse = 0, p));
  if (reduce) dessinerHerbes(0); else if (!rafH && surExplorer()) rafH = requestAnimationFrame(boucleHerbes);
}
const viserH = e=>{ doigtH.x = e.clientX; doigtH.y = e.clientY; doigtH.on = true; };
addEventListener('pointermove', viserH, {passive:true});
addEventListener('pointerdown', e=>{ viserH(e);
  // Toucher le fond fait pousser un brin (8 au plus : le plus ancien laisse sa place)
  if (!surExplorer() || reduce || e.target.closest('a,button,figure,section,li')) return;
  const ajout = plantes.filter(p=>p.ajoutee); if (ajout.length >= 8) plantes.splice(plantes.indexOf(ajout[0]), 1);
  const p = planter(e.clientX, e.clientY + 4, -Math.PI/2 + (Math.random()-.5)*.5, 45 + Math.random()*25, auHasard());
  p.ajoutee = true; plantes.push(p);
}, {passive:true});
addEventListener('pointerup', e=>{ if (e.pointerType !== 'mouse') doigtH.on = false; });
['pointercancel','blur'].forEach(n=>addEventListener(n, ()=>{ doigtH.on = false; }));
document.addEventListener('pointerleave', ()=>{ doigtH.on = false; });
document.addEventListener('visibilitychange', ()=>lancerHerbes(false));
// Sur iPhone, la barre d'adresse qui se cache change un peu la hauteur : on ne resème que si l'écran change vraiment.
addEventListener('resize', ()=>{ if (WH && (Math.abs(innerWidth-WH) > 40 || Math.abs(innerHeight-HH) > 160)){ semer(); lancerHerbes(false); } });
