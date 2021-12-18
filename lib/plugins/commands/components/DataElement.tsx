import { isBigNumberish } from "@ethersproject/bignumber/lib/bignumber";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelected } from "slate-react";
import { ZeroXElement } from "../../../types";
import { Command } from "../../../types/shared";

const DataValue = ({ value }: { value: unknown }): JSX.Element => {
  if (Array.isArray(value)) {
    const keys =
      (value != null && value.length > 0 && Object.keys(value[0])) || [];
    return (
      <Table
        size="small"
        aria-label="Dense table describing object properties"
        sx={{
          width: "100%",
        }}
      >
        <TableHead>
          {keys.map((key, index) => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableHead>

        <TableBody>
          {value.map((val, index) => {
            return (
              <TableRow key={`row-${index}`}>
                {keys.map((k, index) => {
                  return <TableCell key={`cell-${k}`}>{val[k]}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );

  }

  if (value instanceof Date) {
    return <span>{value.toISOString()}</span>;
  }

  if (isBigNumberish(value)) {
    return <span>{value.toString()}</span>;
  }

  if (typeof value === "object" && value != null) {
    return (
      <Table
        size="small"
        aria-label="Dense table describing object properties"
        sx={{
          width: "100%",
        }}
      >
        <TableBody>
          {Object.keys(value).map((key) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>
                <DataValue value={value[key] || ""} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  return <span>{JSON.stringify(value, null, 2)}</span>;
};

export const DataElement = ({
  element,
  commands,
}: {
  element: ZeroXElement;
  commands: Command[];
}) => {
  const optionKey = element.option.key;
  const [value, setState] = useState<unknown>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const option = commands.find((v) => v.key === optionKey);
  const selected = useSelected();
  const theme = useTheme();

  useEffect(() => {
    if (option == null) {
      // do nothing
      return;
    } else if (option.request != null) {
      const run = () => {
        setIsLoading(true);
        option
          .request({ search: element.search })
          .then((val) => {
            if (val == null) {
              setError(`Request invalid for ${optionKey}, ${element.search}`);
            }
            setState(val);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      run();
    }
  }, []);

  if (option == null) {
    console.warn("content unsupported");
    return (
      <Box
        sx={{
          display: "block",
          background: theme.palette.action.disabledBackground,
          maxWidth: `${theme.spacing(110)}`,
          margin: 'auto',
          border: `1px solid ${
            selected ? theme.palette.text.secondary : "transparent"
          }`,
          borderRadius: ".5em",
          fontSize: theme.typography.body2,
        }}
      >
        Content unsupported in this editor.
      </Box>
    );
  }

  const isInline = option.modifier !== "/";

  const sx = {
    display: isInline ? "inline-flex" : "flex",
    background: theme.palette.action.disabledBackground,
    maxWidth: `${theme.spacing(110)}`,
    overflow: 'hidden',
    minWidth: theme.spacing(5),
    margin: "auto",
    marginBottom: theme.spacing(3),
    border: `1px solid ${
      selected ? theme.palette.text.secondary : "transparent"
    }`,
    padding: isInline ? theme.spacing(1, 2) : 0,
    borderRadius: ".5em",
    fontSize: theme.typography.body2,
  };


  if (error != null) {
    return (
      <Box
        sx={{
          ...sx,
          height: "100%",
          minWidth: 100,
          background: theme.palette.error.main,
          padding: isInline ? theme.spacing(1, 2) : theme.spacing(2),
        }}
      >
        {error}
      </Box>
    );
  }


  if (isLoading) {
    return (
      <Box
        sx={{
          ...sx,
          height: "100%",
          minWidth: 100,
          padding: isInline ? theme.spacing(1, 2) : theme.spacing(2),
        }}
      >
        <CircularProgress size={theme.spacing(2)} />
      </Box>
    );
  }

  return (
    <Box sx={sx}>
      {isInline ? (
        <Box
          sx={{
            display: "flex",
            width: "auto",
            alignItems: "end",
          }}
        >
          {optionKey}
        </Box>
      ) : (
        <Box
          sx={{
            width: theme.spacing(4),
            background: theme.palette.action.disabledBackground,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
            }}
          >
            <Box
              sx={{
                textTransform: "uppercase",
                position: "absolute",
                right: 0,
                padding: theme.spacing(0.5, 2),
                transformOrigin: "top right",
                top: 0,
                transform: "rotate(-90deg)",
                color: theme.palette.text.secondary,
              }}
            >
              {optionKey}
            </Box>
          </Box>
        </Box>
      )}
      <Box sx={{
        width: '100%',
        maxHeight: theme.spacing(40),
        overflow: 'auto',
        overflowX: 'auto',
      }}>
        <DataValue value={value} />
      </Box>
    </Box>
  );
};
