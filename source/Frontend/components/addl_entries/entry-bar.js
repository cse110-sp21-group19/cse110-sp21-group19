import { router } from '../../scripts/addl-router.js';
const setState = router.setState;

/**
 * @class {entryBar} 
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
			<div class="initial">
				<div class="inactive-bar">
					<button id="btn"></button>
				</div>
				<div class="active-bar">
					<span class="close">&times;</span>
						<div class="dropdown">
							<svg class="new-entry" viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M68.9167 1.4165H15.25C7.84017 1.4165 1.83333 7.42335 1.83333 14.8332V122.167C1.83333 129.576 7.84017 135.583 15.25 135.583H95.75C103.16 135.583 109.167 129.576 109.167 122.167V41.6665L68.9167 1.4165Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M68.9167 1.4165V41.6665H109.167" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M55.5 108.75V68.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M35.375 88.625H75.625" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
					<div class="content">
					</div
				</div>
			</div>
			</div>
			<div class="editing">
				<span class="close-edit">&times;</span>
				<h1 class="entry-title" contenteditable="True">Title</h1>
				<ul class="text-content" contenteditable="True">Add a note here...</ul>
				<svg class="save-btn" viewBox="0 0 25 25" fill="green" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M21.75 24.25H4.25C2.86929 24.25 1.75 23.1307 1.75 21.75V4.25C1.75 2.86929 2.86929 1.75 4.25 1.75H18L24.25 8V21.75C24.25 23.1307 23.1307 24.25 21.75 24.25Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M19.25 24.25V14.25H6.75V24.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M6.75 1.75V8H16.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div> 
			`;
	
		// create a shadow root for this web component
		this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
	connectedCallback(){
		let saveBtn = this.shadowRoot.querySelector(".save-btn");
		let innerBar = this.shadowRoot.querySelector(".content");
		let mainText = document.querySelector(".main-text");
		let title = this.shadowRoot.querySelector(".entry-title");
		let content = this.shadowRoot.querySelector(".text-content");
		let initial = this.shadowRoot.querySelector(".initial");
		let editing = this.shadowRoot.querySelector(".editing");
		

		saveBtn.addEventListener("click", function(){
			let entryTitle = title.innerText;
			let entryContent = content.innerText;
			let newNote = document.createElement("text-entry");
			newNote.title = entryTitle;
			
			newNote.addEventListener("click", function(){
				mainText.style.display="none"
				initial.style.display="none";
				editing.style.display="block";
				title.innerText = entryTitle;
				content.innerText = entryContent;
			
			});
			innerBar.appendChild(newNote);
			
			title.innerText="Title";
			content.innerText="Add note here...";
			history.pushState(null, null, "#hasentries");
			setState();
		});
	}
	get type(){
		let initial = this.shadowRoot.querySelector(".initial");
		let activeBar = this.shadowRoot.querySelector(".active-bar");
		if (initial.style.display == "block" && activeBar.style.display == "none"){
			return "initial";
		}
		if(editing.style.display == block){
			return "editing";
		}
		else{
			return "openbar";
		}
	}
	set type(type){
		let initial = this.shadowRoot.querySelector(".initial");
		let editing = this.shadowRoot.querySelector(".editing");
		let inactiveBar = this.shadowRoot.querySelector(".inactive-bar");
		let activeBar = this.shadowRoot.querySelector(".active-bar");
		let closeBtn = this.shadowRoot.querySelector(".close");
		let newEntry = this.shadowRoot.querySelector(".new-entry");
		

		if(type == "initial"){
			initial.style.display="block";
			editing.style.display="none";
			
			activeBar.style.display = "none";
			inactiveBar.style.display = "block";

			inactiveBar.addEventListener("click", function(){
				inactiveBar.style.display = "none";
				activeBar.style.display="flex";
			});
			closeBtn.addEventListener("click", function(){
				activeBar.style.display = "none";
				inactiveBar.style.display = "grid";
			});
			newEntry.addEventListener("click", function(){
				history.pushState(null, null, "#editing");
				setState();
			});

		}
		else if(type == "editing"){
			initial.style.display="none";
			editing.style.display="block";
			let title = this.shadowRoot.querySelector(".entry-title");
			let content = this.shadowRoot.querySelector(".text-content");
			
			let exitBtn = this.shadowRoot.querySelector(".close-edit");
			

			exitBtn.addEventListener("click", function(){
				title.innerText="Title";
				content.innerText="Enter note here..."
				window.location.hash = "";
				history.pushState(null, null, "#hasentries");
				setState();
			});

		}
		else{
			initial.style.display="block";
			editing.style.display="none";
			
			inactiveBar.style.display = "none";
			activeBar.style.display="flex";
		}
	}	
}/*entryBar*/
//define the custom web component "entry-bar" and associate it to the class "entryBar"
customElements.define("entry-bar", entryBar);

window.addEventListener('popstate', () => {
	setState();
});
