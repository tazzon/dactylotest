/*******************************************************************************
fichier de gestion des fantômes, lecture, création, chargement…
*******************************************************************************/


var stop_ghost = false; // par défaut, le fantôme est prêt
var posghost=0;
var g=0;
var cur_col_ghost = "#ffcfff";
var ghost = "";


function play_ghost() 
{ 
	if (stop_ghost)           // si le fantôme se fait stopper
    return;                 // on stoppe la fonction

  posghost = ghost[g].pos;  // sinon on valide la prochaine position
  curseur();                // on affiche le curseur

  if(g < (ghost.length-1))  // si la valeur du compteur de fantôme est inférieur au nombre d'entrées dans le tableau
    setTimeout("g++;play_ghost()",ghost[g].time);  // on incrémente le compteur et on lance le prochain affichage
}




// fonction qui permet la création d'un fantôme
var ghost = new Array;
function pos_time_gh(a,b)
{
  this.pos = a;
  this.time = b;
}

// fonction pour créer un fantôme depuis la session précédente
function make_ghost_from_session(type)
{
  //il faut ajouter une valeur dans la liste de frappe
  list_f[-1] = new list("");        //le -1 ne vaut rien, c'est juste pour que les temps soient bon 
  list_f[-1].time = list_f[0].time; //et on donne la valeur du temps 0 au temps -1
  list_f[-2] = new list("");        //le -1 ne vaut rien, c'est juste pour que les temps soient bon 
  list_f[-2].time = list_f[0].time; //et on donne la valeur du temps 0 au temps -1
 
  ghost = new Array;  // on réinitialise le fantôme
  
  // on cré le fantôme
  for (var i=0 ; i<list_f.length ; i++)
  {
    ghost[i] = new pos_time_gh(list_f[i].val.length,list_f[i-1].time-list_f[i-2].time); 
  }
  // on cré la dernière valeur pour déplacer le curseur une dernière fois comme pour la frappe normale
  ghost[ghost.length] = new pos_time_gh(ghost[ghost.length-1].pos+1,"fin");
  
  /*document.getElementById("resultats").innerHTML = "i : position temps<br/>";
  for (var i = 0 ; i < list_f.length ; i++)
  {
    document.getElementById("resultats").innerHTML += i + " : " + ghost[i].pos + " " + ghost[i].time +" - "+ list_f[i].val.length + " "+ list_f[i-1].time +"<br/>";
  }*/
  // on affiche le fait que le fantôme est créé
  if (type != "server")
  {
    document.getElementById("result_ghost").innerHTML = "<strong>Le fantôme a été créé en local.</strong>";
    setTimeout('document.getElementById("result_ghost").innerHTML=""',1500); // et on enlève 1,5s après
  }
}

function make_ghost_from_session_and_save_it()
{
  make_ghost_from_session("server");
  //alert(GetCookie("name"));
  if (GetCookie("name"))
    var pseudo = prompt("Une personne a déjà enregistré un fantôme depuis cette ordinateur.\nVous pouvez modifier le nom si vous le souhaitez, sinon validez.",GetCookie("name"));
  else
    var pseudo = prompt("Indiquez votre nom pour la sauvegarde.\nSi vous n'indiquez pas de nom, il sera enregistré sous \"anonym\".\nAnnuler pour ne pas enregistrer.");
    
  if(pseudo != null)
  {
    //remplacement des espaces par des espaces insécables (pour l'avoir qu'un block pour le pseudo)
    pseudo = pseudo.replace(/ /g," ");

    
    var lang = document.getElementById("lang").value;
    // mpm c'est mpm_session
    // le numéro du texte c'est text_nb
    // on génère le fantôme à enregistrer
    var gh = ""; 
    for (var i=0 ; i<ghost.length ; i++)
    {
      gh += ghost[i].pos+"--"+ghost[i].time+"__"; 
    }
    
    // fablication de la requète
    var req = "save_ghost.php?auteur="+pseudo+"&mpm="+mpm_session+"&text="+text_nb+"&lang="+lang+"&ghost="+gh;
    // envoi de la requète
    var req_text = request(req,"result_ghost");
    document.getElementById("result_ghost").innerHTML = req_text;
    //setTimeout('document.getElementById("result_ghost").innerHTML=""',3000); // et on enlève 3s après

    return "alert('Vous ne pouvez pas enregistrer deux fois le même fantôme !')";
  }
}

// fonction qui permet de charger un fantôme depuis le serveur
var ghost_to_load = ""; // le nom du fantôme quand on clic sur les boutons radio

Array.prototype.inArray = function(p_val) {
    var l = this.length;
    for(var i = 0; i < l; i++) {
        if(this[i] == p_val) {
            return true;
        }
    }
    return false;
}

function load_ghost(a)
{

  //affichage des fantôme disponible a="list"
  if(a == "list" || a == "all")
  {
    val_result("save");
    document.getElementById("resultats").style.border = "none";
    document.getElementById("resultats").style.backgroundColor = "inherit";

    var lang = document.getElementById("lang").value;
    // fablication de la requète
    var req = "list_ghost.php?text="+text_nb+"&lang="+lang;
    // envoi de la requète
    var req_text = request(req,"resultats");
    
    var a_afficher="Choisissez un fantôme pour le texte nº"+text_nb+'<br/><div id="result_load_ghost"></div><hr/>';
    if(req_text == "no_ghost")
    {
      a_afficher+='Il n’y a pas encore de fantôme pour ce texte.<br/><input type="button" value="Fermer" onclick="val_result(\'resto\')" />';
    }    
    else
    {
      var list = new Array;
      list = req_text.split("###"); // on a donc dans list les différentes lignes
      
      var temp_;

      var limit = 10;       // nombre de fantômes maximum chargés (les meilleurs)
      if (list.length < limit || a == "all")
        limit = list.length;
        
      if (a != "all")
      {
      // début du patch EyEBURNeR
      // On affiche que des résultats par pseudos « uniques » ainsi que au minimum celui de l'utilisateur
      var uNick=[]; // jeu de mot avec unique et nick
      var ghostCount=0; // nombre de ghost actuellement affichés
      var ghostNick; // nick du ghost en cours d'analyse
      var showGhost=false; // doit on afficher ce ghost
      var cheatLimit=200; // valeur au-delà on considère qu'il y a cheat.
      var currentNick=GetCookie("name");

      for ( i in list)
      {

        var medaille = "";
        switch(ghostCount)
        {
          case 0:
            medaille = '<img src="img/or.png" alt="or" title="Médaille d\'or" />';
            break;
          case 1:
            medaille = '<img src="img/argent.png" alt="argent" title="Médaille d\'argent" />';
            break;
          case 2:
            medaille = '<img src="img/bronze.png" alt="bronze" title="Médaille de bronze" />';
            break;
          case 3:
            medaille = '<img src="img/choco.png" alt="chocolat" title="Médaille en chocolat" />';
            break;
          default:
            medaille = '<img src="img/none.png" alt="pas de médaille" />';
            break;
        }
        showGhost=true;
  
        if(typeof(list[i])=='string') // ghost valide?
        {
          temp_ = list[i].split(" ");
          ghostNick=temp_[2];
          if(uNick.inArray(ghostNick) || ghostCount>=limit)      // jamais de doublon, et on affiche un nombre limité
          {
            showGhost=false;
          }
          if(ghostNick==currentNick && !uNick.inArray(currentNick)) // mais on fait une exception pour afficher au moins une fois le nick de l'utilisateur
            showGhost=true;
  
          if(temp_[3]>cheatLimit)
            showGhost=false;
        }
        else
        {
          showGhost=false;
        }
  
        if(showGhost)
        {
          ghostCount++;
          uNick.push(ghostNick);

          if(ghostNick==currentNick)
            ghostNick='<b>'+ghostNick+'</b>';

            a_afficher += medaille+'<input type="radio" name="radio" onclick="ghost_to_load=this.id" id="'+temp_[0]+'" /> à '+temp_[3]+" mpm par "+ghostNick+" le "+temp_[1]+"<br/>";
        }
    }
      // fin du patch EyEBURNeR
}
else{

      //###################################
      // ancien code
      var nick = GetCookie("name"); // le nom de l'utilisateur pour mettre son nom en gras
      for (var i=0 ; i<limit ; i++)
      {
        var medaille = "";
        switch(i)
        {
          case 0: 
            medaille = '<img src="img/or.png" alt="or" title="Médaille d\'or" />';
            break;
          case 1: 
            medaille = '<img src="img/argent.png" alt="argent" title="Médaille d\'argent" />';
            break;
          case 2: 
            medaille = '<img src="img/bronze.png" alt="bronze" title="Médaille de bronze" />';
            break;
          case 3: 
            medaille = '<img src="img/choco.png" alt="chocolat" title="Médaille en chocolat" />';
            break;
          default:
            medaille = '<img src="img/none.png" alt="pas de médaille" />';
            break;
        }
        
        
        temp_ = list[i].split(" ");
        if (nick != null && temp_[2] == nick)
         temp_[2]= "<strong>"+temp_[2]+"</strong>";


        a_afficher += medaille+'<input type="radio" name="radio" onclick="ghost_to_load=this.id" id="'+temp_[0]+'" /> à '+temp_[3]+" mpm par "+temp_[2]+" le "+temp_[1]+"<br/>";
      }}
      //################################
      if (a!="all")
        var list_all='<input type="button" value="Liste complète" onclick="load_ghost(\'all\')" /> ';
      else
        var list_all="";
      a_afficher = '<p>'+a_afficher+'</p><br/><input type="button" onclick="load_ghost(\'load\')" value="Charger le fantôme" /> '+list_all+'<input type="button" value="Fermer" onclick="val_result(\'resto\')" />';
    }
    document.getElementById("resultats").innerHTML = a_afficher;
  }
  //chargement du fantôme a="load"
  if (a == "load")
  {
    //alert(ghost_to_load);
    // fablication de la requète
    var req = "load_ghost.php?ghost="+ghost_to_load;
    // envoi de la requète
    var req_text = request(req,"result_load_ghost");
    var list = new Array();
    list = req_text.split("__");
    var temp_;
    ghost = new Array;
    for (var i=0 ; i<(list.length-1) ; i++)
    {
      temp_ = list[i].split("--");                          
      ghost[i] = new pos_time_gh(parseInt(temp_[0]),parseInt(temp_[1]));
    }
    
    //val_result("save");
    document.getElementById("result_load_ghost").innerHTML = "Le fantôme a été chargé !";
    document.getElementById("ghost_actif").checked = true;
    //document.getElementById("resultats").style.backgroundColor = "inherit";
    //document.getElementById("resultats").style.border = "none";
    //setTimeout('val_result("resto")',1500); // et on enlève 1,5s après
  }
}

function clean_ghost()
{
  ghost = new Array;
  ghost[0] = new pos_time_gh(0,500);                                            //on cré par défaut un fantôme inutile pour éviter une erreur
  ghost[1] = new pos_time_gh(0,500);                                            //on cré par défaut un fantôme inutile pour éviter une erreur
}


// fonction utile pour le débug —> donne les valeur du fantôme dans le champ "resultats"
function aff_gh()
{
  document.getElementById("resultats").innerHTML = "i : position temps<br/>";
  for (var i = 0 ; i < ghost.length ; i++)
  {
    document.getElementById("resultats").innerHTML += i + " : " + ghost[i].pos + " " + ghost[i].time +"<br/>";
  }
}


//http://www.toutjavascript.com/savoir/savoir02.php3
function getCookieVal(offset) {
	var endstr=document.cookie.indexOf (";", offset);
	if (endstr==-1)
      		endstr=document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie(name) {
	var arg=name+"=";
	var alen=arg.length;
	var clen=document.cookie.length;
	var i=0;
	while (i<clen)
    {
		var j=i+alen;
		if (document.cookie.substring(i, j)==arg)
            return getCookieVal(j);
        i=document.cookie.indexOf(" ",i)+1;
        if (i==0)
            break;
    }
	return null;
}
		