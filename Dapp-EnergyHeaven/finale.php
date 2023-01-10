<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!--Font bello per le icone-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <link rel="stylesheet" href="finale.css">

  <!--Si può cambiare con il file BS locale-->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

  <title>HTML finale</title>
</head>

<body>

<?php

session_start();

if(isset($_SESSION['user'])){
  $account =$_SESSION['user'];
}
else{
  $account = 'nullo';
}

?>

<!--passa variabile sessione account in un element html nascosto così posso prenderlo nel js-->
<input type="hidden" id="hiddenValue" value="<?php echo $account; ?>">



  <div class="maingrid">
    <div class="user">

      <ul class="ull">
        <li class="l1"><a href="#home">Home</a></li>
        <li class="l2" ><label class="balancel" id="balance">balance</label></li>
        <li class="l2" ><label class="rewardl" id="reward">reward</label></li>
        <li class="dropdown">
          <!--PHP here-->
          <button class="dropbtn" onclick="openform2()">Sign Up
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <button class="login" onclick="openform()">LogIn</button>
            <button id="bottonelog" class="logout" >LogOut</button>
          </div>
        </li>
      </ul>
      
    </div>

<!--registrazione-->

    <div id="loginform2" class="loginform">
      <span onclick="closeform2()" class="close" title="Close form">&times;</span>
      
      <form class="formcontent animate" action="registration.php" method="post">

        <div class="img">
          <img src="" alt="" class="">
        </div>

        <div class="cform">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required>
    
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required>
          
          <button type="submit" name="registerbtn"    class="loginbutton">Register</button>
          <!--name="registerbtn"-->
        </div>

        <div class="cform">
          <button type="button" onclick="closeform2()" class="cancelbutton">Cancel</button>
        </div>

      </form>

    </div>


    


<!--login-->


    <div id="loginform" class="loginform">
      <span onclick="closeform()" class="close" title="Close form">&times;</span>
      
      <form class="formcontent animate" action="login.php" method="post">

        <div class="img">
          <img src="" alt="" class="">
        </div>

        <div class="cform">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required>
    
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required>
    
          <button type="submit" name="loginbtn" class="loginbutton">Login</button>
          
          <!--
          <label>
            <input type="checkbox" checked="checked" name="remember"> Remember me
          </label>
          -->
        </div>

        <div class="cform">
          <button type="button" onclick="closeform()" class="cancelbutton">Cancel</button>
          <!--
          <span class="psw">Forgot <a href="#">password</a></span>
          -->
        </div>

      </form>

    </div>



    <div class="button">

      <div class="obtaintks">
        <form class="obtaintks" onsubmit="obtain_tokens(), getUserBalance(); return false;">
          <button class="obtbutton" type="submit">obtain tokens</button>
          <input type="number" id="input" required="required">  
        </form>
      </div>



      <div class="become_prod">
        <form class="become_prod" onsubmit="join_as_producer(), getUserBalance(); return false;">
          <button type="submit">become producer</button>
        </form>
      </div>


      <div class="ETH">
        <form class="eth" onsubmit="tokens_to_ETH(), getUserBalance(); return false;">
          <button type="submit">tokens_to_ETH</button>
          <input type="number" id="input2" required="required">
        </form>
      </div>


      <div class="submit">
        <p></p>
        <button class="opensell" onclick="openSelling()">Selling</button>
        
        <!--Popup sellings options-->
        <div class="popupselling" id="popupSelling">
          <form class="container" onsubmit="sell_energy(); return false;">
            <h2>Selling options</h2>

            <label for="energy">Quantity of energy</label>
            <input type="number" id="Enumber" required>

            <label for="price">Price of energy</label>
            <input type="number" id="Eprice" required>

            <button type="submit" class="sell">Sell energy</button>
            <button type="button" class="cancel" onclick="closeSelling()">Close</button>
          </form>
        </div>
      </div>

      <div class="submit">
        <button class="openbuy" onclick="openbuy()">Buying</button>
        
        <!--Popup buying options-->
        <div class="popupbuying" id="popupBuying">
          <form class="container" onsubmit="buy_energy(), getUserBalance(); return false;">
            <h2>Buying options</h2>
              <label for="quantity">Quantity of energy</label>
              <input type="number" id="Qnumber" required>
              
              <button type="submit" class="sell">Buy energy</button>
              <button type="button" class="cancel" onclick="closeBuying()">Close</button>
          </form>
        </div>
      </div>


    </div>

    <div class="graph">
      <div class="col50">
        <canvas class="selling" id="selling">asdasd</canvas>        
      </div>
      <div class="col50">
        <canvas id="buying" id="buying"></canvas>
      </div>
    </div>
  </div>



  <!--Per i grafici, guardare come fare ad inserire nei valori X/Y i dati dal contratto-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/elliptic/6.3.3/elliptic.min.js"></script>
  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/web3.min.js"></script>
  
  <!--file php che contiene javascript per passare le variabili nel file js linkato qui sotto-->
  <!--javascript-->
  <script src="finale.js"></script>

<!--
  <input type="hidden" id="hiddenValue" value="<?php //echo $phpVariable; ?>">
-->

</body>
</html>