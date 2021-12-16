import { SlateComposable } from "../../util/composeSlateProps";
import { SlateProps } from "../../types/shared";
import { Typography, useTheme } from "@mui/material";
import { DefaultElement } from "slate-react";
import { onKeyPress } from "./lib/onKeyPress";
import { ZeroXEditor } from "../../types";

export const core: SlateComposable<SlateProps> = (pluginProps, editor: ZeroXEditor) =>  {
  const { isVoid } = editor;

  editor.isVoid = (props) => {
    return typeof props.type !== "undefined" || isVoid(props);
  };

  return {
    ...pluginProps,
    editableProps: {
      ...pluginProps.editableProps,
      onKeyPress: (event) => {
        onKeyPress(event, editor);
      },
      renderElement: function RenderElement(props) {
        console.log("rendering");
        const theme = useTheme();
        if (props.element.type == null) {
          return (
            <Typography
              variant="body1"
              style={{
                maxWidth: `${theme.spacing(70)}`,
                margin: "auto",
                lineHeight: theme.typography.subtitle1.lineHeight,
              }}
              {...props.attributes}
            >
              {props.children}
            </Typography>
          );
        }
        if (pluginProps.editableProps.renderElement != null) {
          return pluginProps.editableProps.renderElement(props);
        }
        return <DefaultElement {...props} />;
      },
    },
  }; 
} 