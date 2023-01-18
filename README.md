# EnergyHeaven
The future of renewable energy consumption in web 3.0


USE GIT BASH TO EXECUTE ALL COMMANDS

Install Truffle -> required Node.js, install it, and get automatically npm to install packets managed by Node.js -> required git, install it -> to verify all, type on CMD git/node -v to see version
open CMD -> npm install -g node-gyp (to avoid all errors) -> npm install -g truffle

Install Ganache

Initialize Truffle
open CMD -> cd, to go to the folder -> mkdir, to create folder -> truffle init, into the folder to initialize truffle (in this folder you will add all of your code for the DApp)

In contracts folder -> set Migration.sol and YourContract

In migrations folder -> create with those exact titles 1_initial_migration.js and 2_deploy_contracts.js -> modify those two .js

Open Ganache -> create new workspace -> add project -> in truffle folder -> truffle-config.js -> lunch workspace (maybe you would like to modify the gas limit, modify it before lunch)

Deploy contract
Open cmd into truffle folder -> truffle migrate --reset or truffle deploy or truffle compile (ranked from hard to light deploying method)

Add the contract address on the code
On Ganache -> contract section -> take the address of YourContract -> add it into .js related of your project, contract ABI is taken by code command in your .js

Run the DApp
Open cmd on the truffle folder -> http-server -> copy the first ip and paste on google -> go to interested page -> test your DApp

Run the DApp with XAMPP (if you have .php code in your project
Install Xampp -> open xampp folder (where you install it) -> go to htdocs -> go to demo ->copy truffle folder into -> starting Xampp -> start Apache -> go to google and digit localhost -> indicate the path of your index file to run the DApp

All Web3.js files should be in your truffle folder and must be indicated in your .js 
