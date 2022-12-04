import { createComponent } from "../framework";
import { div } from "../framework/element";
import { onClick } from "../framework/event";

// Initial state of the User component
const initialState = { firstName: "Federico", lastName: "Baldini" };

// State mutating actions
const methods = {
  changeName: (state: object, firstName: string) => ({ ...state, firstName }),
};


/**
 * Component template.
 * 
 * Properties in this case:
 * 
 * properties: {
 *  firstName: string;
 *  lastName: string;
 *  methods: { changeName: (arg0: string) => {} };
 * }
 */
const template = (properties: {
  [key: string]: any;
  methods: { [key: string]: (newValue: any) => {} };
}) =>
  div`${onClick(() => properties.methods.changeName("Matteo"))} Hello ${
    properties.firstName
  } ${properties.lastName}, click on me to change my state!`;

export const User = createComponent({ template, methods, initialState });
