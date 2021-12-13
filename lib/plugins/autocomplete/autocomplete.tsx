import React from "react";
import { Autocomplete } from "./components/Autocomplete";
import { SlateComposable } from "../../util/composeSlateProps";
import { SlateProps } from "../../types/shared";
import { DefaultElement } from "slate-react";
import { autocompleteOptions } from "./lib/autocompleteOptions";
import { DataElement } from "./components/DataElement";


export const autocompletePlugin: SlateComposable<SlateProps> = (pluginProps, editor) =>  {
  const { isInline, isVoid } = editor

  editor.isInline = (props) => {
    const option = autocompleteOptions.find((v) => {
      return v.key === props?.option?.key
    });
    return option?.modifier === '@' || isInline(props)
  }

  editor.isVoid = (props) => {
    return typeof props.type !== "undefined" || isVoid(props);
    // const option = autocompleteOptions.find(v => v.key === props.type)
    // return option?.modifier === '/' || isVoid(props)
  }

  return {
    ...pluginProps,
    // eslint-disable-next-line react/display-name
    Outside: React.memo(() => <Autocomplete />),
    editableProps: {
      ...pluginProps.editableProps,
      renderElement: (props) => {
        if (props.element.option && props.element.option != null && props.element.type == '/') {
          return (
            <div {...props.attributes}>
              <span contentEditable={false}>
                <DataElement element={props.element} />
              </span>
              {props.children}
            </div>
          );
        } else if (props.element.type != null) {
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
      }
    }
  }
}