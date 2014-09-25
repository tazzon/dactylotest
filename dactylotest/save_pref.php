<?php

$un_an = time()+31536000;

if (isset($_GET["curseur"]) && $_GET["curseur"] == "true")
{
    // sauvegarde de la couleur des curseurs
    if ( setcookie("cur_col",$_GET["cur_col"],$un_an) && setcookie("cur_col_ghost",$_GET["cur_col_ghost"],$un_an) )
    {
        echo "Vos couleurs de curseurs ont été enregistrées.<br/>";
        //echo "cur_cul : ".$_GET["cur_col"]."<br/>";
        //echo "cur_col_ghost : ".$_GET["cur_col_ghost"]."<br/>";
    }
    else
    {
        echo "Un problème est survenu lors de l'enregistement. Vous pouvez réessayer. Si le problème persiste, veuillez contacter le webmestre à l'adresse tazzon@free.fr.";
    }
}
else
{
    // sauvegarde en cookie les préférences typographiques
    
    if ( setcookie("apo_typ",$_GET["apo_typ"],$un_an) &&
         setcookie("maj_acc",$_GET["maj_acc"],$un_an) &&
         setcookie("ligat",$_GET["ligat"],$un_an) &&
         setcookie("pds",$_GET["pds"],$un_an) &&
         setcookie("cadratin",$_GET["cadratin"],$un_an) &&
         setcookie("no_brk_spc",$_GET["no_brk_spc"],$un_an) &&
         setcookie("no_brk_spc_display",$_GET["no_brk_spc_display"],$un_an) &&
         setcookie("quote_fr",$_GET["quote_fr"],$un_an) )
    {
      echo "Vos préférences ont été enregistrées.";
    }
    else
    {
      echo "Un problème est survenu lors de l'enregistement de vos préférences. Vous pouvez réessayer. Si le problème persiste, veuillez contacter le webmestre à l'adresse tazzon@free.fr.";
    }
}


?>									