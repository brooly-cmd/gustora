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

- [ ] 2. Le look : couleurs, logo et effets — MONTRE
  - **Quoi :** une page choix-design.html où je choisis UNE palette, UN logo et mes effets « J'aime ».
    Ça crée DESIGN.md, logo.svg et l'icône iPhone. (Prompt dans kit-gustora.md, partie 3.)
  - **Pourquoi :** comme un essayage chez le tailleur : je montre du doigt, Claude coud.
  - **C'est réussi quand :** j'ai collé mon choix et DESIGN.md existe dans le dossier.
  - **Produit pour la suite :** DESIGN.md, logo.svg, l'icône.

- [ ] 3. La maquette de l'accueil — MONTRE
  - **Quoi :** l'écran d'accueil (ECRANS.md, écran 1) dessiné dans maquette.html avec mes couleurs,
    mon logo et mes effets déjà posés, et les vraies recettes de la mission 1. Rien n'est encore cliquable.
  - **Pourquoi :** comme le plan d'une maison avant de poser les briques : on change facilement.
  - **C'est réussi quand :** j'ouvre maquette.html sur PC et en taille iPhone, et le look me plaît.
  - **Produit pour la suite :** maquette.html validée.

### La base

- [ ] 4. L'accueil et la liste des recettes — CONSTRUIT
  - **Quoi :** index.html (écran 1) + l'écran 2 « Liste des recettes », qui lit les vraies recettes,
    + la barre d'onglets en bas, + textes.js. La recherche par nom marche.
  - **Pourquoi :** c'est la plus petite version utile : on voit les recettes et on les cherche.
  - **C'est réussi quand :** je tape « crêpe » dans la recherche et la recette bretonne apparaît.
  - **Produit pour la suite :** index.html, style.css, recettes.js (le chargement des recettes), textes.js.

- [ ] 5. La mise en ligne — EXÉCUTE
  - **Quoi :** mettre Gustora sur GitHub Pages (dépôt « gustora », compte brooly-cmd).
  - **Pourquoi :** c'est comme ouvrir le restaurant au public : l'app a une adresse que tout le monde peut ouvrir.
  - **C'est réussi quand :** j'ouvre https://brooly-cmd.github.io/gustora/ sur mon iPhone et je vois les 10 recettes.
  - **Produit pour la suite :** le lien en ligne (les missions suivantes le mettent à jour).

- [ ] 6. La page d'une recette — CONSTRUIT
  - **Quoi :** l'écran 3 : image (ou image de remplacement), badges, portions − / +, prix estimé,
    ingrédients, étapes, astuce. Chaque recette a sa propre adresse (lien direct).
  - **Pourquoi :** c'est la fiche qu'on lit en cuisinant ; le lien direct servira au partage.
  - **C'est réussi quand :** je passe le couscous de 4 à 8 personnes : les quantités et le prix doublent.
  - **Produit pour la suite :** recette.js.

### Chercher

- [ ] 7. Explorer par région et par pays — CONSTRUIT
  - **Quoi :** l'écran 4 (carte de France avec les 13 régions + les 10 pays) et l'écran 5 (une zone).
    Une zone sans recette affiche « Les recettes de cette région arrivent bientôt ! ».
  - **Pourquoi :** c'est le cœur du voyage : on se promène sur une carte comme dans un guide.
  - **C'est réussi quand :** je touche la Bretagne sur la carte (sur iPhone) et je vois ses recettes.
  - **Produit pour la suite :** explorer.js, carte-france.svg.

- [ ] 8. Les filtres saison, temps et budget — CONSTRUIT
  - **Quoi :** les puces de filtre de l'écran 2 (Saison, Temps, Budget, Type), qui se combinent,
    + le bloc « De saison en ce moment » de l'accueil, qui suit la date du jour.
  - **Pourquoi :** comme les rayons d'une bibliothèque : on trouve vite ce qu'on cherche.
  - **C'est réussi quand :** je choisis « € » + « 30 min ou moins » et je ne vois que des recettes pas chères et rapides.
  - **Produit pour la suite :** filtres.js.

- [ ] 9. Dans mon frigo — CONSTRUIT
  - **Quoi :** l'écran 6 : je coche mes ingrédients, l'app classe les recettes : « Tu peux cuisiner »,
    « Il te manque 1 ingrédient », « Il te manque 2 ingrédients ».
  - **Pourquoi :** c'est le chef qui ouvre ton frigo et te dit quoi faire avec.
  - **C'est réussi quand :** je mets « œufs, farine, lait » et les crêpes sont dans « Tu peux cuisiner ».
  - **Produit pour la suite :** frigo.js.

### Mon carnet

- [ ] 10. Les favoris — CONSTRUIT
  - **Quoi :** le ♥ sur chaque recette + l'écran 7 « Mes favoris », gardés dans le navigateur.
  - **Pourquoi :** le stockage du navigateur, c'est comme un carnet rangé dans l'iPhone :
    on le retrouve en revenant, même après avoir fermé Safari.
  - **C'est réussi quand :** je mets 2 favoris, je ferme Safari, je reviens : ils sont toujours là.
  - **Produit pour la suite :** stockage.js (le carnet), réutilisé à la mission 11.

- [ ] 11. La liste de courses — CONSTRUIT
  - **Quoi :** le bouton « Ajouter à ma liste de courses » + l'écran 8 : ingrédients regroupés
    par rayon, additionnés entre recettes, à cocher, avec le total estimé.
  - **Pourquoi :** fini la liste sur un bout de papier : l'app additionne pour toi.
  - **C'est réussi quand :** j'ajoute 2 recettes qui ont des œufs : les œufs sont additionnés en une seule ligne,
    et le total estimé s'affiche.
  - **Produit pour la suite :** courses.js.

- [ ] 12. Le mode cuisine — CONSTRUIT
  - **Quoi :** l'écran 9 : une étape à la fois en grand, l'écran reste allumé, et un minuteur quand l'étape a une durée.
  - **Pourquoi :** les mains pleines de farine, on veut juste lire en grand et toucher « Suivant ».
  - **C'est réussi quand :** sur iPhone, je lance un minuteur d'1 minute : il sonne à la fin, et l'écran ne s'est pas éteint.
  - **Produit pour la suite :** cuisine.js.

### Remplir le carnet (10 recettes par région et par pays)

- [ ] 13. Les images des plats — EXÉCUTE
  - **Quoi :** créer avec Pollinations une image IA pour chacune des 10 recettes, la ranger dans images/,
    et écrire la méthode dans IMAGES.md (pour la refaire à chaque remplissage).
    Si Pollinations ne marche pas : le dire, et garder l'image de remplacement.
  - **Pourquoi :** une image vaut mille mots : on a envie de cuisiner ce qu'on voit.
  - **C'est réussi quand :** sur mon iPhone, chaque recette a une jolie image, et la page reste rapide.
  - **Produit pour la suite :** images/, IMAGES.md (la méthode).

- [ ] 14. Remplir (1/3) : environ 75 recettes et leurs images — CONSTRUIT
- [ ] 15. Remplir (2/3) : environ 75 recettes et leurs images — CONSTRUIT
- [ ] 16. Remplir (3/3) : environ 70 recettes et leurs images — CONSTRUIT
  - **Quoi (pour les 3) :** ajouter des recettes jusqu'à 10 par région et 10 par pays (230 en tout),
    en commençant par les zones les moins remplies. Les plats les plus connus de chaque zone d'abord.
    Chaque recette s'inspire des versions les mieux notées sur internet, écrite avec mes mots. Plus leur image.
  - **Pourquoi :** comme remplir les étagères d'une épicerie qui vient d'ouvrir.
  - **C'est réussi quand :** sur l'écran Explorer, chaque zone remplie affiche le bon nombre de recettes,
    et 3 recettes prises au hasard ont tout (image, prix, saison, étapes).
  - **Produit pour la suite :** un carnet plus gros (à la mission 16 : 230 recettes).

### Ouvrir au public

- [ ] 17. Partager, installer sur l'iPhone et « À propos » — CONSTRUIT
  - **Quoi :** le bouton « Partager » d'une recette, l'installation sur l'écran d'accueil iPhone
    (icône, nom, plein écran) et l'écran 10 « À propos ».
  - **Pourquoi :** l'app devient publique : il faut pouvoir l'envoyer et dire honnêtement d'où viennent les recettes.
  - **C'est réussi quand :** j'envoie une recette par SMS à moi-même : le lien ouvre directement la bonne recette ;
    et Gustora s'ajoute à mon écran d'accueil avec son icône.
  - **Produit pour la suite :** manifest.webmanifest, l'app complète.

- [ ] 18. Un vrai test avec quelqu'un d'autre — EXÉCUTE
  - **Quoi :** une personne essaie Gustora sur son téléphone sans aide : trouver une recette d'hiver,
    l'ajouter à ses courses, puis utiliser « Dans mon frigo ». Je note ce qui la bloque, Claude corrige les 3 plus gros soucis.
  - **Pourquoi :** le cuisinier ne goûte jamais son plat comme un client : un regard neuf voit ce qu'on ne voit plus.
  - **C'est réussi quand :** la personne a réussi les 3 tâches seule.
  - **Produit pour la suite :** Gustora 1.0 🎉

### Le grand remplissage (jusqu'à 50 recettes par région et par pays)

Pour ces 9 missions : environ 100 recettes de plus (et leurs images) à chaque fois, zones les moins remplies d'abord,
même méthode que les missions 14 à 16. À la fin : environ 1 150 recettes.
C'est réussi quand : sur Explorer, les zones ont toutes grossi, et 3 recettes au hasard sont complètes.

- [ ] 19. Grand remplissage (1/9) — CONSTRUIT
- [ ] 20. Grand remplissage (2/9) — CONSTRUIT
- [ ] 21. Grand remplissage (3/9) — CONSTRUIT
- [ ] 22. Grand remplissage (4/9) — CONSTRUIT
- [ ] 23. Grand remplissage (5/9) — CONSTRUIT
- [ ] 24. Grand remplissage (6/9) — CONSTRUIT
- [ ] 25. Grand remplissage (7/9) — CONSTRUIT
- [ ] 26. Grand remplissage (8/9) — CONSTRUIT
- [ ] 27. Grand remplissage (9/9) — CONSTRUIT

## Plus tard (seulement si je le demande)
- Plusieurs langues (anglais, espagnol…) : les textes sont déjà rangés dans textes.js pour ça.
- Plus de pays, et l'Outre-mer.
- Remplacer une image IA par ma vraie photo du plat.
- Filtres végétarien / sans gluten.
- Le menu de la semaine.
- Marcher sans internet (hors ligne).
