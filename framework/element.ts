// h is commonly used to define virtual nodes. The h means hyperscript
import { h, VNode } from "snabbdom";

// Type alias called DOMElement, which represents a DOM element
type DOMElement = {
  type: string;
  template: VNode;
};

// Type for the different types of arguments that can be passed to a template literal
type LiteralArgument =
  | {
      type: string;
      click: () => void;
    }
  | string;

// Initial state of the reducer function
const initialState: { template: string; on: { click: () => void } } = {
  template: "",
  on: { click: () => {} }, // This initial state property will be helpful to manage event handlers in template literals
};

// Define a function that reduces a template literal to a virtual DOM element
const createReducer =
  (args: Array<LiteralArgument>) =>
  (accumulator: { template: string }, currentString: string, index: number) => {
    const currentArg: LiteralArgument = args[index];

    // If the current argument is an event node, return an object with an event handler
    if (typeof currentArg === "object" && currentArg.type === "event") {
      return { ...accumulator, on: { click: currentArg.click } };
    }

    // Otherwise, append the current string and argument to the template
    return {
      ...accumulator,
      template: accumulator.template + currentString + (args[index] || ""),
    };
  };

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 *
 * Create an element by passing in a tag name
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
 */
const createElement =
  (tagName: string) =>
  (
    strings: TemplateStringsArray,
    ...args: Array<LiteralArgument>
  ): DOMElement => {
    // Reduce the template literal to a virtual DOM element.
    const reducedLiterals = strings.reduce(createReducer(args), initialState);

    // Extract the template and event handler from the reduced template literal
    const template = reducedLiterals.template;
    let on: { click: () => void } = { click: () => {} };
    if ("on" in reducedLiterals) {
      on = reducedLiterals.on;
    }

    // Use the Snabbdom library to create a virtual DOM element with the given tag name, attributes, properties, and event handlers
    return {
      type: "element",
      template: h(tagName, { on }, template), // the second argument concerns attributes, properties and events
    };
  };

export const div = createElement("div");
export const p = createElement("p");
