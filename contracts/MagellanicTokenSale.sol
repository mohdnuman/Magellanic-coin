pragma solidity >=0.4.20;

import "./MagellanicToken.sol";

contract MagellanictokenSale{
    address public admin;
    MagellanicToken public tokenContract;
    uint256 public tokenPrice;

    constructor(MagellanicToken _contract,uint256 _tokenPrice) public{
        //set an admin
        admin=msg.sender;
        tokenContract=_contract;
        tokenPrice=_tokenPrice;
        //Token contract
        //set token price

    }
}