//class function of the blockchain
function Blockchain(){
    this.chain = [],
    this.newTransactions = []
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

 };

module.exports = Blockchain;