// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");

async function main() {
  // Get contract factory object
  const Bank = await hre.ethers.getContractFactory("Bank");

  // Deploy contract and get deployed contract object
  const bank = await Bank.deploy();

  // Wait until contract is officially deployed before executing any other logic
  await bank.deployed();

  // Log success message upon completing execution 
  console.info(`Contract deployed to: ${bank.address}`);
}

// Use async/await and properly handle error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
