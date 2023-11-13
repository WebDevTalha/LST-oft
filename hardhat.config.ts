import { HardhatUserConfig } from "hardhat/config";
import "@layerzerolabs/ua-utils";
import "hardhat-contract-sizer";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-web3";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

import "./tasks";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

function getMnemonic(networkName) {
  if (networkName) {
    const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()];
    if (mnemonic && mnemonic !== "") {
      return mnemonic;
    }
  }

  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === "") {
    return "test test test test test test test test test test test junk";
  }

  return mnemonic;
}

function accounts(chainKey) {
  return { mnemonic: getMnemonic(chainKey) };
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  namedAccounts: {
    deployer: {
      default: 0, // wallet address 0, of the mnemonic in .env
    },
    proxyOwner: {
      default: 1,
    },
  },
  networks: {
    hardhat: {
      accounts: accounts(),
    },
    ethereum: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: 1,
      accounts: accounts(),
    },
    "bsc-mainnet": {
      url: "https://1rpc.io/bnb",
      chainId: 56,
      accounts: accounts(),
    },
    "avalanche-mainnet": {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: accounts(),
    },
    "polygon-mainnet": {
      url: "https://polygon-rpc.com",
      chainId: 137,
      accounts: accounts(),
    },
    "arbitrum-mainnet": {
      url: `https://arb1.arbitrum.io/rpc`,
      chainId: 42161,
      accounts: accounts(),
    },
    "optimism-mainnet": {
      url: `https://optimism.llamarpc.com`,
      chainId: 10,
      accounts: accounts(),
    },
    "fantom-mainnet": {
      url: `https://rpcapi.fantom.network`,
      chainId: 250,
      accounts: accounts(),
    },
    "celo-mainnet": {
      url: `https://1rpc.io/celo`,
      chainId: 42220,
      accounts: accounts(),
    },
    "base-mainnet": {
      url: `https://base.llamarpc.com`,
      chainId: 8453,
      accounts: accounts(),
    },
    "linea-mainnet": {
      url: `https://linea.blockpi.network/v1/rpc/public`,
      chainId: 59144,
      accounts: accounts(),
    },
    "mantle-mainnet": {
      url: `https://1rpc.io/mantle`,
      chainId: 5000,
      accounts: accounts(),
    },
    "nova-mainnet": {
      url: `https://nova.arbitrum.io/rpc`,
      chainId: 42170,
      accounts: accounts(),
    },
    "metis-mainnet": {
      url: `https://andromeda.metis.io/?owner=1088`,
      chainId: 1088,
      accounts: accounts(),
    },
    "fuse-mainnet": {
      url: `https://fuse-pokt.nodies.app`,
      chainId: 122,
      accounts: accounts(),
    },
    "moonbeam-mainnet": {
      url: `https://moonbeam.unitedbloc.com:3000`,
      chainId: 1284,
      accounts: accounts(),
    },
    "moonriver-mainnet": {
      url: `https://moonriver.public.blastapi.io`,
      chainId: 1285,
      accounts: accounts(),
    },

    // Testnet
    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: 5,
      accounts: accounts(),
    },
    "bsc-testnet": {
      url: "https://bsc-testnet.bnbchain.org",
      chainId: 97,
      accounts: accounts(),
    },
    fuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      chainId: 43113,
      accounts: accounts(),
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      accounts: accounts(),
    },
    "arbitrum-goerli": {
      url: `https://goerli-rollup.arbitrum.io/rpc/`,
      chainId: 421613,
      accounts: accounts(),
    },
    "optimism-goerli": {
      url: `https://goerli.optimism.io/`,
      chainId: 420,
      accounts: accounts(),
    },
    "fantom-testnet": {
      url: `https://rpc.ankr.com/fantom_testnet`,
      chainId: 4002,
      accounts: accounts(),
    },
    "base-testnet": {
      url: `https://1rpc.io/base-goerli`,
      chainId: 84531,
      accounts: accounts(),
    },
    "metis-testnet": {
      url: `https://goerli.gateway.metisdevops.link`,
      chainId: 599,
      accounts: accounts(),
    },
  },
  etherscan: {
    apiKey: process.env.ARBITRUM_API_KEY,
  },
};
export default config;
