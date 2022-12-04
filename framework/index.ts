import { VNode, eventListenersModule } from "snabbdom";
import * as snabbdom from "snabbdom";

type DOMElement = {
  type: string;
  template: VNode;
};

// Snabbdom can now manage each dom operation for me.
const patch = snabbdom.init([eventListenersModule]);

let state = {};

export const init = (selector: string, component: { template: VNode }) => {
  const app: Element | null = document.querySelector(selector);
  if (app) {
    patch(app, component.template);
  }
};

/**
 * createComponent is a curried function.
 * It's a function ({ template, methods = {}, initialState = {} }) => that returns a function props =>.
 *
 * It's a common practice in functional programming to create
 * partial functions that share the same behaviors.
 *
 * For example, our createCompoent doesn't return a component.
 * It returns a component definition. props => is actually the component.
 */
export const createComponent = (properties: {
  template: (properties: {
    [key: string]: any;
    methods: { [key: string]: (newValue: any) => {} };
  }) => DOMElement;
  methods: { [key: string]: (state: {}, newValue: any) => {} };
  initialState: {};
}) => {
  state = properties.initialState;
  let previous: { template: VNode };

  const mappedMethods = (props: { [key: string]: any }) =>
    Object.keys(properties.methods).reduce(
      (accumulator, key) => ({
        ...accumulator,
        [key]: (newValue: any) => {
          state = properties.methods[key](state, newValue);
          const nextNode = properties.template({
            ...props,
            ...state,
            methods: mappedMethods(props),
          });
          patch(previous.template, nextNode.template);
          previous = nextNode; // this prints "Thomas" as firstName :D
          return state;
        },
      }),
      {}
    );

  return (props: { [key: string]: any }) => {
    previous = properties.template({
      ...props,
      ...state,
      methods: mappedMethods(props),
    });
    return previous;
  };
};
