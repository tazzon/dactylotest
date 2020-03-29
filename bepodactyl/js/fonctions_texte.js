/*******************************************************************************
Toutes les fonctions liées à la frappe, erreurs, curseurs…
*******************************************************************************/

la_couleur_du_curseur = "#7cfc00";
//cette fonction compare le texte tapé à « le_texte »
var val="";                                                                    //c'est le contenu du champ texte
var val_temp=""; //le texte juste avant pour l'anti-correction
var txt_frap = new Array; // on stock dans ce tableau les différentes lignes de texte que l'on vient de taper
var recommencer = false;
var nb_err = 0;
var nb_recom = 0; // nombre de fois qu'on a recommencé la ligne
var nb_tentatives_recom = 3 // nombre de tentatives par ligne avant de passer à la suivante et de repasser la ligne manquée à la fin de l'exercice


function test(e)
{
	// entrer retourne le code 13
	var touche = window.event ? e.keyCode : e.which;
	//if (touche == 32)
		//nb_sp++;
	//alert(touche)
  if (touche == 16 || touche == 225 || touche == 17 || touche == 18 || touche == 27 || touche == 9 || touche == 20 || touche == 91 || touche == 93 || (touche >=112 && touche <=123) ) // shift || ctrl || alt || échap || tab || caps-lock || super || menu || F1 à F12
	  return;
  if (touche == 13 && recommencer == false && val.length <le_texte[l-1].length)
	  return;

  if (touche == 8 && anti_correct)    // anti correction
  {
    document.getElementById("txt").value = val_temp;
    return;
  }


    
	val = document.getElementById("txt").value;                                   //le texte qu'on tape
  if (val.substr(val.length-1,1) != le_texte[l-1].substr(val.length-1,1) && val.length-1 != le_texte[l-1].length && val.length != 0)
  {
    document.getElementById("txt").style.backgroundColor = "#ffbbbb";
    col_cur = "red";

	if (recommencer == false)
		nb_err++;
	recommencer = true;
    document.getElementById("resultats").innerHTML = '<strong style="color:red">Faites Entrée ou terminez la ligne pour la recommencer sans faute ('+(nb_recom+1)+'/'+nb_tentatives_recom+').</strong>';
  }

	if (touche == 13 || val.length >= le_texte[l-1].length+1)
	{
		if (val.substr(val.length-1,1) == " ")
			val = val.substr(0,val.length-1);
		txt_frap[l-1] = val;
		document.getElementById("txt").value = "";
		ligne_suivante();
		val_temp="";
		return;
	}
	if(document.getElementById("val_curseur").checked == true )
	  color_car();	
	
	val_temp=val;
}

function next(e)
{
  var touche = window.event ? e.keyCode : e.which;
	val = document.getElementById("txt").value;                                   //le texte qu'on tape
  if (le_texte[l-1].substr(val.length,1) == " " && touche != 8 && touche != 13) // si c'est une espace qui est prévue et si c'est pas un retour un arrière car un cas de retour vu qu'on remet le car si c'est une esapace, ça fait qu'on passe au mot suivant
    color_mot("next");
  if (le_texte[l-1].substr(val.length-1,1) == " " && touche == 8)
    color_mot("prev");
}

function live_var()
{
	var content = "";
	content = "l="+l+" ; recommencer="+recommencer+" ; nb_recom="+nb_recom+"<br/>";
	content += "le_texte.length="+le_texte.length+"<br/>"; 

	for (var i=0 ; i < le_texte.length ; i++)
		content += le_texte[i]+"<br/>";

	document.getElementById("resultats").innerHTML = content;
}


nbspace = true;
function nbsp_mode()
{
    if (nbspace == false)
    {  
        return le_texte.replace("/ /"," ");
    }
}


// pour passer à la ligne suivante de la leçon
var l = 0;
function ligne_suivante(reload)
{
	if(reload)
          l--;

        col_cur = la_couleur_du_curseur;
	document.getElementById("txt").style.backgroundColor = "inherit";

	if (recommencer == true && nb_recom < (nb_tentatives_recom-1))
	{
		l--;
		nb_recom++;
	}
	else if (recommencer == true && nb_recom >= (nb_tentatives_recom-1) )
	{
		if (le_texte[l-1])
			le_texte[le_texte.length] = le_texte[l-1];
		nb_recom = 0;
	}
	//else if (recommencer == false && nb_recom < (nb_tentatives_recom-1))
        else if (recommencer == false)
        {
		nb_recom = 0;
        }

	if (mode_jeu == true)
	{
		if (recommencer == true)
			vies--;
		else
			vies++;

		document.getElementById("nb_vies").innerHTML = make_heart();

		if (vies == 0)
		{
			document.getElementById("rd_txt").innerHTML = "";
			document.getElementById("resultats").innerHTML = "<strong>Game Over</strong>";
			return;
		}
	}

	document.getElementById("resultats").innerHTML = "";
	if (conseil[exo_en_cours] != 0)
		document.getElementById("resultats").innerHTML = "<strong>Conseil</strong> : "+conseils[conseil[exo_en_cours]];



	//alert(le_texte.length);
	if (l == le_texte.length)
	{
		l=0;
		aff_result();
	}
	else
	{	
		var col_ligne = new Array("inherit","#bbbbbb","#d4d4d4","#eeeeee");
		var mark_ligne = new Array(">> ","   ","   ","   ");
   		var txt="";
		document.getElementById("rd_txt").innerHTML = "";
	
		var ligne_tab = new Array();
	
		for (var i=0 ; i<4 ; i++)
		{
			if (l+i < le_texte.length)// il faut qu'il reste des lignes
			{
				if (i==0) // première ligne pour avoir le curseur
				{
	  				//on découpe le tout pour le reconstituer ensuite avec des span identifiant chaque mot (pour le curseur)
					var reg = new RegExp("","g");
					var ligne_tmp = le_texte[l+i].split(reg);
					
					for (var j=0 ; j<ligne_tmp.length ; j++)
					{
					  if (ligne_tmp[j] == " ") // si c'est une espace insécable
                                          {
                                            if(nbspace == true)
      					      ligne_tmp[j] = '<span id="car_'+j+'">␣</span>';
                                            else
                                              ligne_tmp[j] = '<span id="car_'+j+'"> </span>';
                                          }

                                          else 
				            ligne_tmp[j] = '<span id="car_'+j+'">'+ligne_tmp[j]+'</span>';
					}

					txt=ligne_tmp.join("")+'<span id="car_'+j+'"> </span>';
					//alert(txt);  
				}
				else
				{
					txt=le_texte[l+i];
				}
			//alert(txt);
			ligne_tab[i] = '<span style="color:'+col_ligne[i]+'">'+mark_ligne[i]+txt+'</span><br/>';
			}
		}
		l++;
	//}
	document.getElementById("rd_txt").innerHTML = ligne_tab.join("");
	

	recommencer = false;
	if(document.getElementById("val_curseur").checked == true )
	  color_car("init");	
	//live_var();
	}
	//document.getElementById("resultats").innerHTML = "l="+l+"<br/>"+le_texte[l-1];
}

function val_curseur(a)
{
  if(a)
  {
    col_cur = la_couleur_du_curseur;
    cur_checked = "checked";
    localStorage.setItem("cur",true);
  }
  else
  {
    col_cur = "inherit";
    cur_checked = "";
    localStorage.setItem("cur",false);
  }
  //color_mot();
  color_car();
}


var anti_correct = false;
function val_anti_correct(a)
{

  anti_correct = false;
  if (a == true || a == "init")
    anti_correct = true;
    

  if (anti_correct)
    document.getElementById("anti_correct").checked = "checked";
  else
    document.getElementById("anti_correct").checked = "";
}

var colw = 0;
var col_cur = la_couleur_du_curseur; // couleur du curseur
function  color_car(a)
{
  
  if (a == "init")
	colw = 0;
  else
	colw = document.getElementById("txt").value.length;

	for (var i = 0 ; i < le_texte[l-1].length ; i++)
	{
		if (document.getElementById("car_"+i))
			document.getElementById("car_"+(i)).style.backgroundColor = "inherit";
  	}
	if (document.getElementById("car_"+colw))
		document.getElementById("car_"+colw).style.backgroundColor = col_cur;
}

function aff_result() // replacer les undefined par des espaces insécables (pour l'affichage)
{
  var txt="";
  if(nb_err > 5)
    txt = " Il semblerait que vous ne maîtrisez pas encore totalement cet exercice, vous pouvez le recommencer si vous le souhaitez."; 

	if (nb_err == 0)
    document.getElementById("resultats").innerHTML = "Félicitations ! Vous n'avez fait aucune erreur !";	  
  else if (nb_err < 2)
    document.getElementById("resultats").innerHTML = "Vous avez fait "+nb_err+" erreur.";
	else
    document.getElementById("resultats").innerHTML = "Vous avez fait "+nb_err+" erreurs."+txt;	
	document.getElementById("rd_txt").innerHTML = "";

	nb_err = 0;
	txt_frap = new Array();    // ré-init variable
}








