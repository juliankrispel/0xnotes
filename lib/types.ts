import { BaseEditor, BaseElement, BaseText } from "slate";
import { HistoryEditor } from "slate-history";
import { BaseProvider } from '@metamask/providers'
import { ReactEditor } from "slate-react";
import { Command } from "./types/shared";
import { TransactionResponse } from "@ethersproject/abstract-provider/src.ts";

type TransactionElement = {
  data: Omit<TransactionResponse, "wait">;
};

export type ZeroXElement = BaseElement & {
  type?: string;
  search?: string;
  option?: Command;
  data?: Omit<TransactionResponse, "wait">;
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

