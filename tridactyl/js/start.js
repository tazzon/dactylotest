/*******************************************************************************
À inclure en fin de page pour le démarrage
*******************************************************************************/

document.getElementById("rd_txt").innerHTML = ""; // effacement du message javascipt
//document.getElementById("demo_ghost").style.backgroundColor = cur_col_ghost;
//document.getElementById("demo_curseur").style.backgroundColor = cur_col;
//document.getElementById("view_options").style.display = "none";
//document.getElementById("d_replay").style.visibility = "hidden";
/*var cur_mix = mix_colors(cur_col,cur_col_ghost) // c'est le mélange des 2 couleurs des curseur du fantôme et de la frappe
clean_ghost();
if (GetCookie("apo_typ") == "true") document.getElementById("apo_typ").checked = true;  
if (GetCookie("maj_acc") == "true") document.getElementById("maj_acc").checked = true;
if (GetCookie("ligat") == "true") document.getElementById("ligat").checked = true;
if (GetCookie("pds") == "true") document.getElementById("pds").checked = true;
if (GetCookie("no_brk_spc") == "true") document.getElementById("no_brk_spc").checked = true;
if (GetCookie("no_brk_spc_display") == "true") document.getElementById("no_brk_spc_display").checked = true;
if (GetCookie("quote_fr") == "true") document.getElementById("quote_fr").checked = true;*/
//change_lecon(28);
lecon3();
new_text();
document.getElementById("resultats").innerHTML = description;
document.getElementById("val_curseur").checked = cur_checked;
val_anti_correct("init")
