import { Box, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelected } from "slate-react";
import { ZeroXElement } from "../../../types";
import { metamaskProvider } from "../../../util/metamaskProvider";
import { LastBlock } from './LastBlock'
import { autocompleteOptions } from "../lib/autocompleteOptions";

export const DataElement = ({ element }: { element: ZeroXElement }) => {
  const optionKey = element.option.key;
  const [value, setState] = useState<any>();
  const option = autocompleteOptions.find((v) => v.key === optionKey);
  const selected = useSelected()
  const theme = useTheme();

  useEffect(() => {
    if (option == null) {
      // do nothing
      return ;
    } else if (option.request != null) {
      const run = () => {
        option.request().then((val) => {
          console.log('what', val)
          setState(val);
        }).catch(err => {
          console.log(err)
        });
      };
      const i = setInterval(run, 5000);
      run();
      return () => {
        clearInterval(i);
      };
    } 
  }, []);

  if (option == null) {
    return <Box
      sx={{
        display: "inline-flex",
        background: theme.palette.action.disabledBackground,
        padding: theme.spacing(.5, 1),
        border: `1px solid ${
          selected ? theme.palette.text.secondary : "transparent"
        }`,
        borderRadius: ".5em",
        fontSize: theme.typography.body2,
      }}
    >
      Invalid
    </Box>
  }

  return (
    <Box
      sx={{
        display: option?.modifier === "/" ? "block" : "inline-flex",
        background: theme.palette.action.disabledBackground,
        padding: theme.spacing(0.5, 1),
        border: `1px solid ${
          selected ? theme.palette.text.secondary : "transparent"
        }`,
        borderRadius: ".5em",
        fontSize: theme.typography.body2,
      }}
    >
      <Box
        sx={{
          padding: theme.spacing(0.3, 0.3),
          color: theme.palette.text.secondary,
        }}
      >
        {optionKey}
      </Box>
      <Box sx={{ padding: theme.spacing(0.3, 0.3) }}>
        {option.key === "lastBlock" ? <LastBlock /> : value}
      </Box>
    </Box>
  );
};
