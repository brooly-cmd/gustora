# Gustora — écrans et textes

## Règles du projet
- Zones : 13 régions de France (Auvergne-Rhône-Alpes, Bourgogne-Franche-Comté, Bretagne, Centre-Val de Loire,
  Corse, Grand Est, Hauts-de-France, Île-de-France, Normandie, Nouvelle-Aquitaine, Occitanie,
  Pays de la Loire, Provence-Alpes-Côte d'Azur) et 10 pays (Italie, Espagne, Maroc, Japon, Mexique,
  Inde, Liban, Grèce, Thaïlande, États-Unis).
- Objectif : 10 recettes par zone (mission 17), puis 50 par zone (mission 28).
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
- Calories : estimées par personne, toujours avec « ~ » (« ~450 kcal / pers. »), recalculées
  avec les portions et avec la version adaptée.

## Les régimes
5 régimes, chacun avec son petit logo dessiné par Claude (SVG, aux couleurs de DESIGN.md).
Jamais de copie des logos officiels (l'épi barré officiel, les logos FODMAP certifiés sont des marques déposées) :
des dessins à nous qui y ressemblent, lisibles en tout petit (16 px) et en jour / nuit.

| Régime | Logo | Légende (en bas de l'accueil) |
|---|---|---|
| Sans gluten | épi de blé barré | « Sans blé, orge, seigle ni avoine non certifiée. » |
| Sans lactose | bouteille de lait barrée | « Sans lait de vache ni produit laitier contenant du lactose. » |
| Pauvre en FODMAP | pastille « FODMAP » | « Pauvre en sucres qui fermentent dans l'intestin (ail, oignon, blé…). Indicatif. » |
| Végétarien | feuille | « Sans viande ni poisson. » |
| Vegan | feuille dans un rond | « Sans aucun produit d'origine animale. » |

- Pour sans gluten, sans lactose et pauvre en FODMAP, une recette est :
  « oui » (déjà compatible), « adaptable » (tous les ingrédients gênants ont un remplaçant) ou « non ».
- Végétarien et vegan : seulement « oui » ou « non » (pas de version adaptée).
- 3 niveaux, réglés régime par régime avec une jauge (mission 8) : « Désactivé » (on n'en tient pas compte),
  « Souple » (seuls les ingrédients évidents comptent : farine, lait, viande, sauce soja…) et
  « Strict » (les ingrédients cachés et les traces comptent aussi : beurre et fromages affinés pour le lactose,
  lardons, tortillas « de maïs » mélangées au blé, mélanges d'épices, présure des fromages, vin collé à la gélatine,
  courgette ou chou en grande quantité pour les FODMAP…). Sans réglage, les logos suivent le niveau « Souple ».
  Claude décide, ingrédient par ingrédient, ce qui est évident ou caché. Dans le doute, l'ingrédient est au moins « caché ».
- Un remplacement qui change la façon de cuisiner a une note (« La farine sans gluten colle moins : ajoute 1 œuf. »).
  Si le plat n'a plus de sens une fois adapté, la recette reste « non » pour ce régime.
- Exemples de remplaçants : mozzarella → mozzarella sans lactose ; crème → crème sans lactose ;
  spaghetti → spaghetti sans gluten ; farine de blé → mélange de farines sans gluten ;
  sauce soja → tamari ; ail → huile infusée à l'ail ; oignon → vert de poireau ou ciboulette.
- « Mes régimes » : les régimes cochés dans le filtre sont gardés sur le téléphone. Tant qu'ils sont actifs,
  les listes ne montrent que les recettes compatibles ou adaptables, et chaque recette s'ouvre dans sa version adaptée.

## La fiche recette (format des fichiers)
Chaque recette a :
- id (ex. « bretagne-crepes-froment »), nom, zone, type (Entrée / Plat / Dessert)
- personnes (4), tempsPreparation et tempsCuisson (en minutes), difficulté (Facile / Moyen / Chef)
- saisons (liste), prixParPersonne (en euros), budget (€ / €€ / €€€, calculé avec le prix)
- ingrédients : pour chacun, l'id de l'ingrédient (dans ingredients.json), la quantité et l'unité
- étapes : pour chacune, le texte, et une durée en minutes si un minuteur est utile
- astuce (une phrase), image (images/<id>.jpg)
- calories (kcal par personne, estimées)
- régimes, pour le niveau souple et pour le niveau strict : sansGluten, sansLactose, pauvreFodmap
  (« oui » / « adaptable » / « non ») ; vegetarien, vegan (oui / non)
- notesAdaptation : pour chaque régime, les notes de cuisine (souvent aucune), chacune liée à l'ingrédient remplacé
  qui la déclenche (elle s'affiche seulement si cet ingrédient est vraiment remplacé)
ingredients.json : pour chaque ingrédient : id, nom (singulier et pluriel), rayon
(Fruits et légumes, Crèmerie, Boucherie-Poissonnerie, Épicerie, Épices, Surgelés, Boissons), prix estimé par unité,
kcal par unité, contient (gluten, lactose, fodmap, viande-poisson, origine animale : oui / caché / non),
remplacants (pour sansGluten, sansLactose, pauvreFodmap : l'id de l'ingrédient qui le remplace, s'il existe).
Les remplaçants sont eux-mêmes des ingrédients de la liste (avec leur prix et leurs kcal).
recettes/index.json : le sommaire léger (id, nom, zone, type, temps total, budget, saisons, calories, régimes,
ids des ingrédients, image).

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
- Si « Mes régimes » est actif : un bandeau sous la recherche « Mes régimes : sans gluten · sans lactose ✕ »
  (le ✕ les enlève), et la carte vedette est choisie parmi les recettes compatibles ou adaptables.
- En bas de page, bloc « Les petits logos » : les 5 logos avec leur nom et leur légende (tableau « Les régimes »),
  + « Ces informations sont indicatives : en cas d'allergie, vérifie toujours les étiquettes. »

## Écran 2 — Liste des recettes
Éléments visuels : titre, puces de filtre, compteur, cartes recette.
- Titre : selon d'où on vient (« Résultats pour « crêpe » », « Petit budget », « Toutes les recettes »).
- Puces de filtre : « Saison ▾ » · « Temps ▾ » · « Budget ▾ » · « Type ▾ » · « Régime ▾ » (plusieurs à la fois).
  Une puce active montre son choix (« Hiver ✕ »), le ✕ l'enlève.
- « Régime ▾ » : les 5 régimes avec leur logo et leur jauge « Désactivé · Souple · Strict » (on peut en activer plusieurs : la recette doit les respecter TOUS),
  + la case « Garder mes régimes sur ce téléphone » (cochée par défaut).
  Avec un régime actif, les résultats sont en 2 groupes : « Déjà compatibles » puis « Adaptables »
  (sous la carte : « Version adaptée : 2 ingrédients remplacés »).
- Compteur : « 42 recettes » (« 1 recette »).
- Carte recette : image, nom, zone, « ⏱ 35 min », « ~2 € / pers. », les petits logos des régimes respectés
  (un logo « adaptable » est en contour, un logo « oui » est plein), le ♥.
- Vide : « Aucune recette ne correspond. Essaie d'enlever un filtre. » + bouton « Enlever les filtres ».
- Plus de 30 recettes : les suivantes arrivent quand on descend (pas de page qui rame).

## Écran 3 — Recette
Éléments visuels : grande image, titre, badges, sélecteur de portions, encadré prix, liste d'ingrédients,
étapes numérotées, encadré astuce, bouton principal, ♥, bouton partager.
- Image du plat (ou image de remplacement : un pictogramme de plat sur la couleur douce).
- Titre + zone touchable (« Bretagne › » ouvre l'écran 5).
- Badges : « ⏱ 35 min » · « Facile » · « € » · « Hiver, Printemps » · « ~450 kcal / pers. »
- Ligne des régimes : chaque logo avec son nom (« Sans lactose », « Végétarien »…) ; touchable → sa légende.
- Bloc « Version adaptée » (mission 12) : des interrupteurs « Sans gluten » · « Sans lactose » · « Pauvre en FODMAP »,
  seulement pour les régimes « adaptable » (plusieurs à la fois). Un régime « oui » affiche « ✓ Déjà sans gluten ».
  Un régime « non » affiche « Pas de version sans gluten pour ce plat. ».
  Si « Mes régimes » est actif, les bons interrupteurs sont déjà allumés.
- Portions : « − 4 personnes + » (de 1 à 12).
- Prix : « ~9 € au total · ~2,25 € / pers. » + petite mention « Prix estimé en supermarché. »
  Prix et calories suivent la version adaptée.
- « Ingrédients » : la liste, recalculée selon les portions. En version adaptée, un ingrédient remplacé
  s'affiche « ~~mozzarella~~ → mozzarella sans lactose » (couleur d'accent), et les notes d'adaptation
  apparaissent au-dessus des étapes : « 🔄 Version sans gluten : … ».
  Petite mention : « Un remplaçant peut changer un peu le goût ou la texture. »
- Bouton principal : « Ajouter à ma liste de courses » → message « 8 ingrédients ajoutés à ta liste ».
  Si déjà ajoutée : « Déjà dans ta liste · Mettre à jour les quantités ».
- « Préparation » : étapes numérotées.
- Astuce : « 💡 L'astuce : … »
- Bouton : « Lancer le mode cuisine »
- ♥ : « Ajoutée à tes favoris » / « Retirée de tes favoris ».
- Partager (mission 18) : ouvre le partage de l'iPhone ; sur PC : « Lien copié ! ».
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
- « Pour : Crêpes de froment (4 pers., sans gluten), Tajine de poulet (6 pers.) » — chaque recette a un ✕ pour la retirer.
- Une recette ajoutée en version adaptée met directement les remplaçants dans la liste
  (« ☐ 250 g de mozzarella sans lactose · ~3,20 € »), et le total estimé en tient compte.
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
- « Les calories et les régimes sont indicatifs. En cas d'allergie ou de régime médical, vérifie toujours les étiquettes,
  et demande conseil à un professionnel de santé. »
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
6. La personne intolérante : liste des recettes → « Régime ▾ » → coche sans gluten + sans lactose (gardés sur le téléphone)
   → « Adaptables » → lasagnes → la recette s'ouvre en version adaptée, ingrédients remplacés en couleur
   → « Ajouter à ma liste de courses » → Courses : « pâtes à lasagnes sans gluten », « mozzarella sans lactose ».
   Le lendemain, elle rouvre Gustora : le bandeau « Mes régimes : sans gluten · sans lactose ✕ » est toujours là.
