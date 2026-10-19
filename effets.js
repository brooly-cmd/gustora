// Les effets visuels choisis dans DESIGN.md (numéros de la Salle des effets).
const $ = id => document.getElementById(id);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const surAccueil = () => document.body.dataset.ecran === 'accueil';

/* ---------- Effets 3 et 2 : la carte penche (souris, ou doigt qui glisse à l'horizontale) ---------- */
function brancherEffets(zone){
  if (!reduce) zone.querySelectorAll('.js-tilt').forEach(el=>{
    const max=+el.dataset.max, layers=[...el.querySelectorAll('[data-depth]')];
    function move(e){ const r=el.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      el.style.transition='transform .15s linear';
      el.style.transform=`perspective(900px) rotateX(${(-y*max).toFixed(2)}deg) rotateY(${(x*max).toFixed(2)}deg)`;
      layers.forEach(l=>{ const d=+l.dataset.depth; l.style.transition='transform .15s linear';
        l.style.transform=`translate3d(${(x*d*12).toFixed(1)}px,${(y*d*12).toFixed(1)}px,0)`; }); }
    function reset(){ el.style.transition=''; el.style.transform=''; layers.forEach(l=>{ l.style.transition=''; l.style.transform=''; }); }
    el.addEventListener('pointermove',move); el.addEventListener('pointerleave',reset); el.addEventListener('pointercancel',reset);
    el.addEventListener('pointerup',e=>{ if(e.pointerType!=='mouse') reset(); });
  });
  // Effet 6 : le bouton aimanté suit un peu la souris ; au doigt, il s'enfonce puis rebondit
  if (!reduce) zone.querySelectorAll('.js-aimant').forEach(b=>{
    const lacher=()=>{ b.style.transition=''; b.style.transform=''; };
    b.addEventListener('pointermove',e=>{ if(e.pointerType!=='mouse') return; const r=b.getBoundingClientRect();
      b.style.transition='transform .15s linear';
      b.style.transform=`translate(${((e.clientX-r.left-r.width/2)*.14).toFixed(1)}px,${((e.clientY-r.top-r.height/2)*.2).toFixed(1)}px)`; });
    b.addEventListener('pointerleave',lacher);
    b.addEventListener('pointerdown',e=>{ if(e.pointerType!=='mouse'){ b.style.transition='transform .12s'; b.style.transform='scale(.94)'; } });
    ['pointerup','pointercancel'].forEach(n=>b.addEventListener(n,e=>{ if(e.pointerType!=='mouse') lacher(); }));
  });
  // Effet 8 : voile qui suit la direction (souris) ; au doigt, il monte pendant l'appui
  zone.querySelectorAll('.rac').forEach(b=>{
    const voile=b.querySelector('.voile');
    function cote(e){ const r=b.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      return Math.abs(x)>Math.abs(y) ? (x>0?'101%,0':'-101%,0') : (y>0?'0,101%':'0,-101%'); }
    function entrer(depuis){ voile.style.transition='none'; voile.style.transform=`translate(${depuis})`; voile.offsetWidth;
      voile.style.transition=''; voile.style.transform='translate(0,0)'; b.classList.add('on'); }
    function sortir(vers){ voile.style.transform=`translate(${vers})`; b.classList.remove('on'); }
    b.addEventListener('pointerenter',e=>{ if(e.pointerType==='mouse') entrer(cote(e)); });
    b.addEventListener('pointerleave',e=>{ if(e.pointerType==='mouse') sortir(cote(e)); });
    b.addEventListener('pointerdown',e=>{ if(e.pointerType!=='mouse') entrer('0,101%'); });
    ['pointerup','pointercancel'].forEach(n=>b.addEventListener(n,e=>{ if(e.pointerType!=='mouse') setTimeout(()=>sortir('0,101%'),250); }));
  });
}

/* ---------- Effet 42 : la pastille glisse jusqu'à l'onglet choisi ---------- */
function choisirOnglet(i){
  const bar=$('onglets'), pill=bar.querySelector('.pill'), btns=[...bar.querySelectorAll('button')], b=btns[i];
  btns.forEach(x=>x.setAttribute('aria-selected',String(x===b)));
  pill.style.width=b.offsetWidth+'px'; pill.style.transform=`translateX(${b.offsetLeft}px)`;
}

/* ---------- Effet 78 : le courant d'épices du fond de l'accueil (tourbillonne sous la souris ou le doigt) ---------- */
const cv=$('graines'), ctx=cv.getContext('2d'), P={x:-999,y:-999};
let grains=[], W=0, H=0, raf=0, C={};
function couleurs(){ const s=getComputedStyle(document.documentElement);
  C={pr:s.getPropertyValue('--pr').trim(), ac:s.getPropertyValue('--ac').trim(), tx:s.getPropertyValue('--tx').trim()}; ctx.clearRect(0,0,W,H); if(reduce) immobile(); }
function taille(){ const d=Math.min(devicePixelRatio||1,2); W=innerWidth; H=innerHeight; cv.width=W*d; cv.height=H*d; ctx.setTransform(d,0,0,d,0,0);
  const n=Math.min(650, Math.round(W*H/1700));
  grains=Array.from({length:n},(_,i)=>({x:Math.random()*W, y:Math.random()*H, safran:i%3===0}));
  if (reduce) immobile(); }
function immobile(){ // « Réduire les animations » : les grains restent posés, sans bouger
  if (!C.pr) return; ctx.clearRect(0,0,W,H); ctx.globalAlpha=.45;
  for(const q of grains){ ctx.fillStyle=q.safran?C.ac:C.pr; ctx.beginPath(); ctx.arc(q.x,q.y,1.4,0,7); ctx.fill(); }
  ctx.globalAlpha=1; }
function boucle(t){
  // On efface un peu l'image d'avant : les grains laissent une courte traînée, comme de la poudre dans l'air.
  ctx.globalCompositeOperation='destination-out'; ctx.fillStyle='rgba(0,0,0,.12)'; ctx.fillRect(0,0,W,H);
  ctx.globalCompositeOperation='source-over';
  const terre=new Path2D(), safran=new Path2D();
  for(const q of grains){
    let a=(Math.sin(q.x*.006+t*.00018)+Math.cos(q.y*.007-t*.00012))*Math.PI, v=.9;
    const dx=q.x-P.x, dy=q.y-P.y, d=Math.hypot(dx,dy);
    if (d<120){ a=Math.atan2(dy,dx)+Math.PI/2+.35; v=1.6+(120-d)/50; }   // le tourbillon
    const ox=q.x, oy=q.y; q.x+=Math.cos(a)*v; q.y+=Math.sin(a)*v;
    if (q.x<0||q.x>W||q.y<0||q.y>H){ q.x=Math.random()*W; q.y=Math.random()*H; continue; }
    const trait=q.safran?safran:terre; trait.moveTo(ox,oy); trait.lineTo(q.x,q.y);
  }
  ctx.lineWidth=2; ctx.lineCap='round';
  ctx.globalAlpha=.6; ctx.strokeStyle=C.pr; ctx.stroke(terre);
  ctx.globalAlpha=.8; ctx.strokeStyle=C.ac; ctx.stroke(safran); ctx.globalAlpha=1;
  // En pause quand l'onglet est caché ou qu'on a quitté l'accueil (la batterie dit merci).
  raf = document.hidden || !surAccueil() ? 0 : requestAnimationFrame(boucle);
}
function demarrer(){ if(!raf && !reduce && !document.hidden && surAccueil()) raf=requestAnimationFrame(boucle); }
document.addEventListener('visibilitychange', demarrer);
const suivre=e=>{ P.x=e.clientX; P.y=e.clientY; };
addEventListener('pointermove',suivre,{passive:true}); addEventListener('pointerdown',suivre,{passive:true});
const lacher=()=>{ P.x=P.y=-999; };
['pointercancel','blur'].forEach(n=>addEventListener(n,lacher));
document.addEventListener('pointerleave',lacher);
addEventListener('pointerup',e=>{ if(e.pointerType!=='mouse') lacher(); });
// Sur iPhone, la barre d'adresse qui se cache change un peu la hauteur : on ne recommence que si l'écran change vraiment.
addEventListener('resize',()=>{ if(Math.abs(innerWidth-W)>40 || Math.abs(innerHeight-H)>160) taille(); });
taille();

/* ---------- Effet 14 : dans la recherche de l'accueil, des idées de recettes s'écrivent toutes seules ---------- */
let relancerIdees = ()=>{};
function ecrireIdees(recettes){
  const champ=$('recherche'), ecran=$('idee'), txt=ecran.querySelector('.t'), invite=TEXTES.accueil.recherche;
  if (reduce) return;
  const idees=[invite, ...recettes.map(r=>r.nom).sort(()=>Math.random()-.5).slice(0,4)];
  let i=0, n=0, efface=false, tm=0, visible=true;
  const libre=()=>surAccueil() && !champ.value && document.activeElement!==champ;
  function pas(){
    clearTimeout(tm);
    if (!visible || !libre()){ ecran.hidden=true; champ.placeholder=invite; return; }
    ecran.hidden=false; champ.placeholder='';
    const mot=idees[i];
    if (!efface){ txt.textContent=mot.slice(0,++n); if(n>=mot.length){ efface=true; tm=setTimeout(pas,2000); return; } tm=setTimeout(pas,55); }
    else { txt.textContent=mot.slice(0,--n); if(n<=0){ efface=false; i=(i+1)%idees.length; tm=setTimeout(pas,350); return; } tm=setTimeout(pas,22); }
  }
  champ.addEventListener('focus',pas); champ.addEventListener('blur',pas); champ.addEventListener('input',pas);
  new IntersectionObserver(es=>{ visible=es[0].isIntersecting; pas(); }).observe(champ);
  relancerIdees = pas;
  pas();
}

/* ---------- Effet 16 : une onde safran part de l'endroit où le doigt touche la puce ---------- */
function brancherOnde(zone){
  if (reduce) return;
  zone.querySelectorAll('.puce').forEach(p=>p.addEventListener('pointerdown',e=>{
    const r=p.getBoundingClientRect(), s=Math.max(r.width,r.height)*2.2, o=document.createElement('span');
    o.className='onde'; o.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
    p.append(o); setTimeout(()=>o.remove(),650);
  }));
}

/* ---------- Effet 232 : quand on filtre, les cartes qui partent s'effacent, les autres glissent à leur nouvelle place ---------- */
// On note où chaque carte était, on refait la liste, puis chaque carte part de son ancienne place (comme des bocaux qu'on resserre sur l'étagère).
let tmGlisse=0;
function glisserCartes(boite, garder, refaire){
  clearTimeout(tmGlisse);
  if (reduce) return refaire();
  const avant={}, cartes=[...boite.querySelectorAll('[data-id]')];
  cartes.forEach(c=>avant[c.dataset.id]=c.getBoundingClientRect());
  const partent=cartes.filter(c=>!garder.has(c.dataset.id));
  function suite(){
    refaire();
    boite.querySelectorAll('[data-id]').forEach(c=>{ const a=avant[c.dataset.id], b=c.getBoundingClientRect();
      if (a) c.animate([{transform:`translate(${a.left-b.left}px,${a.top-b.top}px)`},{transform:'none'}],{duration:500,easing:'cubic-bezier(.2,.8,.2,1)'});
      else c.animate([{opacity:0,transform:'scale(.9)'},{opacity:1,transform:'none'}],{duration:350,delay:120,easing:'ease-out',fill:'backwards'}); });
  }
  if (!partent.length) return suite();
  partent.forEach(c=>c.animate([{opacity:1},{opacity:0,transform:'scale(.9)'}],{duration:250,fill:'forwards'}));
  tmGlisse=setTimeout(suite,240);
}
