/*******************************************************************************
La fonction pour les requêtes serveur.
*******************************************************************************/


//cette fonction permet de faire les requêtes serveur
//get = la requete
//id = le champ ou inscrire l'état de la requete
function request(get,id)
{
	var req = null; 

	document.getElementById(id).innerHTML = '<img src="img/indicator.gif" alt="indic" /> Initialisation';
	if(window.XMLHttpRequest)
	  req = new XMLHttpRequest(); 
	else if (window.ActiveXObject)
	  req  = new ActiveXObject(Microsoft.XMLHTTP); 

	req.onreadystatechange = function()
	{ 
	  document.getElementById(id).innerHTML='<img src="img/indicator.gif" alt="indic" /> Connexion au serveur';
	  if(req.readyState == 4)
	  {
	    if(req.status == 200)
	      document.getElementById(id).innerHTML="";
	    else        
	      document.getElementById(id).innerHTML="Error: returned status code " + req.status + " " + req.statusText;
	  } 
	};
	req.open("GET", get, false);  // requète non synchronisée sinon on ne peut pas avoir la valeur de la réponse
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	req.send(null);
	return req.responseText;  //retourne le résultat de la requete
}
