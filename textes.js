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
