<?php
session_start();
//$lobbyid = $_GET['lobbyid'];
$username = $_GET['user'];
$ret1 = $_GET['ret1'];
$ret2 = $_GET['ret2'];
echo "String : $ret1 and $ret2";
//echo "<script> console.log('$username'); </script>";
require_once 'db_func.php';
onUserLeaveLobby($username);
header("Location:$ret1&$ret2"); 
?>
