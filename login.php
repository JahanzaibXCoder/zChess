<?php
session_start();
$_SESSION['strbuffer'] = true;
//require 'session_management.php';
?>

<html lang='en'>
<head>
    <meta charset='utf-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale = 1.0'>
</head>

<body>
<?php
  require 'db_func.php';
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		if(!isset($_SESSION['Loggedin']))
		{
			$name = test_input($_POST['username']);
			$pass = test_input($_POST['password']);
			$ip_addr = $_SERVER['REMOTE_ADDR'];

			if($name == "InvalidStringSize")
			{
				$_SESSION['errPass'] = "*Password length must be between 4-20 characters";
				$_SESSION['reLog'] = true;
				$_SESSION['strbuffer'] = false;
			}
			if($pass == "InvalidStringSize")
			{
				$_SESSION['errName'] = "*Name length must be between 4-20 characters";
				$_SESSION['reLog'] = true;
				$_SESSION['strbuffer'] = false;
			}
			if($_SESSION['strbuffer'] == true)
			{
				$queryResponse = _OnAccountLoginAttempt($name, $pass);
				if($queryResponse == "SUCCESS")
				{
					$_SESSION['Loggedin'] = true;
					$_SESSION['name'] = $name;
					//session_start_sync();
				}
				else
					{
            if($queryResponse == "INVALID_AUTH")
            {
              $queryResponse = "Invalid login credentials";
            }
						$_SESSION['reLog'] = true;
						$_SESSION['errPass'] = $queryResponse;
					}
			}
		}
		echo "<script>window.location.href='index.php'</script>";
	}
	else echo "404 - Invalid Approach";

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

?>

<!--
//15000
400416
400417

//1500
903075
829679

//100
786160
786166

					/*	require_once 'db_config.php';
						$query = "SELECT ID, Name, Password, Status FROM users WHERE Name = ? AND Password = ? AND Status = ?";
						if($stmt = mysqli_prepare($link_db, $query))
						{
							mysqli_stmt_bind_param($stmt, "sss", $name, $pass, "Offline");

							if(mysqli_stmt_execute($stmt))
							{
								mysqli_stmt_store_result($stmt);
								if(mysqli_stmt_num_rows($stmt) == 1)
								{
									$_SESSION['Loggedin'] = true;
									$_SESSION['name'] = $name;

									/*
									UPDATE `users` SET `ID`=[value-1],`Name`=[value-2],`Password`=[value-3],`Email`=[value-4],`Joined`=[value-5],`LastActive`=[value-6],`Status`=[value-7],`Flavor`=[value-8] WHERE 1
									/*

								/*	mysqli_stmt_bind_result($stmt, $id, $name, $hash_password);
									if(mysqli_stmt_fetch($stmt))
									{
										if(password_verify($password, $hash_password);
										{
											// SESSION START
										}
									}
								}
								echo "<script>window.location.href='index.php'</script>";
							}
							mysqli_stmt_close($stmt);
						}
						mysqli_close($link_db);/*/
<!-->
