const MagellanicTokenSale = artifacts.require(
  "../contracts/MagellanicTokenSale.sol"
);
const assert = require("assert");

contract("MagellanicTokenSale", function (accounts) {
  var price = 1000000000000000;
  var buyer = accounts[1];
  var admin = accounts[0];

  it("initialises contract with the correct values", async () => {
    const instance = await MagellanicTokenSale.deployed();
    const address = await instance.tokenContract();
    const tokenPrice = await instance.tokenPrice();
    assert.notEqual(instance.address, "0x0");
    assert.notEqual(address, "0x0");
    assert.equal(tokenPrice, price);
  });

  it("facilitates token buying", async () => {
    const instance = await MagellanicTokenSale.deployed();
    var numberOfTokens = 10;
    var value = numberOfTokens * price;
    const receipt = await instance.buyTokens(numberOfTokens, {
      from: buyer,
      value: value,
    });
    const amount = await instance.tokenSold();
    assert.equal(amount.toNumber(), numberOfTokens);

    assert.equal(receipt.logs.length, 1, "triggers one event");
    assert.equal(receipt.logs[0].event, "Sell", 'should be the "Sell" event');
    assert.equal(receipt.logs[0].args._buyer, accounts[1], "logs the buyer");
    assert.equal(
      receipt.logs[0].args._amount,
      numberOfTokens,
      "logs the numberOfTokens"
    );

    let done = false;
    try {
        const receipt = await instance.buyTokens(numberOfTokens, {
            from: buyer,
            value: 1,
        });
        done = true;
    } catch (err) {
      assert.equal(done, false);
    }
    assert.equal(done, false);
  });
});
