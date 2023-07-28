Vega Crossword
==================

## Deploy
Create an account:

```bash
npx near create-account sim.vegacrossword.testnet --masterAccount vegacrossword.testnet
```

deploy the contract:
```bash
npx near deploy --wasmFile .\crossword.wasm --accountId sim.vegacrossword.testnet
```

initialize the contract:
```bash
npx near call alpha.vegacrossword.testnet new '{\"creator_account\":\"alpha.vegacrossword.testnet\",\"owner_account\":\"alpha.vegacrossword.testnet\"}' --account-id alpha.vegacrossword.testnet
```

Update definition in batch/definitions.json

Update .env and add the account
Update key.json

set NUM_DEFINITION_PER_CROSSWORD in check_update.js

run check_update.js