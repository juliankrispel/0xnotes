import { useSlateStatic } from "slate-react"
import { useTextSelection } from 'use-text-selection'
import { autocompleteCommand } from "../lib/autocompleteCommand"
import { OptionsList } from "./OptionsList"
import { autocompleteOptions } from "../lib/autocompleteOptions"


export const Autocomplete = () => {
  const { clientRect, isCollapsed } = useTextSelection()
  const editor = useSlateStatic()
  const p = autocompleteCommand(editor)
  // to constrain text selection events to an element
  // just add the element as a an argument like `useTextSelection(myElement)`

  if (clientRect == null || !p.showAutoComplete || !isCollapsed) return null

  const search = p.search.toLowerCase()

  const filteredOptions = autocompleteOptions.filter(
    (v) =>
      p.modifier === v.modifier &&
      (v.description.toLowerCase().includes(search) || v.key.toLowerCase().includes(search))
  );

  return <OptionsList modifier={p.modifier} options={filteredOptions} clientRect={clientRect} search={p.search} />
}
