const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389,'OIUOEREDHKHKD','78s97d4x6dsf');

bitcoin.createNewBlock(2389,'OIUOEREDHKHKD','78s97d4x6dsf');

console.log(bitcoin);

console.log("the last chain is:", bitcoin.getLastBlock());