import { createComponent } from "../framework";
import { div } from "../framework/element";
import { onClick } from "../framework/event";

// Initial state of the User component
const initialState = { firstName: "Federico", lastName: "Baldini" };

// State mutating actions
const methods = {
  changeName: (state: object, firstName: string) => ({ ...state, firstName }),
};

// Template function that returns a virtual node that represents the component's UI
const template = (properties: {
  [key: string]: any;
  methods: { [key: string]: (newValue: any) => {} };
}) =>
  // Use the div function to create a div element with an onClick event that calls the changeName method of the component's methods.
  div`${onClick(() => properties.methods.changeName("Matteo"))} Hello ${
    properties.firstName
  } ${properties.lastName}, click on me to change my state!`;

// Creating the User component by calling createComponent function
export const User = createComponent({ template, methods, initialState });
