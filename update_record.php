<?php
session_start();

?>

<html lang='en'>
<head>
    <meta charset='utf-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale = 1.0'>
</head>

<body>
<?php

	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		if(isset($_SESSION['Loggedin']))
		{
      if(isset($_SESSION['Rank']) && $_SESSION['Rank'] == "Moderator")
      {
        $id = $_POST['pid'];
        if($name == $_SESSION['name'])
  			$name = test_input($_POST['cname']);
  			$pass = test_input($_POST['cpass']);
  			$mail = test_input($_POST['cmail']);
        $rank = test_input($_POST['crank']);
        $status = test_input($_POST['cstatus']);
        $restrict = $_POST['crestrict'];
        include_once 'db_func.php';
        if(UpdateRecord($id, $name, $pass, $mail, $rank, $status, $restrict))
        {
          header("Location:lobby.php?task=1");
        }
        else header("Location:manageprofile.php?profile=$name&err=404");
      }
    }
  }

  function test_input($data)
  {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    if(strlen($data) < 3 || strlen($data) > 20)
    {
      $data = "InvalidStringSize";
    }
    return $data;
  }

  ?>
</body>
