import { Editor } from "slate";
import { ReactEditor } from "slate-react";
import { ZeroXEditor } from "../types";

export type SlateComposable<T> = (props: T, editor: Editor) => T;

export const composeSlateProps = <T extends unknown> (
  composables: SlateComposable<T>[],
  editor: Editor,
  initialProps: T
): T => {
  let props = initialProps
  for (const composable of composables) {
    console.log(composable)
    props = composable(props, editor);
  }
  return props;
};
