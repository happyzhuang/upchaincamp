// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IScore {
    function setScore(address student, uint score) external;
}

contract Teacher {
    function setStudentScore(IScore scoreContract, address student, uint score) external {
        scoreContract.setScore(student, score);
    }
}
