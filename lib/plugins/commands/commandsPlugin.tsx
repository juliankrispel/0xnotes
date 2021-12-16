import React from "react";
import { Autocomplete } from "./components/Autocomplete";
import { SlateComposable } from "../../util/composeSlateProps";
import { SlateProps } from "../../types/shared";
import { DefaultElement } from "slate-react";
import { commands } from "./lib/commands";
import { DataElement } from "./components/DataElement";
import { metamaskProvider } from "../../util/metamaskProvider";
import { insertDataBlock } from "./lib/insertDataBlock";
import { ZeroXElement } from "../../types";
import { Editor } from "slate";

const transactionRegex = /^0x([A-Fa-f0-9]{64})$/;
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const numberRegex = /^[0-9]+$/;

export const commandsPlugin: SlateComposable<SlateProps> = (pluginProps, editor) =>  {
  const { isInline, isVoid } = editor

  editor.isInline = (props) => {
    const option = commands.find((v) => {
      return v.key === props?.option?.key
    });
    return option?.modifier === '@' || isInline(props)
  }

  return {
    ...pluginProps,
    // eslint-disable-next-line react/display-name
    Outside: React.memo(() => <Autocomplete />),
    editableProps: {
      ...pluginProps.editableProps,
      renderElement: (props) => {
        if (
          props.element.option &&
          props.element.option != null &&
          props.element.type == "/"
        ) {
          return (
            <div {...props.attributes}>
              <span contentEditable={false}>
                <DataElement element={props.element} />
              </span>
              {props.children}
            </div>
          );
        } else if (props.element.type != null && props.element.type === "@") {
          return (
            <span {...props.attributes}>
              <span contentEditable={false}>
                <DataElement element={props.element} />
              </span>
              {props.children}
            </span>
          );
        }

        if (pluginProps.editableProps.renderElement != null) {
          return pluginProps.editableProps.renderElement(props)
        }

        return <DefaultElement {...props} />
      },
      onPaste: (e) => {
        const pastedText = e.clipboardData.getData("text/plain");
        let option

        if (transactionRegex.test(pastedText)) {
          option = commands.find(v => v.key === 'transaction');
        } else if (addressRegex.test(pastedText)) {
          option = commands.find(v => v.key === 'address');
        } else if (numberRegex.test(pastedText)) {
          option = commands.find(v => v.key === 'block');
        }

        if (option != null) {
          const element: ZeroXElement = {
            type: '/',
            search: pastedText,
            option,
            children: [
              {
                text: "",
              },
            ],
          };

          insertDataBlock(editor, element, pastedText);
          e.preventDefault()
        }
      },
    }
  }
}