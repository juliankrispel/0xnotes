import { Box, List, ListItem, Stack, useTheme } from "@mui/material";
import useEventListener from "@use-it/event-listener";
import { useState } from "react";
import { useSlateStatic } from "slate-react";
import { useTextSelection } from "use-text-selection";
import { ZeroXElement } from "../../../types";
import { Command } from "../../../types/shared";
import { insertDataBlock } from "../lib/insertDataBlock";
import { insertDataPill } from "../lib/insertDataPill";

type ClientRect = NonNullable<ReturnType<typeof useTextSelection>["clientRect"]>

export function OptionsList({
  commands,
  clientRect,
  search,
  modifier,
}: {
  commands: Command[];
  clientRect: ClientRect;
  search?: string;
  modifier: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const editor = useSlateStatic()
  const lastIndex = commands.length - 1;
  const option = commands[selectedIndex];

  useEventListener(
    "keydown",
    (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }

      /**
       * Our keyboard navigation for moving our selection up and down
       */
      if (e.key === "ArrowDown" && selectedIndex < lastIndex) {
        setSelectedIndex(selectedIndex + 1);
      } else if (e.key === "ArrowDown" && selectedIndex >= lastIndex) {
        setSelectedIndex(0);
      } else if (e.key === "ArrowUp" && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else if (e.key === "ArrowUp" && selectedIndex <= 0) {
        setSelectedIndex(lastIndex);
      } else if (e.key === "Enter") {
        const element: ZeroXElement = {
          type: modifier,
          search,
          option,
          children: [
            {
              text: "",
            },
          ],
        };
        if (modifier === "/") {
          insertDataBlock(editor, element, search, true);
        } else {
          insertDataPill(editor, element, search, true);
        }
      }
    },
    document.body
  );

  const theme = useTheme()

  return (
    <List
      sx={{
        left: clientRect.x,
        top: clientRect.y + clientRect.height,
        padding: 0,
        background: theme.palette.background.paper,
        overflow: "auto",
        position: "absolute",
        zIndex: 9,
        borderRadius: theme.spacing(1),
        borderTopLeftRadius: 0,
      }}
    >
      {commands.map((op, index) => (
        <ListItem
          key={op.key}
          tabIndex={0}
          role="button"
          onMouseDown={() => {
            const element: ZeroXElement = {
              type: modifier,
              search,
              option: op,
              children: [
                {
                  text: "",
                },
              ],
            };
            if (modifier === "/") {
              insertDataBlock(editor, element, search, true);
            } else {
              insertDataPill(editor, element, search, true);
            }
          }}
          sx={{
            padding: 0,
            cursor: "pointer",
            "&:hover": {
              background: theme.palette.action.selected,
            },
            borderLeft: `2px solid ${theme.palette.secondary.main}`,
            background:
              index === selectedIndex
                ? theme.palette.action.selected
                : theme.palette.action.hover,
            "&:focus": {
              background: theme.palette.action.selected,
              borderLeft: `2px solid ${theme.palette.secondary.contrastText}`,
              outline: "none",
            },
          }}
        >
          <Box
            sx={{
              padding: theme.spacing(1),
            }}
          >
            <div>{op.key}</div>
            <small>{op.description}</small>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
