/*******************************************************************************
Toutes les fonctions liées à la page pour le gestion des cadres des options, 
demande d'un nouveau texte…
*******************************************************************************/

//cette fonction permet d'avoir un nouveau texte
var exo_en_cours = 0;													// la leçon en cours												// le numéro de la leçon
var cur_checked = "checked";

var le_texte=new Array();

var vies = 2;



function change_exo(a)
{
  if (a=="+" && exo_en_cours<exo[bepo_index].length-1)
    exo_en_cours++;
  else if (a=="-" && exo_en_cours>0)
    exo_en_cours--;

  new_text(exo_en_cours);
  localStorage.setItem("exo_en_cours",exo_en_cours);
}


function new_text(a)
{ 
	//on réinitialise les variables
	le_texte = new Array;
	recommencer = false;
	nb_recom=0;
	l=0;  // la ligne en cours

	if (!a) // si le numéro de l'exercice n'est pas défini
	  a=0;  // on choisi par défaut le premier (donc le 0)

	exo_en_cours = a;  // permet de connaître globalement sur quel exo on se trouve

	var reg = new RegExp("###","g");
	
	le_texte = exo[bepo_index][a].split(reg);
	
	document.getElementById("resultats").innerHTML = "";	// efface la zone de résulats
	document.getElementById("txt").value = "";		// efface le texte frappé																//on efface le texte précédement tapé
	document.getElementById("txt").focus();			// donne le focus à la zone de frappe


	document.getElementById("exo_nb").innerHTML  = (a+1) +" : "+titre[bepo_index][a];	// affiche le numéro de l'exo (+1 pour faire joli) et le titre de l'exercice

	//vies = 2;	
	if (mode_jeu)
		document.getElementById("nb_vies").innerHTML = make_heart();
	else
		document.getElementById("nb_vies").innerHTML = "";


	ligne_suivante();
	
	// ce qui suit permet de griser les boutons [-] et [+]
	document.getElementById("but_+").style.color = "inherit"; 
	document.getElementById("but_+").style.borderColor = "inherit";
	document.getElementById("but_-").style.color = "inherit";
	document.getElementById("but_-").style.borderColor = "inherit";

	if (exo_en_cours == 0)
	{
		document.getElementById("but_-").style.color = "grey";
		document.getElementById("but_-").style.borderColor = "grey";
	}
	if (exo_en_cours == exo[bepo_index].length-1)
	{
		document.getElementById("but_+").style.color = "grey";
		document.getElementById("but_+").style.borderColor = "grey";
	}
	
	color_key(); // colorisation des touches du clavier

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

function view_help(action)
{

if (action == "")
  return;
  
document.getElementById("help").style.display = action;
document.getElementById("voile").style.display = action;

if (action == "block")
  document.getElementById("txt").blur(); 
if (action == "none")
  document.getElementById("txt").focus();

}



var mode_jeu = false;
function modejeu(a)
{
	if (a)
	{
		mode_jeu = true;
		vies = 2;
	}
	else
		mode_jeu = false;
}
function make_heart()
{
	var coeur="&#10084; ";
	var nb_vies="";
	/*for (var i=0 ; i<vies ; i++)
	{
		nb_vies+=coeur;
	}*/	
	return vies+' <span style="color:red">'+coeur+'</span>';
}

function options(e)
{
	//var touche = window.event ? e.keyCode : e.which;
	//alert(touche);
}

function change_bepo_version(index)
{
	bepo_index=index;
	
	//type_clavier(type_kb);
	type_clavier();
	change_exo();
	localStorage.setItem("bepo_index",bepo_index);

}

var type_kb=1; // clavier décalé (0=pas de clavier ; 1=décalé ; 2=typematrix)

function type_clavier(a)
{
	
	if(typeof(a) != "undefined")
	{  
	  if(isNaN(a)) a=parseInt(a);
	  type_kb=a;
	}
	else
	  a=type_kb;
	  
	if (a == 0)
	{
		document.getElementById("aff_kb").innerHTML="";
		document.getElementById("type_kb_0").ckecked=true;
		//localStorage.setItem("type_kb",0);
	}

	if (a == 1)
	{
	  document.getElementById("aff_kb").innerHTML=kb_decal()+'<div class="bepo_version">'+bepo[bepo_index].version+'</div>';
	  document.getElementById("type_kb_1").ckecked=true;
	  //localStorage.setItem("type_kb",1);
	  color_key();
	}
	if (a == 2)
	{
	  document.getElementById("aff_kb").innerHTML=kb_typematrix()+'<div class="bepo_version">'+bepo[bepo_index].version+'</div>';
	  document.getElementById("type_kb_2").ckecked=true;
	  //localStorage.setItem("type_kb",2);
	  color_key();
	}
	localStorage.setItem("type_kb",type_kb);
}


var shift_down = false;
var altgr_down = false;
function get_key(e,action)
{
	var touche = window.event ? e.keyCode : e.which;

	//alert(touche + " " + action);
	if(action == "down") //on enfonce la touche
	{
		if (touche== 16) //shift
			shift_down = true;
		if (touche == 17 || touche == 225) //altgr  linux = 225 ; win = 17 ??? étrange
			altgr_down = true;
	}
	if(action == "up")
	{
		if (touche == 16 || touche == 0) //shift (bug chromium ? le up du shift retourne 0)
			shift_down = false;
		if (touche == 17 || touche == 225) //altgr 
			altgr_down = false;
	}
	var layer=0;
	if (shift_down == true && altgr_down == true)
	{
		layout=bepo[bepo_index].lvl[3];
		layer = 3;
	}
	if (shift_down == true && altgr_down == false)
	{
		layout=bepo[bepo_index].lvl[1];
		layer = 1;
	}
	if (shift_down == false && altgr_down == true)
	{
		layout=bepo[bepo_index].lvl[2];
		layer = 2;
	}
	if (shift_down == false && altgr_down == false)
	{
		layout=bepo[bepo_index].lvl[0];
		layer = 0;
	}
	for (var k = 0 ; k < layout.length ; k++)
	{
	  if(document.getElementById("k"+k))
	  {
		  document.getElementById("k"+k).innerHTML = layout.charAt(k);
		  document.getElementById("ksp").innerHTML = bepo[bepo_index].splvl[layer];
	  }
	}
	color_key();
}

function color_key()
{
	var a;
	var b;
	var exo_pre="";

	for (var key=0 ; key < 48 ; key++)
	{
	  if (document.getElementById("k"+key))
		  document.getElementById("k"+key).style.backgroundColor = "inherit";
	}

	for (var i = 0 ; i < exo_en_cours ; i++)
	{
		exo_pre += lettres[bepo_index][i];
		//alert(exo_pre);
	}

	for (var key=0 ; key < 48 ; key++)
	{
	  if (document.getElementById("k"+key))
	  {
                a = document.getElementById("k"+key).innerHTML;
  
  		for (var lettre = 0 ; lettre < exo_pre.length ; lettre++)
  		{
  			b = exo_pre.charAt(lettre);
  			//alert(key+" _" +a+"_ _"+b+"_");
  			
  			if ( a == b && document.getElementById("k"+key) )
  				document.getElementById("k"+key).style.backgroundColor = "#c1f7ad";
  		}
  		
  		for (var lettre = 0 ; lettre < lettres[bepo_index][exo_en_cours].length ; lettre++)
  		{
  			b = lettres[bepo_index][exo_en_cours].charAt(lettre);
  			//alert(key+" _" +a+"_ _"+b+"_");
  			
  			if ( a == b && document.getElementById("k"+key) )
  				document.getElementById("k"+key).style.backgroundColor = "#7cfc00";
  		}
	  }
	}
	//document.getElementById("k"+key).style.backgroundColor = col;
}


var bepo=[];

bepo[0]={version:"BÉPO V1.0"};
bepo[0].lvl=[];
bepo[0].lvl[0]= "$\"«»()@+-/*=%bépoè^vdljzwauie,ctsrnmçêàyx.k'qghf";
bepo[0].lvl[1]= "#1234567890°`BÉPOÈ!VDLJZWAUIE;CTSRNMÇÊÀYX:K?QGHF";
bepo[0].lvl[2]= "–—<>[]       | &œ ¡      æù¨€’        \\{}… ¿    ";
bepo[0].lvl[3]= " „“”≤≥        ˝ Œ        ÆÙ            ‘’·      ";
bepo[0].splvl=["esp", "esp ins", "_", "esp ins fine"];

bepo[1]={version:"BÉPO V1.1"};
bepo[1].lvl=[];
bepo[1].lvl[0]= "$\"«»()@+-/*=%bépoè^vdljzwauie,ctsrnmçêàyx.k’qghf";
bepo[1].lvl[1]= "#1234567890°`BÉPOÈ!VDLJZWAUIE;CTSRNMÇÊÀYX:K?QGHF";
bepo[1].lvl[2]= "–—<>[]       | &œ ¡      æù¨€'       /\\{}… ¿    ";
bepo[1].lvl[3]= " „“”⩽⩾       _˝ Œ        ÆÙ          ^ ‘’·      ";
bepo[1].splvl=["esp", "esp ins fine", "_", "esp ins"];

var k=0;
var bepo_index=1; // par défaut v1.1
function kb_decal()
{
	var row_dec = new Array(0,35,41,28);
	var key_per_row = new Array(13,12,12,11);
	var space_key={"row_dec":107,"width":123};
	k=0;
	var row=0;
	var diff=0;

	var kb= '<div class="kb">';

	for (var i = 0 ; i < 4 ; i++)
	{
		for(var j = 0 ; j < key_per_row[i] ; j++)
		{
                        k105="";
                        if(k==37)
                          k105="border:dashed 1px black;";
			if(j == 0)
				kb += '<div style="'+k105+'margin-left:'+row_dec[i]+'px" class="key" id="k'+k+'">'+bepo[bepo_index].lvl[0].charAt(k)+'</div>';
			else
				kb += '<div class="key" id="k'+k+'">'+bepo[bepo_index].lvl[0].charAt(k)+'</div>';
			k++;
		}
		kb += '<div style="clear:both"></div>';
	}
	kb += '<div style="margin-left:'+space_key.row_dec+'px;width:'+space_key.width+'px" class="key" id="ksp">'+bepo[bepo_index].splvl[0]+'</div><div style="clear:both"></div>';
	kb += '</div>';
	
	return kb;
}

function kb_typematrix()
{
	var row_dec = new Array(0,26,26,26);
	var key_per_row = new Array(13,12,11,11);
	var key_space = new Array(6,5,5,5);
	var space_key={"row_dec":104,"width":117};
	k=0;
	var row=0;

	var kb= '<div class="kb">';

	for (var i = 0 ; i < 4 ; i++)
	{
		for(var j = 0 ; j < key_per_row[i] ; j++)
		{
 

			if(k == 48)
			  k=36;
			  
                        if(j == 0)
				kb += '<div style="margin-left:'+row_dec[i]+'px" class="key" id="k'+k+'">'+bepo[bepo_index].lvl[0].charAt(k)+'</div>';
			else if(j == key_space[i])
				kb += '<div style="margin-left:20px" class="key" id="k'+k+'">'+bepo[bepo_index].lvl[0].charAt(k)+'</div>';
			else
				kb += '<div class="key" id="k'+k+'">'+bepo[bepo_index].lvl[0].charAt(k)+'</div>';
			k++;
 			if(k == 36)
			  k=38;
       

			

			  
		}
		kb += '<div style="clear:both"></div>';
                //k=48; // pour avoir le nombre total de touche
	}
	kb += '<div style="margin-left:'+space_key.row_dec+'px;width:'+space_key.width+'px" class="key" id="ksp">'+bepo[bepo_index].splvl[0]+'</div><div style="clear:both"></div>';
	kb += '</div>';
	
	return kb;
}

		