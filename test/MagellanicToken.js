const MagellanicToken = artifacts.require("../contracts/MagellanicToken.sol");
const assert = require("assert");
const { errorMonitor } = require("events");

contract("MagellanicToken", function (accounts) {
  it("sets totalSupply on deployment", async () => {
    const instance = await MagellanicToken.deployed();
    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply.toNumber(), "1000000");
  });

  it("it allocates the initial supply to the admin account", async () => {
    const instance = await MagellanicToken.deployed();
    const adminBalance = await instance.balanceOf(accounts[0]);
    assert.equal(adminBalance.toNumber(), "1000000");
  });

  it("it sets the name and symbol correctly", async () => {
    const instance = await MagellanicToken.deployed();
    const name = await instance.name();
    const symbol = await instance.symbol();
    const standard = await instance.standard();
    assert.equal(name, "Magellanic");
    assert.equal(symbol, "MGL");
    assert.equal(standard, "Magellanic v1.0");
  });

  it("it transfers ownership of tokens", async () => {
    const success = false;
    try {
      const instance = await MagellanicToken.deployed();
      const adminBalance = await instance.transfer.call(
        accounts[1],
        9999999999
      );
      success = true;
    } catch (error) {
      assert.equal(success, false);
    }

    const instance = await MagellanicToken.deployed();
    const receipt = await instance.transfer(accounts[1], 250000, {
      from: accounts[0],
    });
    const balanceRec = await instance.balanceOf(accounts[1]);
    const balanceSen = await instance.balanceOf(accounts[0]);
    assert.equal(balanceRec, "250000");
    assert.equal(balanceSen, "750000");

    assert.equal(receipt.logs.length, 1, "triggers one event");
    assert.equal(
      receipt.logs[0].event,
      "Transfer",
      'should be the "Transfer" event'
    );
    assert.equal(
      receipt.logs[0].args._from,
      accounts[0],
      "logs the account the tokens are transferred from"
    );
    assert.equal(
      receipt.logs[0].args._to,
      accounts[1],
      "logs the account the tokens are transferred to"
    );
    assert.equal(
      receipt.logs[0].args._value,
      250000,
      "logs the transfer amount"
    );

    const funcCall=await instance.transfer.call(
        accounts[1],
        250000
      );
    assert.equal(funcCall,true);  
  });
});
