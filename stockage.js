// Le carnet du téléphone : ce que le visiteur garde dans SON navigateur (localStorage). Rien n'est envoyé ailleurs.
// Si le navigateur refuse (navigation privée), l'app marche quand même : rien n'est gardé, c'est tout.
const STOCKAGE = {
  lire(cle, defaut){ try { const v = localStorage.getItem('gustora-' + cle); return v === null ? defaut : JSON.parse(v); } catch(e){ return defaut; } },
  ecrire(cle, valeur){ try { localStorage.setItem('gustora-' + cle, JSON.stringify(valeur)); } catch(e){} },
  effacer(cle){ try { localStorage.removeItem('gustora-' + cle); } catch(e){} }
};
