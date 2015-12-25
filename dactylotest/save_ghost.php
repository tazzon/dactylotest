<?php
// sauvegarde des fantômes suivant les différents textes et les langues
// synthaxe :
// save_ghost.php?auteur=<un_nom>&mpm=<vitesse>&text=<nb_text>&lang=<lang>&ghost=<le fantôme>
// auteur = le nom de la personne qui a créé le fantôme
// mpm = mot par minute du fantôme
// text = le numéro du texte
// lang = la langue du texte
// ghost = le fantôme avec position1––temps1##position2--temps2##...##positionX--tempsX
// on enregistre le ghost tel quel sans modification, il sera redonné à la page par load_ghost.php

// par la même occasion est enregistré dans un fichier gh_top_<lang>_<text> les informations sur les fantômes.
// ces infos sont organisées comme suit :
// <nom du fantôme> <timestamp> <auteur> <mpm> <options>
// nom du fantôme = c'est le nom généré aléatoirement qui est le nom du fantôme (fichier.gh)
// timestamp = pour retrouver la date à la quelle le fantôme a été créé
// auteur = le nom de la personne qui a créé le fantôme
// mpm = mot par minute du fantôme
// options = les options typographiques choisies listées dans la variable $cookie_tab. Elles sont à 1 si elles sont actives sinon à 0


function random($car)
{ 
	$string = ""; 
	$chaine = "0123456789abcdef"; 
	srand((double)microtime()*1000000); 
	for($i=0; $i<$car; $i++)
	{ 
		$string .= substr($chaine,rand(1,strlen($chaine))-1,1); 
	} 
	return $string; 
}

function options()
{
    // tableau des différents cookies à tester
    $cookie_tab = array("apo_typ", "maj_acc", "ligat", "pds", "no_brk_spc",
			"no_brk_spc_display", "no_narrowbrk_spc",
			"no_narrowbrk_spc_display", "quote_fr", "cadratin");
    
    $opt = "";
    
    foreach ($cookie_tab as $cookie)
    {
        if ($_COOKIE[$cookie] == "true")
            $opt.="1";
        else
            $opt.="0";
    }

    return $opt;
}

/*function random($car)
{ 
	$string = ""; 
	$chaine = "0123456789abcdef"; 
	srand((double)microtime()*1000000); 
	for($i=0; $i<$car; $i++)
	{ 
		$string .= $chaine[rand()%strlen($chaine)]; 
	} 
	return $string; 
}*/

do {
  $gh_name = random(8);
} while (file_exists("ghost/".$gh_name.".gh")); // on test si le fichier existe et si c'est la cas on génère un autre nom (même si il y a peu de chance que ça se produise)


//cookie auteur pour pas avoir à l'écrire à chaque fois
setcookie("name",$_GET["auteur"],time()+31536000);
// si le mec ne met pas de nom, on peut inscrire "anonym" par exemple
if ($_GET["auteur"] == "")
  $_GET["auteur"] = "anonym"; // /!\ je sais pas si on peut modifier un GET ???

// création de l'entrée pour ce fantôme si il est dans les 10 (??? valeurs à définir) premiers
if(file_exists("ghost/gh_top_".$_GET["lang"]."_".$_GET["text"]))
{
  $f_gh_top = file("ghost/gh_top_".$_GET["lang"]."_".$_GET["text"]);

  $new_gh_top = array();
  $non_ajout = true;
  $i = 1; // c'est la position dans le classement, c'est juste à donner comme info
  foreach($f_gh_top as $value)
  {
    $champ = explode(" ",str_replace("\n","",$value));
    // ghost time auteur mpm
    
    if ($champ[3] < $_GET["mpm"] && $non_ajout)
    {
      $new_gh_top[] = $gh_name." ".time()." ".$_GET["auteur"]." ".$_GET["mpm"]." ".options();
      $non_ajout = false;
      $position = $i;
    }  
    //$new_gh_top []= $champ[0]." ".$champ[1]." ".$champ[2]." ".$champ[3];
    $new_gh_top[] = str_replace("\n","",$value);
    $i++;
  }
  if ($non_ajout) // si on l'a pas ajouté, c'est qu'il passe à la fin
  {
    $new_gh_top[] = $gh_name." ".time()." ".$_GET["auteur"]." ".$_GET["mpm"]." ".options();
    $position = $i;  // et donc il est dernier
  }
  $new_gh_top = implode("\n",$new_gh_top);
}
else
{
  $new_gh_top= $gh_name." ".time()." ".$_GET["auteur"]." ".$_GET["mpm"]." ".options();
  $position = 1;
  $i = 1;
}

$f = fopen("ghost/gh_top_".$_GET["lang"]."_".$_GET["text"],"w");
fwrite($f,$new_gh_top);
fclose($f);


$gh = true;
// création du fantome
$f=fopen("ghost/".$gh_name.".gh","a+");
$gh = fwrite($f,$_GET["ghost"]);
fclose($f);
if ($gh)
  echo "Le fantôme a été créé sous le pseudo de <em>".$_GET["auteur"]."</em> à ".$_GET["mpm"]." mots par minute pour le texte numéro ".$_GET["text"].".<br/>Ce fantôme est classé ".$position."/".$i.".";
else
  echo "Le fantôme n'a pas pu être créé.";


?>
