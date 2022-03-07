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
         nonce,
         Hash,
         previousBlockHash
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
     let nonce = 0;
     let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
     while(hash.substring(0, 4) !== '0000'){
         nonce++;
         hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
     }
     return nonce;
 };

 Blockchain.prototype.chainIsValid = function(blockchain){
     let isValid = true;
     for(let i = 1; i < blockchain.length ; i++){
         let currentBlock = blockchain[i];
         let prevBlock = blockchain[i-1];
        console.log("previous=>", prevBlock['Hash']);
        console.log("current=>", currentBlock['Hash']);
         const BlockHash = this.hashBlock(prevBlock['Hash'], {transactions: currentBlock['transactions'], index: currentBlock['index']},currentBlock['nonce']);
         if(BlockHash.substring(0, 4) !== '0000')
            isValid = false;
         if(currentBlock['previousBlockHash'] !== prevBlock['Hash'])
            isValid = false;
     }
     const gensisBlock = blockchain[0];
     const currentNonce = gensisBlock['nonce'] === 100;
     const correctPreviousBlockHash = gensisBlock['previousBlockHash'] === '0';
     const correctHash = gensisBlock['Hash'] === '0';
     const correctTransactions = gensisBlock['transactions'].length === 0;
     if(!currentNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions)
        isValid = false;
     return isValid;
 };


module.exports = Blockchain;