# LayerZero Boilerplate

## Overview

This repo is intended to serve as a potential starting point for building on top of LayerZero. This repo is setup to deploy the following:

1. [OFT](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/oft/oft-v1) (V1) on the original 7 chains LayerZero initially supported.
2. [OFTV2](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/oft/oftv2) contracts on goerli and bsc-testnet.
3. [ProxyOFTWithFee](https://github.com/LayerZero-Labs/solidity-examples/blob/main/contracts/token/oft/v2/fee/ProxyOFTWithFee.sol) on fuji to convert already deployed ERC20 into OFT and [OFTWithFee](https://github.com/LayerZero-Labs/solidity-examples/blob/main/contracts/token/oft/v2/fee/OFTWithFee.sol) on arbitrum-goerli and bsc-testnet.

Learn about the difference between OFT(v1) and OFTV2 [here](https://layerzero.gitbook.io/docs/evm-guides/layerzero-omnichain-contracts/oft/oft-v1-vs-oftv2-which-should-i-use).

This repo comes with [LayerZero tooling](https://layerzero.gitbook.io/docs/evm-guides/layerzero-tooling) to [Lock in UA Configuration](https://layerzero.gitbook.io/docs/evm-guides/ua-custom-configuration/lock-in-ua-configuration) and Wire Up Configuration.
To use the UA Configuration script please fill in your appConfig.json according to this [documentation](https://layerzero.gitbook.io/docs/evm-guides/layerzero-tooling/ua-configuration).
To use the Wire Up Configuration script please fill in your wireUpConfig.json according to this [documentation](https://layerzero.gitbook.io/docs/evm-guides/layerzero-tooling/wire-up-configuration).

## Deploy Setup

1. Add a .env file (to the root project directory) with your MNEMONIC="" and fund your wallet in order to deploy!

## Deploying OFT (V1)

Run the following hardhat commands to deploy OFT to the original 7 chains:

```
npx hardhat deploy --network goerli --tags ExampleOFT
npx hardhat deploy --network bsc-testnet --tags ExampleOFT
npx hardhat deploy --network fuji --tags ExampleOFT
npx hardhat deploy --network mumbai --tags ExampleOFT
npx hardhat deploy --network arbitrum-goerli --tags ExampleOFT
npx hardhat deploy --network optimism-goerli --tags ExampleOFT
npx hardhat deploy --network fantom-testnet --tags ExampleOFT
```

### Wire Up Configuration

Then run the Wire Up Configuration to:

<ul>
    <li>function setTrustedRemote(uint16, bytes)</li>
    <li>function setUseCustomAdapterParams(bool)</li>
    <li>function setMinDstGas(uint16, uint16, uint)</li>
</ul>

```
npx hardhat wireAll --e testnet --config-path "./constants/oftConfig/wireUpConfig.json"
```

### Send OFT accross chains

```
npx hardhat --network fuji oftSend --qty 100000000000000000 --target-network mumbai
```

## Deploying OFTV2

Run the following hardhat commands to deploy OFTV2 to goerli and bsc-testnet:

```
npx hardhat deploy --network goerli --tags ExampleOFTV2
npx hardhat deploy --network bsc-testnet --tags ExampleOFTV2
```

### Wire Up Configuration

Then run the Wire Up Configuration to:

<ul>
    <li>function setTrustedRemote(uint16, bytes)</li>
    <li>function setUseCustomAdapterParams(bool)</li>
    <li>function setMinDstGas(uint16, uint16, uint)</li>
    <li>function setDefaultFeeBp(uint16)</li>
    <li>function setFeeBp(uint16, bool, uint16)</li>
</ul>

```
npx hardhat wireAll --e testnet --config-path "./constants/LayerSyncOFT/wireUpConfig.json"
```

### Send OFTV2 accross chains

```
npx hardhat --network fuji oftv2Send --qty 100000000000000000 --target-network arbitrum-goerli
```

## Deploying OFTWithFee w/ already deployed ERC20 token

Run the following hardhat commands to deploy OFTV2 to goerli and bsc-testnet:

```
npx hardhat deploy --network fuji --tags LayerSyncOFT
npx hardhat deploy --network bsc-testnet --tags LayerSyncOFT
npx hardhat deploy --network arbitrum-goerli --tags LayerSyncOFT
```

### Wire Up Configuration

Then run the Wire Up Configuration to:

<ul>
    <li>function setTrustedRemote(uint16, bytes)</li>
    <li>function setUseCustomAdapterParams(bool)</li>
    <li>function setMinDstGas(uint16, uint16, uint)</li>
    <li>function setDefaultFeeBp(uint16)</li>
    <li>function setFeeBp(uint16, bool, uint16)</li>
</ul>

```
npx hardhat wireAll --e testnet --config-path "./constants/LayerSyncOFT/wireUpConfig.json"
```

### Send OFTV2 accross chains

```
npx hardhat --network fuji oftv2Send --qty 100000000000000000 --target-network arbitrum-goerli
```

## Lock down UA config

### OFT (V1)

```
npx hardhat setConfig --config-path "./constants/oftConfig/appConfig.json"
```

### OFTV2

```
npx hardhat setConfig --networks arbitrum,avalanche,base,bsc,celo,arbitrumNova,linea,mantle,metis,fuse,moonbeam,moonriver,optimism,polygon,fantom --name LayerSyncOFT --config-path "./constants/LayerSyncOFT/appConfig.json"

npx hardhat getDefaultConfig --networks arbitrum-mainnet,avalanche-mainnet,base-mainnet,bsc-mainnet,celo-mainnet,nova-mainnet,linea-mainnet,mantle-mainnet,metis-mainnet,fuse-mainnet,moonbeam-mainnet,moonriver-mainnet,optimism-mainnet,polygon-mainnet,fantom-mainnet

npx hardhat getConfig --network arbitrum-mainnet --remote-networks avalanche-mainnet,base-mainnet,bsc-mainnet,celo-mainnet,nova-mainnet,linea-mainnet,mantle-mainnet,metis-mainnet,fuse-mainnet,moonbeam-mainnet,moonriver-mainnet,optimism-mainnet,polygon-mainnet,fantom-mainnet --name LayerSyncOFT

npx hardhat setConfig --config-path "./constants/LayerSyncOFT/appConfig.json"
```

### OFTWithFee

```
npx hardhat setConfig --config-path "./constants/LayerSyncOFT/appConfig.json"
```
