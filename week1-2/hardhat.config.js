require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */


// Retrieve the private key from the environment variable
const PRIVATE_KEY = "";
const ETHERSCAN_API_KEY = "";
const ALCHEMY_API_KEY = "";

module.exports = {
  solidity: "0.8.18",

  networks: {

    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY]
    }

  },

  etherscan: {
    apiKey: {
      mumbai: ""
    },
    customChains: [
      {
        network: "maticMumbai",
        chainId: 80001,
        urls: {
          apiURL: "https://api-mumbai.polygonscan.com/api",
          browserURL: "https://mumbai.polygonscan.com"
        }
      }
    ]
  }

};