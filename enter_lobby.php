<?php
session_start();
if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] == true)
{
  $lobbyid = $_GET['lobbyid'];
  $username = $_GET['user'];
  echo "$username hello";
  echo $lobbyid;
//  $_SESSION['lobbyid'] = $lobbyid;
  require_once 'db_func.php';
  OnUserJoinLobby($username, $lobbyid);
  header("Location:lobby.php?lobbyid=$lobbyid&user=$username");
}
  ?>
