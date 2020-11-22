/*******************************************************************************
Toutes les fonctions liées à la frappe, erreurs, curseurs…
*******************************************************************************/

la_couleur_du_curseur = "#40e0d0";
//cette fonction compare le texte tapé à « le_texte »
var val="";                                                                    //c'est le contenu du champ texte
var val_temp=""; //le texte juste avant pour l'anti-correction
var txt_frap = new Array; // on stocke dans ce tableau les différentes lignes de texte que l'on vient de taper

function test(e)
{
	// entrer retourne le code 13
	var touche = window.event ? e.keyCode : e.which;
	//if (touche == 32)
		//nb_sp++;
	//alert(touche)

  if (touche == 16 || touche == 225 || touche == 17 || touche == 18 || touche == 27 || touche == 9 || touche == 20 || touche == 91 || touche == 93) // shift || ctrl || alt || échap || tab || caps-lock || super || menu
    return;

  if (touche == 8 && anti_correct)    // anti correction
  {
    document.getElementById("txt").value = val_temp;
    return;
  }
    
	val = document.getElementById("txt").value;                                   //le texte qu'on tape
  if (val.substr(val.length-1,1) != le_texte[l-1].substr(val.length-1,1) && val.length-1 != le_texte[l-1].length)
  {
    document.getElementById("txt").style.backgroundColor = "red";
    //var time=document.getElementById("set_time").value;
    var time = 150;
    setTimeout('document.getElementById("txt").style.backgroundColor = "inherit"',time);
  }

	if (touche == 13 || val.length >= le_texte[l-1].length+1)
	{
		//alert(val.length +"-" +val.substr(val.length-1,1) + "-" );
		//alert(le_texte[l])
		if (val.substr(val.length-1,1) == " ")
			val = val.substr(0,val.length-1);
		//alert(val.length);
		//var reg = new RegExp(" ","g")
		//alert(val.replace(reg,"#"));
		txt_frap[l-1] = val;
		//nb_sp=0;
		ligne_suivante();
		val_temp="";
		return;
	}
	
	
	val_temp=val;
}

function next(e)
{
  var touche = window.event ? e.keyCode : e.which;
	val = document.getElementById("txt").value;                                   //le texte qu'on tape
  if (le_texte[l-1].substr(val.length,1) == " " && touche != 8) // si c'est une espace qui est prévue et si c'est pas un retour un arrière car un cas de retour vu qu'on remet le car si c'est une esapace, ça fait qu'on passe au mot suivant
    color_mot("next");
  if (le_texte[l-1].substr(val.length-1,1) == " " && touche == 8)
    color_mot("prev");
}

// pour passer à la ligne suivante de la leçon
var l = 0;
//var pos_sp=new Array(); // la position des espaces dans la ligne courante pour que le curseur soit au bon endroit
function ligne_suivante()
{
	document.getElementById("txt").value = "";
	
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
          //on compte le nombre d'espaces dans la ligne pour pouvoir positionner le curseur au bon endroit
          
          
          //on découpe le tout pour le reconstituer ensuite avec des spans identifiant chaque mot (pour le curseur)
          var reg = new RegExp(" ","g");
          var ligne_tmp = le_texte[l+i].split(reg);
          for (var j=0 ; j<ligne_tmp.length ; j++)
          {
            ligne_tmp[j] = '<span id="mot_'+j+'">'+ligne_tmp[j]+'</span>';
          }
          txt=ligne_tmp.join(" ");  
        }
        else
          txt=le_texte[l+i];
          //alert(txt)
        ligne_tab[i] = '<span style="color:'+col_ligne[i]+'">'+mark_ligne[i]+txt+'</span><br/>';
			}
		}
		
		
		l++;
	}
	document.getElementById("rd_txt").innerHTML = ligne_tab.join("");
	/*for (var i=4 ; i>0 ; i--)
	{
    document.getElementById("rd_txt").innerHTML += ligne_tab[i-1];
  }*/
  color_mot("init");	
}

function val_curseur(a)
{
  if(a)
  {
    col_cur = la_couleur_du_curseur;
    cur_checked = "checked";
  }
  else
  {
    col_cur = "inherit";
    cur_checked = "";
  }
  color_mot();
}


var anti_correct = true;
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
function color_mot(a)
{
  /*if (!document.getElementById("val_cur").checked) // pas de curseur
    return;*/
  
  if (a == "init")
    colw = 0;
  else if (a == "next")
  {
    colw++;
    if (document.getElementById("mot_"+(colw-1)))
      document.getElementById("mot_"+(colw-1)).style.backgroundColor = "inherit";
  }
  else if (a == "prev")
  {
    colw--;
    if (document.getElementById("mot_"+(colw+1)))
      document.getElementById("mot_"+(colw+1)).style.backgroundColor = "inherit";
  }
  
  if (document.getElementById("mot_"+colw))
    document.getElementById("mot_"+colw).style.backgroundColor = col_cur;
}

function aff_result() // replacer les undefined par des espaces insécables (pour l'affichage)
{
	document.getElementById("rd_txt").innerHTML = "";
	var i=0;
	var reg = new RegExp(" ","g");
	//alert("on est ici . "+txt_frap.length);
	
	while (txt_frap.length > i)
	{
		if (txt_frap[i] == le_texte[i])
		{
			document.getElementById("resultats").innerHTML += '<span style="color:green"><strong>—OK— </strong></span>'+txt_frap[i].replace(reg," ")+"<br/><br/>";
		}
		else
		{
      var le_texte_tmp = le_texte[i].replace(reg," "); 
      le_texte_tmp = le_texte_tmp.split("");
			var txt_frap_tmp = txt_frap[i].replace(reg," ");
      txt_frap_tmp = txt_frap_tmp.split("");
			for (var j=0 ; j<le_texte_tmp.length ; j++)
			{
        if (!txt_frap_tmp[j])
          txt_frap_tmp[j] = "_";// pour l'instant c'est la même chose que ce soit souligné parce qu'ensuite il devient rouge mais pas d'espace, ils ne sont pas affichés par le HTML
        if (le_texte_tmp[j] != txt_frap_tmp[j])
					txt_frap_tmp[j] = '<span style="text-decoration:underline;color:red"><strong>'+txt_frap_tmp[j]+'</strong></span>';
			}
      var txt_frap_tmp = txt_frap_tmp.join("");			
			
			
			document.getElementById("resultats").innerHTML += '  >> '+le_texte_tmp.join("")+'<br/><span style="color:red"><strong>-NK- </strong></span>'+txt_frap_tmp+"<br/><br/>";			
			//document.getElementById("resultats").innerHTML += '  >> '+le_texte[i]+'<br/><span style="color:red"><strong>-NK- </strong></span>'+txt_frap[i]+"<br/><br/>";
		}
		//alert(i);
		i++;
	}
	txt_frap = new Array();    // ré-init variable
}








