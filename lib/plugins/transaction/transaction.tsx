import { SlateComposable } from "../../util/composeSlateProps";
import { SlateProps } from "../../types/shared";
import { Box, useTheme } from "@mui/material";

export const transaction: SlateComposable<SlateProps> = (
  pluginProps,
) => {
  return {
    ...pluginProps,
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
