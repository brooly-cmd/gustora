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
    dernieres: "Les dernières recettes ajoutées"
  },
  liste: {
    resultatsPour: q => `Résultats pour « ${q} »`,
    toutes: "Toutes les recettes",
    petitBudget: "Petit budget",
    moins30: "Moins de 30 min",
    compteur: n => n <= 1 ? `${n} recette` : `${n} recettes`,
    vide: "Aucune recette ne correspond. Essaie d'enlever un filtre.",
    enleverFiltres: "Enlever les filtres"
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
  bientot: "Cet écran arrive bientôt !",
  onglets: ["Accueil", "Explorer", "Mon frigo", "Favoris", "Courses"],
  saisons: { printemps: "Printemps", "été": "Été", automne: "Automne", hiver: "Hiver", "toute l'année": "Toute l'année" },
  parPersonne: "/ pers.",
  prixEstime: "Prix estimés en supermarché.",
  modeNuit: "Passer en mode nuit",
  modeJour: "Passer en mode jour",
  erreurChargement: "Oups, les recettes n'ont pas pu se charger. Vérifie ta connexion et réessaie.",
  reessayer: "Réessayer"
};
