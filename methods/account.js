const {
    AccountInfoQuery,
    AccountCreateTransaction,
    PublicKey,
    Hbar,
    AccountUpdateTransaction,
    AccountDeleteTransaction,
    PrivateKey
} = require("@hashgraph/sdk");
const {sdk} = require("../sdk_data");
const LosslessJSON = require('lossless-json');

module.exports = {
    getAccountInfo: async ({accountId}) => {
        //Create the account info query
        const query = new AccountInfoQuery().setAccountId(accountId);
        //Sign with client operator private key and submit the query to a Hedera network and return account info
        return await query.execute(sdk.client);
    },
    createAccount: async ({publicKey, initialBalance = 1000}) => {
        let losslessNum = LosslessJSON.parse('{"long":' + initialBalance + '}');
        //Create the transaction
        const transaction = new AccountCreateTransaction()
            .setKey(PublicKey.fromString(publicKey))
            .setInitialBalance(Hbar.fromTinybars(losslessNum.long));

        //Sign the transaction with the client operator private key and submit to a Hedera network
        const txResponse = await transaction.execute(sdk.client);
        //Request the receipt of the transaction
        let receipt = await txResponse.getReceipt(sdk.client)

        return receipt.accountId.toString();
    },
    createAccountNoKey: async () => {
        //Try to create the transaction
        const transaction = new AccountCreateTransaction();
        //Sign the transaction with the client operator private key and submit to a Hedera network
        const txResponse = await transaction.execute(sdk.client);
        //Request the receipt of the transaction
        let receipt = await txResponse.getReceipt(sdk.client)
        return receipt.accountId.toString();
    },
    /**
     *
     * @param publicKey required
     * @param initialBalance optional
     * @param receiverSignatureRequired optional
     * @param maxAutomaticTokenAssociations optional
     * @param stakedAccountId optional
     * @param stakedNodeId optional
     * @param declineStakingReward optional
     * @param accountMemo optional
     * @returns {Promise<any>}
     */
    createAccountAllProperties: async ({
                                       publicKey,
                                       initialBalance= 0,
                                       receiverSignatureRequired,
                                       maxAutomaticTokenAssociations,
                                       stakedAccountId,
                                       stakedNodeId,
                                       declineStakingReward,
                                       accountMemo
                                   }) => {
        //Create the transaction
        const transaction = new AccountCreateTransaction()
            .setKey(PublicKey.fromString(publicKey))
            .setInitialBalance(Hbar.fromTinybars(initialBalance))
            .setReceiverSignatureRequired(receiverSignatureRequired)
            .setMaxAutomaticTokenAssociations(maxAutomaticTokenAssociations)
            .setStakedAccountId(stakedAccountId)
            .setDeclineStakingReward(declineStakingReward)
            .setAccountMemo(accountMemo);
        if(stakedNodeId !== null ){
            transaction.setStakedNodeId(stakedNodeId)
        }

        //Sign the transaction with the client operator private key and submit to a Hedera network
        const txResponse = await transaction.execute(sdk.client);
        //Return the receipt of the transaction
        return await txResponse.getReceipt(sdk.client);
    },
    updateAccountKey: async ({accountId, newPublicKey, oldPrivateKey, newPrivateKey}) => {
        // update the key on the account
        // Create the transaction to replace the key on the account
        const transaction = new AccountUpdateTransaction()
            .setAccountId(accountId)
            .setKey(PublicKey.fromString(newPublicKey))
            .freezeWith(sdk.client);

        //Sign the transaction with the old key and new key      
        const signTx = await (await transaction
            .sign(PrivateKey.fromString(oldPrivateKey)))
            .sign(PrivateKey.fromString(newPrivateKey));

        // Sign the transaction with the client operator private key and submit to a Hedera network
        const txResponse = await signTx.execute(sdk.client);
        //Request the receipt of the transaction
        const receipt = await txResponse.getReceipt(sdk.client);
        //Get the transaction consensus status
        //console.log("The transaction consensus status is " +receipt.status.toString());
        return receipt.status;
    },
    updateAccountMemo: async ({accountId, key, memo}) => {
        // update the account memo field
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
    deleteAccount: async ({accountId, accountKey, recipientId}) => {
        const transaction = await new AccountDeleteTransaction()
            .setAccountId(accountId)
            .setTransferAccountId(recipientId)
            .freezeWith(sdk.client);

        //Sign the transaction with the account key
        const signTx = await transaction.sign(PrivateKey.fromString(accountKey));
        //Sign with the client operator private key and submit to a Hedera network
        const txResponse = await signTx.execute(sdk.client);
        //Request the receipt of the transaction and get consensus status
        return await txResponse.getReceipt(sdk.client);
    }
};
