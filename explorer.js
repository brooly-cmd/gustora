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
// Effet 274 (petites cartes en 3D) : une fenêtre avec son soleil (fond), le plat qui flotte devant, puis le nom.
const cartePays = (k, nom) => { const n = nbRecettes(nom);
  return `<div class="tilt js-tilt" data-max="10"><a href="#zone/${k}" class="pc ${n ? '' : 'vide'}">
    <span class="fen" aria-hidden="true"><span class="fond" data-depth="0.4"><span class="sun"></span></span><span class="emo" data-depth="1.8">${PLAT_PAYS[k]}</span></span>
    <span class="txt" data-depth="0.8"><b>${nom}</b>${combien(n)}</span></a></div>`; };

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
    <ul class="vue-monde pays">${Object.entries(TEXTES.pays).map(([k,z])=>`<li>${cartePays(k, z.nom)}</li>`).join('')}</ul>`;
  brancherEffets(boite.querySelector('.pays'));
  boite.querySelectorAll('[data-vue]').forEach(b=>b.addEventListener('click', ()=>{
    history.replaceState(null, '', b.dataset.vue==='monde' ? '#explorer?monde' : '#explorer'); router(); }));
  // La carte (un fichier à part) arrive par internet ; si elle manque, la liste des régions suffit.
  carteChargee = fetch('carte-france.svg?v=6').then(r=>r.ok ? r.text() : '').then(dessinerCarte).catch(()=>{});
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
  lancerBoussoles();
  if (vue !== 'france' || reduce) return;
  carteChargee.then(()=>{
    const carte = $('carte');
    carte.querySelectorAll('.choisie').forEach(a=>a.classList.remove('choisie'));
    if (!nouvelleVisite && carte.classList.contains('trace')) return;
    carte.classList.remove('trace'); carte.classList.add('attend');
    guetteur.observe(carte);
  });
}

/* ---------- Effet 57 : un champ d'aiguilles de boussole derrière tout l'écran Explorer ---------- */
// Au repos, le « nord » se balade en vagues lentes ; le doigt ou la souris attire toutes les aiguilles,
// les plus proches d'abord : une onde part du doigt.
const cvB = $('boussoles'), ctxB = cvB.getContext('2d'), viseur = {x:0, y:0, on:false};
let aiguilles = [], WB = 0, HB = 0, rafB = 0;
const surExplorer = () => !document.hidden && document.body.dataset.ecran === 'explorer';
function tailleBoussoles(){
  const d = Math.min(devicePixelRatio||1, 2), pas = innerWidth < 600 ? 34 : 40;
  WB = innerWidth; HB = innerHeight; cvB.width = WB*d; cvB.height = HB*d; ctxB.setTransform(d,0,0,d,0,0);
  aiguilles = [];
  for (let y = pas/2; y < HB; y += pas) for (let x = pas/2; x < WB; x += pas) aiguilles.push({x, y, a:-Math.PI/2});
}
function dessinerBoussoles(t){
  ctxB.clearRect(0,0,WB,HB);
  const pointe = new Path2D(), queue = new Path2D();
  for (const g of aiguilles){
    const repos = -Math.PI/2 + .9*Math.sin(g.x*.011 + t*.0005) + .9*Math.cos(g.y*.009 - t*.0004);
    let but = repos, k = .05;
    if (viseur.on){ const dx = viseur.x-g.x, dy = viseur.y-g.y, d = Math.hypot(dx,dy);
      but = Math.atan2(dy,dx); k = .16 * Math.max(.08, 1 - d/700); }   // plus l'aiguille est loin, plus elle tarde à tourner
    let e = but - g.a; e = Math.atan2(Math.sin(e), Math.cos(e));   // tourner par le plus court chemin
    g.a = t ? g.a + e*k : repos;
    const c = Math.cos(g.a), s = Math.sin(g.a), L = 8, l = 2.6;
    pointe.moveTo(g.x + c*L, g.y + s*L); pointe.lineTo(g.x - s*l, g.y + c*l); pointe.lineTo(g.x + s*l, g.y - c*l); pointe.closePath();
    queue.moveTo(g.x - c*L, g.y - s*L); queue.lineTo(g.x - s*l, g.y + c*l); queue.lineTo(g.x + s*l, g.y - c*l); queue.closePath();
  }
  ctxB.globalAlpha = .42; ctxB.fillStyle = C.pr; ctxB.fill(pointe);
  ctxB.globalAlpha = .5; ctxB.fillStyle = C.ac; ctxB.fill(queue); ctxB.globalAlpha = 1;
}
function boucleBoussoles(t){ dessinerBoussoles(t); rafB = surExplorer() ? requestAnimationFrame(boucleBoussoles) : 0; }
// « Réduire les animations » : les aiguilles sont dessinées une fois, immobiles.
function lancerBoussoles(){
  if (WB !== innerWidth) tailleBoussoles();
  if (reduce) dessinerBoussoles(0); else if (!rafB && surExplorer()) rafB = requestAnimationFrame(boucleBoussoles);
}
const viser = e=>{ viseur.x = e.clientX; viseur.y = e.clientY; viseur.on = true; };
addEventListener('pointermove', viser, {passive:true}); addEventListener('pointerdown', viser, {passive:true});
addEventListener('pointerup', e=>{ if (e.pointerType !== 'mouse') viseur.on = false; });
['pointercancel','blur'].forEach(n=>addEventListener(n, ()=>{ viseur.on = false; }));
document.addEventListener('pointerleave', ()=>{ viseur.on = false; });
document.addEventListener('visibilitychange', lancerBoussoles);
// Sur iPhone, la barre d'adresse qui se cache change un peu la hauteur : on ne recommence que si l'écran change vraiment.
addEventListener('resize', ()=>{ if (Math.abs(innerWidth-WB) > 40 || Math.abs(innerHeight-HB) > 160){ tailleBoussoles(); if (reduce && surExplorer()) dessinerBoussoles(0); } });
