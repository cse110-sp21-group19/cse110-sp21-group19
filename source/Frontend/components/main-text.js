// main-text.js
import { NOTEBULLET, TASKBULLET, TASKCOMPLETE, EVENTBULLET, NOTPRIORITY, PRIORITY } from "./icons.js";

/**
 * @typedef {Object} BulletEntryObj
 * @property {string} type - The type of log of the current page.
 * @property {Date} date - The date associated with the bullet.
 * @property {string} content - The bullet text.
 * @property {boolean} priority - If the priority star is set. Defaults to "false".
 * @property {boolean} completed - For task bullets, if the bullet is completed. Defaults to "false".
 * @property {Number} levels - The integer value of the level the bullet is nested.
 * main-text area.
 */

// <bullet-input> custom web component
/** Class representing a bullet input. */
class BulletInput extends HTMLElement {
	/**
     * Create bullet input field.
     */
	constructor() {
		super();

		// templated HTML content
		const template = document.createElement("template");

		template.innerHTML = `
			<div class="new-bullet" id="new-bullet">
				<select id="bullet-type">
					<option value="note" selected>Note <h5> - </h5></option> <!-- default is a note bullet-->
					<option value="task">Task <h5>&#9633;</h5></option>
					<option value="event">Event <h5>&#9675;</h5></option>
				</select>
				<input type="text" id="bullet-input" placeholder="New note...">
			</div>
			`;
		// create bullet selector
		const BULLETSELECT = document.createElement("bullet-select");
 
		// create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		// Apply external styles to the shadow dom
		const bulletInputStyle = document.createElement("link");
		bulletInputStyle.setAttribute("rel", "stylesheet");
		bulletInputStyle.setAttribute("href", "style/css/bulletinput.css");

		// dark mode class
		if (document.body.className == "dark-mode") {
			this.shadowRoot.querySelector(".new-bullet").className += " dark-mode";
		}
 
		// Attach the created elements to the shadow dom
		shadow.appendChild(bulletInputStyle);
		shadow.appendChild(BULLETSELECT);
	} /* constructor */
}
	
customElements.define("bullet-input", BulletInput);


// <bullet-list> custom web component
/** Class representing a bullet list. */
class BulletList extends HTMLElement {
	/**
     * Create bullet list element.
     */
	constructor() {
		super();

		// templated HTML content
		const template = document.createElement("template");

		template.innerHTML = `
		<style>
			ul {margin: 0; padding-left: 2rem}
		</style>
		<ul class="bullet-list" id="bullet-list"></ul>`;

		// create a shadow root for this web component
		this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	} /* constructor */
}

customElements.define("bullet-list", BulletList);


// <bullet-entry> custom web component
/** Class representing a bullet entry. */
class BulletEntry extends HTMLElement {
	/**
     * Create a bullet entry element.
     */
	constructor() {
		super();

		// templated HTML content
		const template = document.createElement("template");
  
		template.innerHTML = `
			<style>
				svg {
					height: 1em;
					width: 1em;
				}
			</style>
			<div class="entry">
				<p id="edit-msg" class="edit-msg"><i>Double click to edit note</i></p>
				<div class="bullet-entry">
					<button id="prioritize-bullet" type="button"></button>
					<span id="bullet-type"></span>
					<input id="bullet-inputted" type="text" readonly>
					<button id="delete-bullet" type="button">X</button>
				</div>
			</div>
			`;
  
		// create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });

		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		// Apply external styles to the shadow dom
		const bulletEntryStyle = document.createElement("link");
		bulletEntryStyle.setAttribute("rel", "stylesheet");
		bulletEntryStyle.setAttribute("href", "style/css/bulletentry.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(bulletEntryStyle);

		// dark mode class
		if (document.body.className == "dark-mode") {
			this.shadowRoot.querySelector(".entry").className += " dark-mode";
		}

		this.shadowRoot.getElementById("prioritize-bullet").innerHTML = NOTPRIORITY;
		this.shadowRoot.getElementById("bullet-type").innerHTML = NOTEBULLET;
	} /* constructor */
  
	/**
	 * get entry
	 * Get a bullet entry.
	 * @param {}
	 * @return {BulletEntryObj} A JS object containing the type, date, content,
	 * priority, and completed information of the bullet.
	 * 
	 * @example
	 *      this.entry
	 */
	get entry() {
		const LOGTYPE = document.querySelector("log-type").readLog;
		
		const BULLETTYPEELEM = this.shadowRoot.getElementById("bullet-type");
		let bulletInfo = this.shadowRoot.getElementById("bullet-type").className.split(" ");
		let bulletType = bulletInfo[0];
		let bulletLevel = parseInt(bulletInfo[1].split("-")[1]);

		let entryObj = {
			"log": LOGTYPE.type,
			"date": LOGTYPE.date,
			"priority": false,
			"content": this.shadowRoot.getElementById("bullet-inputted").value,
			"completed": false,
			"type": bulletType,
			"levels": bulletLevel
		};

		// set priority value
		if (this.shadowRoot.getElementById("prioritize-bullet").innerHTML === PRIORITY) {
			entryObj.priority = true;
		}

		// set completed value
		if (entryObj.type === "task"
			&& !BULLETTYPEELEM.innerHTML.includes("incomplete")) {
			entryObj.completed = true;
		}

		return entryObj;
	} /* get entry */

	/**
	 * set entry
	 * Set or update a bullet entry.
	 * @param {BulletEntryObj} entry - A JS object containing the type, date, 
	 * content, priority, and completed information of the bullet.
	 * 
	 * @example
	 *      this.entry = {
 	 *  				 type: "note",
 	 *  				 date: new Date(),
 	 *  				 content: "foo",
 	 *  				 priority: false,
 	 *  				 completed: false,
 	 *  				 levels: 1
	 * 					}
	 */
	set entry(entry) {
		
		const BULLETTYPEELEM = this.shadowRoot.getElementById("bullet-type");
		let bulletHTML;
		// set bullet type
		if (entry.type === "note") {
			bulletHTML = NOTEBULLET;
			BULLETTYPEELEM.className = "note";
		}
		else if (entry.type === "event") {
			bulletHTML = EVENTBULLET;
			BULLETTYPEELEM.className = "event";
		}
		// task bullet
		else {
			if (entry.completed) {
				bulletHTML = TASKCOMPLETE;
				BULLETTYPEELEM.className = "task";
			}
			else {
				bulletHTML = TASKBULLET;
				BULLETTYPEELEM.className = "task";
			}
		}

		BULLETTYPEELEM.innerHTML = bulletHTML;
		this.shadowRoot.getElementById("bullet-inputted").value = entry.content;

		// set priority value
		if (entry.priority === true) {
			this.shadowRoot.getElementById("prioritize-bullet").innerHTML = PRIORITY;
		}
		else {
			this.shadowRoot.getElementById("prioritize-bullet").innerHTML = NOTPRIORITY;
		}

		// recored nested indentation level
		BULLETTYPEELEM.className += " level-" + entry.levels;
	} /* set entry */

}
	
customElements.define("bullet-entry", BulletEntry);

/**
 * JSON Format:
 * completed will only sometimes be there
 *
 * {
 *   type: "foo", // can be: note, task, event
 *   date: "foo",
 *   content: "foo",
 *   priority: false, // default
 *   completed: false, // default
 *   levels: 1 // integer value
 * }
 */