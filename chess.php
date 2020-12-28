<?php
session_start();
?>
<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale = 1.0">

<title>zChess - Singleplayer</title>
<link rel = "stylesheet" href = "resources/styling/chessstyle.css"/>
<link rel = 'stylesheet' href = 'resources/styling/indexStyle.css'/>
<script src = "plugins/jquery-3.4.1.js"> </script>
<script src="plugins/jquery-ui.js"></script>
<script src = "chess.js"> </script>
<script src = "jscript.js"> </script>

</head>


<body>
	<div class = 'iheader' id = 'ihead'>
		<img id = 'iheadLogo' src = 'resources\images\logotemp.jpg'/>
				<nav id = 'iheadSlog'> zChess </nav>
		<img id = 'ihomeLogo' src = 'resources\images\ihomeLogo.png'/>
				<a id = 'ihome' href = 'index.php' > Home</a>
		<img id = 'icontactLogo' src = 'resources\images\icontactus.png'/>
			<a id = 'icontact' href = 'contact.html' > Contact Us </a>
		<img id = 'ilobbyLogo' src = 'resources\images\ilobbyLogo.jpg'/>
			<button id = 'ilobby' onclick = <?php if(!isset($_SESSION['Loggedin'])) { echo "'signinRedirect();'"; } ?> > <?php if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] === true) { echo $_SESSION['name']; } else echo "Login"; ?> </button>
			<?php if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] === true) { echo "<a id = 'logout' href = 'logout.php'> Logout </a>"; } else echo ""; ?>
	</div>
	<div class = "ChessGameBox">
		<div class = "board"> <script> CreateTable(); </script> </div>
      <div id = "clock">
    	   <div class="loader">
           <div id = "wCircle">
             <div class="circle"></div>
           </div>
          <div class = "Time" id = "wTime"></div>
         </div>
        <div class="loader">
          <div id = "bCircle">
            <div class="circle"></div>
          </div>
          <div class = "Time" id = "bTime"></div>
        </div>
      </div>
      <script> startClock(); </script>
  </div>
</body>

</html>
