<?php

// $_GET["l"] = la langue
// $_GET["t"] = le texte en cours (pour éviter de le redonner)
// $_GET["force"] = le numéro de texte explicitement demandé

// format à envoyer : new_text.php?l=<lang>&t=<num>[&force=<num>]

$textes = array();

if (file_exists("text/".$_GET["l"].".php"))
{
  include "text/".$_GET["l"].".php"; // les textes en français seulement pour l'instant
  
  if (isset($_GET["force"]))
  {
    if (!$textes[$_GET["force"]]["txt"] && !$textes[$_GET["force"]]["source"])
      echo $_GET["force"]."###./###Le texte nº".$_GET["force"]." n’existe pas. Les numéros de textes disponible pour cette langue vont de 0 à ".(count($textes)-1).".";
    else
      echo $_GET["force"]."###".$textes[$_GET["force"]]["source"]."###".$textes[$_GET["force"]]["txt"];
  }
  else
  {
    do {
      $rand = rand(0,count($textes)-1);
    } while ($rand == $_GET["t"]);
    // envoi nºtexte###source###texte ; à décoder en js
    echo $rand."###".$textes[$rand]["source"]."###".$textes[$rand]["txt"];
  }
}
else
{
  echo "x###./###Aucun texte n’est encore disponible dans cette langue.";
}

?>