
//light on-off
var light = document.getElementById("light");

let localData = localStorage.getItem("light");


if(localStorage.getItem("light") == null){
  localStorage.setItem("light", "off");

}

if(localData == "on"){
  light.src = "moon.png";
  document.body.classList.remove("dark");
}
else if(localData == "off"){
  light.src = "sun.png";
  document.body.classList.add("dark");
}


light.onclick = function(){
  document.body.classList.toggle("dark");
  if(document.body.classList.contains("dark")){
    light.src = "sun.png";
    localStorage.setItem("light", "off");
  }
  else{
    light.src = "moon.png";
    localStorage.setItem("light", "on");
  }
}


//menu open by get element
var menuBtrigger = document.getElementById("menuBtrigger");

menuBtrigger.onclick = function(){
  document.body.classList.toggle('menuopen');
}

//menu open by get element
var menuUtrigger = document.getElementById("menuUtrigger");

menuUtrigger.onclick = function(){
  document.body.classList.toggle('menuopen2');
}


//popup selling and buying
function openSelling(){
  document.getElementById("popupSelling").style.display = "block";
}

function closeSelling(){
  document.getElementById("popupSelling").style.display = "none";
}

function openbuy(){
  document.getElementById("popupBuying").style.display = "block";
}

function closeBuying(){
  document.getElementById("popupBuying").style.display = "none";
}


//popup openform
function openform(){
  document.getElementById('loginform').style.display = 'block';
}

function closeform(){
  document.getElementById('loginform').style.display = 'none';
}

function openform2(){
  document.getElementById('loginform2').style.display = 'block';
}

function closeform2(){
  document.getElementById('loginform2').style.display = 'none';
}


//solo il bottone premuto chiama la pagina php, agisce come action del form
document.getElementById("bottonelog").addEventListener("click", function() {
  window.location.href = "logout.php";
});


let phpvariable = document.getElementById('hiddenValue').value;

function changeStatus(){
  if(phpvariable != "nullo"){
    menuUtrigger.src = "logged.png";
    document.getElementById("Sprofilo").innerHTML = phpvariable;
    //$("#reward").html("reward");
    //$("#balance").html("balance");
    //console.log("asasasdasf");
  }
}


changeStatus();


// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('loginform');

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var modal2 = document.getElementById('loginform2');

window.onclick = function(event2) {
  if (event2.target == modal2) {
    modal2.style.display = "none";
  }
}

let datigrafici;

function leggiDatiGrafici() {
  $.ajax({
    type: "POST",
    url: "readgraphdata.php",
    data: { action: 'read' }
  }).done(function(data) {
    //console.log(data);
    datigrafici = data.split('\n');
    //console.log(valori);
  });

}

$(window).on('load', function() {
  leggiFile();
  leggiDatiGrafici();
  initialise(contractAddress);
  //alert (session);
});  



//grafici
function sellingGraph(dati){
 
  var j = 0;
  var valori = [];

  var length = dati.length;
  for (var i = 0; i < length; i++){
    //console.log(dati[i]);
    if(dati[i].includes(senderAddress)){
      console.log("true, il senderAddress ?? " + senderAddress+ " mi sono preso :" + dati[i]);
      valori[j] = dati[i];
      j++;
      console.log(dati[i]);
    } 
  } 

  //take buying data
  j = 0;
  var xValues = [];

  for(var k = 0; k < valori.length; k++){
    if(valori[k].includes(" B ")){
      xValues[j] = valori[k].split(" ")[2];
      //console.log("valorik" + valori[k].split(" "));
      j++;
    }
  }

  //take selling data
  j = 0;
  var x2Values = [];
  var y2Values = [];

  for(var k = 0; k < valori.length; k++){
    if(valori[k].includes(" S ")){
      x2Values[j] = valori[k].split(" ")[2];
      y2Values[j] = valori[k].split(" ")[3];
      //console.log("valorik" + valori[k].split(" "));
      j++;
    }
  }

  
  new Chart("selling", {
    type: 'line',
    data: {
      labels: y2Values,
      datasets: [
        {
          label: 'Your Selling',
          data: x2Values,
          borderWidth: 1,
          fill: true,
          borderColor: 'green'
        },
        {
          label: 'Your Buying',
          data: xValues,
          borderWidth: 1,
          fill: true,
          borderColor: 'blue'
        }       
      ]
    },
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'amount of bought/sold energy'
          },
          ticks: {
            beginAtZero: true
          },
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'price of selling'
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  

  /*
  new Chart("selling", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgb(0,0,255)",
            borderColor: "rgba(0,0,255,0.1)",
            data: x2Values,
            pointRadius: 4
        },
        {
            fill: false,
            lineTension: 0,
            backgroundColor: "rgb(255, 0, 0)",
            borderColor: "rgb(0,0,255)",
            data: y2Values,
            pointRadius: 4
        },
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgb(38, 182, 5)",
          borderColor: "rgba(0,0,255,0.1)",
          data: xValues,
          pointRadius: 4
        },
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgb(255, 0, 0)",
          borderColor: "rgb(255, 0, 0)",
          data: yValues,
          pointRadius: 4
        }
      
      ]
    },
    options: {
        legend: { display: false },
        scales: {
            yAxes: [{ ticks: { min: 0, max: 50 } }],
        }
    }
  });*/
  
}

/*
function buyinGraph(){
  var xyValues = [
    {x:50, y:7},
    {x:60, y:8},
    {x:70, y:8},
    {x:80, y:9},
    {x:90, y:9},
    {x:100, y:9},
    {x:110, y:10},
    {x:120, y:11},
    {x:130, y:14},
    {x:140, y:14},
    {x:150, y:15}
  ];

  new Chart("buying", {
    type: "scatter",
    data: {
      datasets: [{
        pointRadius: 4,
        pointBackgroundColor: "rgb(0,0,255)",
        data: xyValues
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        xAxes: [{ticks: {min: 40, max:160}}],
        yAxes: [{ticks: {min: 6, max:16}}],
      }
    }
  });  
}
*/
//grafici

//document.getElementById("reward").innerHTML = 'esce questa scritta quando carica tutta la pagina';



//web3-------------------------------------------------------

// Set the contract address
var contractAddress = '0xAAd943Bfb6E1d76EEb290A5C8f7174daD19432e3';
// Insert your contract address there

// Set the relative URI of the contract???s skeleton (with ABI)
var contractJSON = "build/contracts/EnergyHeaven.json"

// Set the address from which transactions are sent
var senderAddress = '';
// Insert your contract address there

// Set the contract
var contract = null;



let valori;
var datiletti;
var letto;
var entratoelse;



function scriviDatiGrafici(value){
  $.ajax({
    type: "POST",
    url: "writegraphdata.php",
    data: value
  });
  console.log("scrittura fatta");
}

function leggiFile() {
  $.ajax({
    type: "POST",
    url: "readfile.php",
    data: { action: 'read' }
  }).done(function(data) {
    //console.log(data);
    valori = data.split('\n');
    //console.log(valori);
  });
}


  

async function initialise(contractAddress) {
  // Initialisation of Web3
  if (typeof web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
 } else {
   web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:7545"));
 }

  // Load the ABI. We await the loading is done through "await"
  // More on the await operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  await $.getJSON(contractJSON,
    function( contractData ) { // Use of IIFEs: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
      // console.log(contractAbi);
      contract = new web3.eth.Contract(contractData.abi, contractAddress);
    }
  ).catch((error) => { console.error(error); });
  // Arrow funcction expression at work. For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

  if (!contract) {
    console.error("No contract loaded.");
    return false;
  }

	// Set the address from which transactions are sent
	accounts = await web3.eth.getAccounts();


  //qui va l'interazione php contract


  //interazione php session con contract blockchain
//console.log("sessione"+phpvariable);

let mapvalue = new Map(); //tiene gli address come chiavi
let mapkey = new Map(); //tiene gli account session come chiavi

var indirizzo;
var sessione;


$.when(leggiFile()).done(function() {
  letto = true;

 // stampa a schermo l'array valori solo dopo che ?? stat eseguita la funzione che lo riempie
});
if(letto){
  console.log("primo valore dell'array: " + valori[0]);
  console.log("secondo valore dell'array: " + valori[1]);
  console.log("dimensione dell'array: "+valori.length);
  for(i = 0; i< valori.length-2; i++){
    console.log("iteratore: "+ i);
    mapkey.set(valori[i], valori[i+1]); //prima sessione poi address
    mapvalue.set(valori[i+1], valori[i]); //prima address poi sessione
    console.log("sessione: " + mapvalue.get(valori[i+1]));
    console.log("address: "+ mapkey.get(valori[i]));

  }
}


$.when(leggiDatiGrafici()).done(function() {
  datiletti = true;
});



  

if(phpvariable == 'nullo'){ //controllo se c'?? sessione attiva
  console.log("non ?? attiva la sessione");
}
else{
  console.log("c'?? sessione con: " +phpvariable);

  //se la sessione ?? attiva allora controllo se ?? gi?? salvata in map
  if(mapkey.has(phpvariable)){ 
    console.log("l'accaunt session ?? gi?? mappato");
    var i = 0;
    console.log(i);
    console.log(accounts[0]);

    indirizzo = mapkey.get(phpvariable);
    sessione = mapvalue.get(indirizzo);

    console.log("indirizzo  "+mapkey.get(phpvariable));
    console.log("sessione  "+mapvalue.get(indirizzo));

  }
  else{

    //se non ?? salvata allora imposto counter i e ciclo per controllare se address account sono mappati
    while(mapvalue.has(accounts[i])){ //finch?? trovi address mappati cicla
      i++;
      console.log(accounts[i]);
      console.log("address ?? gi?? salvato");
    }
    //se trovo un address non mappato esco dal ciclo e setto la sessione corrente con l'address non mappato
    mapkey.set(phpvariable,accounts[i]);
    //prima ho settato l'address in valore alla sessione, adesso setto la sessione in base all'address in modo da poter avere un return della key in base all'address
    mapvalue.set(accounts[i],phpvariable);

    console.log("size mapvalue: " + mapvalue.size);
    console.log("size mapkey: " + mapkey.size);

    sessione = mapvalue.get(accounts[i]);
    indirizzo = mapkey.get(phpvariable);

    console.log("get key " +mapvalue.get(accounts[i]));
    console.log("get values " +mapkey.get(phpvariable));

    entratoelse = 1;

  }

  if(entratoelse == 1){

    scrivifile(sessione);
    scrivifile(indirizzo);

  }
  /*else{

    indirizzo = mapvalue.get(phpvariable);
    sessione = mapkey.get(indirizzo);
  }*/

  

}

//restituisce account[i] mappato con la sessione corrente
senderAddress = indirizzo;
console.log("value/address return: "+senderAddress);

if(datiletti && senderAddress != ''){
  console.log(" i dati grafici letti sono: " + datigrafici);
  sellingGraph(datigrafici);
}

console.log("key/session return: "+sessione);  

//interazione php session con contract blockchain



	// console.log(accounts[0])
	//senderAddress = accounts[2]
	console.log("Sender address set: " + senderAddress)

	// Subscribe to all events by the contract
	contract.events.allEvents(
	callback=function(error, event){ // A "function object". Explained here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#The_function_expression_(function_expression)
      if (error) {
        console.error(error)
      }
      console.log(event);
  });


  if(phpvariable != "nullo"){
    updateDisplayedInformation();
  }
  else{
    console.log("nullo nullo ");

  }



}


function scrivifile(value){
  $.ajax({
    type: "POST",
    url: "writefile.php",
    data: value
  });
}


/*async function readValuesFromFile() {
  // Ottieni il contenuto del file utilizzando fetch()
  const response = await fetch('mapping.txt');
  const content = await response.text();

  // Dividi il contenuto del file in un array di stringhe separate
  const values = content.split('\n');
  
  // Fai qualcosa con gli elementi del array, ad esempio stampali a console
  console.log(values);
}*/

/*async function writeValuesToFile(values) {
  // Trasforma l'array o il valore in una stringa
  const content = Array.isArray(values) ? values.join('\n') : values;

  console.log("chiamato metodo");

  // Scrivi il contenuto nel file utilizzando fetch() e il metodo PUT
  await fetch('mapping.txt', {
    method: 'POST',
    body: content
  });
  console.log("chiamato ciclo?");

}*/

/*async function writeValueToFile(value) {
  // Invia il valore al server utilizzando fetch() e il metodo POST
  const response = await fetch('writefile.php', {
    method: 'POST',
    body: value
  });

  // Controlla se la scrittura nel file ?? avvenuta con successo
  if (response.ok) {
    console.log('Il valore ?? stato scritto nel file con successo');
  } else {
    console.error('Si ?? verificato un errore durante la scrittura nel file');
  }
}*/






function updateDisplayedInformation() {
  getUserBalance();
  getUserRewards();
}


function getUserBalance(){
  contract.methods.get_my_balance().call({from:senderAddress, gas:1000000}).then(function(result) {
    console.log("balance: " + result);
    $("#balance").html(result);
  });
}

function getUserRewards(){
  contract.methods.get_my_rewards().call({from:senderAddress, gas:1000000}).then(function(result) {
    console.log("rewards: " + result);
    $("#reward").html(result);
  });
}



//Ricarica ogni 1000 millisecondi ? controllare se funziona bene
setInterval(function(){
  $('#reward'),$('#balance') ;
}, 1000);

//pagina ricaricata dopo 1000millisec
/*
setTimeout(function(){
  window.location.reload();
}, 1000);
*/



//function contract -----------------------------------


function obtain_tokens(){
  var input =$('#input').val() * 10 **15;

  if (input < 1) {
    alert("The numb should be higher than 0");
    return false;
  }

  console.log("input number is " + input);

  contract.methods.obtain_tokens().call({from:senderAddress, value:input}).then(function(result) {
    console.log("number in input: " + input);
  });

  contract.methods.obtain_tokens().send({from:senderAddress, value:input}).on('receipt',function(receipt){
    console.log("Tx Hash: " + receipt.transactionHash);
    window.location.reload();
  });

  alert("Token obtained");


  

  return false;


}

function tokens_to_ETH(){
  var input =$('#input2').val();

  if (input < 1) {
    alert("The numb should be higher than 0");
    return false;
  }

  console.log("input number is " + input);

  contract.methods.tokens_to_ETH(input).call({from:senderAddress, gas:1000000}).then(function(result) {
    console.log("number in input: " + input);
  });

  contract.methods.tokens_to_ETH(input).send({from:senderAddress, gas:1000000}).on('receipt',function(receipt){
    console.log("Tx Hash: " + receipt.transactionHash);
    window.location.reload();
  });

  alert("Token converted");


  

  return false;


}

function yes(){
  alert("ahahah")
}


function join_as_producer(){

  contract.methods.join_as_producer().call({from:senderAddress, gas:1000000}).then(function(result) {
    console.log("input: " + input);
  });

  contract.methods.join_as_producer().send({from:senderAddress, gas:1000000}).on('receipt',function(receipt){
    console.log("Tx Hash: " + receipt.transactionHash);
    window.location.reload();
  });

  alert("You are a producer now");
  
  

  return false;


}

function buy_energy(){
  var input =$('#Qnumber').val();

  if (input < 1) {
    alert("The numb should be higher than 0");
    return false;
  }

  console.log("input number is " + input);

  contract.methods.buy_energy(input).call({from:senderAddress, gas:1000000}).then(function(result) {
    console.log("number in input: " + input);
  });

  contract.methods.buy_energy(input).send({from:senderAddress, gas:1000000}).on('receipt',function(receipt){
    console.log("Tx Hash: " + receipt.transactionHash);
    try {
      scriviDatiGrafici(senderAddress + " B " + input );
    }
    catch(err) {
      console.log(err);
    }
    window.location.reload();
  });

  alert(input + " Quantity of energy buyied");


  

  return false;


}


/*function nuovabuy(){
  let selectedOption;

  const options = document.querySelectorAll('input[name="options"]');

  options.forEach(option => {
    option.addEventListener('change', event => {
      selectedOption = event.target.value;
    });
  });

  alert(selectedOption);
}*/


function sell_energy(){
  var amount =$('#Enumber').val();
  var price =$('#Eprice').val();


  if (amount < 1) {
    alert("The amount should be higher than 0");
    return false;
  }

  if (price < 1) {
    alert("The price should be higher than 0");
    return false;
  }


  console.log("amount is " + amount);
  console.log("price is " + price);


  contract.methods.sell_energy(amount,price).call({from:senderAddress, gas:1000000}).then(function(result) {
    console.log("amount in input " + amount);
    console.log("price in input " + price);
  });

  contract.methods.sell_energy(amount,price).send({from:senderAddress, gas:1000000}).on('receipt',function(receipt){
    console.log("Tx Hash: " + receipt.transactionHash);
    try {
      scriviDatiGrafici(senderAddress + " S " + amount + " " + price );
    }
    catch(err) {
      console.log(err);
    }
    window.location.reload();
  });

  alert(amount + " Quantity of energy sold at " + price + " token");


  

  return false;

}


//funzioni grafici
//window.onload = sellingGraph();
//window.onload = buyinGraph();