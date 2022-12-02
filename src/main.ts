import { init } from "../framework";
import { User } from "./user";

const firstName = "Federico";
const lastName = "Baldini";

console.log({ firstName, lastName });

init("#app", User({ firstName, lastName }));
