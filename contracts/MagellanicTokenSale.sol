pragma solidity >=0.4.20;

import "./MagellanicToken.sol";

contract MagellanictokenSale{
    address admin;
    MagellanicToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;
    
    event Sell(
        address indexed _buyer,
        uint256 indexed _amount
    );

    constructor(MagellanicToken _contract,uint256 _tokenPrice) public{
        admin=msg.sender;
        tokenContract=_contract;
        tokenPrice=_tokenPrice;
    }

    //multiply function
    function multiply(uint256 a, uint256 b) internal pure returns(uint c){
        require(b==0 || (c=a*b)/b==a );
    }

    //buy tokens
    function buyTokens(uint256 _numberOfTokens) public payable{
        require(msg.value==multiply(_numberOfTokens,tokenPrice));

        tokenSold+=_numberOfTokens;

        emit Sell(msg.sender,_numberOfTokens);
        //require that value is equal to tokens
        //require if contract has enough tokens
        //require that a transfer is successful
   
        
        
    }
}