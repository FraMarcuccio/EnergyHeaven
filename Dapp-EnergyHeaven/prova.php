<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<link rel="stylesheet" href="prova.css">

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



  <div class="hero">
    <nav>
      <img src="logoedited.png" class="logo" id="menuBtrigger">
      <p>Energy<span> Heaven</span></p>
      <img src="moon.png" id="light">
      <ul>
        <li class="profile">
          <img src="piggy.png" class="notlogged">
          <label class="balancel" id="balance">Balance</label>        </li>
        <li class="profile">
          <img src="rewardlogo.png" class="notlogged">
          <label class="rewardl" id="reward">Reward</label>   
        </li>
        <li class="profile">
          <img src="notlogged.png" class="notlogged" id="menuUtrigger">
          <div>Profile</div>
        </li>
      </ul>
    </nav>

    <ul class="menuU">
      <li>
        <button class="dropbtn" onclick="openform2()">SignUp
      </li>

      <li>
        <button class="login" onclick="openform()">LogIn</button>
      </li>

      <li>
        <button id="bottonelog" class="logout" >LogOut</button>
      </li>

    </ul>

    <div id="loginform" class="loginform">
      <span onclick="closeform()" class="close" title="Close form">&times;</span>
      
      <form class="formcontent animate" action="login.php" method="post">

        <img src="loginicon.png" class="img">

        <div class="cform">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required>
    
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required>
    
          <button type="submit" name="loginbtn" class="loginbutton">Login</button>
        </div>

        <div class="cform">
          <button type="button" onclick="closeform()" class="cancelbutton">Cancel</button>
        </div>

      </form>

    </div>

    <!--registrazione-->

    <div id="loginform2" class="loginform2">
      <span onclick="closeform2()" class="close" title="Close form">&times;</span>
      
      <form class="formcontent animate" action="registration.php" method="post">

        <img src="logged.png" class="img">

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





    <ul class="menuB">

      <li>
      <form class="obtaintks" onsubmit="obtain_tokens(), getUserBalance(); return false;">
          <button class="obtbutton" type="submit">Obtain tokens</button>
          <input type="number" id="input" required="required">  
        </form>
      </li>

      <li>
      <form class="become_prod" onsubmit="join_as_producer(), getUserBalance(); return false;">
          <button type="submit" class="normalB">Become producer</button>
        </form>
      </li>

      <li>
        <form class="eth" onsubmit="tokens_to_ETH(), getUserBalance(); return false;">
          <button type="submit" class="normalB">Convert token</button>
          <input type="number" id="input2" required="required">
        </form>      
      </li>

      <li>
        <button class="opensell" onclick="openSelling()">Selling</button>
      </li>

      <li>
        <button class="openbuy" onclick="openbuy()">Buying</button>
      </li>
    </ul>


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

    <!--Popup sellings options-->
    <div class="popupselling" id="popupSelling">
      <form class="container" onsubmit="sell_energy(); return false;">
        <h2>Selling options</h2>

        <label for="energy">Quantity of energy</label>
        <input type="number" id="Enumber" required>

        <label for="price">Price of energy</label>
        <input type="number" id="Eprice" required>

        <button type="submit" class="sell actionbtn">Sell energy</button>
        <button type="button" class="cancel actionbtn" onclick="closeSelling()">Close</button>
      </form>
    </div>



    <div class="imgbox">
      <canvas class="selling" id="selling"></canvas>    
      
      <canvas class="buying" id="buying"></canvas>

    </div>


    <div class="graphbox">
      <img src="down.png" class="grapha">
      <img src="up.png" class="graphb">
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
  <script src="prova.js"></script>

</body>

</html>