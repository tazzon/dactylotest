/*******************************************************************************
À inclure en fin de page pour le démarrage
*******************************************************************************/

document.getElementById("rd_txt").innerHTML = ""; // effacement du message javascipt

// reprendre au dernier exercice fait
if(localStorage.getItem("exo_en_cours") != null)
  exo_en_cours=parseInt(localStorage.getItem("exo_en_cours"));

// type de carte clavier utilisée
if(localStorage.getItem("type_kb") != null)
{
  document.getElementById("type_kb_"+localStorage.getItem("type_kb")).checked=true;
  type_kb=parseInt(localStorage.getItem("type_kb"));
  type_clavier();
}
else
{
  document.getElementById("type_kb_"+type_kb).checked=true;
  type_clavier();
}


// version bépo utilisée
if(localStorage.getItem("bepo_index") != null)
  bepo_index=parseInt(localStorage.getItem("bepo_index",bepo_index));
document.getElementById("v_bepo_"+bepo_index).checked=true;
change_bepo_version(bepo_index);

// et c'est parti !
localStorage.setItem("exo_en_cours",exo_en_cours);
new_text(exo_en_cours);


// utilisation du curseur
if(localStorage.getItem("cur") != null)
{
  document.getElementById("val_curseur").checked=JSON.parse(localStorage.getItem("cur"));
  val_curseur(JSON.parse(localStorage.getItem("cur")));
}
else
{
  document.getElementById("val_curseur").checked=true;
  val_curseur(true);
}

