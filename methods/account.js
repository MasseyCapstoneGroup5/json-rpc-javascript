const {
    AccountInfoQuery,
    AccountCreateTransaction,
    PublicKey,
    Hbar,
    AccountUpdateTransaction,
    PrivateKey
} = require("@hashgraph/sdk");
const {sdk} = require("../sdk_data");

module.exports = {
    getAccountInfo: async ({accountId}) => {
        //Create the account info query
        const query = new AccountInfoQuery().setAccountId(accountId);
        //Sign with client operator private key and submit the query to a Hedera network and return account info
        return await query.execute(sdk.client);
    },
    createAccount: async ({publicKey}) => {
        //Create the transaction
        const transaction = new AccountCreateTransaction()
            .setKey(PublicKey.fromString(publicKey))
            .setInitialBalance(Hbar.fromTinybars(1000));

        //Sign the transaction with the client operator private key and submit to a Hedera network
        const txResponse = await transaction.execute(sdk.client);
        //Request the receipt of the transaction
        let receipt = await txResponse.getReceipt(sdk.client)

        return receipt.accountId.toString();
    },
    updateAccount: async ({accountId, key, memo}) => {
        // update the account
        // Create the transaction to update the memo on the account
        const transaction = new AccountUpdateTransaction()
            .setAccountId(accountId)
            .setAccountMemo(memo)
            .freezeWith(sdk.client);

        //Sign the transaction with key
        const signTx = await (transaction.sign(PrivateKey.fromString(key)));
        // Sign the transaction with the client operator private key and submit to a Hedera network
        const txResponse = await signTx.execute(sdk.client);
        //Request the receipt of the transaction
        const receipt = await txResponse.getReceipt(sdk.client);
        //Get the transaction consensus status
        //console.log("The transaction consensus status is " +receipt.status.toString());
        return receipt.status;
    },
};
