// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IScore {
    function getScore(address student) external view returns (uint);
    function setScore(address student, uint score) external;
}

contract Score is IScore {
    mapping (address => uint) Stuscore;
    address private teacher;

    constructor() {
        teacher = msg.sender;
    }

    modifier onlyTeacher() {
        require(msg.sender == teacher, "Only teacher can modify scores.");
        _;
    }

    function getScore(address student) public view override returns (uint) {
        return Stuscore[student];
    }

    function setScore(address student, uint score) public override onlyTeacher {
        require(score <= 100, "Score must be less than or equal to 100.");
        Stuscore[student] = score;
    }
}

