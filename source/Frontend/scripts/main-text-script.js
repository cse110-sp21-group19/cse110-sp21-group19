// TODO: FIGURE OUT HOW TO DECLARE GLOBAL VARIABLES

// Constants for different bullet types
//  Task Bullets:
const TASKBULLET = `<svg class="task-bullet" id="incomplete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"/></svg>`;
const TASKCOMPLETE = `<svg class="task-bullet" id="complete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"/></svg>`;

// Priority Markers:
const NOTPRIORITY = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>`;
const PRIORITY = `<svg id="priority" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>`;

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

INPUT.addEventListener("keyup", function(event) {
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

		editableEntry(newBullet);
		prioritizeEntry(newBullet);
		completeTask(newBullet);
		deleteEntry(newBullet);
	}
});


/*
* editableEntry
* Allow each bullet entry to be edited on a double click.
* @param {object} - A bullet-entry element
*
* @example
*     editableEntry();
*/
function editableEntry(entry) {
	let bulletEntryRoot = entry.shadowRoot;
	const bulletEntry = bulletEntryRoot.querySelector(".bullet-entry");
	const inputted = bulletEntryRoot.getElementById("bullet-inputted");
	if (inputted) {
		// all to edit on double click
		bulletEntry.addEventListener("dblclick", function() {
			inputted.readOnly = false;
		});
		// after 'Enter' return to 'readOnly' mode
		inputted.addEventListener("keyup", function(event) {
			if (event.key === "Enter") {
				inputted.readOnly = true;
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
	}
} /* editableEntry */

/*
* deleteEntry
* Delete bullet when the 'X' button is clicked.
* @param {}
*
* @example
*     deleteEntry();
*/
function deleteEntry(entry) {
	let bulletEntryRoot = entry.shadowRoot;
	const toDelete = bulletEntryRoot.getElementById("delete-bullet");
	toDelete.addEventListener("click", function() {
		entry.remove();
	});
} /* deleteEntry */

/*
* prioritizeEntry
* Prioritize and deprioritize bullet by toggling the star icon.
* @param {object} - a bullet-type element
*
* @example
*     prioritizeEntry(entry);
*/
function prioritizeEntry(newEntry) {
	let bulletEntryRoot = newEntry.shadowRoot;
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
	});
}  /* prioritizeEntry */

/*
* completeTask
* Check and uncheck task bullet. Adds strikethrough to checked tasks.
* @param {object} - a bullet-type element
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
	// Unnest by one level on backspace
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