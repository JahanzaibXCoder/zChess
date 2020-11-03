<?php
session_start();
if(isset($_SESSION['Loggedin']))
{
	echo "<script>window.location.href='index.php'</script>";
}
$_SESSION['strbuffer'] = true;
?>

<!DOCTYPE html>


<html lang='en'>
<head>
    <meta charset='utf-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale = 1.0'>
	<script src = 'plugins/jquery-3.4.1.js'> </script>
	<script src = "jscript.js"> </script>
	<link rel = 'stylesheet' href = 'resources\styling\indexStyleReg.css'/>
	<title>zChess - Registeration</title>
</head>

<body>
	<div id = 'ipage' class = 'blurFx'>
		<div class = 'iheader' id = 'ihead'>
			<img id = 'iheadLogo' src = 'resources/images/logotemp.jpg'/>
					<nav id = 'iheadSlog'> zChess </nav>
			<img id = 'ihomeLogo' src = 'resources/images/ihomeLogo.png'/>
					<a id = 'ihome' href = 'index.php' > Home</a>
			<img id = 'icontactLogo' src = 'resources/images/icontactus.png'/>
				<a id = 'icontact' href = 'contact.html' > Contact Us </a>
			<img id = 'ilobbyLogo' src = 'resources/images/ilobbyLogo.jpg'/>
				<button id = 'ilobby'> <?php echo "Registeration"; ?> </button>
		</div>
	</div>
		<div id = 'upwrapper'>
			<img id = 'iregico' src = 'resources\images\chessregcol.jpg'/> 
		<form id = 'formRegister' action = <?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?> method = 'POST'>
		<a id = 'closeform' href = "index.php" style = "text-decoration: none" > x </a>
		<input class = 'formElement' type='text' id = 'name' name='username' placeholder = 'Choose username' >
		<br>
		<input class = 'formElement' type='password' id = 'pass' name='password' placeholder = 'Enter password'><br><br>
		<br>
		<input class = 'formElement' type='password' id = 'pass2' name='password2' placeholder = 'Confirm password'><br><br>
		<br>
		<input class = 'formElement' type='email' id = 'email' name= 'email' placeholder = 'Enter email'><br><br>
		<div id = 'errorPanel'>
		 <?php if(isset($_SESSION['errName']) && $_SESSION['errName'] != '') { echo	"<div class = 'errForm'>" . $_SESSION['errName'] . "</div>"; } ?>
		 <?php if(isset($_SESSION['errPass']) && $_SESSION['errPass'] != '') { echo "<div class = 'errForm'>" . $_SESSION['errPass']. "</div>"; } ?>
		 <?php if(isset($_SESSION['errPass2']) && $_SESSION['errPass2'] != '') { echo "<div class = 'errForm'>" . $_SESSION['errPass2']. "</div>"; } ?>
		 <?php if(isset($_SESSION['errEmail']) && $_SESSION['errEmail'] != '') { echo "	<div class = 'errForm'>" . $_SESSION['errEmail'] . "</div>"; } ?>
	</div>
		<input class = 'formElementSubmit' type='submit' value='Create account'> <br><br><br>
		<span> <b><i> Already have an account? Login <a href = "index.php?form=login"> here </i></b> </a> </span>
		</form>
	</div>
<footer> Website project made by ZaiB, © All right reserved. </footer>


<?php


	if(isset($_SESSION['reLog']) && $_SESSION['reLog'] == true)
	{
		$_SESSION['errPass'] = '';
		$_SESSION['errName'] = '';
		$_SESSION['errPass2'] = '';
		$_SESSION['errEmail'] = '';
		$_SESSION['reLog'] = false;
	}
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		if(!isset($_SESSION['Loggedin']))
		{
			$name = test_input($_POST['username']);
			$pass = test_input($_POST['password']);
			$pass2 = test_input($_POST['password2']);
			$email = test_input_e($_POST['email']);
			$ip_addr = $_SERVER['REMOTE_ADDR'];

				if($name == "InvalidStringSize")
				{
					$_SESSION['reLog'] = true;
					$_SESSION['errName'] = "*Name length must be between 4-20 characters";
					$_SESSION['strbuffer'] = false;
					echo "<script>window.location.href=''</script>";

				}
				if($pass == "InvalidStringSize")
				{
					$_SESSION['reLog'] = true;
					$_SESSION['errPass'] = "*Password length must be between 4-20 characters";
					$_SESSION['strbuffer'] = false;
					echo "<script>window.location.href=''</script>";
				}
				if($email == "InvalidStringSize")
				{
					$_SESSION['reLog'] = true;
					$_SESSION['errEmail'] = "*Invalid email length";
					$_SESSION['strbuffer'] = false;
					echo "<script>window.location.href=''</script>";
				}
				if($pass !== $pass2)
				{
					$_SESSION['errPass2'] = "*Passwords do not match!";
					$_SESSION['reLog'] = true;
					$_SESSION['strbuffer'] = false;
					echo "<script>window.location.href=''</script>";
				}
				if($_SESSION['strbuffer'] == true)
				{
					require_once 'db_func.php';
					$queryResponse = _onAccountRegisterRequest($name, $pass, $email, 'Online', true);
					if($queryResponse == "SUCCESS_PARAM_WRITE_TRUE")
					{

							$_SESSION['Loggedin'] = true;
							$_SESSION['name'] = $name;
							echo "<script>window.location.href='index.php'</script>";
					}
					else if($queryResponse == "EMAIL_ALREADY_EXISTS")
					{
						$_SESSION['reLog'] = true;
						$_SESSION['errEmail'] = "*Associated account with this E-Mail already exists";
						$_SESSION['strbuffer'] = false;
						//echo "<script>window.location.href=''</script>";
					}
					else if($queryResponse == "NAME_ALREADY_EXISTS")
					{
						$_SESSION['reLog'] = true;
						$_SESSION['errName'] =  "*Associated account with this Name already exists";
						$_SESSION['strbuffer'] = false;
						//echo "<script>window.location.href=''</script>";
					}
				}
		}

	}
	function test_input($data)
	{
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		if(strlen($data) < 4 || strlen($data) > 20)
		{
			$data = "InvalidStringSize";
		}
		return $data;
	}
	function test_input_e($data)
	{
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		if(strlen($data) < 7 || strlen($data) > 40)
		{
			$data = "InvalidStringSize";
		}
		return $data;
	}

?>
</body>
</html>
