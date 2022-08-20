#!/usr/bin/env node

const NUM_DEFINITION_PER_CROSSWORD = process.env.NUM_DEFINITION_PER_CROSSWORD || 9;
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
        let minCount = getMinCount(sourceDefinitions);
        console.log("MinCount: " + minCount);
        let definitions = getVecCount(sourceDefinitions, minCount);

        // add extra definitions
        while (definitions.length < NUM_DEFINITION_PER_CROSSWORD){
            console.log("Definition length: " + definitions.length);
            definitions = addExtraDefinition(sourceDefinitions, definitions, minCount);
        }

        console.log("definitions: " + JSON.stringify(definitions));
        // Shuffle array
        const shuffled = definitions.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        let selected = shuffled.slice(0, NUM_DEFINITION_PER_CROSSWORD);
        
        console.log(JSON.stringify(selected));
        const layout = generateLayout(selected);
        // publish new crossword

        // Increment values in original JSON
        selected.forEach(function(value){
            objIndex = sourceDefinitions.findIndex((obj => obj.answer == value.answer));
            sourceDefinitions[objIndex].count = sourceDefinitions[objIndex].count + 1;
        });

        fs.writeFileSync(DEFINITIONS_FILE_NAME, JSON.stringify(sourceDefinitions));
        
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
            def.push(JSON.parse(JSON.stringify(value)));
        }
    });
    return def;
}

function addExtraDefinition(source, dest, minCount){
    const shuffled = source.sort(() => 0.5 - Math.random());
    let answers = dest.map(obj => obj.answer);
    objIndex = shuffled.findIndex(obj => obj.count > minCount && !answers.includes(obj.answer));
    dest.push(JSON.parse(JSON.stringify(shuffled[objIndex])));

    return dest;
}

run();