import { Editor, Element, Transforms } from "slate";
import { emptyElement } from "../../../util/emptyElement";

/**
 * onKeyPress(e: React.KeyboardEvent<HTMLDivElement>, editor: Editor)
 */
 export function onKeyPress(
  e: React.KeyboardEvent<HTMLDivElement>,
  editor: Editor
) {
  /**
   * When enter is pressed and our selection is on a "void node"
   * we insert an empty node below
   */
  if (e.key === "Enter" && editor.selection != null) {
    console.log('enter')
    const [node, path] = Editor.node(editor, editor.selection, {
      depth: 1,
    });
    if (Element.isElement(node) && editor.isVoid(node)) {
      e.preventDefault();
      Transforms.insertNodes(editor, [emptyElement()], {
        select: true,
        /**
         * pressing shiftKey will insert the empty block above
         */
        at: e.shiftKey ? [path[0]] : undefined,
      });
    }
  }
}