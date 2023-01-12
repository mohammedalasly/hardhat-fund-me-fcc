require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy") // we add it once we downlod "deploy" task
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_ABI_KEY = process.env.COINMARKETCAP_ABI_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
    //solidity: "0.8.17",
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.6.6",
            },
        ],
        defaultNetwork: "hardhat",
    },
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
    },
    gasReporter: {
        // to have it run whenever we run our test
        enabled: true,
        outputFile: "gas-report.txt", // not to push it to github repo
        noColors: true, // WE add it because when we output to a file, colors ca get messed up
        currency: "USD", // to get the cost of each function  in USD for a blockchain like ETH
        coinmarketcap: COINMARKETCAP_ABI_KEY, // In order to get the currency, WE need to get an ABI key from COINMARKETCAP
        // hh gas reporter has different options if we gonna deploy to different network
        token: "ETH", // MATIC-Polygon network
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}
