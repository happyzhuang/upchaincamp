// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Bank {
    mapping (address => uint) private balances;

    event Deposit(address indexed account, uint amount);
    event Withdrawal(address indexed account, uint amount);

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint amount) public {
        require(amount > 0, "Withdrawal amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    function balanceOf(address account) public view returns (uint) {
        return balances[account];
    }
}

