<?PHP
?>
/* agrega otra red social*/
var redSocial = "<?PHP echo $redSocial; ?>"; 
function rastrearLogR(opcion){
  if(opcion=="twConditions"){
	/*Twitter login Conditions*/
    ga('send', 'event', 'Agregar Secundaria Twitter', 'click', 'Agregar Secundaria Twitter');
    if(redSocial=="facebook"){
	  window.location = "twitter/redirect.php?identify=<?PHP echo $identify; ?>&ssid=<?PHP echo $ssid; ?>";
	} else if(redSocial=="twitter"){
      window.location = "twitter/redirect.php?identify=<?PHP echo $identify; ?>&ssid=<?PHP echo $ssid; ?>";
	} else if(redSocial=="no"){
      window.location = "twitter/redirect.php?identify=<?PHP echo $identify; ?>&ssid=<?PHP echo $ssid; ?>";
	}
  } else if(opcion=="faConditions"){
    /*Facebook login Conditions*/
    ga('send', 'event', 'Agregar Secundaria Facebook', 'click', 'Agregar Secundaria Facebook');
    if(redSocial=="facebook"){
	  window.location = "facebook/clearsessions.php?redirect=2&access_token=<?PHP echo $_SESSION["access_token"];?>";
	} else if(redSocial=="twitter"){
      window.location = "facebook/redirect.php?redirect=1&identify=<?PHP echo $identify; ?>&ssid=<?PHP echo $ssid; ?>";
	} else if(redSocial=="no"){
      window.location = "facebook/redirect.php?redirect=1&identify=<?PHP echo $identify; ?>&ssid=<?PHP echo $ssid; ?>";
	}
  } else if(opcion=="inConditions"){ 
    ga('send', 'event', 'Agregar Secundaria Instagram', 'click', 'Agregar Secundaria Instagram');
    var v = window.open("https://instagram.com/accounts/logout/");  
    setTimeout(function(){
        //v.close();
        v.location.href='instagram/redirect.php';
        //window.location = "instagram/redirect.php"; 
    }, 500);
  }
}