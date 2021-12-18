import { ethers } from "ethers";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { Price, Token  } from "@uniswap/sdk-core";
import { Pool, priceToClosestTick } from "@uniswap/v3-sdk";
import { composeSlateProps } from "../util/composeSlateProps";
import { EditableProps } from "slate-react/dist/components/editable";
import { useLocalStorage } from 'react-use';
import { SlatePluginProps } from "../types/shared";
import { commandsPlugin } from "../plugins/commands/commandsPlugin";
import { Box, useTheme } from "@mui/material";
import { core } from "../plugins/core/core";
import { ZeroXEditor } from "../types";
import { onPaste } from "../plugins/onPaste/onPaste";
import { transaction } from "../plugins/transaction/transaction";
import { commands } from "../plugins/commands/lib/commands";
import { ethCommands } from "../plugins/ethCommands/ethCommands";

export function ZeroXNotes()  {
  const editor = useMemo<ZeroXEditor>(
    () => withHistory(withReact(createEditor())),
    []
  );

  const [value, setValue] = useLocalStorage<Node[]>('editor', [
    {
      children: [{
        text: ""
      }], 
    },
  ]);

  const { editableProps, Outside } = useMemo(
    () =>
      composeSlateProps<SlatePluginProps>(
        [ethCommands, transaction, core, commandsPlugin, onPaste],
        editor,
        {
          commands: commands,
          editableProps: {},
          // eslint-disable-next-line react/display-name
          Outside: React.memo(() => <div>Not implemented</div>),
        }
      ),
    []
  );

  const theme = useTheme()

  return (
    <Box
      sx={{
        height: "100vh",
        width: '100%',
        overflow: "auto",
        '[role="textbox"]': {
          width: '100%',
          height: "100%",
          padding: theme.spacing(4),
        },
      }}
    >
      <Slate editor={editor} onChange={setValue} value={value}>
        <Editable
          autoFocus
          {...editableProps}
          placeholder="Type @ for pills and / for blocks"
        />
        <Outside />
      </Slate>
    </Box>
  );
}
