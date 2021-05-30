//import { getDailyEntries } from "../../Backend/api/entries_api.js";

// Add additional entries bar web component

const DATE = document.querySelector("log-type").readLog.header;
const ADDLENTRYBAR = document.createElement("entry-bar");
const ADDLENTRIES = document.querySelector(".additional")

ADDLENTRYBAR.type = "initial";
ADDLENTRIES.appendChild(ADDLENTRYBAR);



