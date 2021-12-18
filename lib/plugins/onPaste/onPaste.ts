import { SlateComposable } from "../../util/composeSlateProps";
import { SlatePluginProps } from "../../types/shared";
import { ZeroXEditor } from "../../types";
import { metamaskProvider } from "../../util/metamaskProvider";
import { formatEther } from "ethers/lib/utils";
import { ConstructionOutlined } from "@mui/icons-material";
import { Transforms } from "slate";

export const onPaste: SlateComposable<SlatePluginProps> = (
  pluginProps,
  editor: ZeroXEditor
) => {
  return {
    ...pluginProps,
    editableProps: {
      ...pluginProps.editableProps,
    },
  };
};
