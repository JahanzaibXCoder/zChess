<?php

function getActiveUserInfo($lobbyId)
{
	require_once 'db_config.php';
	$sql = "SELECT `Name`, `Rank` FROM lobby where LobbyID = ${lobbyId}";
	if($result = mysqli_query($link_db,$sql))
	{
		$arr_of_names = [];
		$arr_of_rank = [];
		while ($row = mysqli_fetch_row($result))
		{
			array_push($arr_of_names, $row[0]);
			array_push($arr_of_rank, $row[1]);
		}
		return array($arr_of_names, $arr_of_rank);
		mysqli_free_result($result);
	}
	else 	echo "<script> console.log('Query not executed : pLobby : ${lobbyId}'); </script>";
mysqli_close($link_db);
}

function onUserLeaveLobby($user)
{
	require_once 'db_config.php';
	$query = "DELETE FROM `lobby` WHERE `Name` = '$user';";
	if($stmt = mysqli_prepare($link_db, $query))
	{
		if(mysqli_stmt_execute($stmt))
		{
			mysqli_stmt_store_result($stmt);
			mysqli_stmt_bind_result($stmt, $rank);
			return $rank;
		}
		mysqli_stmt_close($stmt);
	}
	mysqli_close($link_db);
}

function OnUserJoinLobby($user, $lobbyid)
{
	require_once 'db_config.php';
	$query = "SELECT `Rank` FROM `userdata` WHERE Name = '${user}'";
	if($stmt = mysqli_prepare($link_db, $query))
	{
		if(mysqli_stmt_execute($stmt))
		{
			mysqli_stmt_store_result($stmt);
			mysqli_stmt_bind_result($stmt, $rank);
			if(mysqli_stmt_fetch($stmt))
			{
				$query = "INSERT INTO `lobby`(`LobbyID`, `Name`, `Rank`) VALUES ($lobbyid, '$user', '$rank')";
				if($result = mysqli_query($link_db, $query))
				{
					return true;
				}
				else return false;
			}
		}
		mysqli_stmt_close($stmt);
	}
	mysqli_close($link_db);
}

function getUserInfo($name)
{
	require_once 'db_config.php';
	$query = "SELECT * FROM userdata where Name = '$name'";
	if($result = mysqli_query($link_db,$query))
	{
		$arr_of_userdata = [];
		while ($row = mysqli_fetch_row($result))
		{
			array_push($arr_of_userdata, $row[0]);
			array_push($arr_of_userdata, $row[1]);
			array_push($arr_of_userdata, $row[2]);
			array_push($arr_of_userdata, $row[3]);
			array_push($arr_of_userdata, $row[4]);
			array_push($arr_of_userdata, $row[5]);
			array_push($arr_of_userdata, $row[6]);
			array_push($arr_of_userdata, $row[7]);
			array_push($arr_of_userdata, $row[8]);
		}
		return array($arr_of_userdata, 8);
		mysqli_free_result($result);
	}
	mysqli_close($link_db);
	}

function _onAccountRegisterRequest($name, $pass, $email, $status, $write_record)
{
	require_once 'db_config.php';
	$query = "SELECT Name FROM userdata WHERE Name = ?";
	if($stmt = mysqli_prepare($link_db, $query))
	{
		mysqli_stmt_bind_param($stmt, "s", $param_username);
		$param_username = $name;
		if(mysqli_stmt_execute($stmt))
		{
			mysqli_stmt_store_result($stmt);
			if(mysqli_stmt_num_rows($stmt) == 0)
			{
				$query = "SELECT Email FROM userdata WHERE Email = ?";
				if($stmt = mysqli_prepare($link_db, $query))
				{
					mysqli_stmt_bind_param($stmt, "s", $email);
					if(mysqli_stmt_execute($stmt))
					{
						mysqli_stmt_store_result($stmt);
						if(mysqli_stmt_num_rows($stmt) == 0)
						{
							if($write_record == true)
							{
								echo "PRE QUERY <br>";
							//	$query = "INSERT INTO userdata (Name, Password, Email) VALUES Name = ? Password = ?, Email = ?";
								$query = "INSERT INTO userdata (Name, Password, Email, Status) VALUES ('$name', '$pass','$email', '$status')";
								//$query = "SELECT Status FROM userdata WHERE Name = ? AND Status = ?";
								if($stmt = mysqli_prepare($link_db, $query))
								{
									//mysqli_stmt_bind_param($stmt, "ss", $name, $status);
									//$status = "Offline";
								//	mysqli_stmt_bind_param($stmt, "sss", $name, $pass, $email);
									if(mysqli_stmt_execute($stmt))
									{
										return "SUCCESS_PARAM_WRITE_TRUE";
										echo "POST QUERY <br>";
									}
									else { echo "STMT ERROR <br>"; }
									mysqli_stmt_close($stmt);
								}
								else { echo "PREP ERROR <br>"; }
								mysqli_close($link_db);
							}
							else return "SUCCESS_PARAM_WRITE_FALSE";
						}
						else return "EMAIL_ALREADY_EXISTS";
					}
					mysqli_stmt_close($stmt);
				}
				mysqli_close($link_db);
			}
			else return "NAME_ALREADY_EXISTS";
		}
		mysqli_stmt_close($stmt);
	}
	mysqli_close($link_db);
}

function UpdateRecord($id, $name, $pass, $mail, $rank, $status, $restrict)
{
	  require_once 'db_config.php';
		$query = "UPDATE userdata SET `Name`= '$name', `Password`= '$pass', `Email`= '$mail',`Rank`= '$rank',`Status`= '$status',`Restriction`= '$restrict' WHERE `ID` = ${id}";
		if($result = mysqli_query($link_db, $query))
		{
			return true;
			mysqli_free_result($result);
		}
		mysqli_close($link_db);
}
/*	if($stmt = mysqli_prepare($link_db, $query))
	{
		mysqli_stmt_bind_param($stmt, "ss", '$name', '$pass', '$mail', '$rank', '$status', '$restrict');
		if(mysqli_stmt_execute($stmt))
		{
			return true;
		}
		mysqli_stmt_close($stmt);
	}*/
function _OnAccountLoginAttempt($name, $pass)
{
  require_once 'db_config.php';
	$query = "SELECT ID, Name, Password FROM userdata WHERE Name = ? AND Password = ?";
	if($stmt = mysqli_prepare($link_db, $query))
	{
		mysqli_stmt_bind_param($stmt, "ss", $name, $pass);
		if(mysqli_stmt_execute($stmt))
		{
			mysqli_stmt_store_result($stmt);
			if(mysqli_stmt_num_rows($stmt) == 1)
			{
				$query = "SELECT Status FROM userdata WHERE Name = ? AND Status = ?";
				if($stmt = mysqli_prepare($link_db, $query))
				{
					mysqli_stmt_bind_param($stmt, "ss", $name, $status);
					$status = "Offline";
					if(mysqli_stmt_execute($stmt))
					{
						mysqli_stmt_store_result($stmt);
						if(mysqli_stmt_num_rows($stmt) == 1)
						{
							$query = "UPDATE userdata SET Status = ? WHERE Name = ?";
							if($stmt = mysqli_prepare($link_db, $query))
							{
								mysqli_stmt_bind_param($stmt, "ss", $status, $name);
								$status = "Online";
								if(mysqli_stmt_execute($stmt))
								{
									return "SUCCESS";
								}
	    						mysqli_stmt_close($stmt);
							}
							mysqli_close($link_db);
						}
						else return "ALREADY_CONNECTED";
					}
					mysqli_stmt_close($stmt);
				}
				mysqli_close($link_db);
			}
			else return "INVALID_AUTH";
		}
		mysqli_stmt_close($stmt);
    }
	mysqli_close($link_db);
}

function _onAccountDisconnect($name)
{
  require_once 'db_config.php';
	$query = "SELECT Name FROM userdata WHERE Name = ?";
	if($stmt = mysqli_prepare($link_db, $query))
	{
		mysqli_stmt_bind_param($stmt, "s", $name);
		if(mysqli_stmt_execute($stmt))
		{
			mysqli_stmt_store_result($stmt);
			if(mysqli_stmt_num_rows($stmt) == 1)
			{
				$query = "SELECT Status FROM userdata WHERE Name = ? AND Status = ?";
				if($stmt = mysqli_prepare($link_db, $query))
				{
					mysqli_stmt_bind_param($stmt, "ss", $name, $status);
					$status = "Online";
					if(mysqli_stmt_execute($stmt))
					{
						mysqli_stmt_store_result($stmt);
						if(mysqli_stmt_num_rows($stmt) == 1)
						{
							$query = "UPDATE userdata SET Status = ? WHERE Name = ?";
							if($stmt = mysqli_prepare($link_db, $query))
							{
								mysqli_stmt_bind_param($stmt, "ss", $status, $name);
								$status = "Offline";
								if(mysqli_stmt_execute($stmt))
								{
									return "SUCCESS";
								}
	    						mysqli_stmt_close($stmt);
							}
							mysqli_close($link_db);
						}
						else return "NOT_CONNECTED";
					}
					mysqli_stmt_close($stmt);
				}
				mysqli_close($link_db);
			}
			else return "INVALID_REQ";
		}
		mysqli_stmt_close($stmt);
    }
	mysqli_close($link_db);
}
?>
