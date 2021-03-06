import { SlateComposable } from "../../util/composeSlateProps";
import { Command, SlatePluginProps } from "../../types/shared";
import { ZeroXEditor } from "../../types";
import { metamaskSigner } from "../../util/metamaskSigner";
import { metamaskProvider } from "../../util/metamaskProvider";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";

export const ethCommands: SlateComposable<SlatePluginProps> = (
  pluginProps,
  _editor: ZeroXEditor
) => {
  const commands: Command[] = [
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
        ]).then(([balance, transactionCount, lookupAddress]) => ({
          address: search,
          balance: formatEther(balance),
          transactionCount,
          lookupAddress,
        }));
      },
    },
    {
      modifier: "/",
      key: "block",
      description: "Inspect a block on ethereum",
      request: async (props) => {
        const search =
          parseInt(props?.search) || (await metamaskProvider.getBlockNumber());

        return metamaskProvider.getBlockWithTransactions(search).then((val) => {
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
          } = val;

          return {
            gasLimit,
            timestamp: new Date(timestamp),
            gasUsed,
            hash,
            number,
            difficulty,
            extraData,
            baseFeePerGas,
            numberOfTransactions: transactions.length,
          };
        });
      },
    },

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
      request: () =>
        metamaskProvider.getBlockNumber().then((v) => v.toString()),
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
  ];

  return {
    ...pluginProps,
    commands: [...(pluginProps.commands || []), ...commands],
  };
}; 