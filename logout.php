<?php
session_start();
if(isset($_SESSION['name']))
{
    require 'db_func.php';
    if(_onAccountDisconnect($_SESSION['name']) == "SUCCESS")
    {
    //   $lobbyid = $_SESSION['lobbyid'];
       $username = $_SESSION['name'];
       header("Location:exit_lobby.php?user=$username&ret1=index.php?&ret2=");
       //lobbyid=$lobbyid&
    }
}
$_SESSION = array();
session_destroy();
?>
