// Prevent forms from submitting and reloading the page
$("form").submit(function(e){e.preventDefault();});


// Set the contract address
var contractAddress = '0x3F033807F6714E138fBb5b47cEebb607F8D9CA60';
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSON = "build/contracts/EnergyHeaven.json"
// Set the sending address
var senderAddress = '0x77f1E9e68d09E8d98130c7794aacE4Ed68083e30';
// Set contract ABI and the contract
var contract = null;

$(window).on('load', function() {
  initialise(contractAddress);
});

// Asynchronous function (to work with modules loaded on the go)
// For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function
async function initialise(contractAddress) {
  // Initialisation of Web3
	if (typeof web3 !== 'undefined') {
	  web3 = new Web3(web3.currentProvider);
	} else {
	  // Set the provider you want from Web3.providers
    // Use the WebSocketProvider to enable events subscription.
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

	// Create additional event listeners to display the results of a play.
	subscribeToEvents();

	// Update the information displayed
	//updateDisplayedInformation();
}

function updateDisplayedInformation() {

	return false;
}

// Function to be called to play
function acquire() {
	var eth = $('#eth_amount').val();
	// Check that the value is a positive integer
	if (eth < 1) {
		alert("The given eth should be higher than 0");
		return false;
	}
	// Add the log entry on the console
	console.log("Provided eth is: " + eth);

	contract.methods.obtain_tokens().send({from:senderAddress, gas: 120000, value:eth}).on('receipt', function(receipt) { // A promise in action
      console.log("Tx Hash of obtain_tokens(): " + receipt.transactionHash);
  	})

	console.log("dopo il send");

	return false;
}

function obtain() {
	console.log("obtain");
	return false;
}

function sell() {
	console.log("sell");
	return false;
}

function convert() {
	console.log("convert");
	return false;
}



// Creates a subscription to specific events
function subscribeToEvents() {
	
	contract.events.allEvents(
		function(error, event){
			if (!error) {
				// If the player is you, and this is a Win event…
				console.log(event);
			}
		}
	);

	
	contract.events.Acquiring( // Subscribe to all Win events
	function(error, event){
			if (!error) {
				console.log("no error");
				/*
				// If the player is you, and this is a Win event…
				if (event.returnValues["winner"] == senderAddress) {
					$("#result").html("You win!");
				}
				updateDisplayedInformation();
				*/
			}
			else console.log("error!");
		}
	);
	/*
	contract.events.NextTime( // Subscribe to all NextTime events
		// Only "NextTime" events are captured here and passed to the callback
		function(error, event){
			if (!error) {
				// If the player is you, and this is a NextTime event…
				if (event.returnValues["player"] == senderAddress) {
					$("#result").html("You lose!");
				}
				updateDisplayedInformation();
			}
		}
	);
	contract.events.Mint( // Subscribe to all Mint events
		function(error, event){
			// Only "Minter" events are captured here and passed to the callback
			if (!error) {
				// If the player is you, and this is a Minter event…
				if (event.returnValues["minter"] == senderAddress) {
					$("#result").html("You win! Perfect!");
				}
				updateDisplayedInformation();
			}
		}
	);
	*/
}
