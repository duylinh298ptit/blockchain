const sha256 = require('sha256');

function BlockChain() {
    this.chain = [];
    this.pendingTransactions = [];
}

BlockChain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce,
        hash,
        previousBlockHash
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
};

BlockChain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
};

BlockChain.prototype.createNewTransactions = function(amount, sender, recipient) {
    const newTransaction = {
        amount,
        sender,
        recipient
    };

    this.pendingTransactions.push(newTransaction);

    return this.getLastBlock()['index'] + 1;
};

BlockChain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
};

module.exports = BlockChain;