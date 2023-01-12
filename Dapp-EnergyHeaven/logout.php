<?php
session_start();
session_destroy();

echo '<script>
alert("logout!");
setTimeout(function(){ window.location = "prova.php" }, 1000);
</script>';

echo $_SESSION['user'];

?>