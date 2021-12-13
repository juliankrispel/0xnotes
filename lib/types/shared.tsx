import { EditableProps } from "slate-react/dist/components/editable";

export type SlateProps = {
  editableProps: EditableProps,
  Outside: React.MemoExoticComponent<() => JSX.Element>
}

export type AutocompleteOption = {
  modifier: "@" | "/";
  key: string;
  description: string;
  request?: (props?: { search?: string }) => Promise<unknown>;
};