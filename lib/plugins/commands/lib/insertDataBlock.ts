import { Editor, Element, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export function insertDataBlock(
  editor: Editor,
  element: Element,
  query: string,
  removeQuery?: boolean
) {
  if (removeQuery) {
    Transforms.delete(editor, {
      reverse: true,
      distance: query.length + 1,
    });
  }

  Transforms.splitNodes(editor)
  Transforms.insertNodes(editor, [{ ...element }], { select: true });
  ReactEditor.focus(editor);
}
