// Écran 4 : Explorer (la carte de France et les pays). L'écran 5 (une zone) réutilise la liste, dans app.js.

// Un plat emblématique par pays (en attendant les images de la mission 15).
const PLAT_PAYS = { italie:"🍝", espagne:"🥘", maroc:"🍲", japon:"🍣", mexique:"🌮",
  inde:"🍛", liban:"🧆", grece:"🫒", thailande:"🍜", "etats-unis":"🍔" };

// Le nom d'une zone → son adresse courte (« Bretagne » → « bretagne »).
function slugZone(nom){
  return Object.keys({...TEXTES.regions, ...TEXTES.pays}).find(k=>(TEXTES.regions[k]||TEXTES.pays[k]).nom===nom);
}
const nbRecettes = nom => DONNEES.recettes.filter(r=>r.zone===nom).length;
// Le lien vers une zone, avec son nombre de recettes (ou « Bientôt »). « avant » : un dessin posé devant le nom.
const lienZone = (k, nom, avant='') => { const n = nbRecettes(nom);
  return `<a href="#zone/${k}" class="${n ? '' : 'vide'}">${avant}<b>${nom}</b><span class="nb">${n ? TEXTES.liste.compteur(n) : TEXTES.explorer.bientot}</span></a>`; };

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
      <section><h2>${E.regions}</h2><ul class="zones">${Object.entries(TEXTES.regions).map(([k,z])=>`<li>${lienZone(k, z.nom)}</li>`).join('')}</ul></section>
    </div>
    <ul class="vue-monde pays">${Object.entries(TEXTES.pays).map(([k,z])=>
      `<li>${lienZone(k, z.nom, `<span class="cachet" aria-hidden="true">${PLAT_PAYS[k]}</span>`)}</li>`).join('')}</ul>`;
  boite.querySelectorAll('[data-vue]').forEach(b=>b.addEventListener('click', ()=>{
    history.replaceState(null, '', b.dataset.vue==='monde' ? '#explorer?monde' : '#explorer'); router(); }));
  // La carte (un fichier à part) arrive par internet ; si elle manque, la liste des régions suffit.
  carteChargee = fetch('carte-france.svg?v=4').then(r=>r.ok ? r.text() : '').then(dessinerCarte).catch(()=>{});
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
  if (vue !== 'france' || reduce) return;
  carteChargee.then(()=>{
    const carte = $('carte');
    carte.querySelectorAll('.choisie').forEach(a=>a.classList.remove('choisie'));
    if (!nouvelleVisite && carte.classList.contains('trace')) return;
    carte.classList.remove('trace'); carte.classList.add('attend');
    guetteur.observe(carte);
  });
}
