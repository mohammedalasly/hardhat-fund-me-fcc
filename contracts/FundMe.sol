// SPDX-License-Identifier: MIT

// Pragma
pragma solidity ^0.8.0;

// Import
import "./PriceConverter.sol";

// Error Code
error FundMe__NotOwner();

/** @title A contract for crowd funding */
/** @author Mohammad Alasli  */
/** @notice This contract is to demo a sample funding contract */
/** @dev This implement price feed as our library */

contract FundMe {
    // Type Declarations
    using PriceConverter for uint256;

    // State Variables!
    // mapping: to check how much money each one of these ppl actually sent
    mapping(address => uint256) private s_addressToAmountFunded;
    address[] private s_funders;
    address private immutable i_owner; // create a global variable
    uint256 public constant MINIMUN_USD = 50 * 10 ** 18; //50 * 1e18;
    AggregatorV3Interface private s_priceFeed;

    //keyword "modifier" only owner in the withraw function declaration call the function
    modifier onlyOwner() {
        //require(msg.sender == i_owner, "Sender is not owner");
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        _;
    }

    constructor(address s_priceFeedAdrress) {
        i_owner = msg.sender; //whomever is deploying the contract
        s_priceFeed = AggregatorV3Interface(s_priceFeedAdrress);
    }

    // receive() external payable {
    //     fund();
    // }

    // fallback() external payable {
    //     fund();
    // }

    /** @notice This function fund the contract */
    /** @dev This implement price feed as our library */

    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUN_USD,
            "You need to spend more ETH!"
        ); //to get how much value somebody sending

        s_addressToAmountFunded[msg.sender] += msg.value; //when somebody fund our contract
        s_funders.push(msg.sender);
    }

    function withdraw() public payable onlyOwner {
        /* starting index, ending index, step amount*/
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0; //reset the balances of the "mapping"
        }

        s_funders = new address[](0); //now we reset the [array]

        // withdraw the funds with 3 ways (transfer, send, call)
        // payable (msg.sender).transfer(address(this).balance);
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "Transfer failed");
    }

    function cheaperWithdraw() public payable onlyOwner {
        // read from memory instade of constently reading from a storage
        address[] memory funders = s_funders;
        // mapping can't be in memory!
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    // View / Pure
    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getAddressToAmountFunded(
        address funder
    ) public view returns (uint256) {
        return s_addressToAmountFunded[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
