
/**
 * @typedef {Object} entry
 * @property {string} title - The title of the entry object
 * @property {string} content - The contents of the entry object
 * @property {string} image - The src to an image
 * @property {Number} key
 */

/**
 * @class {addlEntry} 
 *
 * This class represents a single additional text entry
 */
class addlEntry extends HTMLElement{
	constructor() {
		super();
		// templated HTML content
		const template = document.createElement("template");
		// change inner html of template to the correct format
		template.innerHTML = `
			<link rel="stylesheet" href="style/css/textentry.css">
			<div class="tooltip">
				<span class="tooltiptext">Tooltip text</span>
				<svg class="note" width="111" height="137" viewBox="0 0 111 137" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M68.9167 1.41687H15.25C7.84022 1.41687 1.83337 7.42372 1.83337 14.8335V122.167C1.83337 129.577 7.84022 135.584 15.25 135.584H95.75C103.16 135.584 109.167 129.577 109.167 122.167V41.6669L68.9167 1.41687Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M68.9166 1.41687V41.6669H109.167" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M82.3333 75.2086H28.6666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M82.3333 102.042H28.6666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M42.0833 48.3752H35.375H28.6666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				<svg class="image" width="111" height="137" viewBox="0 0 111 137" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M1.125 3.125C1.125 2.02043 2.02043 1.125 3.125 1.125H119.875C120.98 1.125 121.875 2.02043 121.875 3.125V119.875C121.875 120.98 120.98 121.875 119.875 121.875H3.125C2.02043 121.875 1.125 120.98 1.125 119.875V3.125Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M38.0208 48.0834C43.5782 48.0834 48.0833 43.5782 48.0833 38.0209C48.0833 32.4635 43.5782 27.9584 38.0208 27.9584C32.4635 27.9584 27.9583 32.4635 27.9583 38.0209C27.9583 43.5782 32.4635 48.0834 38.0208 48.0834Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M121.875 81.625L88.3333 48.0834L14.5417 121.875" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="entry-data">
				<span class="entry-title">Title</span>
				<span class="entry-content">Enter note...</span>
				<span class="key"></span>
				<span class="entry-img"></span>
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
		let key = this.shadowRoot.querySelector(".key").innerText;
		let currImg = this.shadowRoot.querySelector(".entry-img").innerText;

		if (currImg == "true") {
			return {title: currTitle, content: currContent, key: parseInt(key), image: true};
		}
		return {title: currTitle, content: currContent, key: parseInt(key), image: false};
	} /*get entry*/

	/** Sets the entry attribute of the text-entry component
	 * 
	 * @param entry
	 * 
	 * 
	 * @example newEntry.entry = {title: "myTitle", content: "myContents", key: 3, image: "false"};
	 */
	set entry(entry){
		let currTitle = this.shadowRoot.querySelector(".entry-title");
		let currContent = this.shadowRoot.querySelector(".entry-content");
		let currImg = this.shadowRoot.querySelector(".entry-img");
		let toDisplay = this.shadowRoot.querySelector(".tooltiptext");
		let key = this.shadowRoot.querySelector(".key");
		let imgIcon = this.shadowRoot.querySelector(".image");
		let noteIcon = this.shadowRoot.querySelector(".note");

		//update the title being displayed
		toDisplay.innerText = entry.title;
		//save entry contents
		currTitle.innerHTML = entry.title;
		currContent.innerHTML = entry.content;
		currImg.innerHTML = entry.image;
		key.innerHTML = entry.key;

		if (entry.image == "true") {
			noteIcon.style.display="none";
			imgIcon.style.display="block";
		}
		else {
			imgIcon.style.display="none";
			noteIcon.style.display="block";
		}
	}/*set entry*/	
	
}/*entryBar*/
//define the custom web component "addl-entry" and associate it to the class "addlEntry"
customElements.define("addl-entry", addlEntry);

