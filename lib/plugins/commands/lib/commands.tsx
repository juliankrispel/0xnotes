import { metamaskProvider } from "../../../util/metamaskProvider";
import { metamaskSigner } from "../../../util/metamaskSigner";
import { Command } from "../../../types/shared";
import { ethers  } from "ethers";
import { formatEther } from "ethers/lib/utils";

export const commands: Command[] = [
  {
    modifier: "@",
    key: "me",
    description: "My ens username",
    request: async () => {
      const address = await metamaskSigner.getAddress();
      const res = await metamaskProvider.lookupAddress(address);
      return res;
    },
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
    key: "transaction",
    description: "Inspect a transaction on ethereum",
    request: ({ search }) =>
      metamaskProvider
        .getTransaction(search)
        .then((v) => {
          console.log({ v, search });
          return JSON.stringify({ ...v }, null, 2)
        }),
  },
  {
    modifier: "/",
    key: "address",
    description: "Inspect a transaction on ethereum",
    request: (props) => {
      console.log({ props });
      if (props?.search == null) {
        return Promise.resolve("search not defined");
      }

      const { search } = props;

      return Promise.all([
        metamaskProvider.getBalance(search),
        metamaskProvider.getTransactionCount(search),
        metamaskProvider.lookupAddress(search),
      ]).then(([balance, transactionCount, lookupAddress]) =>
        JSON.stringify(
          {
            address: search,
            balance: formatEther(balance),
            transactionCount,
            lookupAddress,
          },
          null,
          2
        )
      );
    },
  },
  {
    modifier: "/",
    key: "block",
    description: "Inspect a block on ethereum",
    request: async (props) => {
      const search =
        parseInt(props?.search) || (await metamaskProvider.getBlockNumber());

      return metamaskProvider.getBlockWithTransactions(search).then(val => {
        const {
          gasLimit,
          timestamp,
          gasUsed,
          hash,
          number,
          difficulty,
          baseFeePerGas,
          extraData,
          transactions,
        } = val

        return JSON.stringify({
          gasLimit,
          timestamp: new Date(timestamp),
          gasUsed,
          hash,
          number,
          difficulty,
          extraData,
          baseFeePerGas,
          numberOfTransactions: transactions.length,
        }, null, 2);
      })
    },
  }
];
