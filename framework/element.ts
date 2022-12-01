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

const initialState: { template: string; on: { click: () => void } } = {
  template: "",
  on: { click: () => {} }, // This initial state property will be helpful to manage event handlers in template literals
};

const createReducer =
  (args: Array<LiteralArgument>) =>
  (accumulator: { template: string }, currentString: string, index: number) => {
    const currentArg: LiteralArgument = args[index];

    // Here, it's defined the behavior of an event node and this is where the type is important
    if (typeof currentArg === "object" && currentArg.type === "event") {
      return { ...accumulator, on: { click: currentArg.click } };
    }

    return {
      ...accumulator,
      template: accumulator.template + currentString + (args[index] || ""),
      on: { click: () => {} },
    };
  };

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
