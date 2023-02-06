# Counter contract implemented with tact

This project has ready to use TACT compiler, typescript + jest with [ton-emulator](https://github.com/ton-community/ton-emulator), example how to do tests.

```bash
yarn install # To install the js package
yarn build # To build contracts
yarn test # To test contracts
yarn script:createKey # To create mnemonic
yarn script:createWallet # To deploy wallet contract
yarn script:deploy # To deploy counter contract
yarn script:add # To add count to counter contract
```
## Overview
This project has ready to use TACT compiler, typescript + jest with [ton-emulator](https://github.com/ton-community/ton-emulator), example how to do tests.

### A project directory layout

    .
    ├── scripts                   # files for interacting with tesnet/mainnet
    ├── sources                   # Source files
        ├── output                # Compiled contract files
        ├── *.tact                # contract files
    ├── test                      # tests dir
    ├── .env                      # env configuration
    ├── jest.config.js            # jest configuration
    ├── package.json
    ├── tact.config.json          # tact configuration
    ├── tsconfig.json
    └── README.md

## How to work through this example?
- Step 1: create mneonic, and put mneonic in .env file
- Step 2: go to [telegram faucet](https://t.me/testgiver_ton_bot), get some ton coins for your inactive wallet contract
- Step 3: deploy the wallet contract for your key
- Step 4: deploy the counter contract
- Step 5: add count to counter contract

```bash
yarn script:createKey # Step 1
yarn script:createWallet # Step 3
yarn script:deploy # Step 4
yarn script:add # Step 5
```

## Useful website
- [Ton testnet explorer](https://testnet.tonscan.org/)
- [Ton mainnet explorer](https://tonscan.org/)
- [telegram faucet](https://t.me/testgiver_ton_bot)
- [faucet tutorial](https://blog.telepay.cash/ton-testnet-mainnet)

## Licence

MIT
