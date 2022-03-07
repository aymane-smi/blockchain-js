const Blockchain        = require('../dev/blockchain'),
      bitcoin           = new Blockchain(),
      {v4 : uuid}       = require('uuid'),
      rp                = require("request-promise");
    //   fetch           = require("node-fetch");
    //   {fetch}           = require("undici");
      
      
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
        message: "new Block mined ",
        newBlock
    });
};


exports.Register_n_Broadcast = async(req, res)=>{
        const {newNodeUrl} = req.body;
        let URL;
        let options;
        if(bitcoin.networkNodes.indexOf(newNodeUrl) === -1)
            bitcoin.networkNodes.push(newNodeUrl);
        const registred_nodes = [];
        
        for(node of bitcoin.networkNodes){
            URL = `${node}/api/register-node`;
            options = {
                uri: URL,
                method: 'POST',
                body: {
                    newNodeUrl
                },
                json: true
            };
            registred_nodes.push(rp(options));
        }
        Promise.all(registred_nodes).then(data=>{
            URL = `${newNodeUrl}/api/register-nodes-bulk`;
            const options = {
                uri: URL,
                method: 'POST',
                body : {
                    allNetworkNodes : [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
                },
                json: true
            };
            return rp(options);
        })
        .then(data=> res.status(200).json("New Node registered with network successfully"))
        .catch(err=>{
            res.status(500).json({
                message: err.message
            });
        });
};


exports.RegisterNode = (req, res)=>{
    try{
        const {newNodeUrl} = req.body;
        if(!newNodeUrl)
            res.status(404).json({
                message: "NodeUrl not found"
            });
        const notExist = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
        const existantUrl = bitcoin.currentNodeUrl !== newNodeUrl;
        if(notExist && existantUrl)
            bitcoin.networkNodes.push(newNodeUrl);
        res.status(200).json({
            message: "New node registered successfully."
        });
    }catch(err){
        res.status(500).json({
            message: "something wen't wrong!",
            deatil: err.message
        });
    }
};

exports.RegisterNodeBulk = (req, res)=>{
    try{
        const {allNetworkNodes} = req.body;
        let key = true;
        for(networkNode of allNetworkNodes){
            let notExist = bitcoin.networkNodes.indexOf(networkNode) === -1;
            let existantUrl = bitcoin.currentNodeUrl !== networkNode;
            if(notExist && existantUrl){
                bitcoin.networkNodes.push(networkNode);
            }
        }
        res.status(200).json({
            message: "Bulk registration successful."
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "something wen't wrong!",
            details: err.message
        });
    }
};