var visu_err = "";

function err_test()
{
  var a="";
  var b="";
  var err_progress = false;
  var err = false;
  var dist_temp = 0;
  var dist_tot = 0;
  var i = 0;
  
  //document.getElementById("resultats").innerHTML = list_f.length+"<br/><br/>";
  for (i=0;i<list_f.length;i++)
  {
    a=list_f[i].val; // le texte frappé à la ième frappe
    b=le_texte.substring(0,list_f[i].val.length); // le texte qu'on devrait avoir
    if (a!=b)
    {
      document.getElementById("car"+a.length).style.color = "#8f4546";
      document.getElementById("car"+a.length).style.backgroundColor = "#eabbbc";
      if (list_f[i].val.length > list_f[i-1].val.length)
      {
        err_progress = true;
        
        //a='<span style="color:red">'+a+'</span>';
        //document.getElementById("resultats").innerHTML+= i+" "+b+'<br/>'+i+" "+a+'<br/><br/>';
        
        if (le_texte.substring(0,list_f[i+1].val.length) == list_f[i+1].val)
        {
          dist_tot++;
          visu_err += b.substring(b.length-5) + "<br/>" + a.substring(a.length-5) + "</br>";
          //document.getElementById("resultats").innerHTML += "une erreur simple en plus<br/>";
        }
      }
      else
      {
        if (err_progress == true)
        {
          err = true;
          err_progress = false;
        }
        //a='<span style="color:orange">'+a+'</span>';
        //document.getElementById("resultats").innerHTML+=i+" "+b+'<br/>'+i+" "+a+'<br/><br/>';
      }

      if (err == true) // dans le cas d'une erreur avec plusieurs caractères dans le rouge
      {
        //document.getElementById("resultats").innerHTML += "=> "+le_texte.substring(0,list_f[i-1].val.length) + "<br/>";
        //document.getElementById("resultats").innerHTML += "-> "+list_f[i-1].val + "<br/>";
        
        dist_temp = levenshtein(le_texte.substring(0,list_f[i-1].val.length),list_f[i-1].val);
        dist_tot += dist_temp;
        visu_err += b.substring(b.length-5) + "<br/>" + a.substring(a.length-5) + "<br/>";
        //document.getElementById("resultats").innerHTML += dist_temp+"<br/><br/>";
        
        err = false;
      }
    }
    else
    {
      //a='<span style="color:green">'+a+'</span>';
      //document.getElementById("resultats").innerHTML+=i+" "+b+'<br/>'+i+" "+a+'<br/><br/>';
      err = false;            
    }
    
  }
  //document.getElementById("resultats").innerHTML += "total erreurs : "+dist_tot+"<br/>Précision : "+(1-dist_tot/nb_car);
  //document.getElementById("resultats").innerHTML = txt_ok + "<br/>" + txt_err;
  
  return dist_tot;
}
function err_test_txt()
{
  var a="";
  var b="";
  var err_progress = false;
  var err = false;
  var dist_temp = 0;
  var dist_tot = 0;
  var i = 0;
  
  document.getElementById("resultats").innerHTML = list_f.length+"<br/><br/>";
  for (i=0;i<list_f.length;i++)
  {
    a=list_f[i].val; // le texte frapp� � la i�me frappe
    b=le_texte.substring(0,list_f[i].val.length); // le texte qu'on devrait avoir
    if (a!=b)
    {
      if (list_f[i].val.length > list_f[i-1].val.length)
      {
        err_progress = true;       
        a='<span style="color:red">'+a+'</span>';
        document.getElementById("resultats").innerHTML+= i+" "+b+'<br/>'+i+" "+a+'<br/><br/>';
        
        if (le_texte.substring(0,list_f[i+1].val.length) == list_f[i+1].val)
        {
          dist_tot++;
          document.getElementById("resultats").innerHTML += "une erreur simple en plus<br/>";
        }
      }
      else
      {
        if (err_progress == true)
        {
          err = true;
          err_progress = false;
        }
        a='<span style="color:orange">'+a+'</span>';
        document.getElementById("resultats").innerHTML+=i+" "+b+'<br/>'+i+" "+a+'<br/><br/>';
      }

      if (err == true) // dans le cas d'une erreur avec plusieurs caract�res dans le rouge
      {
        document.getElementById("resultats").innerHTML += "=> "+le_texte.substring(0,list_f[i-1].val.length) + "<br/>";
        document.getElementById("resultats").innerHTML += "-> "+list_f[i-1].val + "<br/>";
        
        dist_temp = levenshtein(le_texte.substring(0,list_f[i-1].val.length),list_f[i-1].val);
        dist_tot += dist_temp;
        document.getElementById("resultats").innerHTML += dist_temp+"<br/><br/>";
        
        err = false;
      }
    }
    else
    {
      a='<span style="color:green">'+a+'</span>';
      document.getElementById("resultats").innerHTML+=i+" "+b+'<br/>'+i+" "+a+'<br/><br/>';
      err = false;            
    }
    
  }
  //document.getElementById("resultats").innerHTML += "total erreurs : "+dist_tot+"<br/>Pr�cision : "+(1-dist_tot/nb_car);
  //document.getElementById("resultats").innerHTML = txt_ok + "<br/>" + txt_err;
  
  //return dist_tot;
}
function levenshtein( a, b )
{
	var i;
	var j;
	var cost;
	var d = new Array();
 
	if ( a.length == 0 )
  	return b.length;

	if ( b.length == 0 )
		return a.length;
 
	for ( i=0 ; i<=a.length ; i++)
	{
		d[i] = new Array();
		d[i][0] = i;
	}
 
	for (j=0 ; j<=b.length ; j++)
	{
		d[0][j] = j;
	}
 
	for (i=1 ; i<=a.length ; i++)
	{
		for (j=1 ; j<=b.length ; j++)
		{
			if (a.charAt(i-1) == b.charAt(j-1))
			{
				cost=0;
			}
			else
			{
				cost=1;
			}
 
			d[i][j] = Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+cost);
			
			if(i>1 && j>1 && a.charAt(i-1) == b.charAt(j-2) && a.charAt(i-2) == b.charAt(j-1))
        d[i][j] = Math.min(d[i][j],d[i-2][j-2]+cost);
		}
	}
 
	return d[a.length][b.length];
}
