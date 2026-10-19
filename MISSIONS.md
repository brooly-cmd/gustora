# Gustora — mes missions

Coche chaque case quand la mission est réussie.

### Préparer

- [x] 1. La fiche recette type et 10 premières recettes — CONSTRUIT
  - **Quoi :** créer le format des recettes (voir ECRANS.md, « La fiche recette »), la liste des
    ingrédients (ingredients.json, avec rayon et prix estimé) et 10 recettes : 5 de France
    (Bretagne, Alsace, Provence, Lyon/Auvergne-Rhône-Alpes, Nouvelle-Aquitaine) et 5 du monde
    (Italie, Maroc, Japon, Mexique, Inde). Chaque plat s'inspire des versions les mieux notées sur internet.
    Plus le sommaire recettes/index.json.
  - **Pourquoi :** c'est le moule à gâteau : toutes les futures recettes auront la même forme,
    donc les filtres (saison, temps, budget, frigo) marcheront pour toutes.
  - **C'est réussi quand :** Claude me montre une recette en clair dans le chat, et je vérifie qu'elle a
    bien : prix par personne, saison, temps, ingrédients avec quantités, étapes. Elle me donne envie.
  - **Produit pour la suite :** recettes/, ingredients.json, recettes/index.json.

- [x] 2. Le look : couleurs, logo et effets — MONTRE
  - **Quoi :** une page choix-design.html où je choisis UNE palette, UN logo et mes effets « J'aime ».
    Ça crée DESIGN.md, logo.svg et l'icône iPhone. (Prompt dans kit-gustora.md, partie 3.)
  - **Pourquoi :** comme un essayage chez le tailleur : je montre du doigt, Claude coud.
  - **C'est réussi quand :** j'ai collé mon choix et DESIGN.md existe dans le dossier.
  - **Produit pour la suite :** DESIGN.md, logo.svg, l'icône.

- [x] 3. La maquette de l'accueil — MONTRE
  - **Quoi :** l'écran d'accueil (ECRANS.md, écran 1) dessiné dans maquette.html avec mes couleurs,
    mon logo et mes effets déjà posés, et les vraies recettes de la mission 1. Rien n'est encore cliquable.
  - **Pourquoi :** comme le plan d'une maison avant de poser les briques : on change facilement.
  - **C'est réussi quand :** j'ouvre maquette.html sur PC et en taille iPhone, et le look me plaît.
  - **Produit pour la suite :** maquette.html validée.

### La base

- [x] 4. L'accueil et la liste des recettes — CONSTRUIT
  - **Quoi :** index.html (écran 1) + l'écran 2 « Liste des recettes », qui lit les vraies recettes,
    + la barre d'onglets en bas, + textes.js. La recherche par nom marche.
  - **Pourquoi :** c'est la plus petite version utile : on voit les recettes et on les cherche.
  - **C'est réussi quand :** je tape « crêpe » dans la recherche et la recette bretonne apparaît.
  - **Produit pour la suite :** index.html, style.css, recettes.js (le chargement des recettes), textes.js.

- [x] 5. La mise en ligne — EXÉCUTE
  - **Quoi :** mettre Gustora sur GitHub Pages (dépôt « gustora », compte brooly-cmd).
  - **Pourquoi :** c'est comme ouvrir le restaurant au public : l'app a une adresse que tout le monde peut ouvrir.
  - **C'est réussi quand :** j'ouvre https://brooly-cmd.github.io/gustora/ sur mon iPhone et je vois les 10 recettes.
  - **Produit pour la suite :** le lien en ligne (les missions suivantes le mettent à jour).

- [x] 6. La page d'une recette, les calories et les régimes — CONSTRUIT
  - **Quoi :** d'abord les données : ajouter aux 10 recettes et à ingredients.json les calories, les régimes,
    ce que contient chaque ingrédient et ses remplaçants (voir ECRANS.md, « Les régimes » et « La fiche recette »).
    Puis dessiner les 5 petits logos de régime.
    Puis l'écran 3 : image (ou image de remplacement), badges avec les calories, ligne des régimes avec leurs logos,
    portions − / +, prix estimé, ingrédients, étapes, astuce. Chaque recette a sa propre adresse (lien direct).
    Enfin, les petits logos sur les cartes recette et le bloc « Les petits logos » en bas de l'accueil.
    (Le bloc « Version adaptée » attend la mission 13.)
  - **Pourquoi :** c'est la fiche qu'on lit en cuisinant ; le lien direct servira au partage. Les logos, c'est
    comme les pictogrammes sur un emballage : on comprend d'un coup d'œil.
  - **C'est réussi quand :** je passe le couscous de 4 à 8 personnes : les quantités et le prix doublent ;
    les crêpes affichent leurs calories et le logo « Végétarien » ; en bas de l'accueil, je lis la légende des 5 logos.
  - **Produit pour la suite :** recette.js, les logos de régime, les données de régimes et de remplaçants.

### Chercher

- [x] 7. Explorer par région et par pays — CONSTRUIT
  - **Quoi :** l'écran 4 (carte de France avec les 13 régions + les 10 pays) et l'écran 5 (une zone).
    Une zone sans recette affiche « Les recettes de cette région arrivent bientôt ! ».
  - **Pourquoi :** c'est le cœur du voyage : on se promène sur une carte comme dans un guide.
  - **C'est réussi quand :** je touche la Bretagne sur la carte (sur iPhone) et je vois ses recettes.
  - **Produit pour la suite :** explorer.js, carte-france.svg.

- [x] 8. Les filtres saison, temps et budget — CONSTRUIT
  - **Quoi :** les puces de filtre de l'écran 2 (Saison, Temps, Budget, Type), qui se combinent,
    + le bloc « De saison en ce moment » de l'accueil, qui suit la date du jour.
    Prévoir la place de la puce « Régime ▾ » (elle arrive à la mission 9).
  - **Pourquoi :** comme les rayons d'une bibliothèque : on trouve vite ce qu'on cherche.
  - **C'est réussi quand :** je choisis « € » + « 30 min ou moins » et je ne vois que des recettes pas chères et rapides.
  - **Produit pour la suite :** filtres.js.

- [ ] 9. Le filtre régime et « Mes régimes » — CONSTRUIT
  - **Quoi :** la puce « Régime ▾ » de l'écran 2 : 5 cases à cocher avec leur logo (plusieurs à la fois),
    l'interrupteur « Mode strict (allergie, maladie cœliaque) », résultats en 2 groupes « Déjà compatibles » / « Adaptables »,
    et « Mes régimes » gardés sur le téléphone, avec le bandeau de l'accueil (voir ECRANS.md, « Les régimes »).
  - **Pourquoi :** quelqu'un qui ne mange jamais de gluten règle ça une fois, et l'app s'en souvient,
    comme un serveur qui connaît déjà tes allergies quand tu reviens au restaurant.
  - **C'est réussi quand :** je coche sans gluten + sans lactose : je ne vois que des recettes compatibles ou adaptables ;
    j'allume « Mode strict » : la liste rétrécit ; je ferme Safari, je reviens : le bandeau « Mes régimes » est toujours là.
  - **Produit pour la suite :** stockage.js (le carnet du téléphone, réutilisé ensuite).

- [ ] 10. Dans mon frigo — CONSTRUIT
  - **Quoi :** l'écran 6 : je coche mes ingrédients, l'app classe les recettes : « Tu peux cuisiner »,
    « Il te manque 1 ingrédient », « Il te manque 2 ingrédients ». Si « Mes régimes » est actif, il est respecté.
  - **Pourquoi :** c'est le chef qui ouvre ton frigo et te dit quoi faire avec.
  - **C'est réussi quand :** je mets « œufs, farine, lait » et les crêpes sont dans « Tu peux cuisiner ».
  - **Produit pour la suite :** frigo.js.

### Mon carnet

- [ ] 11. Les favoris — CONSTRUIT
  - **Quoi :** le ♥ sur chaque recette + l'écran 7 « Mes favoris », gardés dans le navigateur.
  - **Pourquoi :** le stockage du navigateur, c'est comme un carnet rangé dans l'iPhone :
    on le retrouve en revenant, même après avoir fermé Safari.
  - **C'est réussi quand :** je mets 2 favoris, je ferme Safari, je reviens : ils sont toujours là.
  - **Produit pour la suite :** les favoris dans stockage.js.

- [ ] 12. La liste de courses — CONSTRUIT
  - **Quoi :** le bouton « Ajouter à ma liste de courses » + l'écran 8 : ingrédients regroupés
    par rayon, additionnés entre recettes, à cocher, avec le total estimé.
  - **Pourquoi :** fini la liste sur un bout de papier : l'app additionne pour toi.
  - **C'est réussi quand :** j'ajoute 2 recettes qui ont des œufs : les œufs sont additionnés en une seule ligne,
    et le total estimé s'affiche.
  - **Produit pour la suite :** courses.js.

- [ ] 13. Les versions adaptées — CONSTRUIT
  - **Quoi :** le bloc « Version adaptée » de l'écran 3 : interrupteurs Sans gluten / Sans lactose / Pauvre en FODMAP
    (plusieurs à la fois), ingrédients remplacés en couleur, notes d'adaptation, prix et calories recalculés,
    ouverture directe dans la version adaptée si « Mes régimes » est actif, et la liste de courses qui reçoit les remplaçants.
  - **Pourquoi :** une personne intolérante peut cuisiner le plat qu'elle veut, pas seulement ceux qui sont déjà « sans ».
    C'est comme un tailleur qui retouche un costume au lieu d'en chercher un autre.
  - **C'est réussi quand :** sur une recette avec du fromage, j'allume « Sans lactose » : le fromage devient sa version
    sans lactose et le prix change ; je l'ajoute aux courses : la liste contient bien le remplaçant.
  - **Produit pour la suite :** adaptation.js.

- [ ] 14. Le mode cuisine — CONSTRUIT
  - **Quoi :** l'écran 9 : une étape à la fois en grand, l'écran reste allumé, et un minuteur quand l'étape a une durée.
    Il suit la version adaptée choisie.
  - **Pourquoi :** les mains pleines de farine, on veut juste lire en grand et toucher « Suivant ».
  - **C'est réussi quand :** sur iPhone, je lance un minuteur d'1 minute : il sonne à la fin, et l'écran ne s'est pas éteint.
  - **Produit pour la suite :** cuisine.js.

### Remplir le carnet (10 recettes par région et par pays)

- [ ] 15. Les images des plats — EXÉCUTE
  - **Quoi :** créer avec Pollinations une image IA pour chacune des 10 recettes, la ranger dans images/,
    et écrire la méthode dans IMAGES.md (pour la refaire à chaque remplissage).
    Si Pollinations ne marche pas : le dire, et garder l'image de remplacement.
  - **Pourquoi :** une image vaut mille mots : on a envie de cuisiner ce qu'on voit.
  - **C'est réussi quand :** sur mon iPhone, chaque recette a une jolie image, et la page reste rapide.
  - **Produit pour la suite :** images/, IMAGES.md (la méthode).

- [ ] 16. Remplir (1/3) : environ 75 recettes et leurs images — CONSTRUIT
- [ ] 17. Remplir (2/3) : environ 75 recettes et leurs images — CONSTRUIT
- [ ] 18. Remplir (3/3) : environ 70 recettes et leurs images — CONSTRUIT
  - **Quoi (pour les 3) :** ajouter des recettes jusqu'à 10 par région et 10 par pays (230 en tout),
    en commençant par les zones les moins remplies. Les plats les plus connus de chaque zone d'abord.
    Chaque recette s'inspire des versions les mieux notées sur internet, écrite avec mes mots.
    Avec ses calories, ses régimes, ses notes d'adaptation, les remplaçants des nouveaux ingrédients, et son image.
  - **Pourquoi :** comme remplir les étagères d'une épicerie qui vient d'ouvrir.
  - **C'est réussi quand :** sur l'écran Explorer, chaque zone remplie affiche le bon nombre de recettes,
    et 3 recettes prises au hasard ont tout (image, prix, calories, régimes, saison, étapes).
  - **Produit pour la suite :** un carnet plus gros (à la mission 18 : 230 recettes).

### Ouvrir au public

- [ ] 19. Partager, installer sur l'iPhone et « À propos » — CONSTRUIT
  - **Quoi :** le bouton « Partager » d'une recette, l'installation sur l'écran d'accueil iPhone
    (icône, nom, plein écran) et l'écran 10 « À propos ».
  - **Pourquoi :** l'app devient publique : il faut pouvoir l'envoyer et dire honnêtement d'où viennent les recettes.
  - **C'est réussi quand :** j'envoie une recette par SMS à moi-même : le lien ouvre directement la bonne recette ;
    et Gustora s'ajoute à mon écran d'accueil avec son icône.
  - **Produit pour la suite :** manifest.webmanifest, l'app complète.

- [ ] 20. Un vrai test avec quelqu'un d'autre — EXÉCUTE
  - **Quoi :** une personne essaie Gustora sur son téléphone sans aide : trouver une recette d'hiver,
    l'ajouter à ses courses, utiliser « Dans mon frigo », puis ouvrir une recette en version sans lactose.
    Je note ce qui la bloque, Claude corrige les 3 plus gros soucis.
  - **Pourquoi :** le cuisinier ne goûte jamais son plat comme un client : un regard neuf voit ce qu'on ne voit plus.
  - **C'est réussi quand :** la personne a réussi les 4 tâches seule.
  - **Produit pour la suite :** Gustora 1.0 🎉

### Le grand remplissage (jusqu'à 50 recettes par région et par pays)

Pour ces 9 missions : environ 100 recettes de plus (et leurs images) à chaque fois, zones les moins remplies d'abord,
même méthode que les missions 16 à 18 (calories, régimes et remplaçants compris). À la fin : environ 1 150 recettes.
C'est réussi quand : sur Explorer, les zones ont toutes grossi, et 3 recettes au hasard sont complètes.

- [ ] 21. Grand remplissage (1/9) — CONSTRUIT
- [ ] 22. Grand remplissage (2/9) — CONSTRUIT
- [ ] 23. Grand remplissage (3/9) — CONSTRUIT
- [ ] 24. Grand remplissage (4/9) — CONSTRUIT
- [ ] 25. Grand remplissage (5/9) — CONSTRUIT
- [ ] 26. Grand remplissage (6/9) — CONSTRUIT
- [ ] 27. Grand remplissage (7/9) — CONSTRUIT
- [ ] 28. Grand remplissage (8/9) — CONSTRUIT
- [ ] 29. Grand remplissage (9/9) — CONSTRUIT

## Plus tard (seulement si je le demande)
- Plusieurs langues (anglais, espagnol…) : les textes sont déjà rangés dans textes.js pour ça.
- Plus de pays, et l'Outre-mer.
- Remplacer une image IA par ma vraie photo du plat.
- Versions adaptées végétarienne et vegan (remplacer la viande par du tofu, etc.).
- Le menu de la semaine.
- Marcher sans internet (hors ligne).

## Boîte à outils et bilan de fin de projet
Des outils rangés en chemin. Ils sont facultatifs : une mission peut s'en servir si ça l'aide, rien ne l'y oblige.
À la fin du projet, on relit cette liste pour décider ce qu'on garde, et ce qui peut servir à d'autres projets
(comme vider sa caisse à outils après un chantier : ce qui a servi va dans la boîte du prochain).

| Outil | Où | À quoi il sert | Pour d'autres projets ? (à décider à la fin) |
|---|---|---|---|
| Le calculateur des fiches (mission 6) | outils/calculer.py | Recalcule prix, budget, calories, régimes et le sommaire à partir de ingredients.json ; signale les ingrédients inconnus et les recettes en double. Lancer : `python outils/calculer.py` | Idée réutilisable : « des données bien rangées → un programme calcule le reste » |
| Les logos des régimes (mission 6) | regimes.js | 5 petits dessins SVG, plein = compatible, contour = adaptable | Le principe plein / contour peut servir ailleurs |
| Les effets du site (missions 3 à 8) | effets.js, explorer.js, filtres.js | Effets 78, 3, 2, 8, 14, 42, 6, 36 (la carte qui se dessine), 152 (les herbes qui poussent), 66 (les pays en tuiles bento), et pour les filtres 16 (onde au toucher), 46 (coche qui se dessine) et 232 (cartes qui glissent à leur place), réglés pour l'iPhone | Déjà rangés dans ..\00-Atelier |

Bilan final (à remplir après la dernière mission) : ce qui a bien marché, ce qui était de trop, ce que je garde pour le prochain projet.
