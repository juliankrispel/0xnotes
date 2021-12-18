import { SlateComposable } from "../../util/composeSlateProps";
import { Command, SlatePluginProps } from "../../types/shared";
import { ZeroXEditor } from "../../types";
import { metamaskSigner } from "../../util/metamaskSigner";
import { metamaskProvider } from "../../util/metamaskProvider";
import { ethers } from "ethers";

export const ethCommands: SlateComposable<SlatePluginProps> = (pluginProps, _editor: ZeroXEditor) =>  {
  const commands: Command[] = [
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
} 