const crypto         = require("crypto-js"),
      {v4 : uuid}    = require("uuid"),
      currentNodeUrl = process.argv[3];
//class function of the blockchain
function Blockchain(){
    this.chain = [];
    this.newTransactions = [];
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
    this.createNewBlock(100, '0', '0');
}
 Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, Hash){
     const newBlock = {
         index : this.chain.length+1,
         timestamp: Date.now(),
         transactions: this.newTransactions,
         nonce: nonce,
         Hash: Hash,
         previousBlockHash: previousBlockHash
     };
     this.newTransactions = [];
     this.chain.push(newBlock);
     return newBlock;
 };

 Blockchain.prototype.getLastBlock = function(){
     return this.chain[this.chain.length-1];
 };

 Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
    const newTransaction = {
        amount,
        sender,
        recipient,
        transactionId: uuid().split('-').join('')
    };
    return newTransaction;
 };

 Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj){
     this.newTransactions.push(transactionObj);
     return this.getLastBlock()['index'] + 1;
 };

 Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    const dataBlock = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = crypto.SHA256(dataBlock);
    return hash.toString();
 };


 Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
     const dataBlock = previousBlockHash + JSON.stringify(currentBlockData);
     let nonce = 0;
     let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
     while(hash.substring(0, 4) !== '0000'){
         nonce++;
         hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
     }
     return nonce;
 };


module.exports = Blockchain;