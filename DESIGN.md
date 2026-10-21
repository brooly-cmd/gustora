# Gustora — le look (DESIGN.md)

Choisi à la mission 10 dans `choix-style.html` (look 2). Il remplace « Argile & Safran » (mission 2).
La mission 11 l'applique à toutes les pages.

## L'idée : « Boîte à épices »
*Les épices en tas sur l'étal du marché : piment, curcuma, pistache.*
De gros titres très gras, des blocs de couleur pleine, des coins bien ronds. Pas de dégradé, pas d'ombre
sur ce qui ne bouge pas : les zones se séparent par un changement de couleur, pas par un trait ni une ombre.

## Les couleurs

| Rôle | Nom CSS | Jour ☀ | Nuit ☾ | À quoi ça sert |
|---|---|---|---|---|
| Fond | `--bg` | `#FAF6F1` | `#161210` | le fond de toutes les pages |
| Texte | `--tx` | `#1E1A17` | `#FBF3E7` | tout le texte ; aussi la barre d'onglets (fond foncé de jour) |
| Piment (principale) | `--pr` | `#D62839` | `#FF5A6A` | boutons principaux, carte vedette, ♥ plein, logo |
| Curcuma (accent) | `--ac` | `#F2B705` | `#FFC83D` | bouton dans la carte vedette, onglet actif, badges € / €€ / €€€, onde au toucher |
| Pistache | `--fx` | `#2A9D5C` | `#4CC782` | 3e couleur de bloc (raccourcis, tuiles des pays, fonds des dessins) |
| Douce | `--dx` | `#F0E6DA` | `#2A221D` | barre de recherche, cartes recette, puces, fonds des boutons secondaires |
| Carte | `--cd` | `#FFFFFF` | `#211A16` | surfaces posées sur le fond (tiroir des filtres, bulles) |

Texte posé sur une couleur (calculé pour être lisible) :

| | Jour | Nuit |
|---|---|---|
| Texte sur Piment (`--on`) | `#FFFFFF` | `#161210` |
| Texte sur Curcuma (`--onac`) | `#1E1A17` | `#161210` |
| Texte sur Pistache (`--onfx`) | `#1E1A17` | `#161210` |

Contrastes vérifiés (il faut au moins 4,5) : texte/fond 16,1 (jour) et 16,9 (nuit) ; blanc sur Piment 5,0 / 6,1 ;
texte sur Curcuma 9,5 / 12,0 ; texte sur Pistache 5,0 / 8,7 ; texte sur Douce 14,0 / 14,2.

**Règles :**
- Le Curcuma n'est jamais du texte sur le fond clair (contraste 1,8) : c'est une couleur de surface (bouton, bloc, pastille).
- Le Piment de jour sert pour les surfaces ; pour du petit texte coloré, préférer `--tx`.
- Les blocs de couleur tournent dans cet ordre : Curcuma, Pistache, Texte (fond foncé), Douce, Piment.

**Jour / nuit :** suit le réglage du téléphone, avec l'interrupteur dans l'en-tête (effet 27 : piste Douce,
rond Piment qui glisse en 0,45 s). Le choix est gardé dans le navigateur.

## La police (Google Fonts, gratuite)
- Une seule famille : **Bricolage Grotesque** (réglages 12..96, graisses 400, 600, 800).
- Titres : graisse 800, lettres resserrées (-0,03 à -0,04 em), interligne serré (1 à 1,1).
- Texte : graisse 400 (600 pour les boutons et les puces), 16 px au moins, interligne 1,5.
- Secours : `"Segoe UI", system-ui, -apple-system, sans-serif`.
- Lien : `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap`

## Formes
- Coins arrondis : grands blocs (carte vedette) 28 px ; cartes et raccourcis 20 à 22 px ; boutons, puces et recherche en pilule (999 px).
- Pas d'ombre au repos, pas de dégradé, pas de trait fin pour séparer : un changement de couleur à la place.
  Une ombre seulement sur ce qui flotte vraiment (tiroir des filtres, message qui monte).
- Carte vedette : bloc Piment plein, texte `--on`, le dessin du plat dans un rond Curcuma, bouton Curcuma.
- Raccourcis : blocs de couleur pleine en 2 colonnes (le dernier sur toute la largeur), texte en 800.
- Cartes recette : fond Douce, en haut un champ de couleur (Pistache, Curcuma… à tour de rôle) qui porte l'image ou le dessin.
- Barre d'onglets : pilule foncée (`--tx`) qui flotte en bas, texte `--bg`, onglet actif en pastille Curcuma.
- Image de remplacement d'un plat (en attendant les images IA) : le dessin du plat s'il existe, sinon le logo, sur le champ de couleur de la carte.

## Le logo : « La boîte à épices »
Le couvercle rond d'une boîte à épices, couleur Piment, avec un G dessus. Il se dévisse, et trois grains d'épices en sautent.
- `logo.svg` : le logo animé (dessin 64 × 64, couleurs de jour, marche aussi tout seul).
- Dessin : rond (32, 34) rayon 25 en Piment ; anneau (32, 34) rayon 19,5 en `--on` à 35 % (épaisseur 2) ;
  le G tracé `M40.5 25.5A12 12 0 1 0 44 34H33` en `--on` (épaisseur 6, bouts arrondis) ;
  3 grains : (9, 13) r 3,8 Curcuma, (56, 8) r 3,2 Pistache, (58, 54) r 2,8 Texte.
- Animation (5 s, en boucle) : le couvercle recule de 25°, puis fait un tour complet avec un petit dépassement ;
  les grains sortent du centre et sautent à leur place, avec un petit rebond, puis s'effacent avant le tour suivant.
- `favicon.svg` : l'icône d'onglet, sans animation (passe tout seul en couleurs de nuit).
  `favicon-32.png` et `apple-touch-icon.png` (180 × 180, fond `#FAF6F1`) : le même dessin en image.
- Dans les pages, on colle le dessin du logo directement (couleurs en `var(--pr)`, `var(--on)`…) pour qu'il suive jour / nuit.

## Les petits dessins (SVG animés, dessinés en code)
Rangés dans `dessins/`. Formes pleines et simples, aux couleurs du look ; chaque fichier marche tout seul
(couleurs de secours) et suit les couleurs de la page quand on le colle dedans.

| Fichier | Recette | Ce qui bouge | Fond conseillé |
|---|---|---|---|
| `dessins/piment.svg` | Tacos de carnitas, Poulet basquaise | Le piment danse (se balance de ± 10° et saute de 8 px, 1,4 s) | Curcuma |
| `dessins/spaghetti.svg` | Spaghetti alla carbonara | La fourchette se balance (± 9°, 2,4 s), les pâtes s'enroulent, les brins pendent et bougent | Pistache |
| `dessins/dal.svg` | Dal de lentilles corail | Les lentilles sautent dans le bol, chacune à son tour (1,3 s) | Douce |

D'autres dessins viendront dans le même style (formes pleines, 2 ou 3 couleurs du look, un seul mouvement simple).

## Les effets

Gardés de l'ancien look (ils vont avec les blocs de couleur et les épices), avec leurs nouvelles couleurs :

| N° | Nom | Sur quel élément | Réglages |
|---|---|---|---|
| 3 | Carte en couches ★ (l'effet star) | Carte vedette « De saison en ce moment » (accueil) | 3 couches : bloc Piment (profondeur 0,4), rond Curcuma avec le dessin du plat (1,3), textes et bouton (2,2). Penche au plus 9°, retour en 0,8 s. Sur iPhone : seulement au glissement horizontal du doigt (`touch-action: pan-y`). |
| 78 | Courant d'épices | Fond de l'accueil | Environ 1 grain pour 1 700 px² (650 au plus) : moitié Piment, un quart Curcuma, un quart Pistache. Traits de 2 px avec une courte traînée, courant lent, tourbillon sous le doigt (rayon 120 px). En pause quand l'onglet est caché. |
| 14 | Texte qui s'écrit | Barre de recherche (accueil) | Comme avant (55 ms par lettre, 2 s de pause). Curseur Piment. S'arrête dès qu'on touche la barre. |
| 2 | Carte qui penche en 3D | Cartes recette | Penche au plus 8°, retour en 0,7 s, **sans ombre**. Sur iPhone : glissement horizontal seulement. |
| 6 | Bouton aimanté (ralenti) | Bouton « Ajouter à ma liste de courses » | Comme avant. Message « 8 ingrédients ajoutés à ta liste » qui monte en 0,35 s (pilule foncée `--tx`). |
| 36 | Icônes qui se dessinent | Carte de France (Explorer) | Comme avant. Trait Texte de 2,5 px ; la région touchée se remplit en Piment (0,5 s). |
| 152 | Herbes aromatiques qui poussent | Fond de l'écran Explorer | Comme avant. Romarin en Piment, basilic en Pistache, thym en Curcuma, tiges couleur Texte (38 %). |
| 66 | Tuiles « bento » | Pays (onglet Monde) | Comme avant. Fonds Curcuma / Pistache / Piment / Douce à tour de rôle (texte `--onac`, `--onfx`, `--on`) ; pays sans recette en gris, plat en noir et blanc. |
| 16 | Onde au toucher | Puces de filtre | Onde Curcuma (70 %), 0,6 s. |
| 46 | Coche qui se dessine | Choix du tiroir des filtres | Rond Douce → Piment, coche `--on` qui se trace en 0,4 s. |
| 192 | Feuille qu'on tire | Tiroir des filtres sur iPhone | Comme avant (fond `--cd`, poignée `--tx` à 30 %). |
| 232 | Cartes qui glissent à leur place | Cartes de la liste, quand un filtre change | Comme avant. |
| 13 | Petit « pop » | Le ♥ favori | Comme avant. Vide = Texte à 35 % ; plein = Piment. |
| 42 | Onglets qui glissent | Barre d'onglets | La pastille Curcuma glisse jusqu'à l'onglet touché en 0,45 s (léger rebond). Pastille du nombre sur « Courses » : Piment. |
| 48 | Chiffres qui roulent | Minuteur du mode cuisine | Comme avant, police Bricolage Grotesque 800. |
| 27 | Interrupteur jour / nuit | En-tête | Piste Douce, rond Piment qui glisse en 0,45 s. Repris par « Mode strict ». |

Nouveaux avec ce look : le logo animé et les petits dessins animés (voir plus haut). Ils ne comptent pas comme effets décoratifs de page.

**Retirés (ne vont plus avec ce look) :**
- 8 Voile qui suit la direction (raccourcis) : les raccourcis sont déjà des blocs de couleur pleine, un voile par-dessus les brouillerait.
  À la place : le bloc s'enfonce un peu à l'appui (96 %, 0,2 s).
- Les ombres douces au repos (cartes, carte vedette, bouton) : le nouveau look sépare par la couleur, pas par l'ombre.
- Le soleil Accent de la carte vedette : remplacé par le rond Curcuma qui porte le dessin du plat.

**Les règles d'or, page par page :**
- 1 seul effet star : le 3, sur l'accueil.
- Accueil : 78, 3, 2, 14 (le 8 est retiré). Écran recette : 6 (+ 2 si des cartes sont montrées).
  Écran Explorer : 36, 152 et 66. Liste des recettes : 2, 16, 46, 192 et 232.
  Filtre régime : la puce Régime reprend 16, ses cases 46, son tiroir 192 ; « Mode strict » reprend l'interrupteur 27 ;
  « Déjà compatibles » = logo plein, « Adaptables » = logo en contour, et sous la carte un cadre en pointillés
  « Version adaptée : N ingrédients remplacés ». Bandeau « Mes régimes » : pilule Douce, sans effet.
- Le ♥ (13), les onglets (42), le minuteur (48) et l'interrupteur (27) sont des réactions au geste et ne comptent pas.
- Ne pas ajouter d'autres effets sans me demander.

**Pour tous les effets :**
- Seulement `transform` et `opacity` (rapide, la batterie ne chauffe pas).
- Les animations qui sortent de l'écran se mettent en pause.
- « Réduire les animations » activé sur l'iPhone : pas de penche, pas d'aimant, grains d'épices immobiles, herbes déjà poussées et immobiles,
  pas de texte qui s'écrit, carte déjà dessinée, logo et petits dessins immobiles (dans leur position finale) ;
  le ♥ et les onglets changent sans bouger.
- Le défilement de la page n'est jamais bloqué par un effet.
- Proposés mais pas retenus : à la mission 2, 64 Forme en particules, 4 Reflet brillant, 81 Toile élastique, 202 Anneau du minuteur ;
  à la mission 10, les looks « Carnet de voyage » et « Herbier du marché » (toujours visibles dans `choix-style.html`).
