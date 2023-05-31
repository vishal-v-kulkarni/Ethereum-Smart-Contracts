const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

//2 parameters - 1st mneumonic and 2nd: link to the test network(Sepolia) Infura API.
const provider = new HDWalletProvider(
    'forum wall burst person galaxy door round evoke runway thing gorilla wrong',
    'https://sepolia.infura.io/v3/ba13724a07b841618bd9fa4edfaacdab'
);

// Similar to local network test script
const web3 = new Web3(provider);

let accounts;

// We want to call async functions so we are creating a function with async instead of beforeEach.
const deploy = async () => {
    accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from the account: ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas:'1000000', from: accounts[0] });

    console.log('Contract deployed to ', result.options.address);
    
    //To prevent a hanging deployment
    provider.engine.stop();

};

deploy();