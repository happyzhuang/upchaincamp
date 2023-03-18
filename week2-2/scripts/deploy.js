async function main() {
  const Score = await ethers.getContractFactory("Score");
  const scoreContract = await Score.deploy();

  const Teacher = await ethers.getContractFactory("Teacher");
  const teacherContract = await Teacher.deploy(scoreContract.address);

  console.log("Score deployed to:", scoreContract.address);
  console.log("Teacher deployed to:", teacherContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
