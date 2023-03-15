const { expect } = require("chai");

describe("Bank", function () {
  let bank;

  before(async function () {
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy();
    await bank.deployed();
    console.log("bank contract address:" + bank.address);
  });

  it("存钱功能", async function() {
    await bank.deposit(100);
    const balance = await bank.balanceOf(bank.address);
    expect(balance).to.equal(100);
  });

  it("取钱功能", async function() {
    await bank.withdraw(10);
    const balance = await bank.balanceOf(bank.address);
    expect(balance).to.equal(90);
  });
});
