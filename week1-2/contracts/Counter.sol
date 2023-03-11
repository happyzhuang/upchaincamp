//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;
contract Counter {
    uint256 public count;
    address public owner;
    constructor() {
        count = 0;
        owner = msg.sender;
    }
    function add( uint x) public  returns (uint) {
        require(owner == msg.sender, "You are not the owner");
        return count += x;
    }
}