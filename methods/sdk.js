const {Client, AccountId} = require("@hashgraph/sdk");
const {sdk} = require("../sdk_data");

module.exports = {

    /**
     * Setup SDK Client
     * defaults to testnet
     *
     * @param operatorAccountId
     * @param operatorPrivateKey
     * @param nodeIp (optional)
     * @param nodeAccountId (optional)
     * @param mirrorNetworkIp (optional)
     */
    setup: ({operatorAccountId, operatorPrivateKey, nodeIp, nodeAccountId, mirrorNetworkIp}) => {
        if (nodeIp && nodeAccountId && mirrorNetworkIp){
            //Create client
            const node = {[nodeIp]: new AccountId(parseInt(nodeAccountId))};
            sdk.client = Client.forNetwork(node).setMirrorNetwork(mirrorNetworkIp);
        }else{
            // Default to testnet client
            sdk.client = Client.forTestnet();
        }
        sdk.client.setOperator(operatorAccountId, operatorPrivateKey);
        return sdk.client;
    },
    reset: () => {
        sdk.client = null;
        return true;
    }
};