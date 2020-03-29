/*******************************************************************************
À inclure en fin de page pour le démarrage
*******************************************************************************/

document.getElementById("rd_txt").innerHTML = ""; // effacement du message javascipt
if(localStorage.getItem("exo_en_cours") != null)
  exo_en_cours=parseInt(localStorage.getItem("exo_en_cours"));
new_text(exo_en_cours);
document.getElementById("val_curseur").checked = cur_checked;
if(localStorage.getItem("bepo_index") != null)
  bepo_index=parseInt(localStorage.getItem("bepo_index",bepo_index));
if(localStorage.getItem("type_kb") != null)
{
  document.getElementById("type_kb_"+localStorage.getItem("type_kb")).checked=true;
  type_clavier(localStorage.getItem("type_kb"));
}
if(localStorage.getItem("cur") != null)
{
  document.getElementById("val_curseur").checked=JSON.parse(localStorage.getItem("cur"));
  val_curseur(JSON.parse(localStorage.getItem("cur")));
}