/*******************************************************************************
Toutes les fonctions liées à la page pour le gestion des cadres des options, 
demande d'un nouveau texte…
*******************************************************************************/

//cette fonction permet d'avoir un nouveau texte
var texte_en_cours = "";                                                        //c'est le texte original comme il est obtenu
var le_texte = "";                                                              //c'est le texte avec les corrections typo validées dans les options
var text_nb;
var text_source;
function new_text(a)
{ 
  //on réinitialise les variables
  lost_time = 0;
  nb_err = 0;
  nb_fois_err = 0;
  t_car = new Array;
  list_f = new Array;
  j = 0;
  g=0;
  posghost=0;
  stop_ghost = true;
  ghost_is_start = false;
  curseur_err_bol = false;
  val_result("reset");  

  if(a=="new")
  {
    // requète javascript pour récupérer numéro###credit###texte
    var req = "new_text.php?t="+text_nb+"&l="+document.getElementById("lang").value;
    if (document.getElementById("methode").value == "number")
    {
      var prompt_result = prompt("Indiquer ici le numéro du texte que vous souhaitez charger.",text_nb);
      if (prompt_result == null)
        return; 
      req += "&force="+prompt_result;
    }
    var req_text = request(req,"text_nmbr");
    
    var reg = new RegExp("###","g");
    var t_get = req_text.split(reg);
    texte_en_cours = t_get[2];
    text_source = t_get[1];
    text_nb = t_get[0];
    
    clean_ghost();
  }

  document.getElementById("txt").value = "";                                    //on efface le texte précédement tapé
  val=document.getElementById("txt").value;

  options();                                                                    //on passe par les options pour le mise en forme typographique et l'affichage du texte
  
  document.getElementById("err").style.visibility = "hidden";                   //on cache le champ d'erreur (pas vraiment utile car on ne peut pas finir sur une erreur)
  document.getElementById("txt").style.backgroundColor = "#f0fff0";             //on met le fond de la zone de frappe en vert
  document.getElementById("d_replay").style.visibility = "hidden";              //on cache le bouton de replay
  document.getElementById("txt").readOnly = false;                              //et en écriture
  document.getElementById("resultats").innerHTML = "";                          //on efface les résultats de la session précédente
  document.getElementById("resultats").style.backgroundColor = "inherit";       //on met le fond en blanc
  document.getElementById("resultats").style.border = "none";                   //et sans bordure pour rendre le tout invisible
  if (text_source.length > 45)
    var txt_link = text_source.substr(0,42)+"…";
  else
    var txt_link = text_source;
  document.getElementById("text_nmbr").innerHTML = "Texte nº"+text_nb+' — source : <a title="'+text_source+'" href="'+text_source+'">'+txt_link+"</a>";
}

//cette fonction permet de faire la mise en forme typographique et d'afficher le texte modifié
function options()
{
  le_texte = texte_en_cours;
                                                      //on passe par une autre variable pour conserver le texte original
  //apostrophes
  if (document.getElementById("apo_typ").checked == false)
  {
    le_texte = le_texte.replace(/’/g,"'");
  }
  
  //majuscules accentuées
  if (document.getElementById("maj_acc").checked == false)
  {
    le_texte = le_texte.replace(/[ÉÈÊË]/g,"E");
    le_texte = le_texte.replace(/À/g,"A");
    //on peut bien entendu en ajouter d'autres
  }
  
  //ligatures æ, Æ, œ et Œ
  if (document.getElementById("ligat").checked == false)
  {
    le_texte = le_texte.replace(/œ/g,"oe");
    le_texte = le_texte.replace(/Œ/g,"Oe");
    le_texte = le_texte.replace(/æ/g,"ae");
    le_texte = le_texte.replace(/Æ/g,"Ae");
  }
  
  //guillemets français « »
  if (document.getElementById("quote_fr").checked == false)
  {
    le_texte = le_texte.replace(/« /g,'"');
    le_texte = le_texte.replace(/ »/g,'"');
  }
  
  //espaces insécables
  if (document.getElementById("no_brk_spc").checked == false)
  {
    le_texte = le_texte.replace(/ /g," ");
  }
  
  //points de suspension
  if (document.getElementById("pds").checked == false)
    le_texte = le_texte.replace(/…/g,'...');
  
  var tt = new Array;
  tt = le_texte.split("");                                                      //on split le texte pour récupérer tous les caractères indépendament
  
  // on ajoute les espaces incécables en même temps qu'on englobe chaque caractères dans un span pour le curseur
  for (var i=0 ; i<le_texte.length ; i++)
  {
    if (document.getElementById("no_brk_spc_display").checked == true && tt[i] == " ")
      tt[i] = '<span style="background-color:#cccccc"><span id="car'+(i+1)+'">'+tt[i]+'</span></span>';
    else
      tt[i] = '<span id="car'+(i+1)+'">'+tt[i]+'</span>';
  }

  // et on met tout le texte dans la zone de lecture en recolant le tout
  document.getElementById("rd_txt").innerHTML = '<span id="car-3"></span><span id="car-2"></span><span id="car-1"></span><span id="car0"></span>'+tt.join("");

  if (document.getElementById("curseur_actif").checked)                         //si l'utilisateur en veut
    document.getElementById("car1").style.backgroundColor = cur_col;            //on affiche le curseur jaune

  document.getElementById("txt").focus();                                       //on donne le focus à la zone de frappe
}


//cette fonction permet de faire une mise en forme des temps pour les résultats, utile dans la fonction calcul()
function form_time(time)
{
  var min = time.getMinutes();
  var sec = time.getSeconds();
  var mil = time.getMilliseconds();
  mil = Math.round(mil/100);
  return min +" min. "+ sec +","+ mil +" s";
}


//cette fonction permet de faire les calculs de la session
var mpm_session=0;                                                              //c'est la vitesse en mpm (pour l'enregistrer avec le fantôme)
var debug=false;

function calcul()
{
  var dt = new Array;                                                           //tableau des Δt(i)

  for (var i=0;i<nb_car-1;i++)
  {
    if (!isNaN(t_car[i+1]) && !isNaN(t_car[i]))    
      dt[i] = t_car[i+1]-t_car[i];                                              // on récupère les interval de temps entre chaque frappe
    else
    {
      if (isNaN(t_car[i]))
      {
        dt[i] = t_car[i+1]-((t_car[i-1]+t_car[i+1])/2);                         // on récupère les interval de temps entre chaque frappe
      }
      else if (isNaN(t_car[i+1]))
      {
        dt[i] = ((t_car[i]+t_car[i+2])/2)-t_car[i];                             // on récupère les interval de temps entre chaque frappe
      }
    }
  }
  
  // on calcul le temps entre le 1er et le dernier caractère tapé
  // la particularité c'est que quand on revient au premier pendant la frappe, le temps du caractère 0 (le premier en fait) est réinitialisé, on peut donc recommencé dans recharger de texte par exemple si on le souhaite
  var total_time = t_car[nb_car-1] - t_car[0];
  
  //on calcul les différentes statistiques de la session
  var cps = Math.round(100000 * nb_car / total_time)/100;                       //coups par seconde
  var mpm = Math.round(cps * 600 / lettre_par_mot)/10;                          //mots par minute
  mpm_session = mpm;                                                            //on sauvegarde temporairement pour la donner au fantôme si on enregistre la session
  var precision = Math.round(1000*(nb_car-nb_err)/nb_car)/10;                   //précision
  
  //moyenne de la somme des fréquence de frappe
  //----------------------------------------------
  var msf = 0;                                               
  for (var i=0 ; i<nb_car-1 ; i++)
  {
    msf = msf + 1 / (dt[i]/1000);
  }
  msf = msf/(nb_car-1); 
  var fl = Math.round(cps/msf*10000)/100;                                       // et la fluidité « fl » qui en découle
  //------------------------------------------------

  // la vitesse (en mots par minute) qui aurait pu être atteinte sans les erreurs et le pourcentage de temps perdu 
  var mpm_top = Math.round((1000 * nb_car / (total_time-lost_time))* 600 / lettre_par_mot)/10;
  var lost_time_percent = Math.round(1000*lost_time/total_time)/10;

  if (debug)
  {
    alert("lost_time"+lost_time);
    alert("lost_time_percent"+lost_time_percent);
  }
  
  // le temps perdu et le temps total au format texte
  lost_time = form_time(new Date(lost_time));
  total_time = form_time(new Date(total_time));
  
  // on lance l'affichage des statistiques de la session
  aff_session(cps,mpm,precision,fl,mpm_top,lost_time_percent,lost_time,total_time); 
}


//cette fonction affiche des résultats de la session
function aff_session(cps,mpm,precision,fl,mpm_top,lost_time_percent,lost_time,total_time)
{
  var result = "";
  var nl = "<br/>";
  
  // juste pour l'orthographe
  //------------------------------------ 
  if (nb_fois_err >= 2)
    var txt1 = nb_fois_err+" erreurs";
  else
    var txt1 = nb_fois_err+" erreur";
    
  if (nb_err >= 2)
    var txt2 = nb_err+" fautes";
  else
    var txt2 = nb_err+" faute";
  //------------------------------------

    //on complète la variable de résultats
    result +=  "Temps : "+ total_time +nl
              +"Vous avez fait "+txt1+" ("+txt2+" de frappe)."+nl
              +'Précision : <span title="Précision : > 97 :) ; 92-97 :| ; < 92 :(" id="precision_col" style="color:red"><strong>'+precision+" %</strong></span>"+nl
              +"Coups par seconde : "+cps+" ("+Math.round(cps*60)+" coups/min.)"+nl
              //+'Mots par minute : <span title="Ce chiffre n’est coloré que pour représenter une vitesse à laquelle la frappe devient agréable — 50 mots par minute. Dès que vous atteindrez — ou dépasserez — cette vitesse régulièrement, vous aurez une grande aisance avec le clavier." id="mpm_col" style="color:orange"><strong>'+mpm+"</strong></span>"+nl;
              +'Mots par minute : <span id="mpm_col" style="color:orange"><strong>'+mpm+"</strong></span>"+nl
              +'Fluidité : <span id="fl_col" style="color:red"><strong>'+fl+' %</strong></span>'+nl;
    //        +nl+'<input style="border:none;background-color:none;width:100%" type="text" onclick="this.select()" value="texte nº '+text_nb+' ; '+mpm+'mpm ; Fluid '+fl+'% ; '+txt1+'"/>'+nl;
  
    //si il y a des erreurs
    if (nb_err != 0)
    {
      result += nl+"Sans erreurs, vous auriez pu atteindre <strong>"+mpm_top+"</strong> mots par minute."+nl    //on donne la vitesse
                + "Temps perdu en erreurs : "+ lost_time                                                        //le temps perdu 
                + " soit " + lost_time_percent + "%" +nl;                                                       //et le pourcentage de temps perdu
    }
  //résultats sur la précision
  if (precision >= 97)
  {
    result += nl+"Félicitations ! Votre précision est excellente.";                                           //petite phrase d'encouragement
    result = result.replace('id="precision_col" style="color:red"','id="precision_col" style="color:green"'); //et on passe la précision en vert
  }
  else if (precision > 92)
  {
    result += nl+"Votre précision est correcte.";                                                             //petite phrase pour dire que c'est bon (mais sans plus)
    result = result.replace('id="precision_col" style="color:red"','id="precision_col" style="color:orange"');//et on passe la précision en orange
  }
  else
    result += nl+"Essayez de gagner en précision et la vitesse augmentera.";                                  //petite phrase pour dire que ça sert à rien de taper comme un dinque

  //résultats sur la vitesse
  if (mpm >= 50)
  {
    if (mpm > 90)
      result += nl+"Vous vous entrainez pour un concours !?";
    else
      result += nl+"Félicitations ! Votre vitesse de frappe est excellente.";                                 //petite phrase d'encouragement
    
    result = result.replace('id="mpm_col" style="color:orange"','id="mpm_col" style="color:green"');          //et on passe la vitesse en vert
  }
  
  //résultats sur la fluidité
  if (fl >= 65)
  {
    if (fl > 90)
      result+= nl+"Vous tapez avec beaucoup de régularité ! On pourrait croire que vous êtes un robot !";
    
    result = result.replace('id="fl_col" style="color:red"','id="fl_col" style="color:green"');               //mise en vert parce que c'est bien
  }
  
  else
  {
    result += nl+"Vous n'êtes pas très régulier dans votre frappe.";                                          //sinon petite phrase parce que c'est pas trop bon
  }
 
  result += '<hr><input type="button" class="full_width" onclick="make_ghost_from_session()" value="Créer un fantôme local temporaire"/><br/><input type="button" class="full_width" onclick="this.onclick=make_ghost_from_session_and_save_it()" value="Créer un fantôme et l\'enregistrer sur le serveur"/><div id="result_ghost"></div>'
 
 
  
  //affichage des stats de la session
  document.getElementById("resultats").innerHTML = result;                      //on affiche
  document.getElementById("resultats").style.backgroundColor = "#f0fff0";       //on colorise
  document.getElementById("resultats").style.border = "1px solid black";        //on met une bordure
  
}

//cette fonction permet de sauvegarder la totalité de la zone de résultats et de la restaurer ensuite si besoin
var old_result = new Array;                                                     //le tableau ou est enregistré la zone de résultats
var val_result_bol = false;                                                     //true si on a déjà fait un sauvegarde
function val_result(a)
{
  if (a == "save" && val_result_bol == false)                                   //on sauvegarde
  {
    old_result[0] = document.getElementById("resultats").innerHTML;
    old_result[1] = document.getElementById("resultats").style.backgroundColor;
    old_result[2] = document.getElementById("resultats").style.border;
    val_result_bol = true;
  }
  if (a == "resto" && val_result_bol == true)                                   //on restaure
  {
    document.getElementById("resultats").innerHTML = old_result[0];
    document.getElementById("resultats").style.backgroundColor = old_result[1];
    document.getElementById("resultats").style.border = old_result[2];
    val_result_bol = false;
  }
  if (a == "reset") // permet de supprimer la sauvegarde de la zone de résultats
  {
    old_result[0] = "";
    old_result[1] = "inherit";
    old_result[2] = "inherit";
  }
}

// cette fonction permet de sauver les préférences des options en enregistrant des cookies
function save_opt()
{
  var id_ = "";                                                                 // le nom temporaire de l'ID de l'input
  var check_ = "";                                                              // l'état temporaire du checkbox de l'input
  
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

  val_result("save");                                                           // sauvegarde du champ de résultats
  var req_rep = request(url,"resultats");
  // affichage du retour de la requête
  document.getElementById("resultats").innerHTML="<strong>"+req_rep+"</strong>";
  document.getElementById("resultats").style.border = "none";
  document.getElementById("resultats").style.backgroundColor = "inherit";
  setTimeout('val_result("resto")',1500);                                       // restauration du champ de résultats dans 1s        

}

// pour afficher ou cacher le cadre des options
function view_options()
{
  if (document.getElementById("view_options").style.display == "none")
  {
    document.getElementById("view_options").style.display = "block";
    return "Cacher les options";
  }
  else
  {
    document.getElementById("view_options").style.display = "none";
    return "Afficher les options";
  }
}

// cette fonction permet d'avoir des raccourcis clavier
esc_key = false;
function vidactyl(e)
{
  var touche = window.event ? e.keyCode : e.which;                            //on regarde quelle touche est frappée
  if (touche == 27) // c'est la touche échap
  {
    if (esc_key == true)
    {
      esc_key = false;
      val_result("resto");
      if (document.getElementById("txt").readOnly == false)
        document.getElementById("txt").focus();
    }
    else
    {
      esc_key = true;
      document.getElementById("txt").blur();
      val_result("save");
      document.getElementById("resultats").innerHTML="<p><strong>Mode commande :</strong></p>n : nouveau texte<br/>r : recommencer le texte";
      document.getElementById("resultats").style.border = "none";
      document.getElementById("resultats").style.backgroundColor = "inherit";
    }
  }        
  else
  {
    if (esc_key == true)
    {
      esc_key = false; // dans tous les cas ça évite d'avoir des action alors qu'on est en train de taper du texte
      switch(touche)
      {
        case 78:
        new_text("new");
        break;

        case 82:
        new_text(); 
        break;

        case 68:
        err_test();
        /*var a="";
        var b="";
        var err=0;
        document.getElementById("resultats").innerHTML = "";
        for (var i=0;i<list_f.length;i++)
        {
          a=list_f[i].val;
          b=le_texte.substring(0,list_f[i].val.length);
          if (a!=b)
          {
            err++;
            a='<span style="color:red">'+a+'</span>';
            document.getElementById("resultats").innerHTML+=b+'<br/>'+a+'<br/><br/>';
          }
          else
          {
            a='<span style="color:green">'+a+'</span>';
            document.getElementById("resultats").innerHTML+=b+'<br/>'+a+'<br/><br/>';            
          }
        }*/
        
        break;

        case 67:
          alert(GetCookie(prompt("nom du cookie ?")));
        break;

        default:
          esc_key = false;
          val_result("resto");
          if (document.getElementById("txt").readOnly == false)
            document.getElementById("txt").focus();        
        break;
      }
    }
    else
    {
      esc_key = false;
      val_result("resto");
      if (document.getElementById("txt").readOnly == false)
        document.getElementById("txt").focus();
    }
  }
}
