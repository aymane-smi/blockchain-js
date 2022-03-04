const Blockchain = require('../dev/blockchain'),
      bitcoin    = new Blockchain(),
      {v4 : uuid}       = require('uuid');
      
exports.Blockchain = (req, res)=>{
    res.json({
        message: "blockchain",
        bitcoin 
    });
};

exports.Transaction = (req, res)=>{
    const {amount, sender, recipient} = req.body;
    const BlockIndex = bitcoin.createNewTransaction(amount, sender, recipient);
    if(!amount || !sender || !recipient)
        res.status(401).json({
            message: "can't create a transaction!"
        });
    res.status(200).json({
        amount,
        sender, recipient,
        message: `the transaction will be added in block [${BlockIndex}]`
    });
};

exports.Mine = (req, res)=>{
    if(bitcoin.newTransactions.length <= 0)
        res.status(401).json({
            message: "can't be mined!"
        });
    const previousBlockHash = bitcoin.getLastBlock().Hash;
    const currentBlockData = {
        transactions: bitcoin.newTransactions,
        index: bitcoin.getLastBlock()+1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
    const nodeAddress = uuid().split('-').join('');
    bitcoin.createNewTransaction(6.25, '00', nodeAddress);
    res.status(200).json({
        message: "new Block mined Mine",
        newBlock
    });
};