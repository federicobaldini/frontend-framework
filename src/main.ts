import { init } from "../framework";
import { div } from "../framework/element";
import { onClick } from "../framework/event";

const firstName = "Federico";
const lastName = "Baldini";

const user = (firstName: string, lastName: string) =>
  div`${onClick(async () => alert(firstName))} Hello ${firstName} ${lastName}`;

init("#app", user(firstName, lastName));
