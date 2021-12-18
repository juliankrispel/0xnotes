import { Editor, Element, Path, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export function insertDataPill(
  editor: Editor,
  element: Element,
  query: string,
  removeQuery?: boolean,
) {
  if (removeQuery) {
    Transforms.delete(editor, {
      reverse: true,
      distance: query.length + 1,
    });
  }


  Transforms.delete(editor, {
    reverse: true,
    distance: query.length + 1,
  });
  // const st = Editor.string(editor, editor.selection?.anchor.path as Path);
  Transforms.insertNodes(editor, [{ ...element }], { select: true });
  ReactEditor.focus(editor);
}
