/**
 * @typedef {Object} entry
 * @property {string} title - The title of the entry object
 * @property {string} content - The contents of the entry object
 */

/**
 * @class {textEntry} 
 *
 * This class represents a single additional text entry
 */
 class textEntry extends HTMLElement{
	constructor() {
		super();
		// templated HTML content
		const template = document.createElement("template");
		// change inner html of template to the correct format
		template.innerHTML = `
			<link rel="stylesheet" href="style/css/textentry.css">
			<div class="tooltip">
				<span class="tooltiptext">Tooltip text</span>
				<svg class="note" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M68.9167 1.4165H15.25C7.84018 1.4165 1.83333 7.42335 1.83333 14.8332V122.167C1.83333 129.576 7.84018 135.583 15.25 135.583H95.75C103.16 135.583 109.167 129.576 109.167 122.167V41.6665L68.9167 1.4165Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M68.9167 1.4165V41.6665H109.167" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M82.3333 75.2085H28.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M82.3333 102.042H28.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M42.0833 48.375H35.375H28.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="entry-data">
				<span class="entry-title">Title</span>
				<span class="entry-content">Enter note...</span>
			</div>		
			`;
	
		// create a shadow root for this web component
		this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
	//connectedCallback fires every time the custom component is created
	connectedCallback(){
		//entry-data only stores the contents of each entry, and is not to be displayed
		this.shadowRoot.querySelector(".entry-data").style.display="none";
	}
	/** Gets the entry attribute of the text-entry component
	 * @param {}
	 *  
	 * @returns {entry} Returns entry object of the form {title: ..., content: ...}
	 * 
	 * @example let entryContents = myEntry.entry;
	 */
	get entry(){
		let currTitle = this.shadowRoot.querySelector(".entry-title").innerText;
		let currContent = this.shadowRoot.querySelector(".entry-content").innerText;
		let toReturn = {title: currTitle, content: currContent};
		return toReturn;
	} /*get entry*/

	/** Sets the entry attribute of the text-entry component
	 * 
	 * @param entry
	 * 
	 * 
	 * @example newEntry.entry = {title: "myTitle", content: "myContents"};
	 */
	set entry(entry){
		let currTitle = this.shadowRoot.querySelector(".entry-title");
		let currContent = this.shadowRoot.querySelector(".entry-content");
		let toDisplay = this.shadowRoot.querySelector(".tooltiptext");
		//update the title being displayed
		toDisplay.innerText = entry.title;
		//save entry contents
		currTitle.innerHTML = entry.title;
		currContent.innerHTML = entry.content;

	}/*set entry*/	
}/*entryBar*/
//define the custom web component "text-entry" and associate it to the class "textEntry"
customElements.define("text-entry", textEntry);

