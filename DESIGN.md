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
| 39 | Points qui fuient | Fond de l'accueil | Grille de graines tous les 18 px, rayon 1,7 px, couleur Texte à 22 %. Sous le doigt ou la souris (rayon 70 px), elles s'écartent de 26 px et passent en Principale. Suivi doux (0,14). Animé seulement quand il est à l'écran. |
| 2 | Carte qui penche en 3D | Cartes recette (accueil, listes, favoris) | Penche au plus 8°, retour lent en 0,7 s, ombre douce. Sur iPhone : glissement horizontal seulement. |
| 6 | Bouton aimanté (ralenti) | Bouton « Ajouter à ma liste de courses » (écran recette) | Souris : suit à 14 % (horizontal) et 20 % (vertical), retour en 0,9 s (plus lent que dans la Salle). iPhone : s'enfonce à 94 % puis rebondit. Message « 8 ingrédients ajoutés à ta liste » qui monte en 0,35 s. |
| 36 | Icônes qui se dessinent | Carte de France (écran Explorer) | Le contour se trace en 2,2 s quand la carte arrive à l'écran, la Bretagne et la Corse ensuite (décalées de 1 s et 1,6 s). Trait Texte de 2,2 px ; la région touchée se remplit en Principale (0,5 s). |
| 13 | Petit « pop » | Le ♥ favori | Grossit à 125 % puis revient, en 0,35 s. Vide = Texte à 35 % ; plein = Principale. |
| 42 | Onglets qui glissent | Barre d'onglets (en bas, partout) | La pastille Principale glisse jusqu'à l'onglet touché en 0,45 s (léger rebond). Pastille du nombre sur « Courses » : Accent. |
| 48 | Chiffres qui roulent | Minuteur du mode cuisine | Chaque chiffre de « 09:59 » roule en 0,7 s, police Figtree 800. |

**Les règles d'or, page par page :**
- 1 seul effet star : le 3, sur l'accueil.
- Accueil : 3 effets décoratifs (39, 3, 2). Écran recette : 6 (+ 2 si des cartes sont montrées).
  Écran Explorer : 36. Le ♥ (13), les onglets (42) et le minuteur (48) sont des réactions au geste et ne comptent pas.
- Sur tout le site, ça fait 5 types décoratifs au lieu de 3 : c'est le choix de la mission 2,
  accepté parce qu'aucune page n'en a plus de 3. Ne pas en ajouter d'autres.

**Pour tous les effets :**
- Seulement `transform` et `opacity` (rapide, la batterie ne chauffe pas).
- « Réduire les animations » activé sur l'iPhone : pas de penche, pas d'aimant, graines immobiles, carte déjà dessinée ;
  le ♥ et les onglets changent sans bouger.
- Le défilement de la page n'est jamais bloqué par un effet.
- Proposés mais pas retenus : 64 Forme en particules (le logo en grains d'épices), 4 Reflet brillant,
  81 Toile élastique, 202 Anneau du minuteur.
