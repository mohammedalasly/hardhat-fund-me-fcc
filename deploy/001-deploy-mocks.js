/* The idea of mocks is that if the contract doesn't exist,
we deploy a minimal version of it for our local testing*/
const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config") //import our chain

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    /* after compiling MockV3Aggregator, 
  now we have a contract we can use to deploy a fake price feed to a blockchain*/
    if (developmentChains.includes(network.name)) {
        //then we go deploy "mocks"
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks deployed!")
        log("------------------------------------------------")
    }
}
// to deploy only mock script
module.exports.tags = ["all", "mocks"]
