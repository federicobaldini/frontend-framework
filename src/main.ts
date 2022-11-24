import { init } from "../framework";
import { div } from "../framework/element";

const firstName = "Federico";
const lastName = "Baldini";

init("#app", div`Hello ${firstName} ${lastName}`);