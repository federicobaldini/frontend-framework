import { createComponent } from "../framework";
import { div } from "../framework/element";
import { onClick } from "../framework/event";

// Initial state of the User component
const initialState = { firstName: "Federico", lastName: "Baldini" };

// State mutating actions
const methods = {
  changeName: (state: object, firstName: string) => ({ ...state, firstName }),
};

// Component template
const template = (props: {
  firstName: string;
  lastName: string;
  methods: { changeName: (arg0: string) => {} };
}) =>
  div`${onClick(() =>
    props.methods.changeName("Matteo")
  )} Hello ${props.firstName} ${props.lastName}`;

export const User = createComponent({ template, methods, initialState });
