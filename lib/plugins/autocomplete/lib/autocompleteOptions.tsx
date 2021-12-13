import { metamaskProvider } from "../../../util/metamaskProvider";
import { metamaskSigner } from "../../../util/metamaskSigner";
import { AutocompleteOption } from "../../../types/shared";
import { Pool, Position } from '@uniswap/v3-sdk'
import { ethers  } from "ethers";

// const DAI_USDC_POOL = new Pool(
//   DAI,
//   USDC,
//   immutables.fee,
//   state.sqrtPriceX96.toString(),
//   state.liquidity.toString(),
//   state.tick
// );

// const DAI_USDC_POOL = new Pool(
//   DAI,
//   USDC,
//   immutables.fee,
//   state.sqrtPriceX96.toString(),
//   state.liquidity.toString(),
//   state.tick
// );

// const token0Price = DAI_USDC_POOL.token0Price;
// const token1Price = DAI_USDC_POOL.token1Price;

export const autocompleteOptions: AutocompleteOption[] = [
  {
    modifier: "@",
    key: "me",
    description: "My ens username",
    request: async () => {
      const address = await metamaskSigner.getAddress()
      const res = await metamaskProvider.lookupAddress(address)
      return res
    }
  },
  {
    modifier: "@",
    key: "address",
    description: "My ethereum address",
    request: () => metamaskSigner.getAddress(),
  },
  {
    modifier: "@",
    key: "blockNumber",
    description: "Get current block number",
    request: () => metamaskProvider.getBlockNumber().then((v) => v.toString()),
  },
  {
    modifier: "@",
    key: "gasPrice",
    description: "Current gas price",
    request: () =>
      metamaskSigner
        .getGasPrice()
        .then((val) => ethers.utils.formatEther(val.toNumber())),
  },
  {
    modifier: "@",
    key: "eth.resolveName",
    description: "Resolve name",
    request: async (props) =>
      props != null && metamaskSigner.resolveName(props.search),
  },
  {
    modifier: "@",
    key: "transactionCount",
    description: "Get transaction count",
    request: () => metamaskSigner.getTransactionCount(),
  },
  {
    modifier: "/",
    key: "lastBlock",
    description: "Get last block on ethereum",
  },
];
