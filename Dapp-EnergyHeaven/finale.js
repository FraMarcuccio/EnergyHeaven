





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



  // Get the modal
  var modal = document.getElementById('loginform');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


    // Get the modal
    var modal = document.getElementById('loginform2');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }




function sellingGraph(){
  var xValues = [50,60,70,80,90,100,110,120,130,140,150];
  var yValues = [7,8,8,9,9,9,10,11,14,14,15];
  
  new Chart("selling", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgb(38, 182, 5)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues,
        pointRadius: 4
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        yAxes: [{ticks: {min: 6, max:16}}],
      }
    }
  });

}



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



document.getElementById("reward").innerHTML = 'esce questa scritta quando carica tutta la pagina';



function getUserBalance(){
  contract.methods.userBalance(senderAddress).call({from:senderAddress, gas: 120000}).then(function(result) { // A promise in action
  $("#balance").html(result);
}).catch((error) => { console.error(error); });
}



//aggiorna continuamente il valore mentre la pagina è aperta, da provare non sono convintissimo funzioni correttamente
function addLoadEvent(func){
  var oldload =window.onload;
  if(typeof window.onload != 'function'){
    window.onload = func;
  }
  else{
    window.onload = func;
    if(oldload){
      oldload();
    }
    func();
  }
}

addLoadEvent(function(){ 
  document.getElementById("reward").innerHTML = 'ciaocaicoascafas';
  getUserBalance();
});













// Set contract ABI
var contractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "AcquiringTokens",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "TokensToEth",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "JOIN_AMOUNT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "PRICE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "REVERSE_EXC_VALUE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "energyList",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "minter",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "piggyBank",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "join_as_producer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "obtain_tokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "tokens_to_ETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "self_distruct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "sell_energy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "buy_energy",
    "outputs": [
      {
        "internalType": "bool",
        "name": "result",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "bought_amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


// Set the contract address
var contractAddress = '0x2264abE36DE264646C96f00f0c632DAaBf493bc6';
// Insert your contract address there

// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSON = "build/contracts/EnergyHeaven.json"

// Set the address from which transactions are sent
var senderAddress = '0xAD5a29f9bB5CfAC473Fd77856828961a761b6Afa';
// Insert your contract address there

// Set the contract
var contract = null;




$(window).on('load', function() {
  initialise(contractAddress);
});    

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
	// console.log(accounts[0])
	senderAddress = accounts[0]
	console.log("Sender address set: " + senderAddress)

	// Subscribe to all events by the contract
	contract.events.allEvents(
	callback=function(error, event){ // A "function object". Explained here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#The_function_expression_(function_expression)
      if (error) {
        console.error(error)
      }
      console.log(event);
  });



}

function updateDisplayedInformation() {

}







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
  });

  return false;
}

function tokens_to_ETH(){
  var input =$('#input2').val();

  if (input < 1) {
    alert("The numb should be higher than 0");
    return false;
  }

  console.log("input number is " + input);

  contract.methods.tokens_to_ETH(input).call({from:senderAddress, gas:120000}).then(function(result) {
    console.log("number in input: " + input);
  });

  contract.methods.tokens_to_ETH(input).send({from:senderAddress, gas:120000}).on('receipt',function(receipt){
    console.log("Tx Hash: " + receipt.transactionHash);
  });

  return false;
}

function yes(){
  alert("ahahah")
}


function join_as_producer(){

  contract.methods.join_as_producer().call({from:senderAddress, gas:120000}).then(function(result) {
    console.log("input: " + input);
  });

  contract.methods.join_as_producer().send({from:senderAddress, gas:120000}).on('receipt',function(receipt){
    console.log("Tx Hash: " + receipt.transactionHash);
  });
  
  return false;
}

function buy_energy(){
  var input =$('#Qnumber').val();

  if (input < 1) {
    alert("The numb should be higher than 0");
    return false;
  }

  console.log("input number is " + input);

  contract.methods.buy_energy(input).call({from:senderAddress, gas:120000}).then(function(result) {
    console.log("number in input: " + input);
  });

  contract.methods.buy_energy(input).send({from:senderAddress, gas:120000}).on('receipt',function(receipt){
    console.log("Tx Hash: " + receipt.transactionHash);
  });

  return false;
}


function nuovabuy(){
  let selectedOption;

  const options = document.querySelectorAll('input[name="options"]');

  options.forEach(option => {
    option.addEventListener('change', event => {
      selectedOption = event.target.value;
    });
  });

  alert(selectedOption);
}


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


  contract.methods.sell_energy(amount,price).call({from:senderAddress, gas:120000}).then(function(result) {
    console.log("amount in input " + amount);
    console.log("price in input " + price);
  });

  contract.methods.sell_energy(amount,price).send({from:senderAddress, gas:120000}).on('receipt',function(receipt){
    console.log("Tx Hash: " + receipt.transactionHash);
  });

  return false;
}

window.onload = sellingGraph();
window.onload = buyinGraph();