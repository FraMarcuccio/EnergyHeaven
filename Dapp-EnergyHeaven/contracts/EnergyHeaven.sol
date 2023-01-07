// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.4.0 <0.9.0;

contract EnergyHeaven{
    address payable public minter;

    uint public constant OPERATIONS_FOR_REWARDING = 5;
    uint private operation_counter;
    struct Users {
        uint selling_history;
        uint balance;
        uint rewards_obt;
    }

    address[] producers;
    mapping(address => Users) public users; // balance dei token di ogni utente


    struct Selling {
        uint amount;
        uint price;
    }
    mapping(address => Selling) public energyList; // listino vendita

    uint public piggyBank;

    uint public constant JOIN_AMOUNT = 1; // quota iniziale per entrare a far parte dei venditori
    uint public constant PRICE = 2 * 1e15; // 2 x 10^{15}. IE 2 finney
    uint public constant REVERSE_EXC_VALUE = 1 * 1e15; // 1 x 10^{15}. IE 1 finney

    event JoinedAsProducer(address user);
    event EnergyBought(address buyer, uint bought_amount);
    event piggyBankBroken();

    constructor(){
        minter = payable(msg.sender);
        operation_counter = 0;
        piggyBank = 1000;
    }

    function get_my_balance() public view returns (uint){
        return users[msg.sender].balance;
    }  

    function get_my_rewards() public view returns (uint){
        return users[msg.sender].rewards_obt;
    }   

    function join_as_producer() public{
        require(users[msg.sender].balance >= JOIN_AMOUNT, "Not enough tokens");
        //require(!producers.contains(msg.sender), "Already a producer"); non esiste il metodo contains. trovare alternativa
        
        //scorro array per vedere se esiste indirizzo corrispondente a quello fornito
        for(uint i = 0; i < producers.length; i++){
            if(producers[i] == msg.sender){
                require(false, "Already a producer");
            }
        }
        
        users[msg.sender].balance -= JOIN_AMOUNT;
        piggyBank += JOIN_AMOUNT;
        producers.push(msg.sender);
        emit JoinedAsProducer(msg.sender);
        users[msg.sender].selling_history = 0;

        if(operation_counter == OPERATIONS_FOR_REWARDING)
            breaking_piggyBank();
    }

    function breaking_piggyBank() private{
        uint part = 0;
        uint total_history = 0;
        for(uint i=0; i<producers.length; i++){
            total_history += users[producers[i]].selling_history;
        }
        part = piggyBank / total_history;
        for(uint i=0; i<producers.length; i++){
            uint reward = part * users[producers[i]].selling_history;
            users[producers[i]].balance += reward;
            piggyBank -= reward;
            users[producers[i]].selling_history = 0;
        }
        operation_counter = 0;
        emit piggyBankBroken();
        users[msg.sender].balance += part;
    }

    function add_piggyBank(uint tokens) public{
        require( users[msg.sender].balance >= tokens, "Not enough tokens");
        users[msg.sender].balance  -= tokens;
        piggyBank += tokens;
    }   

    function obtain_tokens() public payable{
        require(msg.value >= PRICE, "Not enough value for a token");
        uint amount = msg.value / PRICE;
        users[msg.sender].balance += amount;
    }

    function tokens_to_ETH(uint amount) public payable{
        require(users[msg.sender].balance  >= amount, "Not enough tokens to convert");
        payable(msg.sender).transfer(amount*REVERSE_EXC_VALUE);
        //(bool sent, bytes memory data) = msg.sender.call{value: amount*REVERSE_EXC_VALUE}("");
        //require(sent, "Failed to send Ether");
        users[msg.sender].balance  -= amount;
        
    }

    function self_distruct() public{
        require(msg.sender == minter, "You're not the minter");
        selfdestruct(minter);
    }    

    function sell_energy(uint amount, uint price) public{
        //require(producers.contains(msg.sender), "You're not a producer");   non esiste il metodo contains. trovare alternativa
        
        // Verifica che il chiamante sia un produttore
        require(isProducer(msg.sender), "You're not a producer");
        // Aggiorna le informazioni sulla vendita dell'energia da parte del produttore
        
        energyList[msg.sender].amount += amount;
        energyList[msg.sender].price = price;
        users[msg.sender].selling_history += amount;
        operation_counter += 1;
    }

    // Funzione helper per verificare se un indirizzo è presente nell'array dei produttori
    function isProducer(address addr) private view returns (bool) {
        for (uint i = 0; i < producers.length; i++) {
            if (producers[i] == addr) {
                return true;
            }
        }
        return false;
    }


    function buy_energy(uint tokens) public returns (bool result, uint bought_amount){
       
        // prendere il multiple return di find_cheapest 
        address[] memory cheapest;
        uint price; 
        (cheapest,price) = find_cheapest();
        require(cheapest.length>1, "Energy not available");
        require(tokens>price, "Not enough tokens");

        bought_amount = 0;
        uint i = 0;
        while(tokens >= price){
            if(energyList[cheapest[i]].amount>0){
                energyList[cheapest[i]].amount -= 1;
                bought_amount += 1;
                users[cheapest[i]].balance += price;
                users[msg.sender].balance -= price;
                tokens -= price;
            }
            i +=1;
            if(end_cheapest_energy(cheapest)) break;
            if(i>cheapest.length-1) i=0;
        }  
        
        emit EnergyBought(msg.sender, bought_amount);
        return (true, bought_amount);
    }

    function end_cheapest_energy(address[] memory cheapest) private view returns(bool){
        for(uint i=0; i<cheapest.length; i++)
            if(energyList[cheapest[i]].amount>0) return false;
        return true;
    }   

    function find_cheapest() private view returns(address[] memory cheapest, uint price) {
        //ritorna tutti i producers che stanno vendendo ad un minor prezzo in un array e il prezzo
        
        cheapest = new address[](producers.length);
        //inizializzo price con un valore più alto di quello possibile
        //uint price = 2**256 -1; 

        price = (2**256)-1; //da definire ancora in fase di test se funziona correttamente

        uint j = 0; //indice per l'array cheapest
        for(uint i = 0; i < producers.length; i++){

            //prendo il prezzo di vendita del produttore
            uint p = energyList[producers[i]].price;
    
            //se è il più basso che ho visto fino ad ora, lo mantengo e resetto l'array cheapest
            if(p < price && energyList[producers[i]].amount > 0){
                cheapest = new address[](producers.length);
                j = 0;
                price = p;
            }
            
            //se il prezzo è uguale a quello più basso che ho visto finora lo aggiungo all'array cheapest
            if(p == price){
                cheapest[j] = producers[i];
                j++;
            }
        }

        return (cheapest, price);


        //uint price;
        //address[] cheapest;
        //return(cheapest, price)
    }

}