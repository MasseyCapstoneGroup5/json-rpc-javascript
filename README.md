# json-rpc-js-sdk


## Example usage

Post  http://localhost

Setup (must be run before other calls)

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


