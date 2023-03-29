//SPXF// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//ERC20默认有各种方法，只需要实现构造函数即可
contract Token is ERC20 {
    mapping (address => uint) private balances;
    constructor() ERC20("LZZTOKEN", "LZZ") {
        _mint(msg.sender, 10000 * (10 ** uint256(decimals())));
    }
}