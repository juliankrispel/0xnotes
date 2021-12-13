import { Element } from "slate";

/**
 * Default slate.js empty element
 */
export const emptyElement = (): Element => ({
  children: [
    {
      text: "",
    },
  ],
});