const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there!';
const UPDATED_MESSAGE = 'Hello there!'

//Test code for Smart Contracts
beforeEach(async ()=>{
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
     .send({ from: accounts[0], gas:'1000000' });

});

describe('Inbox', ()=>{
    it('deploys a contract', ()=>{
        assert.ok(inbox.options.address);
    });

    it('has the default message', async()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('can change the message', async()=>{
        const transactionCall = await inbox.methods.setMessage(UPDATED_MESSAGE).send({from: accounts[0]});
        //console.log(transactionCall);
        const message = await inbox.methods.message().call();
        assert.equal(message, UPDATED_MESSAGE);
    });

});


// // Example Test Code - v1.0
// class Car{
//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom';
//     }
// }

// // To avoid 'it' functions to not recognize the car instance
// let car;

// beforeEach(()=>{
//     car = new Car();
// });

// describe('Car Class', ()=>{
//     it('can park', ()=>{
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', ()=>{
//         assert.equal(car.drive(), 'vroom');
//     });
// });