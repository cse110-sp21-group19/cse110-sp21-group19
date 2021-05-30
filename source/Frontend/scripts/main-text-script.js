// main-text-script.js

// Constants for different bullet types
import { TASKBULLET, TASKCOMPLETE, NOTPRIORITY, PRIORITY } from "../components/main-text.js";
import { createBullet, updateBullet, getDailyPriority } from "../../Backend/api/bullet_api.js";

// BULLET STUFF
// DOM Elements
const MAINTEXT = document.getElementById("main-text");

const BULLETS = document.createElement("bullet-list");
BULLETS.id = "bullets";

const INPUT = document.createElement("bullet-input");
const INPUTROOT = INPUT.shadowRoot;
const BULLETINPUT = INPUTROOT.getElementById("bullet-input");

const BULLETTYPE = INPUTROOT.getElementById("bullet-type");

// Bullet Nesting Stack
let bulletStack = [];
bulletStack.push(BULLETS);

MAINTEXT.appendChild(BULLETS);
MAINTEXT.appendChild(INPUT);


const MAINTEXTHEADER = document.querySelector("#date > h1");

INPUT.addEventListener("keyup", async function(event) {
	if (event.key === "Enter") {
		event.preventDefault();

		let entry = {
			"type": BULLETTYPE.value,
			"date": new Date(Date.now()),
			"content": BULLETINPUT.value,
			"priority": false,
			"completed": false
		};

		let newBullet = document.createElement("bullet-entry");
		newBullet.entry = entry;

		// append new bullet entries to main-text element
		const BULLETLIST = bulletStack[bulletStack.length - 1].shadowRoot.getElementById("bullet-list");
		BULLETLIST.appendChild(newBullet);

		// clear INPUT value after enter
		BULLETINPUT.value = "";

		// TODO: add new bullet to DB
		let bulletKey = await createBullet(newBullet.entry);

		editableEntry(bulletKey, newBullet);
		prioritizeEntry(bulletKey, newBullet);
		completeTask(newBullet);
		deleteEntry(newBullet);

		
	}
});


/** 
 * editableEntry
 * Allow each bullet entry to be edited on a double click.
 * @param {Number} key - The bullet key returned by the database.
 * @param {object} entry - A bullet-entry element.
 *
 * @example
 *     editableEntry();
 */
function editableEntry(key, entry) {
	let bulletEntryRoot = entry.shadowRoot;
	const bulletEntry = bulletEntryRoot.querySelector(".bullet-entry");
	const inputted = bulletEntryRoot.getElementById("bullet-inputted");
	const hoverMsg = bulletEntryRoot.getElementById("edit-msg");
	if (inputted) {
		// all to edit on double click
		bulletEntry.addEventListener("dblclick", function() {
			inputted.readOnly = false;
			hoverMsg.innerHTML = "Enter to save note";
		});
		// after 'Enter' return to 'readOnly' mode
		inputted.addEventListener("keyup", function(event) {
			if (event.key === "Enter") {
				inputted.readOnly = true;
				hoverMsg.innerHTML = "Double click to edit note";
				updateBullet(key, entry.entry);
			}
		});
		// TODO: after click away from entry, return to 'readyOnly' mode
		/*
        document.addEventListener('click', function(event) {
            var isClickInside = inputted.contains(event.target);
            if (!isClickInside) {
                inputted.readOnly = true;
            }
        });
        */

		// TODO: update edited bullet to DB
		//console.log(entry);
	}
} /* editableEntry */

/**
 * deleteEntry
 * Delete bullet when the 'X' button is clicked.
 * @param {object} entry - The bullet entry to be deleted
 *
 * @example
 *     deleteEntry(entry);
 */
function deleteEntry(entry) {
	let bulletEntryRoot = entry.shadowRoot;
	const toDelete = bulletEntryRoot.getElementById("delete-bullet");
	toDelete.addEventListener("click", function() {
		entry.remove();
	});
} /* deleteEntry */

/**
 * prioritizeEntry
 * Prioritize and deprioritize bullet by toggling the star icon.
 * @param {Number} key - The bullet key returned by the database.
 * @param {object} newEntry - A bullet-type element.
 *
 * @example
 *     prioritizeEntry(entry);
 */
function prioritizeEntry(key, newEntry) {
	let bulletEntryRoot = newEntry.shadowRoot;
	const toPrioritize = bulletEntryRoot.getElementById("prioritize-bullet");
	toPrioritize.addEventListener("click", async function() {
		if (toPrioritize.innerHTML.includes("priority")) {
			toPrioritize.innerHTML = NOTPRIORITY;
			toPrioritize.style.color = "transparent";
		}
		else {
			toPrioritize.innerHTML = PRIORITY;
			toPrioritize.style.color = "black";
		}
		updateBullet(key, newEntry.entry);
		const WEEKLYNAV = document.querySelector("weekly-nav");
		const currDate = document.querySelector("log-type").readLog.date;
		let bullets =  await getDailyPriority(currDate);
		WEEKLYNAV.updatePriorityBullets = bullets;
	});
}  /* prioritizeEntry */

/**
 * completeTask
 * If the bullet is a task bullet, then if the task is not completed, then 
 * change the task to completed and add a strikethrought to the completed 
 * bullet content. If the task is completed, uncheck the bullet and remove the 
 * strikethrough from the bullet content.
 * @param {object} newEntry - a bullet-type element
 *
 * @example
 *     completeTask(entry);
 */
function completeTask(newEntry) {
	let bulletEntryRoot = newEntry.shadowRoot;
	const toComplete = bulletEntryRoot.getElementById("bullet-type");
	const content = bulletEntryRoot.getElementById("bullet-inputted");
	toComplete.addEventListener("click", function() {
		if (toComplete.innerHTML.includes("incomplete")) {
			toComplete.innerHTML = TASKCOMPLETE;
			content.style.textDecoration = "line-through";
		}
		else if (toComplete.innerHTML.includes("complete")) {
			toComplete.innerHTML = TASKBULLET;
			content.style.textDecoration = "none";
		}
	});
} /* completeTask */

// Create Nested Bullets
INPUT.addEventListener("keydown", function(event) {
	// FIXME: Backspace doesn't work yet, will prevent backspace behavior all together
	// Unnest by one level on shift + tab
	if ((event.shiftKey && event.key === "Tab")) {
		event.preventDefault();
		if (bulletStack.length > 1) {
			bulletStack.pop(bulletStack[bulletStack.length - 1]);
			// unindent the input text
			BULLETINPUT.style.paddingLeft = (40 * (bulletStack.length-1) + 8)+ "px";
		}
	}
	// Nest by one level on tab
	else if (event.key === "Tab") {
		// prevent tab key from moving to next button
		this.focus();
		event.preventDefault();
		const newSublist = document.createElement("bullet-list");
		bulletStack[bulletStack.length - 1].shadowRoot.getElementById("bullet-list").appendChild(newSublist);
		bulletStack.push(newSublist);
		// indent the input text
		BULLETINPUT.style.paddingLeft = (40 * (bulletStack.length-1) + 8)+ "px";
	}
});
