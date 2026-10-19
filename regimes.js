// Les 5 régimes : leurs petits logos (dessinés pour Gustora) et ce qu'une recette respecte.
// Logo plein = « déjà compatible » ; logo en contour = « adaptable ».
// Classes : f = la forme (pleine ou en contour), d = un détail (creusé dans la forme pleine),
// v = un trait toujours dessiné, x = le petit espace autour de la barre.
const REGIMES = ['sansGluten', 'sansLactose', 'pauvreFodmap', 'vegetarien', 'vegan'];
const BARRE = '<path class="x" d="M4.5 19.5L19.5 4.5"/><path class="v" d="M4.5 19.5L19.5 4.5"/>';
const DESSINS = {
  // un épi de blé (une tige et six grains), barré
  sansGluten: '<path class="v" d="M12 21V6"/>'
    + [7.5, 11.5, 15.5].map(y=>`<ellipse class="f" cx="9.6" cy="${y}" rx="1.7" ry="3" transform="rotate(-38 9.6 ${y})"/>`
      + `<ellipse class="f" cx="14.4" cy="${y}" rx="1.7" ry="3" transform="rotate(38 14.4 ${y})"/>`).join('')
    + '<ellipse class="f" cx="12" cy="4.2" rx="1.5" ry="2.4"/>' + BARRE,
  // une bouteille de lait avec son étiquette, barrée
  sansLactose: '<path class="f" d="M10 2.8h4v3.4l2.6 3.4V20a1.2 1.2 0 0 1-1.2 1.2H8.6A1.2 1.2 0 0 1 7.4 20V9.6L10 6.2z"/>'
    + '<path class="d" d="M7.4 13.2c1.6-1 3.2-1 4.6 0s3 1 4.6 0"/>' + BARRE,
  // une pastille avec un F et une petite flèche qui descend (« pauvre en »)
  pauvreFodmap: '<rect class="f" x="2.6" y="5" width="18.8" height="14" rx="7"/>'
    + '<path class="d" d="M8.6 15.4V8.6h4.2M8.6 12h3.2M15.8 9.4v5.2M14 12.9l1.8 1.8 1.8-1.8"/>',
  // une feuille et sa nervure
  vegetarien: '<path class="f" d="M4.6 19.4C4.6 10.4 9.6 4.6 19.4 4.6c0 9.8-5.8 14.8-14.8 14.8z"/><path class="d" d="M4.6 19.4L14 10"/>',
  // une feuille dans un rond
  vegan: '<circle class="f" cx="12" cy="12" r="9.4"/>'
    + '<path class="i" d="M7.6 16.4c0-5.6 3.2-8.8 8.8-8.8 0 5.6-3.2 8.8-8.8 8.8z"/><path class="v" d="M7.6 16.4l5.4-5.4"/>'
};
function logoRegime(cle, etat){   // etat : 'oui' (plein) ou 'adaptable' (contour)
  return `<svg class="lg ${etat==='oui'?'plein':''}" viewBox="0 0 24 24" aria-hidden="true">${DESSINS[cle]}</svg>`;
}
// Le niveau des régimes : "souple" (ingrédients évidents) ou "strict" (cachés et traces comptés aussi).
// La jauge pour le choisir arrive à la mission 8 ; d'ici là, tout le monde voit le niveau souple.
const NIVEAU_REGIMES = 'souple';
// Les régimes qu'une recette respecte déjà, puis ceux où elle est adaptable.
function regimesRespectes(r){
  const g = (r.regimes || {})[NIVEAU_REGIMES] || {};
  return [...REGIMES.filter(k=>g[k]==='oui'), ...REGIMES.filter(k=>g[k]==='adaptable')].map(k=>[k, g[k]]);
}
// La petite rangée de logos sous une carte recette.
function logosCarte(r){
  const R = TEXTES.regimes, liste = regimesRespectes(r);
  return liste.length ? `<span class="logos">${liste.map(([k,e])=>
    `<span role="img" aria-label="${R[k].nom}${e==='adaptable' ? ' (' + R.adaptable + ')' : ''}">${logoRegime(k,e)}</span>`).join('')}</span>` : '';
}
