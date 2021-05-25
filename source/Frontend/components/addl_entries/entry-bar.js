/**
 * @class {Modal} 
 *
 * This class represents additional entries bar at the bottom of the screen
 */
 class entryBar extends HTMLElement{
	constructor() {
		super();
	
		// templated HTML content
		const template = document.createElement("template");
		// change inner html of template to the correct format
		template.innerHTML = `
			<link rel="stylesheet" href="style/css/entrybar.css">
			<div class="inactive-bar">
				<button id="btn"></button>
			</div>
			<div class="active-bar">
				<span class="close">&times;</span>
				<div class="content">
				</div>
			</div> 
			`;
	
		// create a shadow root for this web component
		this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
	/**
	 * connectedCallback executes everytime the corresponding custom element is created
	 */
	connectedCallback(){
		let inactiveBar = this.shadowRoot.querySelector(".inactive-bar");
		let activeBar = this.shadowRoot.querySelector(".active-bar");
		let closeBtn = this.shadowRoot.querySelector(".close");
		activeBar.style.display = "none";

		inactiveBar.addEventListener("click", function(){
			inactiveBar.style.display = "none";
			activeBar.style.display="flex";
		});
		closeBtn.addEventListener("click", function(){
			activeBar.style.display = "none";
			inactiveBar.style.display = "grid";
		});
	}
}/*modal*/
//define the custom web component "entry-bar" and associate it to the class "entryBar"
customElements.define("entry-bar", entryBar);
