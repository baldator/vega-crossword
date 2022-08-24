#!/usr/bin/env node

const NUM_DEFINITION_PER_CROSSWORD = process.env.NUM_DEFINITION_PER_CROSSWORD || 8;
const DEFINITIONS_FILE_NAME = process.env.DEFINITIONS_FILE_NAME || "./definitions.json";
const PRICE = process.env.PRICE || "1000000000000000000000000";

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
    const { parseSeedPhrase } = require('near-seed-phrase');

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

    if (response.puzzles.length == 0){
        console.log(chalk.green.bold("Generating new puzzle. Source file: " + DEFINITIONS_FILE_NAME + ". Number of words: " + NUM_DEFINITION_PER_CROSSWORD));
        let rawdata = fs.readFileSync(DEFINITIONS_FILE_NAME);
        let sourceDefinitions = JSON.parse(rawdata);
        let minCount = getMinCount(sourceDefinitions);
        console.log("MinCount: " + minCount);
        let definitions = getVecCount(sourceDefinitions, minCount);

        // add extra definitions
        while (definitions.length < NUM_DEFINITION_PER_CROSSWORD){
            definitions = addExtraDefinition(sourceDefinitions, definitions, minCount);
        }
        // Shuffle array
        const shuffled = definitions.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        let selected = shuffled.slice(0, NUM_DEFINITION_PER_CROSSWORD);
        
        console.log(JSON.stringify(selected));
        const layout = generateLayout(selected);
        const answers = []
        layout.result.map(value => {
            const answerObj = {
            'num': value.position,
            'start': {
                'x': value.startx,
                'y': value.starty
            },
            'direction': value.orientation,
            'length': value.answer.length,
            'answer': value.answer,
            'clue': value.clue
            }
            if (answerObj.num) {
                answers.push(answerObj)
            }
        });

        let dimensions = {
            x: layout.cols,
            y: layout.rows
          };
        let mungedLayout = mungeLocalCrossword(answers);
        console.log("mungedLayout: " + JSON.stringify(mungedLayout));

        const cleanLayout = answers.map(clueAnswer => {
            // remove answer and capitalize direction value to match expected structure on smart contract
            const {answer, direction, ...everythingElse} = clueAnswer
            const newDirection = direction === "down" ? "Down" : "Across"
            return {
              ...everythingElse,
              direction: newDirection
            }
          });
        const seedPhrase = generateNewPuzzleSeedPhrase(mungedLayout);
        console.log(seedPhrase);
        const answer_pk = parseSeedPhrase(seedPhrase)
        console.log(JSON.stringify(answer_pk));
        
        const methodArgs = {
            answer_pk: answer_pk.publicKey,
            dimensions,
            answers: cleanLayout
          };

        // publish new crossword

        const result = await account.functionCall({
            contractId: process.env.CONTRACT_NAME,
            methodName: "new_puzzle",
            args: Buffer.from(JSON.stringify(methodArgs)),
            gas: 300000000000000, // Optional, this is the maximum allowed case
            attachedDeposit: PRICE
          });

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

function mungeLocalCrossword(answers) {
    const data = {
        across: {},
        down: {}
    };
    const crosswordClues = answers;

    crosswordClues.forEach((clue) => {
        // In the smart contract it's stored as "Across" but the
        // React library uses "across"
        const direction = clue.direction.toLowerCase();
        data[direction][clue.num] = {};
        data[direction][clue.num]['clue'] = clue.clue;
        data[direction][clue.num]['answer'] = clue.answer;
        data[direction][clue.num]['row'] = clue.start.y;
        data[direction][clue.num]['col'] = clue.start.x;
    });
    return data;
}

function generateNewPuzzleSeedPhrase(data) {
    // JavaScript determining what the highest clue number is
    // Example: 10 if there are ten clues, some which have both across and down clues
    let totalClues = Object.keys(data.across).concat(Object.keys(data.down))
        .map(n => parseInt(n))
        .reduce((n, m) => Math.max(n, m));

    let seedPhrase = [];
    // Assume that crossword starts at 1 and goes to totalClues
    for (let i = 1; i <= totalClues; i++) {
        let word = '';
        // If a number has both across and down clues, do across first.
        let iString = i.toString(); // not strictly necessary
        if (data.across.hasOwnProperty(iString)) {
        seedPhrase.push(data['across'][i].answer);
        }
        word = ''; // Clear for items where there's both across and down
        if (data.down.hasOwnProperty(iString)) {
        seedPhrase.push(data['down'][i].answer);
        }
    }
    const finalSeedPhrase = seedPhrase.map(w => w.toLowerCase()).join(' ');
    console.log(`Crossword solution as seed phrase: %c${finalSeedPhrase}`, "color: #00C1DE;");
    return finalSeedPhrase;
}

run();