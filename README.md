# Sample Hardhat Project

## Learning from Patrick @ FCC using Smart Contract Development Framework (Harhat)

**Course link:**
[Learn Blockchain, Solidity, and Full Stack Web3 Development with JavaScript – 32-Hour Course](https://www.youtube.com/watch?v=gyMwXuJrbJQ)

### What we have learnd:
- Hardhat Advanced Project.
- Refactor and modulariz our `FundMe.sol` & `PricConverter.sol` contracts.
- Create Price Feed contract.
- Define networks config,
and keep track of different price feed of different conract addresses across different chains.
- Auto verification.
- Mocking.
- Using tags to test one specific contract.
- Deploy contracts on *Goerli* testnet.
- Solidity Style Guide.
- Breakpoints & Debugging.
- Gas optimizations using `storage` variable in FundMe.sol contract.

### Installed Packages:
 - `yarn add --dev @chainlink/contracts`.
 - `yarn add --dev hardhat-deploy`.
 - `yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers`.

### Resources:
- [Chainlink.](https://docs.chain.link/ethereum)
- [Etherscan-API-Keys.](https://info.etherscan.com/api-keys/)
- [Hardhat.](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan)
- [aave-v3-core-github](https://github.com/aave/aave-v3-core/blob/master/helper-hardhat-config.ts) is a protocol that's on multiple chain and has to deploy their code to multiple chain and work with multiple different addresses.
- [Mock-V3-Aggregator-GitHub](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol) to test our contracts localy.
- [Solidity-Docs.](https://docs.soliditylang.org/en/v0.8.17/style-guide.html) style guide.
- [Ethers-js](https://docs.ethers.org/v5/single-page/) BigNumber.
- [evm-opcodes](https://github.com/crytic/evm-opcodes) opcode combined show how much gas.


**Testnet:** *Goerli.*