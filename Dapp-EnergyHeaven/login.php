<?php

if (isset($_POST["uname"]) && isset($_POST["psw"])) {
  echo "aciascpas";
  if (authenticate($_POST['uname'], $_POST['psw'])) {
    echo "Login successfull!";
  } else {
    echo "Invalid username or password";
  }
}



function authenticate($username, $password){
  $file = explode( PHP_EOL, file_get_contents( "db.txt" ));
  foreach( $file as $line ) {
      list($username, $password) = explode(",", $line);
      if ($_POST['uname'] == $username && $_POST['psw'] == $password)
          return true;
  }
  return false;
}


?>