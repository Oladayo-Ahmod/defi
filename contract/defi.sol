// SPDX-License-Identifier : UNLICENSED

pragma solidity 0.8.18;

contract Practice {

    uint256 amount;

    function setAmount(uint256 _amount) external {
        amount = _amount;
    }

    function readAmount() external view returns(uint256) {
        return amount;
    }
}
