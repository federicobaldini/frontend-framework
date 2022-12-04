import { init } from "../framework";
import { User } from "./user";

const firstName = "Federico";
const lastName = "Baldini";

init("#app", User({ firstName, lastName }));
