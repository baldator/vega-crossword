#!/usr/bin/env node

const NUM_DEFINITION_PER_CROSSWORD = process.env.NUM_DEFINITION_PER_CROSSWORD || 8;
const DEFINITIONS_FILE_NAME = process.env.DEFINITIONS_FILE_NAME || "./definitions.json";

async function run() {
    const chalk = require("chalk");
    const boxen = require("boxen");
    const dotenv = require('dotenv');
    const nearAPI = require("near-api-js");
    const { KeyPair, keyStores } = require("near-api-js");
    const fs = require("fs");
    const { connect } = nearAPI;
    const { Contract } = nearAPI;
    const { generateLayout } = require('crossword-layout-generator');


    // Load config
    dotenv.config();

    // creates keyStore from a provided file
    // you will need to pass the location of the .json key pair

    // path to your custom keyPair location (ex. function access key for example account)
    const KEY_PATH = './key.json';
    const credentials = JSON.parse(fs.readFileSync(KEY_PATH));
    const myKeyStore = new keyStores.InMemoryKeyStore();
    myKeyStore.setKey(process.env.NETWORK_ID, process.env.NEAR_ACCOUNT_ID, KeyPair.fromString(credentials.private_key));


    const greeting = chalk.white.bold("Near crossword batch");
    const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
    };

    const msgBox = boxen( greeting, boxenOptions );
    console.log(msgBox);
    console.log(`Contract address: ${process.env.CONTRACT_NAME}`);
    console.log(`Doing action with address: ${process.env.NEAR_ACCOUNT_ID}`);
    console.log(`Network ID: ${process.env.NETWORK_ID}`);

    // Connect to NEAR
    const connectionConfig = {
    networkId: process.env.NETWORK_ID ,
    keyStore: myKeyStore, // first create a key store 
    nodeUrl: "https://rpc." + process.env.NETWORK_ID + ".near.org",
    walletUrl: "https://wallet." + process.env.NETWORK_ID + ".near.org",
    helperUrl: "https://helper." + process.env.NETWORK_ID + ".near.org",
    explorerUrl: "https://explorer." + process.env.NETWORK_ID + ".near.org",
    };
    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account(process.env.NEAR_ACCOUNT_ID);

    // Load contract
    const contract = new Contract(
        account, // the account object that is connecting
        process.env.CONTRACT_NAME,
        {
            // name of contract you're connecting to
            viewMethods: ["get_unsolved_puzzles"], // view methods do not change state but usually return a value
            changeMethods: ["new_puzzle"], // change methods modify state
            sender: account, // account object to initialize and sign transactions.
        }
    );

    const response = await contract.get_unsolved_puzzles();
    console.log("Unresolved puzzles: " + response.puzzles.length);

    if (response.puzzles.length == 1){
        console.log(chalk.green.bold("Generating new puzzle. Source file: " + DEFINITIONS_FILE_NAME + ". Number of words: " + NUM_DEFINITION_PER_CROSSWORD));
        let rawdata = fs.readFileSync(DEFINITIONS_FILE_NAME);
        let sourceDefinitions = JSON.parse(rawdata);
        console.log(student);
        let minCount = getMinCount(sourceDefinitions);
        let definitions = getVecCount(sourceDefinitions, minCount);
        


        
    }
    else{
        console.log(chalk.green.bold("Nothing to do."));
    }


}

function getMinCount(vec){
    let min = Number.MAX_VALUE;
    vec.forEach(function(value){
        if (value.count < min){
            min = value.count;
        }
    });

    return min;
}

function getVecCount(vec, index){
    let def = []
    vec.forEach(function(value){
        if (value.count == index){
            def += value;
        }
    });
    return def;
}

run();