const Blockchain        = require('../dev/blockchain'),
      bitcoin           = new Blockchain(),
      {v4 : uuid}       = require('uuid');
      
exports.Blockchain = (req, res)=>{
    console.log("inside controllers:", process.argv[2]);
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


exports.Register_n_Broadcast = async(req, res)=>{
    try{
        const {newNodeUrl} = req.body;
        let URL;
        let options;
        if(bitcoin.networkNodes.indexOf(newNodeUrl) === -1)
            bitcoin.networkNodes.push(newNodeUrl);
        const registred_nodes = [];
        for(node of bitcoin.networkNodes){
            URL = `${node}/register-node`;
            options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body:{
                    newNodeUrl
                }
            };
            const {data}  = await fecth(URL, options);
            if(data)
                registred_nodes.push(data);
        }
        URL  = `${newNodeUrl}/register-nodes-bulk`;
        option = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : {
                allNetworkNodes : [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
            }
        };
        let {data} = await fetch(URL, options);
        if(data)
            res.status(200).json({
                message: "New Node registered with network successfully"
            });
    }catch(err){
        res.status(500).json({
            message: "something wen't wrong!",
            detail: err.message
        });
    }
};


exports.RegisterNode = (req, res)=>{

    const {newNodeUrl} = req.body;
    if(!newNodeUrl)
        res.status(404).json({
            message: "NodeUrl not found"
        });
    const notExist = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
    const existantUrl = bitcoin.currentNodeUrl !== newNodeUrl;
    if(notExist && existantUrl){
        bitcoin.networkNodes.push(newNodeUrl);
        res.status(200).json({
            message: "New node registered successfully."
        });
    }else{
        res.status(406).json({
            message: "NodeUrl can't be added."
        });
    }
};

exports.RegisterNodeBulk = (req, res)=>{
    try{
        const {allNetworkNodes} = req.body;
        for(networkNode of allNetworkNodes){
            let notExist = bitcoin.networkNodes.indexOf(networkNode) === -1;
            let existantUrl = bitcoin.currentNodeUrl !== networkNode;
            if(!notExist || !existantUrl)
            res.status(406).json({
                message: "can't be bulked"
            });
            if(notExist && existantUrl)
                bitcoin.networkNodes.push(networkNode);
        }
        res.status(200).json({
            message: "Bulk registration successful"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "something wen't wrong!",
            details: err.message
        });
    }
};