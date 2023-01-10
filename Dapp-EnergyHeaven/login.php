<?php


session_start();


if(isset($_SESSION['user'])){
  echo '<script>
  alert("already logged!");
  setTimeout(function(){ window.location = "prova.php" }, 5000);
</script>';

  echo $_SESSION['user'];
  echo '    asdasdafaf    ';
}
else{
  echo '<script>
  alert("not logged!");
  setTimeout(function(){ window.location = "prova.php" }, 5000);
</script>';
}


/*
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
*/


if (isset($_POST["uname"]) && isset($_POST["psw"])) {
  // check if user exist.
  $file = fopen("registration.txt", "r");
  $finduser = false;
  $name;
  $psw;
  while (!feof($file)) {

    $line = fgets($file);
    $array = explode(",", $line);

    if (trim($array[0]) == $_POST['uname']) {
      $finduser = true;
      $name = trim($array[0]);
      $psw = trim($array[1]);
      break;
    }
  }
  fclose($file);

  // register user or pop up message
  if ($finduser) {
    //echo $name;
    echo $psw;
    echo 'existed!';
    if($psw == $_POST['psw']){
      echo '<script>
      alert("Loged successfully!");
      setTimeout(function(){ window.location = "prova.php" }, 5000);
    </script>';

      $_SESSION['user'] = $name;
      $_SESSION['psw'] = $psw;

      $sessionvariable = $_SESSION['user'];
      echo '<script>var jsvar = ' . json_encode($sessionvariable) . ';</script>';

    }
    else{
      if($psw != $_POST['psw']){
        echo '<script>
        alert("Password errata!");
        setTimeout(function(){ window.location = "prova.php" }, 5000);
      </script>';
      }
    } 
  } else {
    echo '<script>
    alert("User not found, please register!");
    setTimeout(function(){ window.location = "prova.php" }, 1000);
    </script>';
  }
}

?>

<script>
  // Stampa il valore della variabile nella pagina HTML
  var jsvar = '<?php echo $_SESSION['jsvar']; ?>';

  module.exports = {jsvar: jsvar};
</script>