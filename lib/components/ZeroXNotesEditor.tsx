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
import { SlateProps } from "../types/shared";
import { commandsPlugin } from "../plugins/commands/commandsPlugin";
import { Box, useTheme } from "@mui/material";
import { core } from "../plugins/core/core";
import { ZeroXEditor } from "../types";
import { onPaste } from "../plugins/onPaste/onPaste";
import { transaction } from "../plugins/transaction/transaction";

export function ZeroXNotes()  {
  const editor = useMemo<ZeroXEditor>(
    () => withHistory(withReact(createEditor())),
    []
  );

  // useEffect(() => {
  //   const run = async () => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner()
  //     provider.getNetwork().then(val => {
  //       console.log(val)
  //     })

  //     // const p = new Pool()
  //     // provider.getLogs().then(val => {
  //     //   console.log(val)
  //     // })
  //     
  //     const address = window.ethereum.selectedAddress
  //     const _address = await signer.getAddress()
  //     console.log({ address, _address })
  //     if (address != null) {
  //       const chainId = await signer.getChainId()
  //       const balance = await provider.getBalance(address)
  //       console.log({ balance, chainId })
  //     }
  //   }

  //   run()
  // }, [])

  const [value, setValue] = useLocalStorage<Node[]>('editor', [
    {
      children: [{
        text: ""
      }], 
    },
  ]);

  const { editableProps, Outside } = useMemo(
    () =>
      composeSlateProps<SlateProps>(
        [core, commandsPlugin, onPaste, transaction],
        editor,
        {
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
