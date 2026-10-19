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
      <figure class="carte" id="carte" role="group" aria-label="${E.carte}"><canvas id="nappe" aria-hidden="true"></canvas><div id="dessin"></div></figure>
      <section><h2>${E.regions}</h2><ul class="zones">${Object.entries(TEXTES.regions).map(([k,z])=>`<li>${lienRegion(k, z.nom)}</li>`).join('')}</ul></section>
    </div>
    <ul class="vue-monde pays">${Object.entries(TEXTES.pays).map(([k,z])=>`<li>${cartePays(k, z.nom)}</li>`).join('')}</ul>`;
  brancherEffets(boite.querySelector('.pays'));
  brancherNappe();
  boite.querySelectorAll('[data-vue]').forEach(b=>b.addEventListener('click', ()=>{
    history.replaceState(null, '', b.dataset.vue==='monde' ? '#explorer?monde' : '#explorer'); router(); }));
  // La carte (un fichier à part) arrive par internet ; si elle manque, la liste des régions suffit.
  carteChargee = fetch('carte-france.svg?v=5').then(r=>r.ok ? r.text() : '').then(dessinerCarte).catch(()=>{});
}

function dessinerCarte(svg){
  const carte = $('carte');
  $('dessin').innerHTML = svg;
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
  if (vue !== 'france') return;
  lancerNappe();
  if (reduce) return;
  carteChargee.then(()=>{
    const carte = $('carte');
    carte.querySelectorAll('.choisie').forEach(a=>a.classList.remove('choisie'));
    if (!nouvelleVisite && carte.classList.contains('trace')) return;
    carte.classList.remove('trace'); carte.classList.add('attend');
    guetteur.observe(carte);
  });
}

/* ---------- Effet 73 : une nappe de points qui ondule autour de la carte ; le doigt ou la souris y fait une bosse ---------- */
let nappe = null;
function brancherNappe(){
  const cv = $('nappe'), fig = $('carte'), ctx = cv.getContext('2d'), doigt = {x:-999, y:-999};
  let W = 0, H = 0, raf = 0;
  function taille(){ const d = Math.min(devicePixelRatio||1, 2); W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W*d; cv.height = H*d; ctx.setTransform(d,0,0,d,0,0); }
  function image(t){
    ctx.clearRect(0,0,W,H);
    const cols = Math.round(W/13), rangs = Math.round(H/15);
    for (let j=0; j<rangs; j++){
      const z = j/(rangs-1), sc = .5 + z*.75, y0 = H*(.03 + z*.94);   // les rangs du fond sont plus petits : la profondeur
      ctx.fillStyle = z < .5 ? C.ac : C.pr; ctx.globalAlpha = .22 + z*.5;
      ctx.beginPath();
      for (let i=0; i<cols; i++){
        const u = i/(cols-1) - .5, x = W/2 + u*W*sc*1.3;
        // Trois vagues lentes qui se croisent : c'est ce qui rend la nappe hypnotique.
        let h = Math.sin(i*.42 + t*.0014)*7 + Math.cos(j*.55 + t*.001)*7 + Math.sin((i+j)*.22 - t*.0009)*4;
        const d = Math.hypot(x - doigt.x, y0 - doigt.y); if (d < 90) h -= (90-d)*.55;   // la bosse sous le doigt
        const r = .7 + z*1.5, y = y0 + h*sc;
        ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, 7);
      }
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function boucle(t){
    image(t);
    // En pause dès qu'on ne voit plus la carte (autre écran, onglet Monde, Safari en arrière-plan).
    const visible = !document.hidden && document.body.dataset.ecran === 'explorer' && $('explorer').dataset.vue === 'france';
    raf = visible ? requestAnimationFrame(boucle) : 0;
  }
  const suivre = e=>{ const r = cv.getBoundingClientRect(); doigt.x = e.clientX - r.left; doigt.y = e.clientY - r.top; };
  const lacher = ()=>{ doigt.x = doigt.y = -999; };
  fig.addEventListener('pointermove', suivre, {passive:true}); fig.addEventListener('pointerdown', suivre, {passive:true});
  ['pointerleave','pointercancel'].forEach(n=>fig.addEventListener(n, lacher));
  fig.addEventListener('pointerup', e=>{ if (e.pointerType !== 'mouse') lacher(); });
  addEventListener('resize', ()=>{ if (W && Math.abs(cv.clientWidth - W) > 20){ taille(); if (reduce) image(0); } });
  document.addEventListener('visibilitychange', ()=>nappe());
  // « Réduire les animations » : la nappe est dessinée une fois, immobile.
  nappe = ()=>{ if (!W) taille(); if (reduce) image(0); else if (!raf) raf = requestAnimationFrame(boucle); };
}
function lancerNappe(){ if (nappe) nappe(); }
