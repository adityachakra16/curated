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

    struct UserMetadata{
        uint totalRewardsEarned;
        uint32 curationsPendingRewards;
        uint32 curationLockedRewards;
        uint32 reputationScore;
        uint32 experienceScore;
    }

    mapping(address => string[]) public userToCurationLinks;
    mapping(string => string[]) public grantIdToCurationLinks;
    mapping(address => UserMetadata) public userToMetadata;
    uint private rewardAmount;
    address private rewardToken;
    constructor(address _rewardToken, uint _rewardAmount) {
        rewardToken = _rewardToken;
        rewardAmount = _rewardAmount;
    }

    function makeVerifiable(string[] calldata curations, string[] memory grantIds) external {
        
    }

    function changeRewardToken(address _rewardToken) external onlyOwner {
        rewardToken = _rewardToken;
    }

    function changeRewardAmount( uint _rewardAmount) external onlyOwner {
        rewardAmount = _rewardAmount;
    }

    function addRewardBalance(uint amount) external onlyOwner {
        IERC20(rewardToken).safeTransferFrom(msg.sender, address(this), amount);
    }

    function getRewarded() external {
        IERC20(rewardToken).safeTransfer(msg.sender, uint(userToMetadata[msg.sender].curationsPendingRewards.sub(userToMetadata[msg.sender].curationLockedRewards)).mul(rewardAmount));
    }

    function getRewardBalance() external view returns (uint){
        return IERC20(rewardToken).balanceOf(address(this));
    }

}
