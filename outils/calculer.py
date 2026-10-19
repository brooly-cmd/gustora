# Outil facultatif : recalcule les fiches à partir de ingredients.json (rien à installer, Python suffit).
# Pour chaque recette : prix par personne, budget, calories et régimes (niveau souple et niveau strict) ;
# puis le sommaire recettes/index.json.
# Dans « contient » : "oui" = évident (compte toujours), "cache" = caché ou traces (compte seulement en strict), "non".
# Vérifie aussi : ingrédient inconnu, remplaçant manquant, recette en double dans une zone.
# Lancer depuis le dossier Gustora :  python outils/calculer.py
import json, glob, sys

ing = json.load(open('ingredients.json', encoding='utf-8'))
PAR = {i['id']: i for i in ing['ingredients']}
CONV = ing['conversions']
CLE = {'sansGluten': 'gluten', 'sansLactose': 'lactose', 'pauvreFodmap': 'fodmap'}
soucis = []

for i in PAR.values():
    for r in i.get('remplacants', {}).values():
        if r['id'] not in PAR: soucis.append(f"{i['id']} : remplaçant inconnu {r['id']}")

def base(l):  # quantité en g, ml ou pièces (cuillères et pincées converties)
    return 0 if l['quantite'] is None else l['quantite'] * CONV.get(l['unite'], 1)

NIVEAUX = {'souple': ('oui',), 'strict': ('oui', 'cache')}
def regimes(r, niveau):
    out, ids, compte = {}, [l['id'] for l in r['ingredients']], NIVEAUX[niveau]
    gene = lambda g, k: PAR[g]['contient'][k] in compte
    for reg, k in CLE.items():
        genants = [g for g in ids if gene(g, k)]
        out[reg] = 'oui' if not genants else 'adaptable' if all(reg in PAR[g]['remplacants'] for g in genants) else 'non'
    out['vegetarien'] = 'non' if any(gene(g, 'viandePoisson') for g in ids) else 'oui'
    out['vegan'] = 'non' if any(gene(g, 'origineAnimale') for g in ids) else 'oui'
    return out

# Même mise en page que les fichiers existants : les petits objets tiennent sur une ligne.
def simple(v): return not isinstance(v, (dict, list)) or (isinstance(v, list) and all(not isinstance(e, (dict, list)) for e in v))
def joli(x, ind=0):
    p, d = '  ' * ind, lambda v: json.dumps(v, ensure_ascii=False)
    if isinstance(x, dict) and ind >= 3 and all(simple(v) for v in x.values()):
        return '{ ' + ', '.join(f'{d(k)}: {d(v)}' for k, v in x.items()) + ' }'
    if isinstance(x, dict):
        return '{\n' + ',\n'.join(f'{p}  {d(k)}: {joli(v, ind+1)}' for k, v in x.items()) + f'\n{p}}}'
    if isinstance(x, list) and not simple(x):
        return '[\n' + ',\n'.join(f'{p}  {joli(e, ind+1)}' for e in x) + f'\n{p}]'
    return d(x)

zones, sommaire = [], []
for f in sorted(glob.glob('recettes/*.json')):
    if f.endswith('index.json'): continue
    z = json.load(open(f, encoding='utf-8'))
    noms = set()
    for r in z['recettes']:
        inconnus = [l['id'] for l in r['ingredients'] if l['id'] not in PAR]
        if inconnus: soucis.append(f"{r['id']} : ingrédients inconnus {inconnus}"); continue
        if r['nom'].lower() in noms: soucis.append(f"{r['id']} : recette en double dans {z['zone']}")
        noms.add(r['nom'].lower())
        n = r['personnes']
        prix = sum(base(l) / PAR[l['id']]['pour'] * PAR[l['id']]['prix'] for l in r['ingredients']) / n
        kcal = sum(base(l) / PAR[l['id']]['pour'] * PAR[l['id']]['kcal'] for l in r['ingredients']) / n
        p = round(round(prix * 20) / 20, 2)                                            # à 5 centimes
        r['prixParPersonne'] = int(p) if p == int(p) else p
        r['budget'] = '€' if r['prixParPersonne'] < 2 else '€€' if r['prixParPersonne'] <= 5 else '€€€'
        r['calories'] = int(round(kcal / 10) * 10)                                     # à 10 kcal
        r['regimes'] = {niv: regimes(r, niv) for niv in NIVEAUX}
        # Chaque note s'affiche quand son ingrédient « si » est remplacé : il doit être dans la recette, avec un remplaçant.
        for reg, notes in r.get('notesAdaptation', {}).items():
            for n in notes:
                if n['si'] not in [l['id'] for l in r['ingredients']] or reg not in PAR[n['si']]['remplacants']:
                    soucis.append(f"{r['id']} : la note « {n['texte'][:30]}… » ne correspond à aucun remplacement")
        sommaire.append({'id': r['id'], 'nom': r['nom'], 'zone': r['zone'], 'type': r['type'],
          'tempsTotal': r['tempsPreparation'] + r['tempsCuisson'], 'budget': r['budget'], 'prixParPersonne': r['prixParPersonne'],
          'saisons': r['saisons'], 'ingredients': [l['id'] for l in r['ingredients']], 'image': r['image'],
          'calories': r['calories'], 'regimes': r['regimes']})
    zones.append({'nom': z['zone'], 'fichier': f.replace('\\', '/').split('/')[-1], 'nombre': len(z['recettes'])})
    with open(f, 'w', encoding='utf-8', newline='\n') as o: o.write(joli(z) + '\n')

with open('recettes/index.json', 'w', encoding='utf-8', newline='\n') as o:
    json.dump({'zones': zones, 'recettes': sommaire}, o, ensure_ascii=False, indent=2); o.write('\n')

print(f"{len(sommaire)} recettes recalculées dans {len(zones)} zones.")
for s in soucis: print('À regarder :', s)
sys.exit(1 if soucis else 0)
