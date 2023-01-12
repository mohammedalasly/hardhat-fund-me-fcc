// in the script is going to be where we define how to deploy the fund me contract
// when we run hardhat deploy, hardhat deploy is going to call a function we specify in this script
// function deployFunc(hre) {
//   // passing (hre)as a parameter / (hre) is a hardhat runtime environment
//   console.log("Hello World!");
// }
// module.exports.default = deployFunc;

// module.exports = async (hre) =>{
//     // pull the variables out of the (hre)
//     const {getNamedAccounts, deployments} = hre
//     // Instade of doing like:
//     // hre.getNamedAccounts()
//     // hre.deployments

// }

/*import the networkConfig to our scripts*/
const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
/*In JavaScript syntactic suger, we can extrapolate our variables in the function declaration:*/
module.exports = async ({ getNamedAccounts, deployments }) => {
    // then we take the "deployment object to use to functions"
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // we use the address based off the chain that we are on:
    //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

    /*we deployed our mock script, and now we want to deploy our fundme script*/
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address // if we didn't deploy a mock
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"] // we use the networkConfig
    }

    //when going for localhost or hardhat network, we wnat to use a "mock"
    // with hardhat deploy, we use deploy function with a {lis of override}
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put priceFeed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    // adding auto verification, after we deploy our "FundMe"
    // we don't wanna verify on a local network
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    log("-----------------------------------------")
}
module.exports.tags = ["all", "fundme"]
