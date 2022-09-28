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
        "id": 1,
        "method": "generatePublicKey",
        "params": {
            "privateKey": "302e020100300506032b6570042204208eb07a3c856397a609bc8eb20e2c77102fc0403b418ca50380a3a29f2747a796"
        }
    }
#### generatePublicKey (using call)
    {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "call",
        "params": {
            "func": "generatePublicKey",
            "privateKey": "302e020100300506032b6570042204208eb07a3c856397a609bc8eb20e2c77102fc0403b418ca50380a3a29f2747a796 "
        }
    }
#### generatePublicKey (call mapping)
    {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "call",
        "params": {
            "callClass": "PrivateKey",
            "methods": [
                {"name": "fromString", "param": "302e020100300506032b6570042204208eb07a3c856397a609bc8eb20e2c77102fc0403b418ca50380a3a29f2747a796"},
                {"name": "publicKey"},
                {"name": "toString"}
            ]
        }
    }
If the function hasn't been added to the JSON-RPC we map directly to the Hedera SDK.
The order of the methods in the method array is retained

#### generatePublicKey response
    {
        "jsonrpc": "2.0",
        "id": 1,
        "result": "302a300506032b6570032100c1a792a2609251ab821ca6d60c9167d69119b1c94d67075bd74604d9b1d31872"
    }

## Errors
Error responses / codes follow the JSON-RPC specification e.g. Method not found 

    {
        "jsonrpc": "2.0",
        "id": 3634,
        "error": {
            "code": -32601,
            "message": "Method not found"
        }
    }

Error messages / codes for custom hedera errors as defined
[here](https://github.com/hashgraph/hedera-protobufs/blob/main/services/response_code.proto)
are also available in the error response.
e.g. INVALID_ACCOUNT_ID

    {
        "jsonrpc": "2.0",
        "id": 9463,
        "error": {
            "code": 15,
            "message": "transaction * failed precheck with status INVALID_ACCOUNT_ID"
        }
    }

