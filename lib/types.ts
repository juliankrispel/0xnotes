import { BaseEditor, BaseElement, BaseText } from "slate";
import { HistoryEditor } from "slate-history";
import { BaseProvider } from '@metamask/providers'
import { ReactEditor } from "slate-react";
import { AutocompleteOption } from "./types/shared";

export type ZeroXElement = BaseElement & {
  type?: string;
  search?: string;
  option?: AutocompleteOption;
};

export type ZeroXText = BaseText;
export type ZeroXEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: ZeroXEditor
    Element: ZeroXElement
    Text: ZeroXText
  }
}


declare global {
  interface Window {
      ethereum: BaseProvider;
  }
}

