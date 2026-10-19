# Gustora — le look (DESIGN.md)

Choisi à la mission 2 dans `choix-design.html`. Les missions suivantes appliquent ce fichier.

## La palette : « Argile & Safran »
*Le tajine en terre cuite qui sort du four, une pincée de safran sur le papier du marché.*

| Rôle | Nom CSS | Jour ☀ | Nuit ☾ | À quoi ça sert |
|---|---|---|---|---|
| Fond | `--bg` | `#FBF4E8` | `#1D1410` | le papier crème de toutes les pages |
| Texte | `--tx` | `#2E1D14` | `#F5EADB` | tout le texte |
| Principale | `--pr` | `#B3472B` | `#E8835F` | boutons principaux, onglet actif, ♥ plein, carte vedette |
| Accent | `--ac` | `#E2A325` | `#F0B744` | badges € / €€ / €€€, pastille de Courses, petits détails (soleil, jaune du logo) |
| Douce | `--dx` | `#F2E0C6` | `#3A2B21` | puces de saison, image de remplacement, fonds de boutons secondaires |

Texte posé sur une couleur (calculé pour être lisible) :

| | Jour | Nuit |
|---|---|---|
| Texte sur Principale (`--on`) | `#FFFFFF` | `#1D1410` |
| Texte sur Accent (`--onac`) | `#2E1D14` | `#1D1410` |

Fond des cartes : jour = `--bg` mélangé à 45 % de blanc ; nuit = `--bg` mélangé à 10 % de blanc
(`color-mix(in srgb, var(--bg) 55%, #fff)` / `color-mix(in srgb, var(--bg) 90%, #fff)`).

Contrastes vérifiés (il faut au moins 4,5) : texte/fond 14,8 (jour) et 15,2 (nuit) ;
puce de saison 12,5 / 11,4 ; bouton 5,5 / 6,8 ; badge € 7,3 / 10,0. Tout est lisible.

**Règle :** la Principale de jour n'est jamais utilisée pour du petit texte sur le fond (contraste 5,0, c'est juste) :
on préfère `--tx` pour le texte, et `--pr` pour les surfaces (boutons, pastilles).

**Jour / nuit :** suit le réglage du téléphone, avec l'interrupteur dans l'en-tête (effet 27, rond safran
qui glisse en 0,45 s). Le choix est gardé dans le navigateur.

## Le logo : « Le G-assiette »
Le G de Gustora tracé comme le bord d'une assiette, avec un jaune d'œuf de safran au centre.
- `logo.svg` : le logo (couleurs de jour), dessin 64 × 64.
- Dessin : un trait `M47 17A21 21 0 1 0 53 32H38` (couleur Principale, épaisseur 8, bouts arrondis)
  + un rond au centre (32, 32), rayon 6,5 (couleur Accent).
- La nuit : mêmes formes en `#E8835F` et `#F0B744`.
- `favicon.svg` : l'icône d'onglet (passe tout seul en couleurs de nuit) ; `favicon-32.png` : la même en image, pour les vieux navigateurs.
- `apple-touch-icon.png` : l'icône de l'écran d'accueil iPhone (180 × 180, fond crème, sans transparence ; l'iPhone arrondit les coins lui-même).
- Dans `index.html` (mission 4) :
  `<link rel="icon" href="favicon.svg" type="image/svg+xml">`,
  `<link rel="icon" href="favicon-32.png" sizes="32x32">`,
  `<link rel="apple-touch-icon" href="apple-touch-icon.png">`.

## Les polices (Google Fonts, gratuites)
- Titres : **Young Serif** (400), ronde comme une écriture de carnet de cuisine.
- Texte : **Figtree** (400, 600, 700, 800), très lisible en petit.
- Secours : `Georgia, serif` pour les titres ; `"Segoe UI", system-ui, -apple-system, sans-serif` pour le texte.

## Formes
- Coins arrondis : cartes 18 à 22 px, boutons et puces en pilule (999 px), badges 8 px.
- Ombres douces couleur texte (jamais du noir pur), par exemple `0 16px 30px` avec `--tx` à 20 %.
- Image de remplacement d'un plat : le pictogramme assiette et couverts (trait Principale) sur la couleur Douce.

## Effets choisis
Code de départ : `choix-design.html` (repris de la Salle des effets, déjà aux couleurs).

| N° | Nom | Sur quel élément | Réglages |
|---|---|---|---|
| 3 | Carte en couches ★ (l'effet star) | Carte vedette « De saison en ce moment » (accueil) | 3 couches : fond Principale avec soleil Accent (profondeur 0,4), plat (1,3), textes et bouton (2,2). Penche au plus 9°, retour en 0,8 s. Sur iPhone : seulement au glissement horizontal du doigt (`touch-action: pan-y`). |
| 78 | Courant d'épices (remplace le 39 « Points qui fuient », changé après la mission 3) | Fond de l'accueil | Bouge tout le temps : environ 1 grain pour 1 700 px² (650 au plus), 2 grains sur 3 en Principale (60 %), 1 sur 3 en Accent (80 %), traits de 2 px avec une courte traînée. Courant lent. Sous la souris ou le doigt (rayon 120 px) : tourbillon plus rapide. En pause quand l'onglet est caché. |
| 14 | Texte qui s'écrit | Barre de recherche (accueil) | Dans la barre vide, la phrase « Chercher une recette, un ingrédient… » puis 4 noms de vraies recettes s'écrivent (55 ms par lettre), restent 2 s, s'effacent. Curseur Principale qui clignote. S'arrête dès qu'on touche la barre. |
| 8 | Voile qui suit la direction | Raccourcis de l'accueil | Souris : un voile Principale entre par le côté d'où arrive la souris (0,45 s), texte et icône passent en couleur « sur Principale ». iPhone : le voile monte à l'appui et redescend. |
| 2 | Carte qui penche en 3D | Cartes recette (accueil, listes, favoris) | Penche au plus 8°, retour lent en 0,7 s, ombre douce. Sur iPhone : glissement horizontal seulement. |
| 6 | Bouton aimanté (ralenti) | Bouton « Ajouter à ma liste de courses » (écran recette) | Souris : suit à 14 % (horizontal) et 20 % (vertical), retour en 0,9 s (plus lent que dans la Salle). iPhone : s'enfonce à 94 % puis rebondit. Message « 8 ingrédients ajoutés à ta liste » qui monte en 0,35 s. |
| 36 | Icônes qui se dessinent | Carte de France (écran Explorer) | Le contour se trace en 2,2 s quand la carte arrive à l'écran, la Bretagne et la Corse ensuite (décalées de 1 s et 1,6 s). Trait Texte de 2,2 px ; la région touchée se remplit en Principale (0,5 s). |
| 152 | Racines qui poussent, en herbes aromatiques (choisi sur une page d'essai après la mission 7 ; remplace les essais 73 et 57) | Fond de tout l'écran Explorer (France et Monde) | Romarin (aiguilles Principale), basilic (larges feuilles Accent) et thym (petites feuilles Principale), tiges couleur Texte (38 %). Ils poussent du bas et des 2 bords à chaque arrivée sur Explorer (environ 3 s), ondulent au vent (2 vagues lentes) et se penchent vers le doigt (rayon 260 px). Toucher le fond (pas une carte ni un lien) fait pousser un brin (8 au plus). En pause hors de l'écran Explorer. |
| 66 | Tuiles « bento » (choisi sur une page d'essai après la mission 7 ; remplace l'essai 274) | Pays (onglet Monde) | Tuiles de tailles différentes qui s'emboîtent sans trou : 6 rangées de 3 sur iPhone, 3 rangées de 6 sur PC (Italie grande ; Maroc, Liban, Grèce hautes ; Mexique, États-Unis larges ; sur PC la Grèce redevient petite et la Thaïlande large). Chaque tuile en 3 couches (fond + soleil 0,4 ; plat 1,8 ; nom 0,8), penche au plus 7°. Fonds Principale / Accent / Douce à tour de rôle ; pays sans recette en gris, plat en noir et blanc. |
| 16 | Onde au toucher (choisi sur une page d'essai à la mission 8) | Puces de filtre (Saison, Temps, Budget, Type, et la place de Régime) | Une onde Accent (70 %) part de l'endroit touché et s'efface en 0,6 s. |
| 46 | Coche qui se dessine (choisi à la mission 8) | Choix du tiroir des filtres | Rond Douce → Principale, la coche se trace en 0,4 s ; le tiroir se ferme 0,42 s après. |
| 232 | Grille ↔ liste : les cartes glissent à leur place (choisi à la mission 8) | Cartes recette de la liste, quand un filtre change | Les cartes qui partent s'effacent (0,25 s), les autres glissent de leur ancienne place à la nouvelle (0,5 s), les nouvelles apparaissent. |
| 13 | Petit « pop » | Le ♥ favori | Grossit à 125 % puis revient, en 0,35 s. Vide = Texte à 35 % ; plein = Principale. |
| 42 | Onglets qui glissent | Barre d'onglets (en bas, partout) | La pastille Principale glisse jusqu'à l'onglet touché en 0,45 s (léger rebond). Pastille du nombre sur « Courses » : Accent. |
| 48 | Chiffres qui roulent | Minuteur du mode cuisine | Chaque chiffre de « 09:59 » roule en 0,7 s, police Figtree 800. |

**Les règles d'or, page par page :**
- 1 seul effet star : le 3, sur l'accueil.
- Accueil : 5 effets décoratifs (78, 3, 2, 14, 8), choisis exprès après la mission 3 (au lieu de 3). Écran recette : 6 (+ 2 si des cartes sont montrées).
  Écran Explorer : 36, 152 et 66 (choisis exprès après la mission 7, comme pour l'accueil). Le ♥ (13), les onglets (42) et le minuteur (48) sont des réactions au geste et ne comptent pas.
  Liste des recettes (mission 8) : 2 (cartes), 16 (puces), 46 (tiroir) et 232 (cartes qui glissent), choisis exprès sur une page d'essai. Le tiroir monte simplement du bas sur iPhone (l'effet 192 « feuille qu'on tire » n'a pas été retenu).
- Sur tout le site, ça fait 9 types décoratifs. Après la mission 3, j'ai voulu un accueil plus vivant, et après la mission 7 un écran Explorer plus vivant :
  la règle « 3 par page » ne s'applique plus à ces deux écrans. Ne pas en ajouter d'autres sans me demander.

**Pour tous les effets :**
- Seulement `transform` et `opacity` (rapide, la batterie ne chauffe pas).
- « Réduire les animations » activé sur l'iPhone : pas de penche, pas d'aimant, grains d'épices immobiles, herbes déjà poussées et immobiles, pas de texte qui s'écrit, carte déjà dessinée ;
  le ♥ et les onglets changent sans bouger.
- Le défilement de la page n'est jamais bloqué par un effet.
- Proposés mais pas retenus : 64 Forme en particules (le logo en grains d'épices), 4 Reflet brillant,
  81 Toile élastique, 202 Anneau du minuteur.
