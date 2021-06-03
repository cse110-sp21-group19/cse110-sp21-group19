import { createEntry, getDailyEntries, getEntry } from "../../Backend/api/entries_api.js";
import {binaryHelper, imgToBinary } from "../scripts/binary-helpers.js"


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
		if(entries[i].image){
			let toInsert = {title: entries[i].title, content: "", key: Number(keys[i])};
			toReturn.push(toInsert);
		}
		else{
			let toInsert = {title: entries[i].title, content: entries[i].content, key: Number(keys[i])};
			toReturn.push(toInsert);
		}
		
	}
	return toReturn;
}

export async function updateAddlEntries() {
	let myDate = document.querySelector("log-type").readLog.header;
	const ADDLENTRYBAR = document.querySelector("entry-bar");

	let entriesList = await getDailyEntries(myDate);
	let keys = entriesList[0];
	let fetchedEntries = entriesList[1];

	ADDLENTRYBAR.entries = formatEntries(fetchedEntries, keys);
}


//  document.querySelector(".img-upload").addEventListener("change", async function(e){
//  	let file = e.target.files[0];
//  	console.log(file);
// 	imgToBinary("Hello!", DATE, file);
// 	let entry = await getEntry(85);
// 	//console.log(entry.image);
// 	document.querySelector("img").src=binaryToImgUrl(entry.image);
//  });

//document.querySelector(".img-editing").style.display="block";
//document.querySelector(".main-text").style.display="none";
//document.querySelector("entry-bar").style.display="none";




