//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./openzeppelin/Ownable.sol";
import "./openzeppelin/Safemath.sol";
import "./openzeppelin/IERC20.sol";
import "./openzeppelin/SafeERC20.sol";

contract Curator is Ownable {
    using SafeMath for uint256;
    using SafeMath for uint32;
    using SafeERC20 for IERC20;

    mapping (address => uint) private userToPendingRewards;

    uint private rewardMultiplier;
    address private rewardToken;
    constructor(address _rewardToken, uint _rewardMultiplier) {
        rewardToken = _rewardToken;
        rewardMultiplier = _rewardMultiplier;
    }

    function addPendingRewards(address[] calldata users, uint[] calldata amount) external onlyOwner {
        for(uint i=0; i < users.length; i++){
            userToPendingRewards[users[i]] = amount[i] * rewardMultiplier;
        }
    }

    function changeRewardToken(address _rewardToken) external onlyOwner {
        rewardToken = _rewardToken;
    }

    function changeRewardAmount(uint _rewardMultiplier) external onlyOwner {
        rewardMultiplier = _rewardMultiplier;
    }

    function addRewardBalance(uint amount) external onlyOwner {
        IERC20(rewardToken).safeTransferFrom(msg.sender, address(this), amount);
    }

    function getRewarded() external {
        IERC20(rewardToken).safeTransfer(msg.sender, userToPendingRewards[msg.sender]);
    }

    function getRewardBalance() external view returns (uint){
        return IERC20(rewardToken).balanceOf(address(this));
    }

}
