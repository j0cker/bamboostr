<?PHP
include ''.dirname(__FILE__).'/conexioni.php';
include ''.dirname(__FILE__).'/scripts/funciones.php';
$nombre_123vd = $_POST["nombre"];
$pass_123vd = $_POST["password"];
if($nombre_123vd=="" && $pass_123vd==""){
  $nombre_123vd = $_GET["nombre"];
  $pass_123vd = $_GET["password"];
}
$nombreOmail = base_de_datos_scape($conn,$nombre_123vd);
$password = base_de_datos_scape($conn,encriptar($pass_123vd));
$query = $conn->query("SELECT * FROM token WHERE (screen_name='".$nombreOmail."' OR mail='".$nombreOmail."') AND password='".$password."'") OR DIE(mysqli_error($conn));
if($query->num_rows>0){
  $obj = new stdclass();
  $obj->success = "true";
  session_start();
  session_regenerate_id();
  $row=$query->fetch_assoc();
  $_SESSION['sessionid'] = session_id(); 
  $_SESSION['user'] = $row["screen_name"];
  $_SESSION['user_bamboostr'] = $row["screen_name_bamboostr"];
  $_SESSION['identify'] = $row["identify"];
  $_SESSION['mail'] = $row["mail"];
  $_SESSION['red'] = $row["red"];
  $_SESSION['id_token'] = $row["id"];
  $_SESSION['foto_bamboostr'] = $row["foto_bamboostr"];
  //actualizamos fecha
  $conn->query("UPDATE token SET last_ssid='".date("d-m-Y")."' WHERE id='".$_SESSION['id_token']."'") OR die(mysqli_error($conn));
  //insertar SSID
  $conn->query("INSERT INTO ssid (id_token,ssid,screen_name,fecha) 
            VALUES ('".$_SESSION['id_token']."','".$_SESSION['sessionid']."','".$_SESSION['user']."','".date('d-m-Y H:i')."') ") OR DIE(mysqli_error($conn));
  $conn->query("INSERT INTO ssid_story (id_token,ssid,screen_name,fecha) 
            VALUES ('".$_SESSION['id_token']."','".$_SESSION['sessionid']."','".$_SESSION['user']."','".date('d-m-Y H:i')."') ") OR DIE(mysqli_error($conn));

	$obj->id_token = $_SESSION['id_token'];
	$obj->user = $_SESSION['user_bamboostr'];
	$obj->identify = $_SESSION['identify'];
    $obj->image_red = $_SESSION['foto_bamboostr'];
	$obj->cuenta = "primaria";
	echo json_encode($obj);
} else {
  $obj = new stdclass();
  $obj->success = "false";
  $obj->text = "Usuario o Contraseña Incorrecta";
  echo json_encode($obj);  
}
$conn->close;
?>