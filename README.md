# json-rpc-js-sdk

## Setup

Clone repository

    git clone https://github.com/MasseyCapstoneGroup5/json-rpc-js-sdk.git

Enter Project directory

    cd json-rpc-js-sdk

Install packages with npm

    npm install

Run server

    node server.js


## Example usage

Post to http://localhost with JSON body

Setup (should be run before other calls)

    {
        "jsonrpc": "2.0",
        "id": 3,
        "method": "setup",
        "params": {
            "operatorAccountId": "***",
            "operatorPrivateKey": "***"
        }
    }

createAccount

    {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "createAccount",
        "params": {
            "publicKey": "*** "
        }
    }

generatePrivateKey

    {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "generatePrivateKey"
    }


