import { SlateComposable } from "../../util/composeSlateProps";
import { Command, SlatePluginProps } from "../../types/shared";
import { ZeroXEditor } from "../../types";

/**
 * An example plugin.
 ********
 * Copy this as a starting point for new editor plugins
 */
export const _examplePlugin: SlateComposable<SlatePluginProps> = (
  pluginProps,
  _editor: ZeroXEditor
) => {
  /**
   * All a plugin needs to do is return pluginProps. You can
   * pick and choose which attributes of pluginProps to change.
   */

  /**
   * In this case we're going to extend the list of editor commands
   * (Available commands show up when user presses a modifier such as "/" or "@")
   */
  const commands: Command = {
    description: "My example api integration",
    key: "what",
    modifier: "/",
    request: () => Promise.resolve("Hello whats up"),
  };

  return {
    ...pluginProps,
    commands: [...(pluginProps.commands || []), commands],
  };
}; 