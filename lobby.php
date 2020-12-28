<?php
session_start();
include 'db_func.php';
if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] == true)
{
    if(!isset($_SESSION['lobbyid']))
    {
      $lobbyid = $_GET['lobbyid'];
      $username = $_GET['user'];
      $_SESSION['lobbyid'] = $lobbyid;
      header("Location:enter_lobby.php?lobbyid=$lobbyid&user=$username");
    }
    else
    {
      $lobbyid = $_SESSION['lobbyid'];
      $username = $_GET['user'];
      $lobbyidNew = $_GET['lobbyid'];
      if($lobbyidNew != $lobbyid)
      {
        $username = $_SESSION['name'];
        echo "<script> console.log('$lobbyid and new $lobbyidNew'); </script>";
        //$lobbyid = $lobbyidNew;
        header("Location:exit_lobby.php?user=$username&ret1=enter_lobby.php?lobbyid=$lobbyidNew&ret2=user=$username");
        $_SESSION['lobbyid'] = $lobbyidNew;
      }
    }
}
else echo "<script>window.location.href='index.php?form=login'</script>";
?>

<!DOCTYPE html>


<html lang='en'>
<head>
    <meta charset='utf-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale = 1.0'>
	<script src = 'plugins/jquery-3.4.1.js'> </script>
<!--  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script> !-->
  <script type="text/javascript" src="chat.js"></script>
	<script src = "jscript.js"> </script>
	<link rel = 'stylesheet' href = 'resources/styling/indexStyle.css'/>
	<title>zChess - Lobby</title>
  <script>
   var name = <?php echo json_encode($username); ?>;
   var lobbyid = <?php echo json_encode($lobbyid)?>;
   const chatlen = 100;
   setInterval('chat.update()', 1000)
   var chat =  new Chat(lobbyid, chatlen);
    $(function()
    {
    // chat.getState();
     // watch textarea for key presses
         $("#sendie").keydown(function(event)
         {
             var key = event.which;
             //all keys including return.
             if (key >= 33)
             {
                 var maxLength = $(this).attr("maxlength");
                 var length = this.value.length;
                 // don't allow new content if length is maxed out
                 if (length >= maxLength)
                 {
                   event.preventDefault();
                 }
              }
        });
   // watch textarea for release of key press
     $('#sendie').keyup(function(e)
     {
        if (e.keyCode == 13)
        {
          var text = $(this).val();
          var maxLength = $(this).attr("maxlength");
          var length = text.length;
          // send
          if (length <= maxLength + 1)
          {
            chat.send(text, name);
            $(this).val("");
          }
          else
          {
            $(this).val(text.substring(0, maxLength));
          }
        }
      });
});
</script>

</head>

<body>
	<div class = 'iheader' id = 'ihead'>
		<img id = 'iheadLogo' src = 'resources/images/logotemp.jpg'/>
				<nav id = 'iheadSlog'> zChess </nav>
		<img id = 'ihomeLogo' src = 'resources/images/ihomeLogo.png'/>
				<a id = 'ihome' href = 'index.php' > Home</a>
		<img id = 'icontactLogo' src = 'resources/images/icontactus.png'/>
			<a id = 'icontact' href = 'contact.html' > Contact Us </a>
		<img id = 'ilobbyLogo' src = 'resources/images/ilobbyLogo.jpg'/>
			<button id = 'ilobby' onclick = <?php if(!isset($_SESSION['Loggedin'])) { echo "'signinftg();'"; } ?> > <?php if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] === true) { echo $_SESSION['name']; } else echo "Login"; ?> </button>
			<?php if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] === true) { echo "<a id = 'logout' href = 'logout.php'> Logout  </a>"; } else echo ""; ?>
	</div>

<div id = "lobby">

  <div id = "larena">
    <h6> On going matches </h6>
    <p> This area is reserved to show on going chess matches between players, as this feature is currently in developement, this area is empty </p>
  </div>
  <div id = "plist">

  <table id="t01">
    <tr>
      <th class = 'thh'>No.</th>
      <th class = 'thh'>Name</th>
      <th class = 'thh'>Rank</th>
      <th class = 'thh'> Profile </th>
    </tr>
    <?php
        list($name, $rank) = getActiveUserInfo($_SESSION['lobbyid']);
        $count = 0;
        $IsMod = 0;
        foreach ($name as $value)
        {
          if($value == $username)
          {
            $_SESSION['Rank'] = $rank[$count];
            if($rank[$count] == "Moderator")
            {
              $IsMod = 1;
            }
          }
          $count++;
        }
        $count = 0;
        if($IsMod == 1)
        {
          foreach ($name as $value)
          {
            echo "<tr>";
            echo "<th> $count </th>";
            echo "<th> $value </th>";
            echo "<th> $rank[$count] </th>";
            echo "<th> <a id = 'modpedit' href='manageprofile.php?profile=${value}'> Manage </a> </th>";
            echo "</tr>";
            $count++;
          }
        }
        else if($IsMod == 0)
        {
          foreach ($name as $value)
          {
            echo "<tr>";
            echo "<th> $count </th>";
            echo "<th> $value </th>";
            echo "<th> $rank[$count] </th>";
            echo "<th> <a id = 'usercheckprof' href='index.php?profile=${value}'> Visit </a> </th>";
            echo "</tr>";
            $count++;
          }
        }
      ?>

</table>
    </div>
  </div>

  <div id = "lchat">
          <div id="chat-wrap"><div id="chat-area">

           </div></div>
          <form id="send-message-area">
              <?php
              list($userdata, $buffer)  = getUserInfo($username);
              if($userdata[8] == "No")
              {
                echo "<p>Shout</p>";
                echo "<textarea id='sendie' maxlength = '200' ></textarea>";
                $ret = shoutboxGetCount($lobbyid);
                echo "<script> console.log('response : $ret'); </script";
                // list($shoutboxData, $buffer) = shoutboxGetParams($lobbyid);
                // $i = 0;
                // while($i < $buffer)
                // {
                //   $count = $shoutboxData[$i][2];
                //   echo "<script> console.log('LobbyID : $lobbyid, total lines : $count'); </script>";
                //   $i++;
                // }
              }
              else echo "<div id = 'restrictmessage'> Your account is restricted to use shoutbox </div>";
               ?>
          </form>
      </div>
   </div>
</div>

</div>
<footer> Website project made by ZaiB, © All right reserved. </footer>
</body>
