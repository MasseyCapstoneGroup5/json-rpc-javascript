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
        "id": 1,
        "method": "setup",
        "params": {
            "operatorAccountId": "***",
            "operatorPrivateKey": "***"
        }
    }

To reset the client use

    {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "reset"
    }

createAccount

    {
        "jsonrpc": "2.0",
        "id": 3,
        "method": "createAccount",
        "params": {
            "publicKey": "*** "
        }
    }

generatePrivateKey

    {
        "jsonrpc": "2.0",
        "id": 5,
        "method": "generatePrivateKey"
    }


### Different JSON-RPC call types
The JSON-RPC accepts 3 different types of requests.

Examples with public key generation:


#### generatePublicKey (default)
    {
        "jsonrpc": "2.0",
        "id": 11,
        "method": "generatePublicKey",
        "params": {
            "privateKey": "302e020100300506032b6570042204203bf96b95ce76d47e6dc76b95df09a1228f4cb611bf4e98f8bb180dd844b3ddf8"
        }
    }
#### generatePublicKey (using call)
    {
        "jsonrpc": "2.0",
        "id": 34,
        "method": "call",
        "params": {
            "func": "generatePublicKey",
            "privateKey": "302e020100300506032b657004220420c036915d924e5b517fae86ce34d8c76005cb5099798a37a137831ff5e3dc0622 "
        }
    }
#### generatePublicKey (call mapping)
    {
        "jsonrpc": "2.0",
        "id": 3422,
        "method": "call",
        "params": {
            "callClass": "PrivateKey",
            "methods": [
                {"name": "fromString", "param": "302e020100300506032b657004220420c036915d924e5b517fae86ce34d8c76005cb5099798a37a137831ff5e3dc0622"},
                {"name": "toString", "param": ""}
            ]
        }
    }
If the function hasn't been added to the JSON-RPC we map directly to the Hedera SDK.
The order of the methods in the method array is retained


