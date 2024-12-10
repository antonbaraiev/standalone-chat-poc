import {DAZN} from "./utils/dazn.ts";

if (!window?.dazn) {
    window.dazn = DAZN;
}

export default {}