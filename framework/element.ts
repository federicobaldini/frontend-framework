// h is commonly used to define virtual nodes. The h means hyperscript.
import { h, VNode } from "snabbdom";

type DOMElement = {
  type: string;
  template: VNode;
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
  (strings: TemplateStringsArray, ...args: Array<String>): DOMElement => ({
    type: "element",
    template: h(
      tagName,
      {},
      strings.reduce(
        (accumulator, currentString, index) =>
          accumulator + currentString + (args[index] || ""),
        ""
      )
    ),
  });

export const div = createElement("div");
export const p = createElement("p");
