<?php

/* Database with MySQLi
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prova";

// Create connection
$connection = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($connection->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}



if(isset($_POST['registerbtn']))
{
  $username = $_POST['uname'];
  $password = $_POST['pwd'];
  $text = $username . "," . $password . "\n";
  $fp = fopen('db.txt', 'a+');

  echo("dcaisc");
    if(fwrite($fp, $text))  {
      echo 'saved';
    }
  fclose ($fp);    
}
*/

if(isset($_POST["uname"]) && isset($_POST["psw"]))
{
    // check if user exist.
    $file=fopen("db.txt","r");
    $finduser = false;
    while(!feof($file))
    {
        $line = fgets($file);
        $array = explode(",",$line);
        if(trim($array[0]) == $_POST['uname'])
        {
            $finduser=true;
            break;
        }
    }
    fclose($file);
 
    // register user or pop up message
    if( $finduser )
    {
        echo $_POST["uname"];
        echo ' existed!\r\n';
        include 'finale.html';
    }
    else
    {
        $file = fopen("db.txt", "a");
        fputs($file,$_POST["uname"].",".$_POST["psw"]."\r\n");
        fclose($file);
        echo $_POST["uname"];
        echo " registered successfully!";
    }
}
else
{
    include 'finale.html';
}


/*
function authenticate($username, $password){
  $file = explode( PHP_EOL, file_get_contents( "db.txt" ));
  foreach( $file as $line ) {
      list($username, $password) = explode(",", $line);
      if ($_POST['uname'] == $username && $_POST['psw'] == $password)
          return true;
  }
  return false;
}

if(isset($_POST["uname"]) && isset($_POST["psw"]) && ($_POST['loginbtn'])){

  if(authenticate($_POST['uname'], $_POST['psw'])) {
    echo "Login successfull!";
} else {
    echo "Invalid username or password";
}


}

*/


/*

              
if(isset($_POST['textdata']))
{
  echo ("puttanta");
$data=$_POST['textdata'];
$fp = fopen('data.txt', 'a');
fwrite($fp, $data);
fclose($fp);
}
*/
?>