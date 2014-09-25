<?php
// sauvegarde des fantômes suivant les différents textes et les langues
// synthaxe :
// load_ghost.php?ghost=<le fantôme>
// ghost = le fantôme 
// on envoie le ghost tel quel sans modification

echo file_get_contents("ghost/".$_GET["ghost"].".gh");

?>