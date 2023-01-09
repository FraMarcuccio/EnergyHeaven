<?php
session_start();
session_destroy();

echo '<script>
alert("logout!");
setTimeout(function(){ window.location = "finale.php" }, 5000);
</script>';

echo $_SESSION['user'];

?>