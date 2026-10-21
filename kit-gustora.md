# KIT GUSTORA

Un carnet de cuisine du monde, gratuit et public, qu'on installe sur l'iPhone.
Fabriqué par la machine à kits de l'Atelier le 2026-10-18.
Mis à jour le 2026-10-19 : régimes (sans gluten, sans lactose, pauvre en FODMAP, végétarien, vegan) avec logos,
calories, filtre multiple et versions adaptées (nouvelle mission 12) → 28 missions.
Mis à jour le 2026-10-19 (bis) : un seul interrupteur « Mode strict » au lieu d'une jauge par régime,
et la mission 8 coupée en deux (8 : filtres saison, temps, budget ; 9 : filtre régime) → 29 missions.
Mis à jour le 2026-10-19 (ter) : nouvelle mission 19 « Les transitions entre les pages » → 30 missions.
Mis à jour le 2026-10-21 : « Le nouveau look » (missions 10 et 11 : 3 styles au choix, puis le look appliqué partout)
et relecture avec web-design-guidelines et humanizer à chaque fin de mission (CLAUDE.md) → 32 missions.

## 1. FICHE PROJET (= CLAUDE.md)

```
# GUSTORA — fiche projet

<persona>
Tu es un développeur web spécialisé dans les apps de cuisine pour iPhone, doublé d'un cuisinier
qui connaît les plats de France et du monde, et qui accompagne un débutant en expliquant avec des analogies.
</persona>

<situation>
- Gustora : un carnet de cuisine en ligne, gratuit et public. On y trouve des recettes des 13 régions
  de France et de 10 pays (Italie, Espagne, Maroc, Japon, Mexique, Inde, Liban, Grèce, Thaïlande, États-Unis).
- On cherche par région ou pays, par saison, par temps, par budget (€ / €€ / €€€) ou avec « Dans mon frigo ».
  On garde ses favoris, on fait sa liste de courses (avec un total estimé) et on cuisine en mode pas à pas.
- Ambiance : marché du monde, terracotta, safran et papier crème (détails dans DESIGN.md après la mission 2).
- Technique : HTML, CSS et JavaScript simples, sans framework ni installation.
- Recettes : écrites par Claude, en français, dans des fichiers JSON (un fichier = une région ou un pays,
  dans le dossier recettes/), plus un sommaire léger recettes/index.json pour chercher vite.
  Un fichier JSON, c'est comme une fiche bristol bien rangée : chaque case a son nom (temps, prix…).
  Format exact : voir ECRANS.md, partie « La fiche recette ».
- Images : une image IA par plat, faite UNE fois avec Pollinations (gratuit, sans compte),
  rangée dans images/<id-de-la-recette>.jpg.
- Textes de l'interface : tous dans textes.js, pour pouvoir traduire l'app plus tard.
- Données du visiteur : favoris et liste de courses gardés dans SON navigateur (localStorage).
  Pas de compte, pas de serveur, rien n'est envoyé ailleurs.
- Écrans et textes : tout est dans ECRANS.md (à relire à chaque mission).
- Mise en ligne : GitHub Pages, compte brooly-cmd, dépôt « gustora »
  → https://brooly-cmd.github.io/gustora/
- Moi : débutant, PC Windows + iPhone, une mission à la fois, je vérifie moi-même.
</situation>

<exclusions>
- Pas plusieurs missions à la fois. À la place : finis, vérifie, coche, puis arrête-toi.
- Pas de fonction non demandée. À la place : note-la dans une liste « Plus tard » et demande-moi.
- Pas de service payant. À la place : l'option gratuite.
- Pas de mot technique sans explication. À la place : une phrase + une analogie.
- Pas de code en double ni de code qui ne sert plus. À la place : réutilise ce qui existe, écris court
  et simple, un fichier par sujet. Ne réorganise pas le code existant sans me demander.
- Pas de recette copiée d'un site. À la place : regarde les versions les mieux notées sur internet,
  puis écris TA version, avec tes propres mots, en français.
- Pas de photo prise sur internet. À la place : l'image IA de Pollinations, rangée dans images/.
- Pas de clé secrète ni de service qui demande un compte (l'app est publique, tout le monde verrait la clé).
  À la place : seulement des services gratuits sans compte.
- Pas de texte d'interface écrit directement dans les pages. À la place : tout dans textes.js.
- Pas de prix présenté comme exact. À la place : « ~ » devant, et la mention « prix estimé ».
- Pas de recette en double (même plat dans la même zone). À la place : vérifie le sommaire avant d'ajouter.
- Pas de page qui rame avec beaucoup de recettes. À la place : on charge les images seulement quand
  elles arrivent à l'écran, et une zone seulement quand on l'ouvre.
- Pas de vieille version coincée dans le navigateur. À la place : à chaque remise en ligne, augmente le
  numéro de version des fichiers dans index.html (style.css?v=7 → ?v=8, pareil pour les .js et le manifest).
</exclusions>

<fin_de_mission>
À la fin de CHAQUE mission, automatiquement, sans que je le demande :
1. Vérifie toi-même : ouvre la page dans ton navigateur, en taille PC puis en taille iPhone,
   et teste ce que la mission a changé. Corrige ce qui ne va pas avant de me la donner.
   Pour vérifier, lis le texte de la page (pas de capture d'écran) ; prends au maximum
   2 captures en tout, seulement pour vérifier le look. Teste l'essentiel, sans répéter.
   Si la mission a changé l'interface, relis aussi avant de me la donner :
   - la page avec la skill web-design-guidelines (lisible, facile à utiliser, confortable sur iPhone) ;
   - tous les textes visibles avec la skill humanizer (en français, sans tics d'IA).
   Construis avec frontend-design et taste-skill, en respectant DESIGN.md et les règles de confort
   de ui-ux-pro-max (boutons d'au moins 44 px, bon contraste).
   Corrige ce qu'elles trouvent ; dis-moi en une ligne ce que tu as corrigé.
2. Remets la page en ligne si elle l'est déjà.
3. Coche la mission dans MISSIONS.md.
4. Fais une sauvegarde git nommée "Mission N : <titre>" (une sauvegarde git = un point de
   retour, comme une sauvegarde de jeu vidéo : on peut toujours revenir à ce moment-là).
5. Dis-moi comment vérifier moi-même, en étapes numérotées (sur PC et sur iPhone).
6. Mini-leçon : explique-moi en 3 phrases simples la chose la plus importante que tu as faite.
</fin_de_mission>
```

## 2. MISSIONS (= MISSIONS.md)

```
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
    (Le bloc « Version adaptée » attend la mission 15.)
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

- [x] 9. Le filtre régime et « Mes régimes » — CONSTRUIT
  - **Quoi :** la puce « Régime ▾ » de l'écran 2 : 5 cases à cocher avec leur logo (plusieurs à la fois),
    l'interrupteur « Mode strict (allergie, maladie cœliaque) », résultats en 2 groupes « Déjà compatibles » / « Adaptables »,
    et « Mes régimes » gardés sur le téléphone, avec le bandeau de l'accueil (voir ECRANS.md, « Les régimes »).
  - **Pourquoi :** quelqu'un qui ne mange jamais de gluten règle ça une fois, et l'app s'en souvient,
    comme un serveur qui connaît déjà tes allergies quand tu reviens au restaurant.
  - **C'est réussi quand :** je coche sans gluten + sans lactose : je ne vois que des recettes compatibles ou adaptables ;
    j'allume « Mode strict » : la liste rétrécit ; je ferme Safari, je reviens : le bandeau « Mes régimes » est toujours là.
  - **Produit pour la suite :** stockage.js (le carnet du téléphone, réutilisé ensuite).

### Le nouveau look

- [ ] 10. Le nouveau look : 3 styles au choix — MONTRE
  - **Quoi :** avec les skills taste-skill et ui-ux-pro-max, propose 3 looks complets et vraiment
    différents pour Gustora, tirés de son sujet (cuisine du monde, marchés, épices, voyages).
    Chaque look : couleurs jour et nuit, polices, un logo SVG animé (dessiné en code),
    2 ou 3 petites illustrations SVG animées tirées des recettes, et l'accueil dessiné dans ce style.
    Les 3 côte à côte sur choix-style.html, lisible sur iPhone. C'est moi qui choisis.
    Ensuite, réécris DESIGN.md avec le look choisi (l'ancien « Argile & Safran » est remplacé).
  - **Pourquoi :** comme goûter trois sauces avant de choisir celle du plat : on compare en vrai, pas sur le papier.
  - **C'est réussi quand :** j'ai vu les 3 looks sur mon iPhone, j'en ai choisi un, et DESIGN.md le décrit.
  - **Produit pour la suite :** choix-style.html, le nouveau DESIGN.md.

- [ ] 11. Appliquer le nouveau look partout — CONSTRUIT
  - **Quoi :** toutes les pages déjà faites passent au look de DESIGN.md (accueil, liste, recette,
    explorer, filtres, régimes), avec le logo et les illustrations SVG animés.
    Retire les anciens effets de la Salle des effets qui ne vont plus avec le nouveau look.
    Rien ne doit casser : toutes les fonctions marchent comme avant.
  - **Pourquoi :** comme repeindre la cuisine : on change les couleurs, pas la place du four ni des placards.
  - **C'est réussi quand :** sur mon iPhone, toutes les pages ont le nouveau look, en jour et en nuit,
    et tout marche comme avant.
  - **Produit pour la suite :** style.css et les pages au nouveau look, le logo et les illustrations SVG.

### Chercher (suite)

- [ ] 12. Dans mon frigo — CONSTRUIT
  - **Quoi :** l'écran 6 : je coche mes ingrédients, l'app classe les recettes : « Tu peux cuisiner »,
    « Il te manque 1 ingrédient », « Il te manque 2 ingrédients ». Si « Mes régimes » est actif, il est respecté.
  - **Pourquoi :** c'est le chef qui ouvre ton frigo et te dit quoi faire avec.
  - **C'est réussi quand :** je mets « œufs, farine, lait » et les crêpes sont dans « Tu peux cuisiner ».
  - **Produit pour la suite :** frigo.js.

### Mon carnet

- [ ] 13. Les favoris — CONSTRUIT
  - **Quoi :** le ♥ sur chaque recette + l'écran 7 « Mes favoris », gardés dans le navigateur.
  - **Pourquoi :** le stockage du navigateur, c'est comme un carnet rangé dans l'iPhone :
    on le retrouve en revenant, même après avoir fermé Safari.
  - **C'est réussi quand :** je mets 2 favoris, je ferme Safari, je reviens : ils sont toujours là.
  - **Produit pour la suite :** les favoris dans stockage.js.

- [ ] 14. La liste de courses — CONSTRUIT
  - **Quoi :** le bouton « Ajouter à ma liste de courses » + l'écran 8 : ingrédients regroupés
    par rayon, additionnés entre recettes, à cocher, avec le total estimé.
  - **Pourquoi :** fini la liste sur un bout de papier : l'app additionne pour toi.
  - **C'est réussi quand :** j'ajoute 2 recettes qui ont des œufs : les œufs sont additionnés en une seule ligne,
    et le total estimé s'affiche.
  - **Produit pour la suite :** courses.js.

- [ ] 15. Les versions adaptées — CONSTRUIT
  - **Quoi :** le bloc « Version adaptée » de l'écran 3 : interrupteurs Sans gluten / Sans lactose / Pauvre en FODMAP
    (plusieurs à la fois), ingrédients remplacés en couleur, notes d'adaptation, prix et calories recalculés,
    ouverture directe dans la version adaptée si « Mes régimes » est actif, et la liste de courses qui reçoit les remplaçants.
  - **Pourquoi :** une personne intolérante peut cuisiner le plat qu'elle veut, pas seulement ceux qui sont déjà « sans ».
    C'est comme un tailleur qui retouche un costume au lieu d'en chercher un autre.
  - **C'est réussi quand :** sur une recette avec du fromage, j'allume « Sans lactose » : le fromage devient sa version
    sans lactose et le prix change ; je l'ajoute aux courses : la liste contient bien le remplaçant.
  - **Produit pour la suite :** adaptation.js.

- [ ] 16. Le mode cuisine — CONSTRUIT
  - **Quoi :** l'écran 9 : une étape à la fois en grand, l'écran reste allumé, et un minuteur quand l'étape a une durée.
    Il suit la version adaptée choisie.
  - **Pourquoi :** les mains pleines de farine, on veut juste lire en grand et toucher « Suivant ».
  - **C'est réussi quand :** sur iPhone, je lance un minuteur d'1 minute : il sonne à la fin, et l'écran ne s'est pas éteint.
  - **Produit pour la suite :** cuisine.js.

### Remplir le carnet (10 recettes par région et par pays)

- [ ] 17. Les images des plats — EXÉCUTE
  - **Quoi :** créer avec Pollinations une image IA pour chacune des 10 recettes, la ranger dans images/,
    et écrire la méthode dans IMAGES.md (pour la refaire à chaque remplissage).
    Si Pollinations ne marche pas : le dire, et garder l'image de remplacement.
  - **Pourquoi :** une image vaut mille mots : on a envie de cuisiner ce qu'on voit.
  - **C'est réussi quand :** sur mon iPhone, chaque recette a une jolie image, et la page reste rapide.
  - **Produit pour la suite :** images/, IMAGES.md (la méthode).

- [ ] 18. Remplir (1/3) : environ 75 recettes et leurs images — CONSTRUIT
- [ ] 19. Remplir (2/3) : environ 75 recettes et leurs images — CONSTRUIT
- [ ] 20. Remplir (3/3) : environ 70 recettes et leurs images — CONSTRUIT
  - **Quoi (pour les 3) :** ajouter des recettes jusqu'à 10 par région et 10 par pays (230 en tout),
    en commençant par les zones les moins remplies. Les plats les plus connus de chaque zone d'abord.
    Chaque recette s'inspire des versions les mieux notées sur internet, écrite avec mes mots.
    Avec ses calories, ses régimes, ses notes d'adaptation, les remplaçants des nouveaux ingrédients, et son image.
  - **Pourquoi :** comme remplir les étagères d'une épicerie qui vient d'ouvrir.
  - **C'est réussi quand :** sur l'écran Explorer, chaque zone remplie affiche le bon nombre de recettes,
    et 3 recettes prises au hasard ont tout (image, prix, calories, régimes, saison, étapes).
  - **Produit pour la suite :** un carnet plus gros (à la mission 20 : 230 recettes).

### Ouvrir au public

- [ ] 21. Les transitions entre les pages — CONSTRUIT
  - **Quoi :** une transition douce quand on passe d'un écran à l'autre (accueil → liste → recette → Explorer…),
    par exemple la carte recette qui s'agrandit pour devenir la page de la recette, et un fondu glissé entre les onglets.
    Voir ECRANS.md, « Règles du projet ».
  - **Pourquoi :** comme tourner les pages d'un beau livre de cuisine au lieu de sauter d'une feuille à l'autre :
    on comprend d'où on vient et où on va.
  - **C'est réussi quand :** sur iPhone, je touche une carte recette : elle s'agrandit en douceur jusqu'à la page ;
    je reviens en arrière : elle reprend sa place ; avec « Réduire les animations » activé, ça change de page sans mouvement.
  - **Produit pour la suite :** transitions.js (ou les transitions rangées dans app.js et style.css).

- [ ] 22. Partager, installer sur l'iPhone et « À propos » — CONSTRUIT
  - **Quoi :** le bouton « Partager » d'une recette, l'installation sur l'écran d'accueil iPhone
    (icône, nom, plein écran) et l'écran 10 « À propos ».
  - **Pourquoi :** l'app devient publique : il faut pouvoir l'envoyer et dire honnêtement d'où viennent les recettes.
  - **C'est réussi quand :** j'envoie une recette par SMS à moi-même : le lien ouvre directement la bonne recette ;
    et Gustora s'ajoute à mon écran d'accueil avec son icône.
  - **Produit pour la suite :** manifest.webmanifest, l'app complète.

- [ ] 23. Un vrai test avec quelqu'un d'autre — EXÉCUTE
  - **Quoi :** une personne essaie Gustora sur son téléphone sans aide : trouver une recette d'hiver,
    l'ajouter à ses courses, utiliser « Dans mon frigo », puis ouvrir une recette en version sans lactose.
    Je note ce qui la bloque, Claude corrige les 3 plus gros soucis.
  - **Pourquoi :** le cuisinier ne goûte jamais son plat comme un client : un regard neuf voit ce qu'on ne voit plus.
  - **C'est réussi quand :** la personne a réussi les 4 tâches seule.
  - **Produit pour la suite :** Gustora 1.0 🎉

### Le grand remplissage (jusqu'à 50 recettes par région et par pays)

Pour ces 9 missions : environ 100 recettes de plus (et leurs images) à chaque fois, zones les moins remplies d'abord,
même méthode que les missions 18 à 20 (calories, régimes et remplaçants compris). À la fin : environ 1 150 recettes.
C'est réussi quand : sur Explorer, les zones ont toutes grossi, et 3 recettes au hasard sont complètes.

- [ ] 24. Grand remplissage (1/9) — CONSTRUIT
- [ ] 25. Grand remplissage (2/9) — CONSTRUIT
- [ ] 26. Grand remplissage (3/9) — CONSTRUIT
- [ ] 27. Grand remplissage (4/9) — CONSTRUIT
- [ ] 28. Grand remplissage (5/9) — CONSTRUIT
- [ ] 29. Grand remplissage (6/9) — CONSTRUIT
- [ ] 30. Grand remplissage (7/9) — CONSTRUIT
- [ ] 31. Grand remplissage (8/9) — CONSTRUIT
- [ ] 32. Grand remplissage (9/9) — CONSTRUIT

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
| Le carnet du téléphone (mission 9) | stockage.js | Lire, écrire, effacer ce que le visiteur garde dans son navigateur (« Mes régimes », puis favoris, courses, frigo) ; ne casse rien en navigation privée | Idée réutilisable : un seul petit fichier pour tout ce qu'on garde sur le téléphone |
| Les effets du site (missions 3 à 8) | effets.js, explorer.js, filtres.js | Effets 78, 3, 2, 8, 14, 42, 6, 36 (la carte qui se dessine), 152 (les herbes qui poussent), 66 (les pays en tuiles bento), et pour les filtres 16 (onde au toucher), 46 (coche qui se dessine) et 232 (cartes qui glissent à leur place), réglés pour l'iPhone | Déjà rangés dans ..\00-Atelier |

Bilan final (à remplir après la dernière mission) : ce qui a bien marché, ce qui était de trop, ce que je garde pour le prochain projet.
```

## 3. PROMPTS DE PHASE

PENSE et Claude Design : inutiles ici. Les écrans et les textes sont déjà dans le kit (partie 5),
et la maquette se fait dans Claude Code.

### Mission 2 « Le look » (Claude Code)
```
Lis ..\00-Atelier\BANQUE-EFFETS.md (parties 5, 7 et 8), le CLAUDE.md de ce projet et ECRANS.md.
Thème de mon projet : « marché du monde, terracotta, safran et papier crème ».
Prépare une page choix-design.html où je choisis mon look. Elle a 3 parties :

1. COULEURS — 3 palettes inventées pour CE thème (pas des couleurs génériques).
   Chacune : un nom qui fait rêver, 5 couleurs (fond, texte, couleur principale, couleur d'accent, couleur douce)
   avec leur code, une version jour ET une version nuit (j'aime l'interrupteur jour / nuit).
   Les badges € / €€ / €€€ et les puces de saison doivent rester bien lisibles.
   Vérifie que le texte reste bien lisible sur le fond (contraste suffisant).
   Montre chaque palette sur un vrai morceau de mon écran d'accueil (la carte « De saison en ce moment »,
   une carte recette, le bouton « Ajouter à ma liste de courses », la barre d'onglets).
2. LOGO — 3 logos dessinés en SVG (un dessin fait de formes, net à toutes les tailles), dans le thème,
   simples, lisibles en tout petit (icône iPhone). Montre-les en grand, en petit (32 px) et sur fond jour / nuit.
3. EFFETS — seulement mes effets « J'aime » de la partie 7 (JAMAIS un « Bof » ou « J'aime pas »).
   Garde les 8 à 12 qui collent le mieux à la personnalité du projet (partie 5a), rangés par élément de MA page
   (partie 5b) : « Fond de l'accueil », « Carte vedette De saison », « Cartes recette », « Le ♥ favori »,
   « Bouton Ajouter à ma liste de courses », « Barre d'onglets », « Carte de France », « Minuteur du mode cuisine ».
   Chaque effet est une VRAIE démo qui marche (reprends son code dans la Salle, voir partie 8),
   déjà repeinte aux couleurs de la palette 1 et avec mes vrais textes (« Crêpes de froment », « Bretagne »,
   « ~2 € / pers. », « 8 ingrédients ajoutés à ta liste »), version souris ET doigt.
   Une phrase sous chaque effet : pourquoi il va bien ici. Les effets marqués « J'adore » dans ma partie 7 passent en premier.

Sur la page : je coche UNE palette, UN logo et les effets que je veux (cases « Je veux »).
Quand je change de palette, les démos d'effets se repeignent avec elle.
Un compteur m'avertit si je dépasse les règles d'or (1 effet star par page, 3 types d'effets décoratifs maximum).
En bas, un bouton « Copier mon choix » qui copie un message du genre :
« Mon look : palette 2 (Safran du souk), logo 3, effets : 3 sur la carte vedette, 39 sur le fond de l'accueil, 13 sur le ♥ ».

Ouvre la page en taille PC puis iPhone pour vérifier que tout marche, puis donne-la-moi et ATTENDS mon message.

Quand je colle mon choix :
- Écris DESIGN.md : la palette choisie (jour et nuit, avec les codes), le logo, la police,
  et la liste « Effets choisis » : numéro, nom, sur quel élément, réglages (vitesse, couleurs).
- Range le logo choisi dans logo.svg, et fais l'icône de l'écran d'accueil iPhone (image PNG 180 × 180)
  et l'icône d'onglet. Si tu ne peux pas créer le PNG, explique-moi comment faire en étapes simples.
- Ne touche pas encore aux autres pages : les missions suivantes appliqueront DESIGN.md.
Pose-moi tes questions, fais un plan d'abord, puis montre-moi que ça marche.
Explique-moi simplement ce que tu fais, je suis débutant.
```

### CONSTRUIT (missions 1, 3, 4, 6 à 16, 21 et 22 — remplace N par le numéro)
```
Lis CLAUDE.md, MISSIONS.md et ECRANS.md. Fais uniquement la mission N, rien d'autre,
puis fais la fin de mission prévue dans CLAUDE.md.
Utilise la skill frontend-design pour que ce soit beau et original.
Applique DESIGN.md : mes couleurs (jour et nuit), mon logo, et pose toi-même les effets
de la liste « Effets choisis » sur les éléments indiqués (code dans ..\00-Atelier\salle-des-effets.html,
règles dans ..\00-Atelier\BANQUE-EFFETS.md partie 3).
Pose-moi tes questions, fais un plan d'abord, puis montre-moi que ça marche.
Explique-moi simplement ce que tu fais, je suis débutant.
```
(Pour la mission 1, il n'y a pas encore d'interface ni de DESIGN.md : les 4 lignes du milieu ne s'appliquent pas.)

### REMPLIR (missions 18 à 20 et 24 à 32 — remplace N par le numéro)
```
Lis CLAUDE.md, MISSIONS.md, ECRANS.md (partie « La fiche recette ») et IMAGES.md.
Fais uniquement la mission N, rien d'autre, puis fais la fin de mission prévue dans CLAUDE.md.
1. Regarde recettes/index.json : compte les recettes de chaque zone, et choisis les zones les moins remplies.
2. Pour chaque zone, fais la liste des plats les plus connus qui manquent (pas de doublon).
3. Pour chaque plat : cherche sur internet 2 ou 3 versions parmi les mieux notées
   (Marmiton, 750g, Cuisine AZ, Allrecipes…), garde ce qu'elles ont en commun, puis écris
   TA recette en français, avec tes mots (jamais de copier-coller), au format de la fiche recette.
   Prix estimés en euros, dans un supermarché français.
4. Donne à chaque recette ses calories, ses régimes et ses notes d'adaptation (ECRANS.md, « Les régimes »).
   Ajoute les nouveaux ingrédients dans ingredients.json (avec kcal, ce qu'ils contiennent et leurs remplaçants),
   mets à jour le sommaire, et fais les images (méthode IMAGES.md).
5. Vérifie : chaque fichier JSON s'ouvre sans erreur, aucune recette en double, aucune image manquante.
Travaille par paquets de 10 recettes, et dis-moi où tu en es entre chaque paquet.
Pose-moi tes questions, fais un plan d'abord, puis montre-moi que ça marche.
Explique-moi simplement ce que tu fais, je suis débutant.
```

### EXÉCUTE (missions 5, 17 et 23)
```
Lis CLAUDE.md, MISSIONS.md et ECRANS.md. Fais uniquement la mission N, rien d'autre,
puis fais la fin de mission prévue dans CLAUDE.md.
Quand c'est à moi d'agir (créer un compte, cliquer), donne-moi les étapes numérotées, une par ligne.
Pose-moi tes questions, fais un plan d'abord, puis montre-moi que ça marche.
Explique-moi simplement ce que tu fais, je suis débutant.
```

## 4. MODE D'EMPLOI
1. Toutes les missions se font dans Claude Code.
2. Dis « la suite Gustora » à l'Atelier, puis clique « Lancer la mission »
   (ou ouvre une session dans le dossier Gustora et colle le prompt CONSTRUIT / REMPLIR / EXÉCUTE).
3. Une mission par session. À la fin, vérifie toi-même (PC + iPhone), puis reviens à l'Atelier.
4. La mission 2 « Le look » a son propre prompt (ci-dessus) : c'est toi qui choisis tes couleurs et tes effets.

## 5. ÉCRANS ET TEXTES (= ECRANS.md)

```
# Gustora — écrans et textes

## Règles du projet
- Zones : 13 régions de France (Auvergne-Rhône-Alpes, Bourgogne-Franche-Comté, Bretagne, Centre-Val de Loire,
  Corse, Grand Est, Hauts-de-France, Île-de-France, Normandie, Nouvelle-Aquitaine, Occitanie,
  Pays de la Loire, Provence-Alpes-Côte d'Azur) et 10 pays (Italie, Espagne, Maroc, Japon, Mexique,
  Inde, Liban, Grèce, Thaïlande, États-Unis).
- Objectif : 10 recettes par zone (mission 20), puis 50 par zone (mission 32).
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
- Transitions entre les pages (mission 21) : courtes (0,3 à 0,4 s), jamais bloquantes (on peut toucher pendant),
  la carte recette s'agrandit vers sa page et y retourne au retour, fondu glissé entre les onglets.
  Si le téléphone ne sait pas faire la transition (vieux Safari), la page change simplement, sans erreur.
  Avec « Réduire les animations » : pas de mouvement, juste le changement de page.
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
- 2 niveaux dans les données : « Souple » (seuls les ingrédients évidents comptent : farine, lait, viande, sauce soja…) et
  « Strict » (les ingrédients cachés et les traces comptent aussi : beurre et fromages affinés pour le lactose,
  lardons, tortillas « de maïs » mélangées au blé, mélanges d'épices, présure des fromages, vin collé à la gélatine,
  courgette ou chou en grande quantité pour les FODMAP…).
  À l'écran, UN SEUL interrupteur pour tous les régimes cochés (mission 9) : « Mode strict (allergie, maladie cœliaque) ».
  Éteint (par défaut) : niveau « Souple ». Allumé : niveau « Strict » pour tous les régimes cochés.
  Un régime non coché n'est pas pris en compte. Sans réglage, les logos suivent le niveau « Souple ».
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
  Dans une même puce, on peut cocher plusieurs choix (« Été, Hiver ✕ », « Été +2 ✕ ») : la recette doit en respecter au moins un.
  Le tiroir reste ouvert et se ferme avec « Voir les 4 recettes » (ou en le tirant vers le bas sur iPhone).
- « Régime ▾ » : 5 cases à cocher avec leur logo (on peut en cocher plusieurs : la recette doit les respecter TOUS),
  + l'interrupteur « Mode strict (allergie, maladie cœliaque) » sous les cases, avec une phrase :
  « Compte aussi les ingrédients cachés et les traces. »,
  + la case « Garder mes régimes sur ce téléphone » (cochée par défaut).
  Le bandeau de l'accueil l'indique : « Mes régimes : sans gluten · sans lactose · strict ✕ ».
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
- Bloc « Version adaptée » (mission 15) : des interrupteurs « Sans gluten » · « Sans lactose » · « Pauvre en FODMAP »,
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
- Partager (mission 22) : ouvre le partage de l'iPhone ; sur PC : « Lien copié ! ».
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
```
