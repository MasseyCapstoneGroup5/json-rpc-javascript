const {Client} = require("@hashgraph/sdk");
const {sdk} = require("../sdk_data");

module.exports = {
    setup: ({operatorAccountId, operatorPrivateKey}) => {
        // TODO: add more configuration options e.g. ip instead of just testnet
        sdk.client = Client.forTestnet();
        sdk.client.setOperator(operatorAccountId, operatorPrivateKey);
        return sdk.client;
    },
    reset: () => {
        sdk.client = null;
        return true;
    }
};