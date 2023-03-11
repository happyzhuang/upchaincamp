const { expect } = require("chai");

describe("Counter", function () {
  let counter;

  before(async function () {
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.deployed();
    console.log("counter address:" + counter.address);
  });

  it("部署者成功调用add()", async function() {
    await counter.add(10);
    const counterValue = await counter.count();
    expect(counterValue).to.equal(10);
  });

  it("其他地址调用add()失败", async function() {
    const otherAccountSigner = await ethers.provider.getSigner(1);
    await expect(counter.connect(otherAccountSigner).add(1)).to.be.revertedWith("You are not the owner");
  });
});
