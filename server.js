const express = require("express");
const bodyParser = require("body-parser");
const {JSONRPCServer} = require("json-rpc-2.0");
const methods = require("./methods")

const server = new JSONRPCServer();

// Create json-rpc server method for each method
Object.entries(methods).forEach(([methodName, method]) => {
    // First parameter is a method name.
    // Second parameter is a method itself.
    // A method takes JSON-RPC params and returns a result.
    // It can also return a promise of the result.

    // TODO: Error handling e.g. client not setup, invalid key etc.
    server.addMethod(methodName, method)
});

// Create one server method "call" that calls function defined in params.func and passes the other params along
server.addMethod("call", (...args) =>{
    let params = args[0]
    let func = params.func
    delete params.func;
    // Catch-all could be added here for unimplemented functions
    return methods[func](params)
})


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
