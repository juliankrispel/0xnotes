import { SlateComposable } from "../../util/composeSlateProps";
import { Command, SlatePluginProps } from "../../types/shared";
import { Box, useTheme } from "@mui/material";
import { metamaskProvider } from "../../util/metamaskProvider";

export const transaction: SlateComposable<SlatePluginProps> = (
  pluginProps,
) => {

  const commands: Command[] = [{
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
  }]

  return {
    ...pluginProps,
    commands: [...(pluginProps.commands || []), ...commands],
    editableProps: {
      ...pluginProps.editableProps,
      renderElement: function RenderElement(props) {
        const theme = useTheme();
        if (props.element.type === "transaction") {
          return (
            <Box
              sx={{
                maxWidth: `${theme.spacing(70)}`,
                margin: "auto",
              }}
            >
              <pre contentEditable={false}>
                {JSON.stringify(props.element.data, null, 2)}
              </pre>
              {props.children}
            </Box>
          );
        } else if (pluginProps.editableProps.renderElement) {
          return pluginProps.editableProps.renderElement(props);
        }

        return null;
      },
    },
  };
};
