//SPXF// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import"@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault {
    mapping(address => uint256) private balances;
    address private token;
    constructor(address _token) {
        token = _token;
    }
    function deposit(uint256 _amount) external {
        require(_amount > 0, "Vault: deposit amount must be greater than zero");
        require(IERC20(token).balanceOf(msg.sender) >= _amount, "Vault: insufficient balance");
        IERC20(token).transferFrom(msg.sender, address(this), _amount);
        balances[msg.sender] += _amount;
    }
    function withdraw(uint256 amount) public {
        require(amount > 0, "Withdrawal amount must be greater than zero");
        require(_deposits[msg.sender] >= amount, "Insufficient balance in the vault");
        _deposits[msg.sender] -= amount;
        _token.transfer(msg.sender, amount);
    }
    
    function balanceOf(address account) public view returns (uint256) {
        return _deposits[account];
    }
}