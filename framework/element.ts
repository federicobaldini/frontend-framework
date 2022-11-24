type DOMElement = {
  type: string;
  template: string;
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
 * @param tagName
 * @returns DOMElement
 */
const createElement =
  (tagName: string) =>
  (strings: TemplateStringsArray, ...args: Array<String>): DOMElement => ({
    type: tagName,
    template: strings.reduce(
      (accumulator, currentString, index) =>
        accumulator + currentString + (args[index] || ""),
      ""
    ),
  });

export const div = createElement("div");
export const p = createElement("p");
