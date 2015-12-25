/*******************************************************************************
Les fonctions pour le replay de la session qui vient d'être frappée.
*******************************************************************************/


var stop = true; //true on arrête tout et on repasse j à 0
var vitesse = 1; // la vitesse de lecture

function play() 
{ 
	if (stop) return;

  document.getElementById("txt").value = list_f[j].val+"▌";


  if(j == (list_f.length-1)) 
  {
    replay("stop_auto");
  }
  else
  {
    j++;
    setTimeout("play()",Math.round((list_f[j-1].time-list_f[j-2].time)/vitesse));
  } 
} 

function replay(act)
{
  if (act == "stop" || act=="stop_auto")
  {
    j=0; //on initialise pour le stop mais pas pour le pause pour reprendre au même endroit
    document.getElementById("replay").value = "Play";
    stop = true;
    if (act == "stop")
      document.getElementById("txt").value = "";
  }
  else if (stop)
  {
    document.getElementById("replay").value = "Pause";
 
    //il faut ajouter une valeur dans la liste de frappe
    list_f[-2] = new list("");        //le -2 ne vaut rien, c'est juste pour que les temps soient bon 
    list_f[-2].time = list_f[0].time; //et on donne la valeur du temps -1 au temps -2
    list_f[-1] = new list("");        //le -1 ne vaut rien, c'est juste pour que les temps soient bon 
    list_f[-1].time = list_f[0].time; //et on donne la valeur du temps 0 au temps -1

    stop = false; 
    play();

  }
  else
  {
    document.getElementById("replay").value = "Play";
    stop = true;
  }
}
