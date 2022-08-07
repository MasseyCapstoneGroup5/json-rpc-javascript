const express = require("express");
const bodyParser = require("body-parser");
const {JSONRPCServer} = require("json-rpc-2.0");
const {Client, PrivateKey, AccountInfoQuery, AccountCreateTransaction, Hbar, PublicKey} = require("@hashgraph/sdk");

const server = new JSONRPCServer();


let client;

server.addMethod("setup", ({operatorAccountId, operatorPrivateKey}) => {
    // TODO: add more configuration options e.g. ip instead of just testnet
    client = Client.forTestnet();
    client.setOperator(operatorAccountId, operatorPrivateKey);
    return true;
});


server.addMethod("generatePublicKey", ({privateKey}) => {
    return PrivateKey.fromString(privateKey).publicKey.toString();
});

server.addMethod("generatePrivateKey", () => {
    return PrivateKey.generateED25519().toString();
});

server.addMethod("getAccountInfo", async ({accountId}) => {
    // TODO: Error handling e.g. client not setup, invalid key etc.
    //Create the account info query
    const query = new AccountInfoQuery().setAccountId(accountId);
    //Sign with client operator private key and submit the query to a Hedera network and return account info
    return await query.execute(client);
});


server.addMethod("createAccount", async ({publicKey}) => {
    // TODO: Error handling e.g. client not setup, invalid key etc.
    //Create the transaction
    const transaction = new AccountCreateTransaction()
        .setKey(PublicKey.fromString(publicKey))
        .setInitialBalance(Hbar.fromTinybars(1000));

    //Sign the transaction with the client operator private key and submit to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    return await txResponse.getReceipt(client);
});


// First parameter is a method name.
// Second parameter is a method itself.
// A method takes JSON-RPC params and returns a result.
// It can also return a promise of the result.
server.addMethod("example", ({message}) => {
    console.log(message)
    return message;
});


const app = express();
app.use(bodyParser.json());

app.post("/", (req, res) => {
    const jsonRPCRequest = req.body;
    // server.receive takes a JSON-RPC request and returns a promise of a JSON-RPC response.
    // It can also receive an array of requests, in which case it may return an array of responses.
    // Alternatively, you can use server.receiveJSON, which takes JSON string as is (in this case req.body).
    server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
        if (jsonRPCResponse) {
            res.json(jsonRPCResponse);
        } else {
            // If response is absent, it was a JSON-RPC notification method.
            // Respond with no content status (204).
            res.sendStatus(204);
        }
    });
});

app.listen(80);
console.log("-- JSON-RPC JS server running --")
