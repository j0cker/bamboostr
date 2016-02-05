<?php
//PHP Version 5.4.34
include '../../twitter/conexioni.php';
$identify=$_GET["identify"];
$identify_account=substr($_GET["identify_account"],0,strlen($_GET["identify_account"])-2);
session_start();
require_once '../src/Facebook/config.php';
require_once('../autoload.php');
use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\FacebookSDKException;
use Facebook\FacebookRequestException;
use Facebook\FacebookAuthorizationException;
use Facebook\GraphObject;
$unique_request = '';
if(!$identify){
  $query=$conn->query("SELECT tok.*, esta.*, esta.identify as identifyP
 					  FROM token AS tok INNER JOIN estadisticas_facebook AS esta  
		              ON esta.red='facebook' AND esta.tipo='page' 
					  AND tok.red='facebook' AND tok.identify=esta.identify_account");
} else {
  $query=$conn->query("SELECT tok.*, esta.*, esta.identify as identifyP
 					  FROM token AS tok INNER JOIN estadisticas_facebook AS esta  
		              ON esta.red='facebook' AND esta.tipo='page' AND tok.red='facebook' 
					  AND tok.identify='".$identify."' AND esta.identify='".$identify_account."'
					  AND esta.identify_account='".$identify."'");
}
if($query->num_rows>0){
  $c=0;
  while($row=$query->fetch_assoc()){
	/**DIFerencia de MINUTOS ENTRE PETICIONES**/
      $difFechaPass = '';
	  //17 inlcluye ,
	  $difFechaPass=substr($row["fans_online"],strlen($row["fans_online"])-17,16);
	  $difFechaPass=explode(":",$difFechaPass);
	  $difFechaPass=explode("-",$difFechaPass[1]);
	  $horaBFP = (intval($difFechaPass[0])*60)+intval($difFechaPass[1]);
	  $horaAFP = (intval(date("H"))*60)+intval(date("i"));
	  $difFechaPass=abs($horaAFP-$horaBFP);
      echo "B: ".$horaBFP." A:".$horaAFP." DIF:".$difFechaPass."<br />";
	/**FIN DIFerencia de MINUTOS ENTRE PETICIONES**/
	if(!$identify){
	  //por día
      if(strpos($row["fans_online"],date("d-m-Y"))===false && $difFechaPass>15){
        if(strpos($unique_request,$row["identifyP"])===false){
		  $cuentas[$c][0] = $row["screen_name"];
	      $cuentas[$c][1] = $row["access_token"];
	      $cuentas[$c][2] = $row["id_token"];
		  $cuentas[$c][3] = $row["fans_online"];
		  $cuentas[$c][4] = $row["identifyP"];
	      $cuentas[$c][5] = $row["likes_paid"];
	      $cuentas[$c][6] = $row["likes_unpaid"];
	      $unique_request = ''.$unique_request.''.$row["identifyP"].',';
	      $c++;
		}
	  }
	} else {
	  //por hora //solo con método post
	  if(strpos($row["fans_online"],date("d-m-Y:H"))===false || $difFechaPass>15){
        if(strpos($unique_request,$row["identifyP"])===false){
		  $cuentas[$c][0] = $row["screen_name"];
	      $cuentas[$c][1] = $row["access_token"];
	      $cuentas[$c][2] = $row["id_token"];
		  $cuentas[$c][3] = $row["fans_online"];
		  $cuentas[$c][4] = $row["identifyP"];
	      $cuentas[$c][5] = $row["likes_paid"];
	      $cuentas[$c][6] = $row["likes_unpaid"];
	      $unique_request = ''.$unique_request.''.$row["identifyP"].',';
	      $c++;
		}
	  }
	}
  }//fin while row
  $c=0;
  foreach($cuentas as $item){
	$acces_token = $item[1];
	FacebookSession::setDefaultApplication($app_id, $app_secret);
	$session = new FacebookSession($acces_token);
	// If you're making app-level requests:
	// Con web sessions falla
	//$session = FacebookSession::newAppSession();
	// To validate the session:
	$error = 0;
	try {
	  $session->validate($app_id, $app_secret);
	  // graph api request for user data
	  //?limit=, ?since=, ?until=, ?filter=app_key, ?offset=, ?fields=name,id,bio
	  //si hay mas de dos parametros se separa por &
	  //offset puede llegar a ser confuso mirar: https://developers.facebook.com/blog/post/478/
	  //por ello se recomiendo until o since
	  //?period=month
	  
	  $request = new FacebookRequest($session, 'GET', '/'.$item[4].'/insights/page_fans_online/day');
	  $response = $request->execute();
	  // get response
	  $graphObject = $response->getGraphObject();
	
	} catch (FacebookRequestException $ex) {
	  // Session not valid, Graph API returned an exception with the reason.
	  echo ''.$ex->getMessage().' '.$cuentas[$c][0].' '.$item[1].'<br />';
	  $error = 1;
	} catch (\Exception $ex) {
	  // Graph API returned info, but it may mismatch the current app or have expired.
	  echo ''.$ex->getMessage().' '.$cuentas[$c][0].' '.$item[1].'<br />';
	  $error = 1;
	} 
	if($error==0) {
	  $req=array();
      $req=$graphObject->getProperty('data')->asArray();
	  $fans_online = '';
	    
	$fecha=explode("T",$req[0]->values[0]->end_time);
	//$hora=explode(":",$fecha[1]);
	$fecha=explode("-",$fecha[0]);
	$fecha = ''.$fecha[2].'-'.$fecha[1].'-'.$fecha[0].':'.date("H-i").'';
	$keys = array();
	$keys = array_keys((array)$req[0]->values[0]->value);
	$c=0;
	foreach($req[0]->values[0]->value as $item3){
	  $fans_online = ''.$fans_online.''.$item3.'|'.$keys[$c].',';
	  $c++;
	}
	$fans_online = ''.$fans_online.''.date("d-m-Y:H-i").',';
	  
		  $query2=$conn->query("UPDATE estadisticas_facebook 
							   SET fans_online='".$fans_online."'
							   WHERE identify='".$item[4]."' AND red='facebook'
							   AND tipo='page'");
		 
		  echo '<br />Total: '.$fans_online.' '.$item[4].', '.$item[0].'<br />';

	  
	} else { 
	  echo "FALSE";
	}
	$c++;
  }//fin foreach identify
} else {
  echo "FALSE";
}