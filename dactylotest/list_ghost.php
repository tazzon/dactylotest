<?php
// sauvegarde des fantômes suivant les différents textes et les langues
// synthaxe :
// list_ghost.php?text=<nb_text>&lang=<lang>
// text = le numéro du texte
// lang = la langue du texte
// on envoie la liste des fantômes sous forme de chaine décodable par js
// 

if (file_exists("ghost/gh_top_".$_GET["lang"]."_".$_GET["text"]))
{
  $gh = file("ghost/gh_top_".$_GET["lang"]."_".$_GET["text"]); // on met le contenu du fichier dans un tableau
  
  $gh_ = array();
  // il serait bien de renvoyer la date dans un format lisible car pour l'instant elle n'est pas utilisable
  foreach($gh as $val)
  {
    $gh_tmp = explode(" ",$val);
    $gh_tmp[1] = date("d M Y à H:i",$gh_tmp[1]); // on modifie le format de date de timestamp en date lisible
    $gh_[] = implode(" ",$gh_tmp);
  }
  
  
  $a = str_replace("\n","",implode("###",$gh_));
  $a = str_replace("\r","",$a);
  echo $a;
}
else
{
  echo "no_ghost";
}
?>