// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@layerzerolabs/solidity-examples/contracts/token/oft/v2/OFTV2.sol";

/// @title A LayerSync OmnichainFungibleToken on LayerZero
contract LayerSyncOFT is OFTV2 {
    uint public fee = 0.0000025 ether;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _sharedDecimals,
        address _layerZeroEndpoint
    ) OFTV2(_name, _symbol, _sharedDecimals, _layerZeroEndpoint) {}

    function mint(address _to, uint256 _amount) external payable {
        require(_amount * fee <= msg.value, "Not enough ether");
        _mint(_to, _amount * 10 ** decimals());
    }

    function setFee(uint _fee) external onlyOwner {
        fee = _fee;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
}
