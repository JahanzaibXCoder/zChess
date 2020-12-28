<?php

include 'db_func.php';
$function = $_POST['function'];
$filename = htmlentities(strip_tags($_POST['file']));
$log = array();

switch($function)
{
  case('update'):
    $state = $_POST['state'];
    $lobbyid = $_POST['lobbyid'];
    $noOfRecords = $_POST['noOfRecords'];
        	// if(file_exists($filename)){
        	//     $lines = file($filename);
        	//   }
        //	 $count =  count($lines);
    $count = shoutboxGetCount($lobbyid);
    if($state == $count)
    {
      $log['state'] = $state;
      $log['text'] = false;
    }
    else
        {
          $shoutid = array();
          $name = array();
          $rank = array();
        	$text = array();
          $status = array();
          //   $log['state'] = $state + count($lines) - $state;
          $log['state'] = $state + $count - $state;
          list($shoutboxData, $countmin) = shoutboxGetParams($lobbyid, $noOfRecords);
          for($i = $countmin; $i <= $count; $i++)
        	// foreach ($lines as $line_num => $line)
          {
            if($i >= $state)
        	  //  if($line_num >= $state)
            {
              // $text[] =  $line = str_replace("\n", "", $line);
              $shoutid[] = $shoutboxData[$i][0];
              $name[] = $shoutboxData[$i][1];
              $rank[] = $shoutboxData[$i][2];
              $timestamp[] = $shoutboxData[$i][3];
              $tmptext = str_replace("\n", "", $shoutboxData[$i][4]);
              $tmptext = str_replace("&sq", "'", $tmptext);
              $text[] = $tmptext;
              $status[] = $shoutboxData[$i][5];
              //   $text[] =  $shoutboxData[$i][4] = str_replace("\n", "", $shoutboxData[$i][4]);
              //     $text[] =  $shoutboxData[$i][4] = str_replace("&sq", "'", $shoutboxData[$i][4]);
        		}
          }
          $log['shoutid'] = $shoutid;
          $log['name'] = $name;
          $log['rank'] = $rank;
          $log['time'] = $timestamp;
         	$log['text'] = $text;
          $log['status'] = $status;
        }
        break;

  case('send'):
    $nickname = htmlentities(strip_tags($_POST['nickname']));
		$reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
		$message = htmlentities(strip_tags($_POST['message']));
    $lobbyid = htmlentities(strip_tags($_POST['lobbyid']));
		if(($message) != "\n")
    {
		    if(preg_match($reg_exUrl, $message, $url))
        {
       	  $message = preg_replace($reg_exUrl, '<a href="'.$url[0].'" target="_blank">'.$url[0].'</a>', $message);
			  }
       //  $fhandle = fopen($filename, "a");
        $message = str_replace("\n", " ", $message);
        $message = str_replace("'", "&sq", $message);
      //  $str = "<p>[<i><b>%s</b></i>]</p><span><div><i><b>%s </b></i></div>: <span> %s </span></span>";
      //  $shoutformatted = sprintf($str, date("h:i:s a"), $nickname, $message);
        shoutboxWrite($lobbyid, $nickname, $message);
        //$shoutformatted = sprintf("<p>[<i><b>%s</b></i>]</p><span class = 'moderator'><i><b>%s </b></i>: <span> %s </span></span> \n", date("h:i:s a"), $nickname, $message);
        //echo "HELLOOOOOOOOOOOOOOOOOOOOOOOOO";
      //  fwrite($fhandle, "<p>[<i><b>" . date("h:i:s a") . "</b></i>]</p>" . "<span class = 'moderator'><i><b>" . $nickname . "</b></i>: <span>" . $message = str_replace("\n", " ", $message) . "</span></span>"  . "\n");
      //  fclose($fhandle);
  	}
    break;
}

    echo json_encode($log);
  //  echo json_encode(array('success' => 1));

?>
