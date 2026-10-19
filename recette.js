// Écran 3 : la page d'une recette (adresse #recette/<id>), avec les portions qui recalculent quantités et prix.

/* ---------- Les quantités : arrondies comme on les mesure en cuisine ---------- */
const nombre = v => v.toLocaleString('fr-FR', {maximumFractionDigits: 2});
const FRACTIONS = {0.25:'¼', 0.5:'½', 0.75:'¾'};
// Quantité de base (en g, ml ou pièces) : les cuillères et les pincées sont converties.
const enBase = l => l.quantite == null ? 0 : l.quantite * (DONNEES.conversions[l.unite] || 1);
// Renvoie [la quantité à afficher, le nom de l'ingrédient].
function quantite(l, q){
  const I = DONNEES.ingredients[l.id];
  if (l.quantite == null) return [TEXTES.recette.auGout, I.nom];
  if (l.unite === 'g' || l.unite === 'ml'){
    const v = Math.max(5, Math.round(q/5)*5), grand = v >= 1000;   // à 5 g près
    return [nombre(grand ? v/1000 : v) + ' ' + (grand ? (l.unite==='g' ? 'kg' : 'l') : l.unite), I.nom];
  }
  if (l.unite === 'pièce'){
    const v = q < 1 ? Math.max(.25, Math.round(q*4)/4) : Math.round(q);   // ¼ de chou, mais « 1,5 œuf » → 2 œufs
    return [FRACTIONS[v] || nombre(v), v > 1 ? I.nomPluriel : I.nom];
  }
  if (l.unite === 'pincée'){ const v = Math.max(1, Math.round(q)); return [`${v} ${v>1 ? 'pincées' : 'pincée'}`, I.nom]; }
  const v = Math.max(.5, Math.round(q*2)/2);   // cuillères : à la demi-cuillère près
  return [`${FRACTIONS[v] || nombre(v)} ${l.unite}`, I.nom];
}

/* ---------- Afficher une recette ---------- */
let recetteDemandee = null;
function afficherRecette(id){
  const boite = $('recette'), resume = DONNEES.recettes.find(r=>r.id===id);
  recetteDemandee = id;
  if (!resume) return recetteIntrouvable();
  document.title = `${resume.nom} · ${TEXTES.appNom}`;
  boite.innerHTML = '';
  // On ouvre seulement le fichier de sa zone (pas toutes les recettes).
  chargerZone(resume.zone).then(z=>{
    if (recetteDemandee !== id) return;   // entre-temps, on est parti ailleurs
    const r = z.recettes.find(x=>x.id===id);
    r ? dessinerRecette(r) : recetteIntrouvable();
  }).catch(()=>{
    if (recetteDemandee !== id) return;
    boite.innerHTML = `<div class="encadre" role="alert"><p>${TEXTES.erreurChargement}</p><button class="btn" type="button" id="retry-recette">${TEXTES.reessayer}</button></div>`;
    $('retry-recette').addEventListener('click', ()=>afficherRecette(id));
  });
}

function recetteIntrouvable(){
  const boite = $('recette'), R = TEXTES.recette;
  document.title = `${R.introuvable} · ${TEXTES.appNom}`;
  boite.innerHTML = `<div class="encadre" role="alert"><p>${R.introuvable}</p><button class="btn" type="button" id="retour-accueil">${R.retourAccueil}</button></div>`;
  $('retour-accueil').addEventListener('click', ()=>{ location.hash = ''; });
}

function dessinerRecette(r){
  const R = TEXTES.recette, G = TEXTES.regimes, boite = $('recette');
  const sais = r.saisons.map(s=>TEXTES.saisons[s]).join(', ');
  boite.innerHTML = `<article class="fiche">
    <header class="fiche-tete">
      <div class="plat" aria-hidden="true"><span class="emo">${emoji(r)}</span><img src="${r.image}" alt="" onerror="this.remove()"></div>
      <div class="fiche-titre">
        <a class="zone-lien" href="#zone/${slugZone(r.zone)}">${r.zone} ›</a>
        <h1>${r.nom}</h1>
        <p class="badges">
          <span class="tm">⏱ ${duree(r.tempsPreparation + r.tempsCuisson)}</span>
          <span class="tm" title="${R.difficulte}">${r.difficulte}</span>
          <span class="bdg">${r.budget}</span>
          <span class="sea">${sais}</span>
          <span class="tm">~${nombre(r.calories)} ${R.kcal}</span>
        </p>
        <div class="regimes">${regimesRespectes(r).map(([k,e])=>
          `<button class="rg" type="button" data-k="${k}" aria-expanded="false">${logoRegime(k,e)}<span>${G[k].nom}</span>${e==='adaptable' ? `<small>${G.adaptable}</small>` : ''}</button>`).join('')}</div>
        <p class="legende" id="legende" aria-live="polite" hidden></p>
      </div>
    </header>
    <div class="fiche-corps">
      <section class="panier">
        <div class="portions">
          <button type="button" id="moins" aria-label="${R.moins}">−</button>
          <output id="nb" aria-live="polite"></output>
          <button type="button" id="plus" aria-label="${R.plus}">+</button>
        </div>
        <p class="prix-total"><b id="total"></b> · <span id="ppers"></span><small>${R.prixEstime}</small></p>
        <h2>${R.ingredients}</h2>
        <ul class="ings" id="ings"></ul>
        <button class="btn principal js-aimant" type="button" data-bientot>${R.courses}</button>
      </section>
      <section class="prepa">
        <h2>${R.preparation}</h2>
        <ol class="etapes">${r.etapes.map(e=>`<li><p>${e.texte}</p>${e.duree ? `<span class="minute">⏱ ${duree(e.duree)}</span>` : ''}</li>`).join('')}</ol>
        <aside class="astuce"><b>💡 ${R.astuce}</b><p>${r.astuce}</p></aside>
        <button class="btn second" type="button" data-bientot>${R.cuisine}</button>
      </section>
    </div>
    <p class="note">${R.allergies}</p>
  </article>`;

  // Portions de 1 à 12 : quantités et prix suivent (une règle de trois, comme sur un carnet).
  let n = r.personnes;
  function recalculer(){
    const k = n / r.personnes;
    let total = 0;
    $('ings').innerHTML = r.ingredients.map(l=>{
      const I = DONNEES.ingredients[l.id], [q, nom] = quantite(l, l.quantite * k);
      total += enBase(l) * k / I.pour * I.prix;
      return `<li><b>${q}</b><span>${nom}</span></li>`;
    }).join('');
    $('nb').textContent = R.personnes(n);
    $('total').textContent = `${euros(total, .1)} ${R.total}`;
    $('ppers').textContent = prix(total / n);
    $('moins').disabled = n <= 1; $('plus').disabled = n >= 12;
  }
  $('moins').addEventListener('click', ()=>{ if (n > 1){ n--; recalculer(); } });
  $('plus').addEventListener('click', ()=>{ if (n < 12){ n++; recalculer(); } });
  recalculer();

  // Toucher un régime affiche sa légende (toucher encore la cache).
  const legende = $('legende');
  boite.querySelectorAll('.rg').forEach(b=>b.addEventListener('click', ()=>{
    const ouvert = b.getAttribute('aria-expanded') === 'true';
    boite.querySelectorAll('.rg').forEach(x=>x.setAttribute('aria-expanded','false'));
    b.setAttribute('aria-expanded', String(!ouvert));
    legende.hidden = ouvert;
    legende.textContent = ouvert ? '' : `${G[b.dataset.k].nom} : ${G[b.dataset.k].legende}`;
  }));
  brancherEffets(boite);
}
