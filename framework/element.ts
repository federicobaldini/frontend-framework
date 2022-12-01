// h is commonly used to define virtual nodes. The h means hyperscript.
import { h, VNode } from "snabbdom";

type DOMElement = {
  type: string;
  template: VNode;
};

type LiteralArgument =
  | {
      type: string;
      click: () => void;
    }
  | string;

// Extract initial value with a template key, some other will appear next ;)
const initialState: { template: string } = {
  template: "",
};

// Extract this outside the createElement function
const createReducer =
  (args: Array<String>) =>
  (
    accumulator: { template: string },
    currentString: string,
    index: number
  ) => ({
    ...accumulator,
    template: accumulator.template + currentString + (args[index] || ""),
  });

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 *
 * Take this code as example:
 * ```
 *    const firstName = "Federico";
 *    const lastName = "Baldini";
 *    div`Hello ${firstName} ${lastName} !`;
 * ```
 *
 * "tagName" is: "div"
 *
 * "strings" are: [ 'Hello ', ' ', ' !' ]
 *
 * "args" are: [ 'Federico', 'Baldini' ]
 *
 * ___
 *
 * Added a VDOM in the framework so that it will apply DOM modifications only if necessary.
 *
 * The choosen VDOM is snabbdom: https://github.com/snabbdom/snabbdom
 * @param tagName
 * @returns DOMElement
 */
const createElement =
  (tagName: string) =>
  (strings: TemplateStringsArray, ...args: Array<String>): DOMElement => {
    const { template } = strings.reduce(createReducer(args), initialState);
    return {
      type: "element",
      template: h(tagName, {}, template),
    };
  };

export const div = createElement("div");
export const p = createElement("p");
