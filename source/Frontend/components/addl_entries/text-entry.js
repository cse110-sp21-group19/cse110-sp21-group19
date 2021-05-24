
/**
 * @class {textEntry} 
 *
 * This class represents an additional text entry
 */
 class textEntry extends HTMLElement{
	constructor() {
		super();
	
		// templated HTML content
		const template = document.createElement("template");
		// change inner html of template to the correct format
		template.innerHTML = `
			<link rel="stylesheet" href="style/css/entrybar.css">
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
			`;
	
		// create a shadow root for this web component
		this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
	get title(){
		let currTitle = this.shadowRoot.querySelector(".tooltiptext");
		return currTitle;
	}
	set title(title){
		let currTitle = this.shadowRoot.querySelector(".tooltiptext");
		currTitle.innerText = title;
	}	
}/*entryBar*/
//define the custom web component "entry-bar" and associate it to the class "entryBar"
customElements.define("text-entry", textEntry);

