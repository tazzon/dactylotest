/*******************************************************************************
Toutes les fonctions liées à la frappe, erreurs, curseurs…
*******************************************************************************/

var nb_err = 0;                                                                 //nombre de fautes de frappe
var nb_fois_err = 0;                                                            //nombre de fois ou le texte est passé en rouge
var nb_car = 500;                                                               //nombre de caractères à frapper
var lettre_par_mot = 5;                                                         //pour le calcul
var lost_time = 0;                                                              //le temps ou le texte est dans le rouge
var lost_time_tmp = 0;                                                          //une valeur temporaire pour le temps perdu
var t_car = new Array;                                                          //c'est un tableau ou on note les temps de chaque frappe juste, l'index du tableau est la position du caractère
var j = 0;                                                                      //c'est une variable qui s'incrémente pour lister tout les caractères pour le replay 
var list_f = new Array;                                                         //c'est le tableau qu'on utilise pour créer les objets (time et val) pour le replay
var val="";                                                                     //c'est le contenu du champ texte
var car_col;                                                                    //c'est la couleur à afficher du curseur    
var ghost_is_start = false;                                                     //contre le démarrage intenpestif du fantôme
var curseur_err_pos = 0;                                                        //position du curseur d'erreur
var curseur_err_bol = false;                                                    //true si il y a une erreur pour afficher le curseur d'erreur
var cur_col = "#ffd700";                                                        //couleur du curseur par défaut
var cur_col_err = "#ff7777";                                                    //couleur du curseur en cas d'erreur

//cette fonction compare le texte tapé à « le_texte »
function test(e)
{
  var temp_time = new Date().getTime();                                         //valeur temporaire du temps à la frappe
  val = document.getElementById("txt").value;                                   //le texte qu'on tape
  

  if (document.getElementById("ghost_actif").checked && val.length == 1)        //lancement à la première frappe du fantôme si il est activé
  {
    stop_ghost = false;
    if(!ghost_is_start) play_ghost();                                           // évite les double démarrages intenpestifs
    ghost_is_start = true;
  }
  

  var touche = window.event ? e.keyCode : e.which;                            //on regarde quelle touche est frappée
  //if (touche == 27)
  //{
  //  new_text(); 
  //  return;
  //}

  if (val != le_texte.substr(0,val.length))                                     //si c'est différent
  {
    // curseur d'erreur et sa position
    if (curseur_err_bol == false)
    {
      curseur_err_pos = val.length;
      curseur_err_bol = true;
    }
    
    if (document.getElementById("err").style.visibility == "hidden")            //on regarde si à la frappe d'avant on était bon            
    {                                                                           // si c'est la cas
      lost_time_tmp = temp_time;                                                //on garde la valeur temporaire 
      nb_fois_err++;                                                            //et on incrémente le nombre de passage dans le rouge
    }

    document.getElementById("err").style.visibility = "visible";                //on affiche le message d'erreur
    document.getElementById("txt").style.backgroundColor = "#ffbbbb";           //on met la zone da frappe en rouge


    if (touche != 8)                                                            // et si ce n'est pas un « backspace » on incrémente de nombre de faute de frappe 
      nb_err++;

  }
  
  else                                                                          //sinon si le texte est équivalent
  {
    if (document.getElementById("err").style.visibility == "visible")           //si on sort d'une zone rouge
      lost_time = lost_time + temp_time - lost_time_tmp;                        //on ajoute au temps perdu total le temps perdu temporaire mesuré
    
    document.getElementById("err").style.visibility = "hidden";                 //on cache le message d'erreur
    document.getElementById("txt").style.backgroundColor = "#f0fff0";           //et on met la zone de frappe en vert

    // pas de curseur d'erreur
    curseur_err_bol = false;
    
    if (val.length >= nb_car)                                                   //si on a atteint le nombre de caractères à frapper
    {
      stop_ghost = true;                                                        //on arrête le fantôme
      document.getElementById("txt").readOnly = true;                           //on met la zone de frappe en lecture seule
      document.getElementById("txt").blur();                                    //on dégage le focus (pas très utile mais c'est plus beau)
      document.getElementById("txt").style.backgroundColor = "#eeeeee";         //on grise la zone de frappe
      document.getElementById("d_replay").style.visibility = "visible";         //on affiche le bouton de replay
      list_frappes(e,val);                                                      //on ajoute les objets de la dernière frappe dans la liste de replay car elle ne l'aurait été qu'a la prochaine frappe mais vu que c'est la fin on a pas pu l'obtenir
      j=0;                                                                      //on réinitialise pour le replay
      calcul();                                                                 //on va faire les calculs de la session
    }
  }
  curseur(); 
}

// cette fonction permet la création de la list de frappe
function list(v)
{
  this.time = new Date().getTime();                                             //avec le temps
  this.val = v;                                                                 //et la valeur du champ du frappe
}
function list_frappes(e,val)
{
  e = window.event ? e.keyCode : e.which;                                       //« e » est le keycode
  if (e != 16)                                                                  //si c'est un shift, il ne faut pas en tenir compte
  {
    list_f[j] = new list(val);                                                  //on créé un objet dans le tableau de la liste de frappes
    j++;
  }

}

// cette fonction permet l'affichage des curseurs
function curseur()
{

  //on passe tout en blanc pour le curseur
  document.getElementById("car"+(val.length-2)).style.backgroundColor = "inherit";
  document.getElementById("car"+(val.length-1)).style.backgroundColor = "inherit";
  document.getElementById("car"+(val.length)).style.backgroundColor = "inherit";
  document.getElementById("car"+(val.length+1)).style.backgroundColor = "inherit";
  document.getElementById("car"+(val.length+2)).style.backgroundColor = "inherit";
  //et pour le fantôme
  document.getElementById("car"+(posghost-2)).style.backgroundColor = "inherit";
  document.getElementById("car"+(posghost-1)).style.backgroundColor = "inherit";
  document.getElementById("car"+(posghost+1)).style.backgroundColor = "inherit";

  if ((val.length+1) == posghost && document.getElementById("curseur_actif").checked) // si les deux curseurs sont sur la même position 
  {
    //on affiche la couleurs  mixée des 2 curseurs
    document.getElementById("car"+(val.length+1)).style.backgroundColor = cur_mix;
  }
  else // sinon on les affiche tous les deux
  {  
    document.getElementById("car"+posghost).style.backgroundColor = cur_col_ghost;
    if (document.getElementById("curseur_actif").checked) 
      document.getElementById("car"+(val.length+1)).style.backgroundColor = cur_col;
  }
  // affichage de la position de l'erreur si le curseur est actif
  if (curseur_err_bol && document.getElementById("curseur_actif").checked)
      document.getElementById("car"+curseur_err_pos).style.backgroundColor = cur_col_err;
}


// fonction pour mélanger 2 couleurs
function mix_colors(a,b)
{
  a = a.substring(1);                                                           // on enlève les #
  b = b.substring(1);
  return "#"+d2h((h2d(a)+h2d(b))/2).substring(0,6);                             // on ajoute le # et seulement des 6 premier caractères (il peut y avoir des décimales)
}
// trouvé ici : http://javascript.about.com/library/blh2d.htm
function d2h(d) {return d.toString(16);}                                        // pour convertir décimal —> hexa
function h2d(h) {return parseInt(h,16);}                                        // pour convertir hexa —> décimal
