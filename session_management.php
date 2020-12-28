<?php
/*******************************************************************************
********************************************************************************
                    To be worked on !
*******************************************************************************
********************************************************************************/
define('INACTIVE_LIMIT_IN_SECONDS', 10);

$_SESSION['session_check_duration'] = 10;
$_SESSION['session_check_activity'] = false;
$session_timer_handler;

session_start_sync(); // starts session

function refresh_session_sync()
{
    session_stop_sync();
    session_start_sync();
}

function session_start_sync()
{
    if(isset($_SESSION['Loggedin']) && $_SESSION['Loggedin'] == true)
    {
        $session_timer_handler = echo "<script> setInterval(session_update(), 1000); </script>";
    }
}

function session_stop_sync()
{
    $_SESSION['session_check_duration'] = INACTIVE_LIMIT_IN_SECONDS;
    clearInterval($session_timer_handler);
}

function _onsessionExpire_sync()
{
    print("OK BYE HAVE FUN");
    $_SESSION['name'] = 'HEHE';
}

function session_update_sync()
{
    if(!$_SESSION['session_check_activity'])
    {
        $_SESSION['session_check_duration']--;
        if($_SESSION['session_check_duration'] == 0)
        {
            _onsessionExpire_sync();
        }

    }
    else
    {
        refresh_session_sync();
    }
}

?>
