// main-text-script.js

import { TASKBULLET, TASKCOMPLETE, NOTPRIORITY, PRIORITY } from "../components/icons.js";
import { createBullet, deleteBullet, updateBullet, getDailyPriority } from "../../Backend/api/bullet_api.js";

// limit the number of bullets a user can create
const NESTINGLIMIT = 8;

/** 
 * editableEntry
 * Allow each bullet entry to be edited on a double click.
 * @param {object} - A bullet-entry element.
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
	toDelete.addEventListener("click", async function() {
		// remove bullet from main-text area
		entry.remove();
		// remove bullet from database
		deleteBullet(key);

		// updates the weekly nav 
		updateWeeklyNavHelper();
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
	toPrioritize.addEventListener("click", async function() {

		if (toPrioritize.innerHTML.includes("priority")) {
			toPrioritize.innerHTML = NOTPRIORITY;
			toPrioritize.style.color = "transparent";
		}
		else {
			toPrioritize.innerHTML = PRIORITY;
			if (document.body.className === "dark-mode") {
				toPrioritize.style.color = "white";
			}
			else {
				toPrioritize.style.color = "black";
			}
		}
		// update prioritized/deprioritized bullet to DB
		updateBullet(key, entry.entry);

		// updates the weekly nav 
		updateWeeklyNavHelper();
	});
	// update styling to only show priority star if the bullet is prioritized
	if (toPrioritize.innerHTML.includes("priority")) {
		toPrioritize.style.color = "black";
	}
	else {
		toPrioritize.style.color = "transparent";
	}
}  /* prioritizeEntry */

/**
 * completeTask
 * If the bullet is a task bullet, then if the task is not completed, then 
 * change the task to completed and add a strikethrought to the completed 
 * bullet content. If the task is completed, uncheck the bullet and remove the 
 * strikethrough from the bullet content.
 * @param {Number} key - The bullet key returned by the database.
 * @param {object} entry - A bullet-type element.
 *
 * @example
 *     completeTask(key, entry);
 */
export function completeTask(key, entry) {
	let bulletEntryRoot = entry.shadowRoot;
	const toComplete = bulletEntryRoot.getElementById("bullet-type");
	const content = bulletEntryRoot.getElementById("bullet-inputted");
	toComplete.addEventListener("click", async function() {
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
		// updates the weekly nav 
		updateWeeklyNavHelper();
	});

	if (toComplete.innerHTML.includes("incomplete")) {
		content.style.textDecoration = "none";
	}
	else if (toComplete.innerHTML.includes("complete")) {
		content.style.textDecoration = "line-through";
	}
} /* completeTask */

/**
 * createNewBullets
 * Add the ability to add new bullets to the current page.
 * @param {object} inputElement - A bullet-input element.
 * @param {Array} bulletStack - An array, emulating a stack, containing nested 
 * bullet-list sublists elements.
 *
 * @example
 *     createNewBullets(inputElement, bulletElement, bulletStack);
 */
export function createNewBullets(inputElement, bulletStack) {
	inputElement.addEventListener("keyup", async function(event) {
		if (event.key === "Enter") {
			event.preventDefault();

			const BULLETINPUT = inputElement.shadowRoot.getElementById("bullet-input");
			const BULLETTYPE = inputElement.shadowRoot.getElementById("bullet-type");
			// create new entry information on enter
			let entry = {
				"priority": false,
				"content": BULLETINPUT.value,
				"completed": false,
				"type": BULLETTYPE.value,
				"levels": bulletStack.length - 1,
			};

			let newBullet = document.createElement("bullet-entry");
			newBullet.entry = entry;

			// append new bullet entries to main-text element
			const BULLETLIST = bulletStack[bulletStack.length - 1].shadowRoot.getElementById("bullet-list");
			BULLETLIST.appendChild(newBullet);

			// clear INPUT value after enter
			BULLETINPUT.value = "";

			// add new bullet to DB
			let bulletKey = await createBullet(newBullet.entry);

			editableEntry(bulletKey, newBullet);
			prioritizeEntry(bulletKey, newBullet);
			completeTask(bulletKey, newBullet);
			deleteEntry(bulletKey, newBullet);
		}
	});
} /* createNestedBullets */

/**
 * bulletsFromDB
 * Add the ability to get bullets from the database and populate them on the
 * page.
 * @param {object} item - The json information of a bullet element 
 * retrieved from the database.
 * @param {object} index - The index of the current bullet element.
 * @param {Array} bulletStack - An array, emulating a stack, containing nested 
 * bullet-list sublists elements.
 * @param {Array} todayBullets - An array containing an array of the bullet 
 * information and an array containing the keys for each of the bullets.
 *
 * @example
 *     bulletsFromDB(item, index, bulletStack, todayBullets);
 */
export function bulletsFromDB(item, index, bulletStack, todayBullets) {
	// nest existing bullets from the data base
	let prevBullet = todayBullets[1][index-1];
	if (prevBullet) {
		// unnest bullets
		if ((prevBullet.levels > item.levels)) {
			let currLevels = prevBullet.levels;
			while (currLevels > item.levels) {
				unnestBulletHelper(bulletStack);
				currLevels -= 1;
			}
		}
		// nest bullets
		if ((prevBullet.levels < item.levels)) {
			let currLevels = prevBullet.levels;
			while (currLevels < item.levels) {
				nestBulletHelper(bulletStack);
				currLevels += 1;
			}
		}
	}
	// create bullet entry
	let newBullet = document.createElement("bullet-entry");
	newBullet.entry = item;
	const BULLETLIST = bulletStack[bulletStack.length - 1].shadowRoot.getElementById("bullet-list");
	BULLETLIST.appendChild(newBullet);

	let bulletKey = todayBullets[0][index];

	// make bullets from database editable
	editableEntry(bulletKey, newBullet);
	prioritizeEntry(bulletKey, newBullet);
	completeTask(bulletKey, newBullet);
	deleteEntry(bulletKey, newBullet);
} /* bulletsFromDB */

/**
 * nestedBullets
 * Add the ability to create nested bullets on input.
 * @param {object} inputElement - A bullet-input element.
 * @param {object} bulletInput - The input field element in a bullet-input.
 * element
 * @param {Array} bulletStack - An array, emulating a stack, containing nested 
 * bullet-list sublists elements.
 *
 * @example
 *     nestedBullets(inputElement, bulletElement, bulletStack);
 */
export function nestedBullets(inputElement, bulletStack) {

	inputElement.addEventListener("keydown", function (event) {
		// Unnest by one level on shift + tab
		const BULLETINPUT = inputElement.shadowRoot.getElementById("bullet-input");
		if ((event.shiftKey && event.key === "Tab")) {
			event.preventDefault();
			unnestBulletHelper(bulletStack);
			// unindent the input text
			BULLETINPUT.style.paddingLeft = (2 * (bulletStack.length-1) + 0.5)+ "rem";
		}
		// Nest by one level on tab
		else if (event.key === "Tab") {
			// prevent tab key from moving to next button
			this.focus();
			event.preventDefault();
			nestBulletHelper(bulletStack);
			// indent the input text
			BULLETINPUT.style.paddingLeft = (2 * (bulletStack.length-1) + 0.5)+ "rem";
		}
	});
} /* nestedBullets */

/**
 * nestedBulletHelper
 * Helper function to nest bullets by inserting a new bullet-list element as a
 * sublist.
 * @param {Array} bulletStack - An array, emulating a stack, containing nested 
 * bullet-list sublists elements.
 *
 * @example
 *     nestedBulletHelper(bulletStack);
 */
function nestBulletHelper(bulletStack) {
	if (bulletStack.length < NESTINGLIMIT) {
		const NEWSUBLIST = document.createElement("bullet-list");
		let parentBullet = bulletStack[bulletStack.length - 1];
		parentBullet.shadowRoot.getElementById("bullet-list").appendChild(NEWSUBLIST);
		bulletStack.push(NEWSUBLIST);
	}
} /* nestedBulletHelper */

/**
 * unnestedBulletHelper
 * Helper function to unnest bullets by popping the current bullet-list element 
 * as a from the bulletStack.
 * @param {Array} bulletStack - An array, emulating a stack, containing nested 
 * bullet-list sublists elements.
 *
 * @example
 *     unnestedBulletHelper(bulletStack);
 */
function unnestBulletHelper(bulletStack) {
	if (bulletStack.length > 1) {
		let parentBullet = bulletStack[bulletStack.length - 1];
		bulletStack.pop(parentBullet);
		//return parentBullet;
	}
} /* unnestedBulletHelper */

/**
 * updateWeeklyNavHelper
 * Helper function to update weekly nav priority items.
 *
 * @example
 *     updateWeeklyNavHelper();
 */
async function updateWeeklyNavHelper() {
	// updates the weekly nav 
	const WEEKLYNAV = document.querySelector("weekly-nav");
	const logInfo = document.querySelector("log-type").readLog;
	if (logInfo.type === "daily") {
		let bullets =  await getDailyPriority(logInfo.date);
		WEEKLYNAV.updatePriorityBullets = bullets;
	}
} /* updateWeeklyNavHelper */
