import { EditableProps } from "slate-react/dist/components/editable";

export type SlatePluginProps = {
  commands: Command[];
  editableProps: EditableProps;
  Outside: React.MemoExoticComponent<() => JSX.Element>;
};

export type Command = {
  modifier: "@" | "/";
  key: string;
  description: string;
  request?: (props?: { search?: string }) => Promise<unknown>;
};
