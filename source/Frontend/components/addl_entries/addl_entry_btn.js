/**
 * @class {addlEntries} additional entries button
 *
 * This class represents the addl entries button web component
 */
class addlEntries extends HTMLElement{
	constructor() {
		super();
	
		// templated HTML content
		const template = document.createElement("template");
		// change inner html of template to the correct format
		template.innerHTML = `
			<link rel="stylesheet" href="style/css/addl_entry_btn.css">
			<div class="addl-entries-btn">
				<button id="btn" class="plus-button"></button>
				<p id="btn-text">Additional entry/element</p>
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
		//select the button from the shadow DOM
		let newModalBtn = this.shadowRoot.getElementById("btn");

		/**
		 * event listener for when the user clicks on the "add additional entries" button
		 */
		newModalBtn.addEventListener("click", function() {
			if(document.querySelector(".saved_entries").childElementCount != 3){
				let parentContainer = document.getElementById("additional");
				let newModal = document.createElement("addl-modal");
				//if a newModal already exists
				if(parentContainer.childElementCount == 3){
					//remove the existing one
					parentContainer.removeChild(document.getElementsByTagName("addl-modal")[0]); 
					//and append a new one
					document.getElementById("additional").appendChild(newModal);
				}
				else{
					//otherwise, append a new modal
					document.getElementById("additional").appendChild(newModal);
				}
			}
		}); /* event listener*/
	} /* connectedCallback */
} /* addlEntries */
//define the custom web component "addl-entrybtn" and associate it to the class "addlEntries
customElements.define("addl-entrybtn", addlEntries);