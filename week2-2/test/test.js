const { expect } = require("chai");

describe("Score", function () {
  let scoreContract;
  let owner;
  let student1;
  let student2;
  let teacher2;

  before(async function () {
    const Score = await ethers.getContractFactory("Score");
    scoreContract = await Score.deploy();
    await scoreContract.deployed();
    [owner, student1, student2, teacher2] = await ethers.getSigners();
  });

  it("should set student score", async function () {
    await scoreContract.setScore(student1.address, 80);
    expect(await scoreContract.getScore(student1.address)).to.equal(80);
  });

  it("should not set invalid score", async function () {
    await expect(scoreContract.setScore(student1.address, 120)).to.be.revertedWith("Score must be between 0 and 100.");
  });

  it("should not set score by non-teacher", async function () {
    await expect(scoreContract.connect(student1).setScore(student2.address, 90)).to.be.revertedWith("Only teacher can modify scores.");
  });

  it("should change teacher address", async function () {
    await scoreContract.changeTeacher(teacher2.address);
    expect(await scoreContract.getScore(student1.address)).to.equal(80);
  });
});

describe("Teacher", function () {
  let scoreContract;
  let teacherContract;
  let owner;
  let student1;
  let student2;
  let teacher1;
  let teacher2;

  before(async function () {
    const Score = await ethers.getContractFactory("Score");
    const Teacher = await ethers.getContractFactory("Teacher");

    scoreContract = await Score.deploy();
    await scoreContract.deployed();

    teacherContract = await Teacher.deploy();
    await teacherContract.deployed();

    [owner, student1, student2, teacher1, teacher2] = await ethers.getSigners();

    await scoreContract.changeTeacher(teacher1.address);
  });

  it("should set student score", async function () {
    await teacherContract.setStudentScore(scoreContract, student1.address, 80);
    expect(await scoreContract.getScore(student1.address)).to.equal(80);
  });

  it("should get student score", async function () {
    await scoreContract.setScore(student2.address, 90);
    expect(await teacherContract.getStudentScore(scoreContract, student2.address)).to.equal(90);
  });

  it("should change teacher address", async function () {
    await teacherContract.changeTeacher(scoreContract, teacher2.address);
    expect(await scoreContract.getScore(student1.address)).to.equal(80);
  });
});
