// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.0 <0.9.0;

contract EnergyHeaven{
    address payable public minter;

    address[] producers;
    mapping(address => uint) public userBalance; // balance dei token di ogni utente


    struct Selling {
        uint amount;
        uint price;
    }
    mapping(address => Selling) public energyList; // listino vendita

    uint public piggyBank = 1000;

    uint public constant JOIN_AMOUNT = 100; // quota iniziale per entrare a far parte dei venditori
    uint public constant PRICE = 2 * 1e15; // 2 x 10^{15}. IE 2 finney
    uint public constant REVERSE_EXC_VALUE = 2 * 1e12; // 2 x 10^{12}. IE 2 SZABO

    constructor(){
        minter = msg.sender;
    }

    function join_as_producer() public{
        require(userBalance[msg.sender] >= JOIN_AMOUNT, "Not enough tokens");
        require(!producers.contains(msg.sender), "Already a producer");
        userBalance[msg.sender] -= JOIN_AMOUNT;
        piggyBank += JOIN_AMOUNT;
        producers.push(msg.sender);
    }

    function obtain_tokens() public payable{
        require(msg.value >= PRICE, "Not enough value for a token");
        userBalance[msg.sender] += msg.value / PRICE;
    }

    function tokens_to_ETH(uint calldata amount) public payable{
        require(userBalance[msg.sender] >= amount, "Not enough tokens to convert");
        (bool sent, bytes memory data) = msg.sender.call{value: amount*REVERSE_EXC_VALUE}("");
        require(sent, "Failed to send Ether")
        userBalance[msg.sender] -= amount;
    }

    function self_distruct(){
        require(msg.sender == minter, "You're not the minter");
        selfdestruct(minter);
    }    

    function sell_energy(uint storage amount, uint storage price) public{
        require(producers.contains(msg.sender), "You're not a producer");   
        energyList[msg.sender].amount += amount;
        energyList[msg.sender].price += price;
    }

    function buy_energy(uint storage tokens) public returns (bool calldata result, uint calldata bought_amount){
       
        // prendere il multiple return di find_cheapest 
        address cheapest[];
        uint price;
        // address cheapest[] = find_cheapest();
        // price
        
        require(tokens>price, "Not enough tokens");
        uint bought_amount = 0;
        uint i = 0;
        while(tokens > price){
            energyList[cheapest[i]].amount -= 1;
            bought_amount += 1;
            userBalance[cheapest[i]] += price;
            userBalance[msg.sender] -= price;
            tokens -= price;
            i += 1;
            require(i<cheapest.length, i = 0);
        }  

        return (true, bought_amount);
    }

    fuction find_cheapest() private returns(address memory cheapest[], uint memory price) {
        //ritorna tutti i producers che stanno vendendo ad un minor prezzo in un array e il prezzo
        uint price;
        address cheapest[];
        return(cheapest[], price)
    }
}