<?php
session_start();
ini_set('display_errors', 'On'); error_reporting(E_ALL);
if(!isset($_SESSION['reLog']))
{
	$_SESSION['reLog'] = false;
}
$ip_addr = $_SERVER['REMOTE_ADDR'];
echo "<script> console.log('${ip_addr}'); </script>";
?>

<!DOCTYPE html>


<html lang='en'>
<head>
    <meta charset='utf-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale = 1.0'>
	<script src = 'plugins\jquery-3.4.1.js'> </script>
	<script src = "jscript.js"> </script>
	<link rel = 'stylesheet' href = 'resources\styling\indexStyle.css'/>
	<title>zChess - Homepage</title>
</head>

<body>
	<?php

	if(!isset($_SESSION['Loggedin']))
	{
		echo "<div id = 'form-wrapper'>";
	//	echo "<img id = 'iloginpanel' src = 'resources\images\chessregcol.jpg'/>";
		//echo "<form id = 'formSignin' action = '" . htmlspecialchars($_SERVER['PHP_SELF']). "'method = 'POST'>";
		echo "<form id = 'formSignin' class = 'formSigninDL' action = 'login.php' method = 'POST'>";
		echo "<div id = 'closeform' onclick = 'signinftg()'  > <b> x </b> </div>";

		//echo "<br><h3 id = 'sgntxt'><br> <b> <i> User Login </i> </b><br><br></h3>";
		echo "<img id = 'iloginico' class = 'iloginicoDL' src = 'resources\images\userlogin.png'/>";
		echo "<input class = 'formElementSubmit SubmitPos' type='submit' value='Login'> <br><br><br>";
		echo "<div id = 'upwrapper' class = 'upwrapperDL'>";
		echo "<input class = 'formElement formElementDL' type='text' name='username' placeholder = 'Enter username'> ";
		echo "<input  class = 'formElement formElementDL' type='password' name='password' placeholder = 'Enter password'>";
		echo "<div id = 'errorPanel'>";
		if(isset($_SESSION['errName'])) { echo "<div class = 'errForm'>". $_SESSION['errName'] ."</div>"; }
		if(isset($_SESSION['errPass'])) { echo "<div class = 'errForm'>". $_SESSION['errPass']  ."</div>"; }
		echo "</div>";
		echo "</div>";
		echo "<span> <b><i> Don't have an account? Register <a href = 'register.php'> here </i></b> </a> </span>";
		echo "<br><br>";
		echo "</form>";
		echo "</div>";
	}

	if(isset($_GET['form']) && $_GET['form'] == 'login')
	{
		if(!isset($_SESSION['Loggedin']))
		{
			echo "<script> signinftg(); </script>";
		}
		else echo "<script>window.location.href='index.php'</script>";
	}
	if(isset($_SESSION['reLog']) && $_SESSION['reLog'] !== true)
	{
		echo "<script> signinftg(); </script>";
	}
	else
		{
			$_SESSION['errPass'] = '';
			$_SESSION['errName'] = '';
			$_SESSION['reLog'] = false;
		}
	?>
	<!-- <script> onpageinit(); </script> -->
	<div id = 'ipage' class = 'blurFx'>
	<div class = 'iheader' id = 'ihead'>
		<img id = 'iheadLogo' src = 'resources\images\logotemp.jpg'/>
				<nav id = 'iheadSlog'> zChess </nav>
		<img id = 'ihomeLogo' src = 'resources\images\ihomeLogo.png'/>
				<a id = 'ihome' href = 'index.php' > Home</a>
		<img id = 'icontactLogo' src = 'resources\images\icontactus.png'/>
			<a id = 'icontact' href = 'contact.html' > Contact Us </a>
		<img id = 'ilobbyLogo' src = 'resources\images\ilobbyLogo.jpg'/>
			<button id = 'ilobby' onclick = <?php if(!isset($_SESSION['Loggedin'])) { echo "'signinftg();'"; } ?> > <?php if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] === true) { echo $_SESSION['name']; } else echo "Login"; ?> </button>
			<?php if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] === true) { echo "<a id = 'logout' href = 'logout.php'> Logout </a>"; } else echo ""; ?>
	</div>
	<div id = 'megadiv'>
		<div id = 'metadiv'>
			<div class = 'introbox' onmousedown = 'focuscard()'  onmouseup = 'exitfocuscard()' onclick = 'focustrans()'>

				<p id = 'introtext'> <br><b><i><u> zStandard Mode </h2></u></i></b> <br><br><br> In this mode, players have no time pressure to end the game </p>
				<img class = 'chessboardicon' src = 'resources\images\chessboardicon.png'>

				<button onclick = 'gotolobby()'> Enter lobby </button>

				<button onclick = 'gotolobby()'> Singleplayer </button>
				<div id = 'intro1' class = 'introElement'> - </div>
				<div id = 'intro2' class = 'introElement'> - </div>
				<div id = 'intro3' class = 'introElement'> - </div>
				<div id = 'intro4' class = 'introElement'> - </div>
				<div id = 'intro5' class = 'introElement'> - </div>
				<script>
					$('#intro1').css({'opacity' : '1', 'background-color' : 'red'});
					let focus = 1;
					function focustrans()
					{
						switch(focus)
						{
						case 1:
								$('.introbox').css({'transform': 'rotate(0deg)'});
								$('#intro1').css({'opacity' : '0.5', 'background-color' : 'white'});
								$('#intro2').css({'opacity' : '1', 'background-color' : 'red'});
								$('#introtext').empty().append('<br><b><i><u> zBlitz Mode </h2></u></i></b> <br><br><br>  In this mode, players have 15 minutes time pressure to end the game');
								focus += 1;
						break;
						case 2:
									$('.introbox').css({'transform': 'rotate(0deg)'});
									$('#intro2').css({'opacity' : '0.5', 'background-color' : 'white'});
									$('#intro3').css({'opacity' : '1', 'background-color' : 'red'});
									$('#introtext').empty().append('<br><b><i><u> zReflex Mode </h2></u></i></b> <br><br><br> In this mode, each player has a limit of one minute for each move');
									focus += 1;

						break;
						case 3:
									$('.introbox').css({'transform': 'rotate(0deg)'});
									$('#intro3').css({'opacity' : '0.5', 'background-color' : 'white'});
									$('#intro4').css({'opacity' : '1', 'background-color' : 'red'});
									$('#introtext').empty().append('<br><b><i><u> zKillMachine Mode </h2></u></i></b> <br><br><br> In this mode, player with high casualty count under 2 minute loses');
									focus += 1;

						break;
						case 4:
									$('.introbox').css({'transform': 'rotate(0deg)'});
									$('#intro4').css({'opacity' : '0.5', 'background-color' : 'white'});
									$('#intro5').css({'opacity' : '1', 'background-color' : 'red'});
									$('#introtext').empty().append('<br><b><i><u> zTrickster Mode </h2></u></i></b> <br><br><br> In this mode, player has to throw a check on another player in order to win the match. Total time span is 10 minutes');
									focus += 1;

						break;
						case 5:
									$('.introbox').css({'transform': 'rotate(0deg)'});
									$('#intro5').css({'opacity' : '0.5', 'background-color' : 'white'});
									$('#intro1').css({'opacity' : '1', 'background-color' : 'red'});
									$('#introtext').empty().append('<br><b><i><u> zStandard Mode </h2></u></i></b> <br><br><br> In this mode, players have no time pressure to end the game');
									focus = 1;
						break;
						}
					}
					function focuscard()
					{
						$('.introbox').css({'transform': 'rotate(-10deg)', 'opacity': '0.5'});
					}
					function exitfocuscard()
					{
						$('.introbox').css({'transform': 'rotate(0deg)', 'opacity': '1.0'});
					}
					function gotolobby()
					{
						window.location.href="lobby.php?lobbyid="+focus+"&user=<?php if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] == true) { echo $_SESSION['name']; } ?>";

					}
					</script>
			</div>
		</div>
			<ul id = 'changelog' style = 'visibility:hidden'>
			<br> <h3> View Changelog </h3>
				<br><b><i>01/22/2020</i></b><br><br>
				<li> Added index page </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/23/2020</i></b><br><br>
				<li> Added Contact us page </li>
				<li> Optimized surfing experience</li>
				<br>

				<br><b><i>01/24/2020</i></b><br><br>
				<li> Improved (UX) User Experience </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/26/2020</i></b><br><br>
				<li> Added change log panel </li>
				<li> Improved other miscellanous features </li>
				<br>
				<br><b><i>01/22/2020</i></b><br><br>
				<li> Added index page </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/23/2020</i></b><br><br>
				<li> Added Contact us page </li>
				<li> Optimized surfing experience</li>
				<br>

				<br><b><i>01/24/2020</i></b><br><br>
				<li> Improved (UX) User Experience </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/26/2020</i></b><br><br>
				<li> Added change log panel </li>
				<li> Improved other miscellanous features </li>
				<br>
				<br><b><i>01/22/2020</i></b><br><br>
				<li> Added index page </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/23/2020</i></b><br><br>
				<li> Added Contact us page </li>
				<li> Optimized surfing experience</li>
				<br>

				<br><b><i>01/24/2020</i></b><br><br>
				<li> Improved (UX) User Experience </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/26/2020</i></b><br><br>
				<li> Added change log panel </li>
				<li> Improved other miscellanous features </li>
				<br>
				<br><b><i>01/22/2020</i></b><br><br>
				<li> Added index page </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/23/2020</i></b><br><br>
				<li> Added Contact us page </li>
				<li> Optimized surfing experience</li>
				<br>

				<br><b><i>01/24/2020</i></b><br><br>
				<li> Improved (UX) User Experience </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/26/2020</i></b><br><br>
				<li> Added change log panel </li>
				<li> Improved other miscellanous features </li>
				<br>
				<br><b><i>01/22/2020</i></b><br><br>
				<li> Added index page </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/23/2020</i></b><br><br>
				<li> Added Contact us page </li>
				<li> Optimized surfing experience</li>
				<br>

				<br><b><i>01/24/2020</i></b><br><br>
				<li> Improved (UX) User Experience </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/26/2020</i></b><br><br>
				<li> Added change log panel </li>
				<li> Improved other miscellanous features </li>
				<br>
				<br><b><i>01/22/2020</i></b><br><br>
				<li> Added index page </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/23/2020</i></b><br><br>
				<li> Added Contact us page </li>
				<li> Optimized surfing experience</li>
				<br>

				<br><b><i>01/24/2020</i></b><br><br>
				<li> Improved (UX) User Experience </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/26/2020</i></b><br><br>
				<li> Added change log panel </li>
				<li> Improved other miscellanous features </li>
				<br>
				<br><b><i>01/22/2020</i></b><br><br>
				<li> Added index page </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/23/2020</i></b><br><br>
				<li> Added Contact us page </li>
				<li> Optimized surfing experience</li>
				<br>

				<br><b><i>01/24/2020</i></b><br><br>
				<li> Improved (UX) User Experience </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/26/2020</i></b><br><br>
				<li> Added change log panel </li>
				<li> Improved other miscellanous features </li>
				<br>
				<br><b><i>01/22/2020</i></b><br><br>
				<li> Added index page </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/23/2020</i></b><br><br>
				<li> Added Contact us page </li>
				<li> Optimized surfing experience</li>
				<br>

				<br><b><i>01/24/2020</i></b><br><br>
				<li> Improved (UX) User Experience </li>
				<li> Created a prototype for basic functionality </li>
				<br>

				<br><b><i>01/26/2020</i></b><br><br>
				<li> Added change log panel </li>
				<li> Improved other miscellanous features </li>
				<br>
		</ul>
		</div>
</div>
<footer> Website project made by ZaiB, © All right reserved. </footer>
</body>
</html>
