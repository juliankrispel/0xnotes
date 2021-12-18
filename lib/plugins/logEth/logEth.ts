import { SlateComposable } from "../../util/composeSlateProps";
import { Command, SlatePluginProps } from "../../types/shared";
import { ZeroXEditor } from "../../types";
import { metamaskProvider } from "../../util/metamaskProvider";

export const logEth: SlateComposable<SlatePluginProps> = (
  pluginProps,
  _editor: ZeroXEditor
) => {
  const commands: Command = {
    description: "Log commands from ethereum",
    key: "log",
    modifier: "/",
    request: () => metamaskProvider.getLogs({}).then((v) => v.slice(0, 100)),
  };

  return {
    ...pluginProps,
    commands: [...(pluginProps.commands || []), commands],
  };
}; 