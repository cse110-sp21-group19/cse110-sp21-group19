import { getDailyEntries } from "../../Backend/api/entries_api.js";

// Add additional entries bar web component

const DATE = document.querySelector("log-type").readLog.header;
const ADDLENTRYBAR = document.createElement("entry-bar");
const ADDLENTRIES = document.querySelector(".additional")

let entriesList = await getDailyEntries(DATE);
let keys = entriesList[0];
let fetchedEntries = entriesList[1];

ADDLENTRYBAR.type = "initial";
ADDLENTRYBAR.entries = formatEntries(fetchedEntries, keys);
ADDLENTRIES.appendChild(ADDLENTRYBAR);




export function formatEntries(entries, keys){
	let toReturn = [];
	for (let i = 0; i < entries.length; ++i){
		//console.log(keys[i]);
		let toInsert = {title: entries[i].title, content: entries[i].content, key: Number(keys[i])};
		toReturn.push(toInsert);
	}
	return toReturn;
}

export async function updateAddlEntries() {
	let myDate = document.querySelector("log-type").readLog.header;
	const ADDLENTRYBAR = document.querySelector("entry-bar");

	let entriesList = await getDailyEntries(myDate);
	let keys = entriesList[0];
	let fetchedEntries = entriesList[1];

	//ADDLENTRYBAR.type = "initial";
	ADDLENTRYBAR.entries = formatEntries(fetchedEntries, keys);
}

