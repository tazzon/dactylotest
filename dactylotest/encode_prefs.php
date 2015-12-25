<?php

// donne l'Ã©tat des prÃ©fÃ©rences pour l'inclure dans les top_ghost

// tableau des différents cookies à tester
$cookie_tab = array("apo_typ", "maj_acc", "ligat", "pds", "no_brk_spc",
	"no_brk_spc_display", "no_narrowbrk_spc", "no_narrowbrk_spc_display",
	"quote_fr", "cadratin");

$opt = "";

foreach ($cookie_tab as $cookie)
{
    if ($_COOKIE[$cookie] == "true")
    {
        echo $cookie." : true";
        $opt.="1";
    }
    else
    {
        echo $cookie." : false";
        $opt.="0";
    }
    echo "<br/>";
}

echo "<br/>";
echo $opt;
echo "<br/>";


?>
