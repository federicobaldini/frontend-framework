type DOMElement = {
  type: string;
  template: string;
};

export const init = (selector: string, component: DOMElement) => {
  const app = document.querySelector(selector);
  const newElement = document.createElement(component.type);
  const newTextContent = document.createTextNode(component.template);

  newElement.append(newTextContent);
  if (app) {
    app.append(newElement);
  }
};
