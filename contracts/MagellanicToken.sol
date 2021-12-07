pragma solidity >=0.4.20;

contract MagellanicToken{
    uint256 public totalSupply;
    mapping(address=>uint256) public balanceOf;
    string public name="Magellanic";
    string public symbol="MGL";
    string public standard="Magellanic v1.0";    //is not included in erc20 standard

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    constructor(uint256 _total) public{
        totalSupply=_total;
        //allocate the initial supply
        balanceOf[msg.sender]=totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender]>=_value);

        balanceOf[msg.sender]=balanceOf[msg.sender]-_value;
        balanceOf[_to]=balanceOf[_to]+_value;

        emit Transfer(msg.sender,_to,_value);

        return true;
    }


}