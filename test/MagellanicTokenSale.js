const MagellanicTokenSale = artifacts.require("../contracts/MagellanicTokenSale.sol");
const assert = require("assert");


contract("MagellanicTokenSale", function (accounts) {

    var price=1000000000000000;

    it('initialises contract with the correct values',async()=>{
        const instance = await MagellanicTokenSale.deployed();
        const admin=await instance.admin();
        const address=await instance.tokenContract();
        const tokenPrice=await instance.tokenPrice();
        assert.notEqual(instance.address,'0x0');
        assert.notEqual(address,'0x0');
        assert.equal(admin,accounts[0]);
        assert.equal(tokenPrice,price);
    });
});