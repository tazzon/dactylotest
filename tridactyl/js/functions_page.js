/*******************************************************************************
Toutes les fonctions liées à la page pour le gestion des cadres des options, 
demande d'un nouveau texte…
*******************************************************************************/

//cette fonction permet d'avoir un nouveau texte
var lecon_mots = "";													// les mots de la leçon
var lecon_tri = "";														// les trigrammes de la leçon
var rep_mots = 8;//8       											// le nombre de répétitions des mots
var rep_tri = 13;//13	    												// le nombre de répétitions des trigrammes
var tri_replace = 4;                          // tout les combien remplacer par un trigramme différent pour tuer la monotonie
var le_texte = new Array;											//c'est le texte avec les corrections typo validées dans les options
var lecon_nb;
var lecon_en_cours = 1;												// le numéro de la leçon
var lecon = new Array;
var lecon_tab = new Array("lecon3","lecon7","lecon11","lecon15");
var lecon_type = 0;
var cur_checked = "checked";


var description = "<p style=\"text-align:justify\">Leçons à partir de trigrammes les plus récurrents.<br/><br/>"
                + "L’apprentissage existe en 4 jeux de leçons de longueur différente répartis en suffisamment de trigrammes pour obtenir au moins 3, 7, 11 et 15 mots.<br/>" 
                + "À chacun de choisir la longueur de l’apprentissage qui lui convient pour apprendre :<br/>"
                + "<br/>"
                + "— 30 leçons de 3 mots, 4 à 5 minutes par jour pendant 1 mois ;<br/>"
                + "— 30 leçons de 7 mots, 8 à 10 minutes par jour pendant 1 mois ;<br/>"    
                + "— 24 leçons de 11 mots, 12 à 15 minutes par jour à la pause déjeuner pendant 1 mois ;<br/>"            
                + "— 19 leçons de 15 mots, 15 à 20 minutes par jour à la pause déjeuner pendant 1 mois.<br/>"
                + "<br/>"
                + "Un accroissement de la vitesse et de la précision de seulement 20 % devrait libérer environ 1 heure par jour pour tous les jours de votre vie au bureau.<br/>"
                + "Un doublement de la vitesse devrait permettre de libérer 1/2 journée par jour de clavier.<br/>"
                + "Même si pendant l’apprentissage votre vitesse se trouvait réduite de 50 % cela devrait être compensé par moins de temps perdu en correction orthographique et une meilleure syntaxe.<br/>"
                + "Un enfant qui apprendrait la dactylographie à l’aveugle dispose d’un excellent moyen pour réduire la dyslexie et améliorer les résultats scolaires en terme d’efficacité et de présentation et cela en seulement 30 jours d’apprentissage.</p>";


function change_type_lecon(a)
{
  if (lecon_type != a)
  {
    lecon_type = a;
   //alert(lecon_tab[lecon_type]+'()');
    eval(lecon_tab[lecon_type]+'()');
    change_lecon("=");
  }


}


function change_lecon(a)
{
	change_type_lecon(lecon_type);
  if (a=="+" && lecon_en_cours<lecon.length-1)
		lecon_en_cours++;
	else if (a=="-" && lecon_en_cours>1)
		lecon_en_cours--;

  if (lecon_en_cours > lecon.length-1)
    lecon_en_cours = lecon.length-1;
  	
	new_text(lecon_en_cours);
}


function new_text(a)
{ 
	//on réinitialise les variables
	le_texte = new Array;
	l=0;
	nb_sp=1;
	// rien pour l'instant
	if (!a)
		a=1;

	// requête JavaScript pour récupérer numéro###credit###texte
	/*var req = "new_text.php?t="+lecon_nb+"&l="+document.getElementById("lang").value;
	if (document.getElementById("methode").value == "number")
	{
		var prompt_result = prompt("Indiquer ici le numéro du texte que vous souhaitez charger.",lecon_nb);
		if (prompt_result == null)
			return; 
		req += "&force="+prompt_result;
	}
	var req_text = request(req,"text_nmbr"); */
	
	//var req_text = "1###que les lle des ent ant###vouvoiements desquelles entant lesquelles";

	var req_text = lecon[a];
	
	var reg = new RegExp("###","g");
	var t_get = req_text.split(reg);
	lecon_mots = t_get[2];
	lecon_tri = t_get[1];
	lecon_nb = t_get[0];
		


	document.getElementById("resultats").innerHTML = "";
	document.getElementById("txt").value = "";																		//on efface le texte précédement tapé
	document.getElementById("txt").focus();

	reg = new RegExp(" ","g");
	var tab_tri = lecon_tri.split(reg);
	var tab_mots = lecon_mots.split(reg);
	
	// mise en forme des leçons
	var ligne=0;
	
	le_texte[ligne] = lecon_tri;
	ligne++;
	var j=0;
	for (var i=0 ; i<tab_tri.length ; i++)
	{
		le_texte[ligne] = "";
		for (var r=0 ; r<rep_tri ; r++)
		{
		  if((r+1)%tri_replace == 0)
      {
        j++;
        if (tab_tri[j] == tab_tri[i])
          j++;
        if (j >= tab_tri.length)
          j=0;
          
        var k = j;
      }
      else
        k=i;
		
			if (r < rep_tri-1)
			{
				le_texte[ligne] += tab_tri[k]+" ";
			}
      else
				le_texte[ligne] += tab_tri[k];
		}
		ligne++;
	}
  le_texte[ligne] = lecon_tri;
	ligne++;
	
	le_texte[ligne] = lecon_mots;
	ligne++;
	
	for (var i=0 ; i<tab_mots.length ; i++)
	{
		le_texte[ligne] = "";
		for (var r=0 ; r<rep_mots ; r++)
		{
			if (r < rep_mots-1)
				le_texte[ligne] += tab_mots[i]+" ";
			else
				le_texte[ligne] += tab_mots[i];
		}
		ligne++;
	}
	// fin de mise en forme des leçons
	ligne_suivante();
	
	//document.getElementById("txt").style.backgroundColor = "#f0fff0";						 //on met le fond de la zone de frappe en vert
	//document.getElementById("txt").readOnly = false;															//et en écriture
	
  var selected = new Array;
  for (var i=0 ; i<4 ; i++)
  {
    if (lecon_type == i)
      selected[i] = "selected";
  }
  
  //pour éviter le décalage des boutons quand les leçons sont supérieures à 9
  var space_sup = "&nbsp;";
  if (lecon_en_cours >= 10)
    space_sup = "";

  document.getElementById("text_nmbr").innerHTML = '<strong>Leçon nº'+lecon_en_cours+space_sup+'</strong> '
                                                  +'<input type="button" id="but_-" onclick="change_lecon(\'-\')" value="−"/> '
                                                  +'<input type="button" id="but_+" onclick="change_lecon(\'+\')" value="+"/> '
                                                  +'<input type="button" id="but_+" onclick="change_lecon(\'=\')" value="Recommencer"/> '
                                                  //+'<input type="checkbox" onChange="val_curseur(this.checked)" '+cur_checked+'/> Activer le curseur'
                                                  //+'<input type="checkbox" id="antiback"/> Activer anti-correction'
                                                  +'<input type="button" onClick="view_options(\'block\')" value="Options" />'
                                                  +'<br/>'
                                                  +'en mode <select style="width:90px" id="type select" onChange="change_type_lecon(this.value)"><option '+selected[0]+' value="0">3 mots</option><option '+selected[1]+' value="1">7 mots</option><option '+selected[2]+' value="2">11 mots</option><option '+selected[3]+' value="3">15 mots</option></select>'
                                                  +'<br/>'
                                                  +'— trigrammes : '+lecon_tri+" ;<br/>— mots : "+lecon_mots+'.';



	document.getElementById("but_+").style.color = "inherit";
	document.getElementById("but_+").style.borderColor = "inherit";
	document.getElementById("but_-").style.color = "inherit";
	document.getElementById("but_-").style.borderColor = "inherit";

	if (lecon_en_cours == 1)
	{
		document.getElementById("but_-").style.color = "grey";
		document.getElementById("but_-").style.borderColor = "grey";
	}
	if (lecon_en_cours == lecon.length-1)
	{
		document.getElementById("but_+").style.color = "grey";
		document.getElementById("but_+").style.borderColor = "grey";
	}
}

function view_options(action)
{

if (action == "")
  return;
  
document.getElementById("options").style.display = action;
document.getElementById("voile").style.display = action;

if (action == "block")
  document.getElementById("txt").blur(); 
if (action == "none")
  document.getElementById("txt").focus();

}

function options(e)
{
	//var touche = window.event ? e.keyCode : e.which;
	//alert(touche);
}



// cette fonction permet de sauver les préférences des options en enregistrant des cookies
/*function save_opt()
{
	var id_ = "";																																 // le nom temporaire de l'ID de l'input
	var check_ = "";																															// l'état temporaire du checkbox de l'input
	
	// url pour la requete
	var url = "save_pref.php?";

	// un tableau de tous les inputs qui se trouvent dans les options
	var list = document.getElementById("options").getElementsByTagName("input");

	for (var i=0 ; i<list.length ; i++)
	{
		
		id_ = document.getElementById("options").getElementsByTagName("input")[i].id;
		check_ = document.getElementById(id_).checked;
		url += "&"+id_+"="+check_;
	}

	val_result("save");																													 // sauvegarde du champ de résultats
	var req_rep = request(url,"resultats");
	// affichage du retour de la requête
	document.getElementById("resultats").innerHTML="<strong>"+req_rep+"</strong>";
	document.getElementById("resultats").style.border = "none";
	document.getElementById("resultats").style.backgroundColor = "inherit";
	setTimeout('val_result("resto")',1500);																			 // restauration du champ de résultats dans 1s				

}*/

	
