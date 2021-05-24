// TODO: FIGURE OUT HOW TO DECLARE GLOBAL VARIABLES

// Constants for different bullet types
//  Note Bullets:
//const NOTEBULLET = "-";
const NOTEBULLET = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>`;
//  Task Bullets:
const TASKBULLET = `<svg class="task-bullet" id="incomplete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"/></svg>`;
const TASKCOMPLETE = `<svg class="task-bullet" id="complete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"/></svg>`;
// TODO: FIX TASK INCOMPLETE TO COMPLETE FUNCTIONALITY
//  Event Bullets:
const EVENTBULLET = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="genderless" class="svg-inline--fa fa-genderless fa-w-9" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill="currentColor" d="M144 176c44.1 0 80 35.9 80 80s-35.9 80-80 80-80-35.9-80-80 35.9-80 80-80m0-64C64.5 112 0 176.5 0 256s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144z"></path></svg>`;

// Priority Markers:
const NOTPRIORITY = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>`;
const PRIORITY = `<svg id="priority" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>`;

// <bullet-select> custom web component
/*
class BulletSelect extends HTMLElement {
	constructor() {
		super();

		// templated HTML content
		const template = document.createElement("template");

		template.innerHTML = `
			<div id="bullet-selector">
				<select id="bullet-type">
					<option value="note" selected>  New Note <h5> - </h5></option> <!-- default is a note bullet-->
					<option value="task"> New Task <h5>&#8226;</h5></option>
					<option value="event"> New Event <h5>&#9900;</h5></option>
				</select>
			</div>
			`;

		// create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		// Apply external styles to the shadow dom
		/*
		const bulletInputStyle = document.createElement('link');
		bulletInputStyle.setAttribute("rel", "stylesheet");
		bulletInputStyle.setAttribute("href", "style/css/bulletselect.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(bulletInputStyle);
		
	}
	// getter
	get entry() {
		return this.getAttribute("value");
	}
  
	// setter
	set entry(value) {
		this.setAttribute("value", value);
	}
}
	
// Define a custom element for the bullet-entry web component   
customElements.define('bullet-select', BulletSelect);
*/

// <bullet-input> custom web component
class BulletInput extends HTMLElement {
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

		// Attach the created elements to the shadow dom
		shadow.appendChild(bulletInputStyle);
		shadow.appendChild(BULLETSELECT);
	}
}
	
// Define a custom element for the bullet-input web component   
customElements.define("bullet-input", BulletInput);


// <bullet-list> custom web component
class BulletList extends HTMLElement {
	constructor() {
		super();

		// templated HTML content
		const template = document.createElement("template");

		template.innerHTML = `
		<style>
			ul {margin: 0}
		</style>
		<ul class="bullet-list" id="bullet-list"></ul>`;
 
		// create a shadow root for this web component
		this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
}

// Define a custom element for the bullet-list web component   
customElements.define("bullet-list", BulletList);


// <bullet-entry> custom web component
class BulletEntry extends HTMLElement {
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
				<div class="bullet-entry">
					<button id="prioritize-bullet" type="button"></button>
					<span id="bullet-type"></span>
					<input id="bullet-inputted" type="text" readonly>
					<button id="delete-bullet" type="button">X</button>
				</div>
				<p id="edit-msg" class="edit-msg"><i>Double click to edit note</i></p>
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

		this.shadowRoot.getElementById("prioritize-bullet").innerHTML = NOTPRIORITY;
		this.shadowRoot.getElementById("bullet-type").innerHTML = NOTEBULLET;
	}
  
	/*
	 * `get` binds a property to a function that will be called when that property is looked up
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
	 */
	get entry() {
		const BULLETTYPEELEM = this.shadowRoot.getElementById("bullet-type").innerHTML;
		let entryObj = {
			"type": BULLETTYPEELEM,
			"date": "", // FIXME
			"content": this.shadowRoot.getElementById("bullet-inputted").value,
			"priority": false,
			"completed": false
		};

		// set priority value
		if (this.shadowRoot.getElementById("prioritize-bullet").innerHTML === PRIORITY) {
			entryObj.priority = true;
		}

		// set completed value
		if (entryObj.type === "task"
			&& BULLETTYPEELEM === TASKCOMPLETE) {
			entryObj.completed = true;
		}

		return entryObj;
	}

	/*
	 * `set` binds an object property to a function to be called when there is an attempt to set that property
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
	 */
	set entry(entry) {
		
		const BULLETTYPEELEM = this.shadowRoot.getElementById("bullet-type");
		let bulletHTML;
		if (entry.type === "note") {
			bulletHTML = NOTEBULLET;
		}
		else if (entry.type === "event") {
			bulletHTML = EVENTBULLET;
		}
		// event
		else {
			if (entry.completed) {
				bulletHTML = TASKCOMPLETE;
			}
			else {
				bulletHTML = TASKBULLET;
			}

		}

		BULLETTYPEELEM.innerHTML = bulletHTML;
		// TODO: do something with entry.date
		this.shadowRoot.getElementById("bullet-inputted").value = entry.content;

		// set priority value
		if (entry.priority === true) {
			this.shadowRoot.getElementById("prioritize-bullet").innerHTML = PRIORITY;
		}
		else {
			this.shadowRoot.getElementById("prioritize-bullet").innerHTML = NOTPRIORITY;
		}

		// set completed value
		/*
		if (entry.type === TASKCOMPLETE && entry.completed === true) {
			BULLETTYPEELEM.options[BULLETTYPEELEM.selectedIndex].innerHTML = TASKCOMPLETE;
		}
		else {
			BULLETTYPEELEM.options[BULLETTYPEELEM.selectedIndex].innerHTML = TASKBULLET;
		}
		*/
	}

}
	
// Define a custom element for the bullet-entry web component   
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
 *   children: [] // json objects (bullet-entries)
 * }
 */