<?php
session_start();

if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] == true)
{
  if(isset($_SESSION['Rank']) && $_SESSION['Rank'] == "Moderator")
  {

  }
  else echo "<script>window.location.href='index.php?form=login'</script>";
}
else echo "<script>window.location.href='index.php?form=login'</script>";
?>

<html lang='en'>
<head>
    <meta charset='utf-8' />
	<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale = 1.0'>
	<script src = 'plugins/jquery-3.4.1.js'> </script>
	<script src = "jscript.js"> </script>
	<link rel = 'stylesheet' href = 'resources\styling\indexStyle.css'/>
	<title>zChess - Admin Panel</title>
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
				<button id = 'ilobby'> <?php echo "Admin panel"; ?> </button>
        <script> signinftg(); </script>
		</div>
	</div>

  <div id = 'adminpanel'>
<form action="update_record.php" method = 'POST'>
    <table id="t02">
      <tr>
        <th class = 'thh'>ID</th>
        <th class = 'thh'>Name</th>
        <th class = 'thh'>Password</th>
        <th class = 'thh'>Email</th>
        <th class = 'thh'>Date Joined</th>
        <th class = 'thh'>Last Active</th>
        <th class = 'thh'>Rank</th>
        <th class = 'thh'>Status</th>
        <th class = 'thh'>Restriction</th>
      </tr>
<?php
$username = $_GET['profile'];
require_once 'db_func.php';
list($userdata, $buffer)  = getUserInfo($username);
$i = 0;
echo "<tr>";
while($i <= $buffer)
{
  if($i == 0)
  {
    echo "<th> <input type='text' id='pid' name='pid' value = '$userdata[$i]'> </th>";

  }
  else if($i == 1)
  {
    echo "<th> <input type='text' id='cname' name='cname' value = '$userdata[$i]'> </th>";
  }
  else if($i == 2)
  {
      echo "<th> <input type='password' id='cpass' name='cpass' value = '$userdata[$i]'> </th>";
  }
  else if($i == 3)
  {
        echo "<th> <input type='email' id='cmail' name='cmail' value = '$userdata[$i]'> </th>";
  }
  else if($i == 6)
  {
    //  echo "<th> <input type='' id='cpass' name='cpass' placeholder = '$userdata[$i]'> </th>";
      echo "<th> <input list='rank' name='crank' id='crank' value = '$userdata[$i]'>
        <datalist id='rank'>
          <option value='New'>
          <option value='Mediocre'>
          <option value='Rampage'>
          <option value='Expert'>
          <option value='Master'>
          <option value='Moderator'>
        </datalist>
      </th>";
  }
  else if($i == 7)
  {
    //  echo "<th> <input type='' id='cpass' name='cpass' placeholder = '$userdata[$i]'> </th>";
      echo "<th> <input list='status' name='cstatus' id='cstatus' value = '$userdata[$i]'>
        <datalist id='status'>
          <option value='Online'>
          <option value='Offline'>
        </datalist>
      </th>";
  }
  else if($i == 8)
  {
    //  echo "<th> <input type='' id='cpass' name='cpass' placeholder = '$userdata[$i]'> </th>";

    if($userdata[$i] == "No")
    {
      echo "<th> <input list='restricted' name='crestrict' id='normuid' value = '$userdata[$i]'>
        <datalist id='restricted'>
          <option value='Yes'>
          <option value='No'>
        </datalist>
      </th>";
    }
    else if($userdata[$i] == "Yes")
    {
      echo "<th> <input list='restricted' name='crestrict' id='banuid' value = '$userdata[$i]'>
        <datalist id='restricted'>
          <option value='No'>
          <option value='Yes'>
        </datalist>
      </th>";
    }
  }
  else echo "<th> $userdata[$i] </th>";
  $i++;
}
echo "</tr>";
?>
  </table>
  </div>
<input id = 'cUserInfo' class = 'formElementSubmit' type='submit' value='Save changes'> <br><br><br>
</form>
  <footer> Website project made by ZaiB, © All right reserved. </footer>
</body>
