const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

// bitcoin.createNewBlock(789457,'OIUOEDJETH8754DHKD','78SHNEG45DER56');

// bitcoin.createNewTransaction(100,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');

// bitcoin.createNewBlock(548764,'AKMC875E6S1RS9','WPLS214R7T6SJ3G2');

// bitcoin.createNewTransaction(50,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
// bitcoin.createNewTransaction(200,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
// bitcoin.createNewTransaction(300,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');

// bitcoin.createNewBlock(548764,'AKMC875E6S1RY9','WPLS214R7T6SJ4G2');

// const previousBlockHash = '87765DA6CCF0668238C1D27C35692E11';

// const currentBlockData = [
//     {
//     amount: 10,
//     sender: 'B4CEE9C0E5CD571',
//     recipient: '3A3F6E462D48E9',
//     },
//     {
//         amount: 10,
//         sender: 'B4CEE9C0E5CD571',
//         recipient: '3A3F6E462D48E9',
//     },
//     {
//         amount: 10,
//         sender: 'B4CEE9C0E5CD571',
//         recipient: '3A3F6E462D48E9',
//     }
// ];


// const hash = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

const data = {
    "chain": [
      {
        "index": 1,
        "timestamp": 1646682236201,
        "transactions": [],
        "nonce": 100,
        "Hash": "0",
        "previousBlockHash": "0"
      },
      {
        "index": 2,
        "timestamp": 1646682245205,
        "transactions": [],
        "nonce": 50809,
        "Hash": "0000d3a212c624328a93fe6a0b056e0d7c52778a5b29e88479b52604447b8392",
        "previousBlockHash": "0"
      },
      {
        "index": 3,
        "timestamp": 1646682845629,
        "transactions": [
          {
            "amount": 6.25,
            "sender": "00",
            "recipient": "de7993644212412fb1b9fcec6d639f02",
            "transactionId": "1132014a993e48c7b3010fd8d5a92ebb"
          }
        ],
        "nonce": 76587,
        "Hash": "00003786dfff88c99dce24bba9ac6c22a3a5c044e75a70ab02ed1ce3afcdea15",
        "previousBlockHash": "0000d3a212c624328a93fe6a0b056e0d7c52778a5b29e88479b52604447b8392"
      },
      {
        "index": 4,
        "timestamp": 1646682861976,
        "transactions": [
          {
            "amount": 6.25,
            "sender": "00",
            "recipient": "2c2bb8b6a09747ff8494d662ff9c67a7",
            "transactionId": "8570c697bf864973ba53cee85cf32ae4"
          }
        ],
        "nonce": 110447,
        "Hash": "0000817ac02172e1706fefd207a85beb1838423a282f4e44fb0a8fa12f4fd63e",
        "previousBlockHash": "00003786dfff88c99dce24bba9ac6c22a3a5c044e75a70ab02ed1ce3afcdea15"
      }
    ],
    "newTransactions": [
      {
        "amount": 6.25,
        "sender": "00",
        "recipient": "d534b4f372934f76be200bf85807cac3",
        "transactionId": "42f41210e50040a1a0178faf0ad3e795"
      }
    ],
    "currentNodeUrl": "http://localhost:3000",
    "networkNodes": []
  };
console.log("isValid: ", bitcoin.chainIsValid(data['chain']));
