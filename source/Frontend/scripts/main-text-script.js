// main-text-script.js

// Constants for different bullet types
import { TASKBULLET, TASKCOMPLETE, NOTPRIORITY, PRIORITY } from "../components/main-text.js";
import { getDailyBullets, createBullet, deleteBullet, updateBullet } from "../../Backend/api/bullet_api.js";

/** 
 * editableEntry
 * Allow each bullet entry to be edited on a double click.
 * @param {Number} key - The bullet key returned by the database.
 * @param {object} entry - A bullet-entry element.
 *
 * @example
 *     editableEntry(key, entry);
 */
export function editableEntry(key, entry) {
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
		// after 'Enter' to save the bullet and return to 'readOnly' mode
		inputted.addEventListener("keyup", function(event) {
			if (event.key === "Enter") {
				inputted.readOnly = true;
				hoverMsg.innerHTML = "Double click to edit note";
				// update edited bullet to DB
				updateBullet(key, entry.entry);
			}
		});
	}
} /* editableEntry */

/**
 * deleteEntry
 * Delete bullet when the 'X' button is clicked.
 * @param {Number} key - The bullet key returned by the database.
 * @param {object} entry - The bullet entry to be deleted
 *
 * @example
 *     deleteEntry(entry);
 */
export function deleteEntry(key, entry) {
	let bulletEntryRoot = entry.shadowRoot;
	const toDelete = bulletEntryRoot.getElementById("delete-bullet");
	toDelete.addEventListener("click", function() {
		// remove bullet from main-text area
		entry.remove();
		// remove bullet from database
		deleteBullet(key);
		// TODO: delete all children of a parent bullet
	});
} /* deleteEntry */

/**
 * prioritizeEntry
 * Prioritize and deprioritize bullet by toggling the star icon.
 * @param {Number} key - The bullet key returned by the database.
 * @param {object} entry - A bullet-type element.
 *
 * @example
 *     prioritizeEntry(key, entry);
 */
export function prioritizeEntry(key, entry) {
	let bulletEntryRoot = entry.shadowRoot;
	const toPrioritize = bulletEntryRoot.getElementById("prioritize-bullet");
	toPrioritize.addEventListener("click", function() {
		if (toPrioritize.innerHTML.includes("priority")) {
			toPrioritize.innerHTML = NOTPRIORITY;
			toPrioritize.style.color = "transparent";
		}
		else {
			toPrioritize.innerHTML = PRIORITY;
			toPrioritize.style.color = "black";
		}
		// update prioritized/deprioritized bullet to DB
		updateBullet(key, entry.entry);
	});
}  /* prioritizeEntry */

/**
 * completeTask
 * If the bullet is a task bullet, then if the task is not completed, then 
 * change the task to completed and add a strikethrought to the completed 
 * bullet content. If the task is completed, uncheck the bullet and remove the 
 * strikethrough from the bullet content.
 * @param {Number} key - The bullet key returned by the database.
 * @param {object} entry - a bullet-type element
 *
 * @example
 *     completeTask(key, entry);
 */
export function completeTask(key, entry) {
	let bulletEntryRoot = entry.shadowRoot;
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
		// update completed/incomplete task bullet to DB
		updateBullet(key, entry.entry);
	});
} /* completeTask */

// Create Nested Bullets
/*
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
*/