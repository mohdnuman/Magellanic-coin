const MagellanicToken = artifacts.require('../contracts/MagellanicToken.sol');
const assert=require('assert');

contract('MagellanicToken',function(accounts){

    it("sets totalSupply on deployment",async()=>{
        const instance=await MagellanicToken.deployed();
        const totalSupply=await instance.totalSupply();
        assert.equal(totalSupply.toNumber(),'1000000');
    });
})