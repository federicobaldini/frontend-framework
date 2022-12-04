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
