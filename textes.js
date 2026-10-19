// Tous les textes de l'interface, rangés au même endroit (pour pouvoir traduire l'app plus tard).
const TEXTES = {
  appNom: "Gustora",
  titrePage: "Gustora · Les cuisines de France et du monde",
  accueil: {
    phrase: "Les cuisines de France et du monde, dans ta poche.",
    recherche: "Chercher une recette, un ingrédient…",
    vedette: "De saison en ce moment",
    voirRecette: "Voir la recette",
    raccourcis: ["Explorer la France", "Le tour du monde", "Dans mon frigo", "Petit budget (€)", "Moins de 30 min"],
    dernieres: "Les dernières recettes ajoutées",
    toutesSaison: s => `Toutes les recettes ${TEXTES.deSaison[s]}`
  },
  liste: {
    resultatsPour: q => `Résultats pour « ${q} »`,
    toutes: "Toutes les recettes",
    petitBudget: "Petit budget",
    moins30: "Moins de 30 min",
    saison: s => `Recettes ${TEXTES.deSaison[s]}`,
    compteur: n => n <= 1 ? `${n} recette` : `${n} recettes`,
    vide: "Aucune recette ne correspond. Essaie d'enlever un filtre.",
    enleverFiltres: "Enlever les filtres"
  },
  filtres: {
    saison: { puce: "Saison", question: "Quelle saison ?" },
    temps: { puce: "Temps", question: "Combien de temps as-tu ?",
      choix: { "15": "15 min ou moins", "30": "30 min ou moins", "60": "1 h ou moins", "plus": "Plus d'1 h" } },
    budget: { puce: "Budget", question: "Quel budget par personne ?",
      choix: { "€": "€", "€€": "€€", "€€€": "€€€" },
      aide: { "€": "Moins de ~2 € / pers.", "€€": "De ~2 à ~5 € / pers.", "€€€": "Plus de ~5 € / pers." } },
    type: { puce: "Type", question: "Quel moment du repas ?",
      choix: { "Entrée": "Entrée", "Plat": "Plat", "Dessert": "Dessert" } },
    regime: "Régime",
    regimeBientot: "Le filtre régime arrive bientôt !",
    enlever: nom => `Enlever le filtre ${nom}`,
    fermer: "Fermer"
  },
  logos: {
    titre: "Les petits logos",
    plein: "Logo plein : la recette est déjà compatible.",
    contour: "Logo en contour : elle a une version adaptée.",
    attention: "Ces informations sont indicatives : en cas d'allergie, vérifie toujours les étiquettes."
  },
  regimes: {
    adaptable: "adaptable",
    sansGluten: { nom: "Sans gluten", legende: "Sans blé, orge, seigle ni avoine non certifiée." },
    sansLactose: { nom: "Sans lactose", legende: "Sans lait de vache ni produit laitier contenant du lactose." },
    pauvreFodmap: { nom: "Pauvre en FODMAP", legende: "Pauvre en sucres qui fermentent dans l'intestin (ail, oignon, blé…). Indicatif." },
    vegetarien: { nom: "Végétarien", legende: "Sans viande ni poisson." },
    vegan: { nom: "Vegan", legende: "Sans aucun produit d'origine animale." }
  },
  recette: {
    personnes: n => n <= 1 ? `${n} personne` : `${n} personnes`,
    moins: "Une personne de moins",
    plus: "Une personne de plus",
    total: "au total",
    prixEstime: "Prix estimé en supermarché.",
    kcal: "kcal / pers.",
    difficulte: "Difficulté",
    ingredients: "Ingrédients",
    auGout: "au goût",
    preparation: "Préparation",
    astuce: "L'astuce",
    courses: "Ajouter à ma liste de courses",
    cuisine: "Lancer le mode cuisine",
    allergies: "Allergies : vérifie toujours la liste des ingrédients.",
    introuvable: "Cette recette n'existe pas (ou plus).",
    retourAccueil: "Retour à l'accueil"
  },
  explorer: {
    titre: "Explorer",
    france: "France",
    monde: "Monde",
    carte: "Carte de France : touche une région pour voir ses recettes",
    regions: "Les 13 régions",
    bientot: "Bientôt",
    videRegion: "Les recettes de cette région arrivent bientôt !",
    videPays: "Les recettes de ce pays arrivent bientôt !"
  },
  // Les 23 zones : leur nom (le même que dans les recettes) et 2 lignes sur leur cuisine.
  regions: {
    "auvergne-rhone-alpes": { nom: "Auvergne-Rhône-Alpes", intro: "Des bouchons lyonnais aux chalets de Savoie, une cuisine généreuse de montagne et de terroir. Fromages fondants, charcuteries et lentilles vertes du Puy." },
    "bourgogne-franche-comte": { nom: "Bourgogne-Franche-Comté", intro: "Le pays du bœuf mijoté au vin rouge, des escargots au beurre persillé et de la moutarde. Côté Jura, le comté et les saucisses fumées." },
    "bretagne": { nom: "Bretagne", intro: "Crêpes de froment, galettes de sarrasin et beurre demi-sel : la cuisine bretonne sent la mer et le blé noir. Huîtres, homard et far pour finir." },
    "centre-val-de-loire": { nom: "Centre-Val de Loire", intro: "Le jardin de la France, entre châteaux et rivières : rillettes de Tours, fromages de chèvre et gibier de Sologne. Et la tarte Tatin, née ici par accident." },
    "corse": { nom: "Corse", intro: "L'île de beauté cuisine le maquis : brocciu frais, charcuterie de montagne, châtaignes et herbes sauvages. Une cuisine de berger, simple et parfumée." },
    "grand-est": { nom: "Grand Est", intro: "De l'Alsace à la Lorraine : tarte flambée, choucroute garnie et quiche lorraine. Les fêtes y sentent la cannelle et le pain d'épices." },
    "hauts-de-france": { nom: "Hauts-de-France", intro: "Une cuisine du Nord qui réchauffe : carbonade à la bière, welsh fondant et moules-frites. Le maroilles et la chicorée ne sont jamais loin." },
    "ile-de-france": { nom: "Île-de-France", intro: "Paris et ses alentours : le pays du bistrot, de la soupe à l'oignon et du croque-monsieur. Le brie de Meaux et le Paris-Brest y sont nés." },
    "normandie": { nom: "Normandie", intro: "Crème, beurre et pommes : la Normandie cuisine avec ce que donnent ses vaches et ses vergers. Camembert, cidre et poissons de la Manche." },
    "nouvelle-aquitaine": { nom: "Nouvelle-Aquitaine", intro: "Du Pays basque au Périgord : piment d'Espelette, confit de canard et cannelés de Bordeaux. Une cuisine du sud-ouest qui prend son temps." },
    "occitanie": { nom: "Occitanie", intro: "Le cassoulet de Castelnaudary, l'aligot de l'Aubrac et le roquefort : une cuisine qui tient au corps. Côté Méditerranée, tielles et huîtres de Bouzigues." },
    "pays-de-la-loire": { nom: "Pays de la Loire", intro: "Beurre blanc nantais, rillettes du Mans et sel de Guérande. Une cuisine douce de fleuve et d'océan, avec la brioche vendéenne au goûter." },
    "provence-alpes-cote-d-azur": { nom: "Provence-Alpes-Côte d'Azur", intro: "Huile d'olive, tomates gorgées de soleil et herbes de Provence. Ratatouille, bouillabaisse et pissaladière, à l'heure de l'apéritif." }
  },
  pays: {
    "italie": { nom: "Italie", intro: "Des pâtes de Rome aux pizzas de Naples, une cuisine de produits simples et parfaits. Huile d'olive, parmesan et basilic suffisent souvent." },
    "espagne": { nom: "Espagne", intro: "Paella de Valence, tortilla et tapas à partager : l'Espagne cuisine pour la tablée. Safran, paprika fumé et jambon séché." },
    "maroc": { nom: "Maroc", intro: "Tajines mijotés, couscous du vendredi et pâtisseries au miel. Le cumin, la cannelle et le citron confit parfument tout." },
    "japon": { nom: "Japon", intro: "Une cuisine de précision et de saison : gyozas, ramen, sushis et bouillons dashi. Le goût umami, venu de la sauce soja et des algues." },
    "mexique": { nom: "Mexique", intro: "Tacos, guacamole et sauces au piment : le Mexique cuisine le maïs sous toutes ses formes. Coriandre et citron vert pour réveiller chaque bouchée." },
    "inde": { nom: "Inde", intro: "Dal, currys et pains naan : une cuisine d'épices grillées et de légumineuses. Chaque région a ses mélanges, du doux au très piquant." },
    "liban": { nom: "Liban", intro: "Houmous, taboulé et falafels : le Liban se mange en mezze, beaucoup de petits plats au centre de la table. Persil, citron et sésame." },
    "grece": { nom: "Grèce", intro: "Moussaka, salade grecque et brochettes souvlaki : une cuisine de soleil et d'huile d'olive. Feta, origan et yaourt épais." },
    "thailande": { nom: "Thaïlande", intro: "Le pad thaï et les currys au lait de coco jouent l'équilibre : sucré, salé, acide et piquant. Citronnelle, basilic thaï et citron vert." },
    "etats-unis": { nom: "États-Unis", intro: "Burgers, barbecue fumé et pancakes : la cuisine américaine mélange les cuisines du monde entier. Et des cookies pour finir." }
  },
  bientot: "Cet écran arrive bientôt !",
  onglets: ["Accueil", "Explorer", "Mon frigo", "Favoris", "Courses"],
  saisons: { printemps: "Printemps", "été": "Été", automne: "Automne", hiver: "Hiver", "toute l'année": "Toute l'année" },
  deSaison: { printemps: "de printemps", "été": "d'été", automne: "d'automne", hiver: "d'hiver", "toute l'année": "de toute l'année" },
  parPersonne: "/ pers.",
  prixEstime: "Prix estimés en supermarché.",
  modeNuit: "Passer en mode nuit",
  modeJour: "Passer en mode jour",
  erreurChargement: "Oups, les recettes n'ont pas pu se charger. Vérifie ta connexion et réessaie.",
  reessayer: "Réessayer"
};
