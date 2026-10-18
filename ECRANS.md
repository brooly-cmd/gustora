# Gustora — écrans et textes

## Règles du projet
- Zones : 13 régions de France (Auvergne-Rhône-Alpes, Bourgogne-Franche-Comté, Bretagne, Centre-Val de Loire,
  Corse, Grand Est, Hauts-de-France, Île-de-France, Normandie, Nouvelle-Aquitaine, Occitanie,
  Pays de la Loire, Provence-Alpes-Côte d'Azur) et 10 pays (Italie, Espagne, Maroc, Japon, Mexique,
  Inde, Liban, Grèce, Thaïlande, États-Unis).
- Objectif : 10 recettes par zone (mission 16), puis 50 par zone (mission 27).
- Une recette est prévue pour 4 personnes par défaut. On peut choisir de 1 à 12 personnes :
  quantités et prix sont recalculés (arrondis : « 1,5 œuf » → « 2 œufs », grammes à 5 g près).
- Budget par personne : € = moins de 2 € ; €€ = de 2 à 5 € ; €€€ = plus de 5 €. Prix toujours avec « ~ ».
- Temps (préparation + cuisson) : « 15 min ou moins », « 30 min ou moins », « 1 h ou moins », « Plus d'1 h ».
- Saisons : printemps, été, automne, hiver, ou « toute l'année ». Une recette est « de saison » si ses
  légumes et fruits principaux sont de saison en France à ce moment-là.
  « De saison en ce moment » suit la date du jour (printemps = mars-mai, été = juin-août,
  automne = septembre-novembre, hiver = décembre-février).
- Dans mon frigo : sel, poivre, huile et eau sont comptés comme toujours là.
- Tout ce que le visiteur garde (favoris, liste de courses, portions choisies) reste sur SON téléphone.
  Rien n'est envoyé ailleurs.
- « Réduire les animations » activé sur l'iPhone : pas d'animation décorative.
- Jour / nuit : suit le réglage du téléphone, avec un interrupteur dans l'en-tête.

## La fiche recette (format des fichiers)
Chaque recette a :
- id (ex. « bretagne-crepes-froment »), nom, zone, type (Entrée / Plat / Dessert)
- personnes (4), tempsPreparation et tempsCuisson (en minutes), difficulté (Facile / Moyen / Chef)
- saisons (liste), prixParPersonne (en euros), budget (€ / €€ / €€€, calculé avec le prix)
- ingrédients : pour chacun, l'id de l'ingrédient (dans ingredients.json), la quantité et l'unité
- étapes : pour chacune, le texte, et une durée en minutes si un minuteur est utile
- astuce (une phrase), image (images/<id>.jpg)
ingredients.json : pour chaque ingrédient : id, nom (singulier et pluriel), rayon
(Fruits et légumes, Crèmerie, Boucherie-Poissonnerie, Épicerie, Épices, Surgelés, Boissons), prix estimé par unité.
recettes/index.json : le sommaire léger (id, nom, zone, type, temps total, budget, saisons, ids des ingrédients, image).

## Partout : la barre d'onglets (en bas)
Accueil · Explorer · Mon frigo · Favoris · Courses
(Courses affiche une pastille avec le nombre d'articles non cochés.)

## Écran 1 — Accueil
Éléments visuels : fond de l'accueil, en-tête (logo + « Gustora » + interrupteur jour/nuit),
barre de recherche, carte vedette « De saison en ce moment », raccourcis, cartes recette, barre d'onglets.
- En-tête : logo + « Gustora »
- Phrase d'accueil : « Les cuisines de France et du monde, dans ta poche. »
- Recherche : « Chercher une recette, un ingrédient… » → ouvre l'écran 2 avec les résultats.
- Carte vedette : « De saison en ce moment · Automne » + une recette tirée parmi celles de la saison
  (change chaque jour) + bouton « Voir la recette ».
- Raccourcis : « Explorer la France » · « Le tour du monde » · « Dans mon frigo » · « Petit budget (€) » · « Moins de 30 min »
- Bloc « Les dernières recettes ajoutées » : 6 cartes recette.

## Écran 2 — Liste des recettes
Éléments visuels : titre, puces de filtre, compteur, cartes recette.
- Titre : selon d'où on vient (« Résultats pour « crêpe » », « Petit budget », « Toutes les recettes »).
- Puces de filtre : « Saison ▾ » · « Temps ▾ » · « Budget ▾ » · « Type ▾ » (plusieurs à la fois).
  Une puce active montre son choix (« Hiver ✕ »), le ✕ l'enlève.
- Compteur : « 42 recettes » (« 1 recette »).
- Carte recette : image, nom, zone, « ⏱ 35 min », « ~2 € / pers. », le ♥.
- Vide : « Aucune recette ne correspond. Essaie d'enlever un filtre. » + bouton « Enlever les filtres ».
- Plus de 30 recettes : les suivantes arrivent quand on descend (pas de page qui rame).

## Écran 3 — Recette
Éléments visuels : grande image, titre, badges, sélecteur de portions, encadré prix, liste d'ingrédients,
étapes numérotées, encadré astuce, bouton principal, ♥, bouton partager.
- Image du plat (ou image de remplacement : un pictogramme de plat sur la couleur douce).
- Titre + zone touchable (« Bretagne › » ouvre l'écran 5).
- Badges : « ⏱ 35 min » · « Facile » · « € » · « Hiver, Printemps »
- Portions : « − 4 personnes + » (de 1 à 12).
- Prix : « ~9 € au total · ~2,25 € / pers. » + petite mention « Prix estimé en supermarché. »
- « Ingrédients » : la liste, recalculée selon les portions.
- Bouton principal : « Ajouter à ma liste de courses » → message « 8 ingrédients ajoutés à ta liste ».
  Si déjà ajoutée : « Déjà dans ta liste · Mettre à jour les quantités ».
- « Préparation » : étapes numérotées.
- Astuce : « 💡 L'astuce : … »
- Bouton : « Lancer le mode cuisine »
- ♥ : « Ajoutée à tes favoris » / « Retirée de tes favoris ».
- Partager (mission 17) : ouvre le partage de l'iPhone ; sur PC : « Lien copié ! ».
- Avertissement en bas : « Allergies : vérifie toujours la liste des ingrédients. »
- Recette introuvable (lien cassé) : « Cette recette n'existe pas (ou plus). » + bouton « Retour à l'accueil ».

## Écran 4 — Explorer
Éléments visuels : onglets France / Monde, carte de France, grille des pays.
- Onglets : « France » · « Monde »
- France : carte de France avec les 13 régions touchables, et la liste des régions en dessous
  (« Bretagne · 10 recettes »). Une région sans recette est grisée : « Bientôt ».
- Monde : 10 cartes pays (nom + un plat emblématique dessiné ou son image), « Italie · 10 recettes ».

## Écran 5 — Une zone (région ou pays)
- Titre : « Bretagne » + 2 lignes d'intro sur sa cuisine (écrites par Claude).
- Puces de filtre et cartes recette, comme l'écran 2.
- Zone vide : « Les recettes de cette région arrivent bientôt ! » (« de ce pays » pour un pays).

## Écran 6 — Dans mon frigo
Éléments visuels : titre, champ d'ajout, étiquettes d'ingrédients, groupes de résultats.
- Titre : « Qu'est-ce que tu as dans ton frigo ? »
- Champ : « Ajouter un ingrédient… » avec suggestions pendant qu'on tape.
- Ingrédients choisis en étiquettes « Œufs ✕ ». Bouton « Tout effacer ».
- Note : « Sel, poivre, huile et eau : on compte que tu en as. »
- Moins de 2 ingrédients : « Ajoute au moins 2 ingrédients pour voir des idées. »
- Résultats : « Tu peux cuisiner » · « Il te manque 1 ingrédient » · « Il te manque 2 ingrédients »
  (sous chaque carte : « Manque : crème »).
- Aucun résultat : « Rien ne colle encore… Ajoute un ou deux ingrédients de plus. »
- Les ingrédients choisis restent gardés sur le téléphone.

## Écran 7 — Mes favoris
- Titre : « Mes favoris » + compteur.
- Cartes recette (le ♥ plein).
- Vide : « Pas encore de favoris. Touche ♥ sur une recette pour la garder ici. » + bouton « Découvrir des recettes ».
- Favori dont la recette n'existe plus : retiré tout seul, sans message.

## Écran 8 — Ma liste de courses
Éléments visuels : titre, encadré total, rayons, lignes à cocher, recettes concernées.
- Titre : « Ma liste de courses »
- Encadré : « Total estimé : ~23 € » (seulement les articles non cochés).
- Groupes par rayon (« Fruits et légumes », « Crèmerie »…), lignes à cocher : « ☐ 6 œufs · ~1,80 € ».
  Un même ingrédient de 2 recettes = une seule ligne additionnée.
- « Pour : Crêpes de froment (4 pers.), Tajine de poulet (6 pers.) » — chaque recette a un ✕ pour la retirer.
- Boutons : « Retirer les articles cochés » · « Vider la liste »
  → confirmation « Vider toute la liste ? » · « Oui, vider » · « Annuler »
- Vide : « Ta liste est vide. Sur une recette, touche « Ajouter à ma liste de courses ». » + bouton « Trouver une recette ».

## Écran 9 — Mode cuisine (plein écran)
Éléments visuels : barre de progression, texte de l'étape en grand, minuteur, boutons.
- En haut : « Étape 2 sur 6 » + « ✕ Quitter »
- Le texte de l'étape en très grand.
- Si l'étape a une durée : bouton « Lancer le minuteur · 10 min » → décompte « 09:59 », boutons « Pause » / « Arrêter ».
  À la fin : une sonnerie + « C'est prêt ! ».
- Boutons : « ‹ Précédent » · « Suivant › »
- Dernière étape : « Bon appétit ! 🎉 » + bouton « Terminer ».
- L'écran reste allumé pendant le mode cuisine (si le téléphone ne le permet pas : rien ne casse).

## Écran 10 — À propos
- « Gustora, c'est un carnet de cuisine gratuit, sans compte et sans publicité. »
- « Les recettes sont écrites par Gustora, inspirées des versions les plus appréciées de chaque plat. »
- « Les images des plats sont des illustrations créées par intelligence artificielle. »
- « Les prix sont des estimations en supermarché : ils changent selon le magasin et la saison. »
- « Tes favoris et ta liste de courses restent sur ton téléphone. Rien n'est envoyé ailleurs. »
- « Installer Gustora sur ton iPhone : touche Partager, puis « Sur l'écran d'accueil ». »

## Erreurs
- Les recettes ne se chargent pas : « Oups, les recettes n'ont pas pu se charger. Vérifie ta connexion et réessaie. » + « Réessayer ».
- Image qui ne se charge pas : image de remplacement, sans message.
- Stockage du navigateur indisponible (navigation privée) : l'app marche, avec un bandeau
  « Mode privé : tes favoris et ta liste ne seront pas gardés. »

## Parcours
1. Le curieux (lien reçu par SMS) : ouvre le lien → écran 3, la bonne recette → ♥ → touche Accueil → découvre le reste.
2. Le cuisinier du soir : Mon frigo → ajoute « poulet, riz, oignon » → « Tu peux cuisiner » → recette → Mode cuisine → minuteur → « Bon appétit ! ».
3. Celui qui prépare sa semaine : Accueil → « Petit budget (€) » → filtre « Hiver » → ajoute 3 recettes à ses courses
   (en changeant les portions) → Courses → total estimé → au supermarché, coche au fur et à mesure → « Retirer les articles cochés ».
4. Le voyageur : Explorer → Monde → Japon → une recette → zone « Japon › » → une autre recette.
5. Celui qui revient : rouvre Gustora depuis l'icône de l'iPhone → ses favoris, sa liste et son frigo sont toujours là.
