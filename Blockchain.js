const SHA256 = require("crypto-js/sha256");
class BlockCrypto {
  constructor(index, current_time, Data, nextHash = " ") {
    this.index = index;
    this.current_time = current_time;
    this.Data = Data;
    this.nextHash = nextHash;
    this.hash = this.computeHash();

     }

  computeHash() {
    return SHA256(
      this.index +
        this.nextHash +
        this.current_time +
        JSON.stringify(this.Data)
          ).toString();
  }
}

class Blockchain {
  constructor() {
    this.block1chain = [this.initGenesisBlock()];
    this.difficulty = 4;
  }
  initGenesisBlock() {
    return new BlockCrypto(0, "22/04/2022", "Initial Block in our network", "0");
  }

  obtainLatestBlock() {
    return this.block1chain[this.block1chain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.nextHash = this.obtainLatestBlock().hash;
    newBlock.hash = newBlock.computeHash();
        this.block1chain.push(newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.block1chain.length; i++) {
      const currentBlock = this.block1chain[i];
      const nextHash = this.block1chain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.nextHash !== nextHash.hash) return false;
    }
    return true;
  }
}

let coin = new Blockchain();

console.log("Block ..");
coin.addNewBlock(
  new BlockCrypto(1, "22/04/2022", {
    sender: "SamiChain",
    recipient: "IyadChain",
    Data : [ ' Hello World !'],
    quantity: 100
  })
);

coin.addNewBlock(
  new BlockCrypto(2, "23/04/2023", {
    sender: "NoorChain",
    recipient: "DinaChain",
    Data : [ ' Hello World !'],
    quantity: 349
  })
);

console.log(JSON.stringify(coin, null, 4));
