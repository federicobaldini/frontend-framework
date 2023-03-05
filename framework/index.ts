import { VNode, eventListenersModule } from "snabbdom";
import * as snabbdom from "snabbdom";

// Type alias called DOMElement, which represents a DOM element
type DOMElement = {
  type: string;
  template: VNode;
};

// Create a patch function that initializes Snabbdom and includes the eventListenersModule
// This allows Snabbdom to manage all DOM events and updates automatically
const patch = snabbdom.init([eventListenersModule]);

// Define an initial state object.
let state = {};

// Define a function called "init" that takes a selector and a component
// The function finds the DOM element using the selector and replaces its contents with the component's template
const init = (selector: string, component: { template: VNode }) => {
  // Find the app element using the selector.
  const app: Element | null = document.querySelector(selector);
  if (app) {
    // Replace the contents of the app element with the component's template.
    patch(app, component.template);
  }
};

/**
 * Define a curried function called "createComponent"
 * It takes an object with three properties: "template", "methods", and "initialState"
 * It returns another function that takes a set of properties
 * This allows us to create partial functions that share the same behavior
 */
const createComponent = (properties: {
  template: (properties: {
    [key: string]: any;
    methods: { [key: string]: (newValue: any) => {} };
  }) => DOMElement;
  methods: { [key: string]: (state: {}, newValue: any) => {} };
  initialState: {};
}) => {
  // Set the initial state of the component
  state = properties.initialState;
  // Keep track of the previous template
  let previous: { template: VNode };

  // Define a function called "mappedMethods" that takes a set of properties
  // This function returns an object that maps each method in "properties.methods" to a new function
  const mappedMethods = (props: { [key: string]: any }) =>
    Object.keys(properties.methods).reduce(
      (accumulator, key) => ({
        ...accumulator,
        [key]: (newValue: any) => {
          // Update the state by calling the corresponding method in "properties.methods"
          state = properties.methods[key](state, newValue);
          // Generate the new template by calling "properties.template" with the current properties, state, and mapped methods
          const nextNode = properties.template({
            ...props,
            ...state,
            methods: mappedMethods(props),
          });
          // Update the DOM by patching the previous template with the new one
          patch(previous.template, nextNode.template);
          // Keep track of the new template
          previous = nextNode;
          return state;
        },
      }),
      {}
    );

  // Return a new function that takes a set of properties
  return (props: { [key: string]: any }) => {
    // Generate the initial template by calling "properties.template" with the current properties, state, and mapped methods
    previous = properties.template({
      ...props,
      ...state,
      methods: mappedMethods(props),
    });
    // Return the initial template
    return previous;
  };
};

export { init, createComponent };
