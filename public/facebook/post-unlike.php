<?php
//PHP Version 5.4.34
include '../conexioni.php';
$identify=$_GET["identify"];
$idPost = $_GET["idPost"];
$images=$_GET["images"];
$messages=$_GET["messages"];
session_start();
require_once 'src/Facebook/config.php';
require_once('autoload.php');
use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\FacebookSDKException;
use Facebook\FacebookRequestException;
use Facebook\FacebookAuthorizationException;
use Facebook\GraphObject;
$query=$conn->query("SELECT access_token FROM token WHERE identify='".$identify."' AND red='facebook'");
if($query->num_rows>0){
	$row=$query->fetch_assoc();
	$acces_token = $row["access_token"];
	$conn->close();
	
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
	  //?limit=, ?since=, ?until=, ?filter=app_key

      $request = new FacebookRequest($session, 'DELETE', '/'.$_GET["id_msg"].'/likes');
	  $response = $request->execute();
	  $graphObject = $response->getGraphObject();

	
	} catch (FacebookRequestException $ex) {
	  // Session not valid, Graph API returned an exception with the reason.
	  echo $ex->getMessage();
	  $error = 1;
	} catch (\Exception $ex) {
	  // Graph API returned info, but it may mismatch the current app or have expired.
	  echo $ex->getMessage();
	  $error = 1;
	} 
	if($error==0) {
	  print_r($graphObject);
	} else { 
	  echo "false";
	}
} else {
  echo "false";
}