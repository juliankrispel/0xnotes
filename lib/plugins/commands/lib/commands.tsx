import { metamaskProvider } from "../../../util/metamaskProvider";
import { metamaskSigner } from "../../../util/metamaskSigner";
import { Command } from "../../../types/shared";
import { ethers  } from "ethers";
import { formatEther } from "ethers/lib/utils";

export const commands: Command[] = [
  {
    modifier: "/",
    key: "address",
    description: "Inspect an address on ethereum",
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
