//import additional entries router
import { router } from "../../scripts/router.js";
const setState = router.setState;
//global variable to keep track of whether user is viewing an existing entry or creating a new one
var isViewing = false;

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
			<link rel="stylesheet" href="style/css/textentry.css">
			<div class="initial">
				<div class="inactive-bar">
				<svg id="btn" width="61" height="36" viewBox="0 0 61 36" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 18C0 8.05888 8.05888 0 18 0H43C52.9411 0 61 8.05888 61 18C61 27.9411 52.9411 36 43 36H18C8.05888 36 0 27.9411 0 18Z" fill="#a1b3a1"/>
					<path d="M21.06 22.304C20.0214 22.304 19.1474 21.9493 18.438 21.24C17.7287 20.5307 17.374 19.644 17.374 18.58C17.374 17.4907 17.7287 16.6167 18.438 15.958C19.1474 15.274 20.0214 14.932 21.06 14.932C22.0987 14.932 22.9727 15.274 23.682 15.958C24.3914 16.6167 24.746 17.4907 24.746 18.58C24.746 19.644 24.3914 20.5307 23.682 21.24C22.9727 21.9493 22.0987 22.304 21.06 22.304ZM31.0053 22.304C29.9667 22.304 29.0927 21.9493 28.3833 21.24C27.674 20.5307 27.3193 19.644 27.3193 18.58C27.3193 17.4907 27.674 16.6167 28.3833 15.958C29.0927 15.274 29.9667 14.932 31.0053 14.932C32.044 14.932 32.918 15.274 33.6273 15.958C34.3367 16.6167 34.6913 17.4907 34.6913 18.58C34.6913 19.644 34.3367 20.5307 33.6273 21.24C32.918 21.9493 32.044 22.304 31.0053 22.304ZM40.9507 22.304C39.912 22.304 39.038 21.9493 38.3287 21.24C37.6193 20.5307 37.2647 19.644 37.2647 18.58C37.2647 17.4907 37.6193 16.6167 38.3287 15.958C39.038 15.274 39.912 14.932 40.9507 14.932C41.9893 14.932 42.8633 15.274 43.5727 15.958C44.282 16.6167 44.6367 17.4907 44.6367 18.58C44.6367 19.644 44.282 20.5307 43.5727 21.24C42.8633 21.9493 41.9893 22.304 40.9507 22.304Z" fill="white"/>
				</svg>
				
				</div>
				<div class="active-bar">
					<span class="close">&times;</span>
						<div class="dropdown">
							<svg class="new-entry" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
				<h1 class="entry-title" contenteditable="True">Add Title</h1>
				<svg class="delete-btn" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="25" cy="25" r="25" fill="#a1b3a1"/>
					<path d="M22.1111 31.2C22.4942 31.2 22.8616 31.0472 23.1325 30.7753C23.4034 30.5034 23.5556 30.1346 23.5556 29.75V21.05C23.5556 20.6654 23.4034 20.2966 23.1325 20.0247C22.8616 19.7528 22.4942 19.6 22.1111 19.6C21.728 19.6 21.3606 19.7528 21.0897 20.0247C20.8188 20.2966 20.6667 20.6654 20.6667 21.05V29.75C20.6667 30.1346 20.8188 30.5034 21.0897 30.7753C21.3606 31.0472 21.728 31.2 22.1111 31.2ZM36.5556 13.8H30.7778V12.35C30.7778 11.1963 30.3212 10.0899 29.5086 9.27409C28.6959 8.4583 27.5937 8 26.4444 8H23.5556C22.4063 8 21.3041 8.4583 20.4914 9.27409C19.6788 10.0899 19.2222 11.1963 19.2222 12.35V13.8H13.4444C13.0614 13.8 12.694 13.9528 12.4231 14.2247C12.1522 14.4966 12 14.8654 12 15.25C12 15.6346 12.1522 16.0034 12.4231 16.2753C12.694 16.5472 13.0614 16.7 13.4444 16.7H14.8889V32.65C14.8889 33.8037 15.3454 34.9101 16.1581 35.7259C16.9708 36.5417 18.073 37 19.2222 37H30.7778C31.927 37 33.0292 36.5417 33.8419 35.7259C34.6546 34.9101 35.1111 33.8037 35.1111 32.65V16.7H36.5556C36.9386 16.7 37.306 16.5472 37.5769 16.2753C37.8478 16.0034 38 15.6346 38 15.25C38 14.8654 37.8478 14.4966 37.5769 14.2247C37.306 13.9528 36.9386 13.8 36.5556 13.8ZM22.1111 12.35C22.1111 11.9654 22.2633 11.5966 22.5342 11.3247C22.8051 11.0528 23.1725 10.9 23.5556 10.9H26.4444C26.8275 10.9 27.1949 11.0528 27.4658 11.3247C27.7367 11.5966 27.8889 11.9654 27.8889 12.35V13.8H22.1111V12.35ZM32.2222 32.65C32.2222 33.0346 32.07 33.4034 31.7992 33.6753C31.5283 33.9472 31.1609 34.1 30.7778 34.1H19.2222C18.8391 34.1 18.4717 33.9472 18.2008 33.6753C17.93 33.4034 17.7778 33.0346 17.7778 32.65V16.7H32.2222V32.65ZM27.8889 31.2C28.272 31.2 28.6394 31.0472 28.9103 30.7753C29.1812 30.5034 29.3333 30.1346 29.3333 29.75V21.05C29.3333 20.6654 29.1812 20.2966 28.9103 20.0247C28.6394 19.7528 28.272 19.6 27.8889 19.6C27.5058 19.6 27.1384 19.7528 26.8675 20.0247C26.5966 20.2966 26.4444 20.6654 26.4444 21.05V29.75C26.4444 30.1346 26.5966 30.5034 26.8675 30.7753C27.1384 31.0472 27.5058 31.2 27.8889 31.2Z" fill="black"/>
				</svg>
				<ul class="text-content" contenteditable="True">Add a Note...</ul>
				<div class="save-btn-wrapper">
					<svg class="save-btn" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M23.75 26.2507H6.25C4.86929 26.2507 3.75 25.1314 3.75 23.7507V6.25073C3.75 4.87002 4.86929 3.75073 6.25 3.75073H20L26.25 10.0007V23.7507C26.25 25.1314 25.1307 26.2507 23.75 26.2507Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M21.25 26.2507V16.2507H8.75V26.2507" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M8.75 3.75073V10.0007H18.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			</div> 
			`;
	
		// create a shadow root for this web component
		this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}
	/** connectedCallback runs everytime a new entry-bar component is created
	 * @param {}
	 */
	connectedCallback(){
		let innerBar = this.shadowRoot.querySelector(".content");
		let mainText = document.querySelector(".main-text");
		let title = this.shadowRoot.querySelector(".entry-title");
		let content = this.shadowRoot.querySelector(".text-content");
		//different states of entryBar
		let initial = this.shadowRoot.querySelector(".initial");
		let editing = this.shadowRoot.querySelector(".editing");
		//buttons
		let saveBtn = this.shadowRoot.querySelector(".save-btn");
		let deleteButton = this.shadowRoot.querySelector(".delete-btn");
		//variable that tracks the index of the entry currently being viewed
		let entryIndex = 0;
		//hide the delete button by default
		deleteButton.style.display="none";
		//event listener that fires everytime the save button is clicked
		saveBtn.addEventListener("click", function(){
			let entryTitle = title.innerText;
			let entryContent = content.innerText;
			let newNote = document.createElement("text-entry");
			//create a new text-entry component with the saved title and contents
			let entry = createEntry(entryTitle, entryContent);
			newNote.entry = entry;
			//fires everytime the new entry is clicked
			newNote.addEventListener("click", function(){
				//change the mode to is viewing
				isViewing = true;
				//hide and display relevant components
				mainText.style.display="none";
				initial.style.display="none";
				editing.style.display="block";
				deleteButton.style.display="block";
				//display the title and contents of the current entry to the screen
				title.innerText = newNote.entry.title;
				content.innerText = newNote.entry.content;
				//get the index of the current entry
				for(let i = 0; i < innerBar.childElementCount; ++i){
					if(innerBar.children[i].entry.title == newNote.entry.title && innerBar.children[i].entry.content == newNote.entry.content){
						entryIndex = i;
						break;
					}
				}
			});
			//if we are not viewing an existing entry
			if(!isViewing){
				//adjust the margin between subsequent entries
				if(innerBar.childElementCount > 0){
					newNote.style.marginLeft = "7rem";
				}
				//append the newly created entry
				innerBar.appendChild(newNote);
				//set the state to redirect back to homepage
				const DATE = document.querySelector("log-type").readLog.date;
				setState("viewing-addl-entries", false, DATE);	
				title.innerText="Add Title";
				content.innerText="Add note here...";
			}
			//if we are viewing an existing entry
			else{
				//find the current entry in the document	
				let currEntry = innerBar.children[entryIndex];
				//update its title and content
				currEntry.entry = {title: entryTitle, content: entryContent};
				window.alert("Changes saved!");
			}
		
		});
		deleteButton.addEventListener("click", function(){
			//find the current entry in the document
			let toDelete = innerBar.children[entryIndex];
			let response = confirm("Delete this entry?");
			//if user wants to delete the entry
			if(response){
				//delete it
				innerBar.removeChild(toDelete);
				//adjust the margin of the first entry
				if(innerBar.children[0]){
					innerBar.children[0].style.marginLeft = "1rem";
				}
				//set the state and redirect to homepage
				const DATE = document.querySelector("log-type").readLog.date;
				setState("viewing-addl-entries", false, DATE);
				//hide the delete button and reset the content to display in the editing panel
				deleteButton.style.display="none";
				title.innerText=" Add Title";
				content.innerText="Add note here...";
			}
			
		});
	}
	/**
	 * @param {}
	 * 
	 * @returns {string}
	 * 
	 * @example let type = entryBar.type;
	 */
	get type(){
		let initial = this.shadowRoot.querySelector(".initial");
		let activeBar = this.shadowRoot.querySelector(".active-bar");
		//Cory - I added this to fix the linting, not sure if its needed
		let editing = this.shadowRoot.querySelector(".editing");
		if (initial.style.display == "block" && activeBar.style.display == "none"){
			return "initial";
		}
		if(editing.style.display == "block"){
			return "editing";
		}
		else{
			return "openbar";
		}
	}
	/**	Set the 'type' attribute of the entry bar which determines what content to hide/display
	 * @param {string}
	 * 
	 * @example entryBar.type = "initial";
	 */
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
			//fires when user clicks on collapsed version of the entry bar
			inactiveBar.addEventListener("click", function(){
				inactiveBar.style.display = "none";
				activeBar.style.display="flex";
			});
			//fires when user clicks on the close button to collapse the entry bar
			closeBtn.addEventListener("click", function(){
				activeBar.style.display = "none";
				inactiveBar.style.display = "grid";
			});
			//fires when user clicks the button to add a new entry
			newEntry.addEventListener("click", function(){
				//since we are adding a new entry, set the is viewing mode to false
				isViewing = false;
				const DATE = document.querySelector("log-type").readLog.date;
				setState("new-addl-entry", false, DATE);
			});

		}
		else if(type == "editing"){
			//toggle the relevant elements
			initial.style.display="none";
			editing.style.display="block";
			let title = this.shadowRoot.querySelector(".entry-title");
			let content = this.shadowRoot.querySelector(".text-content");
			
			let exitBtn = this.shadowRoot.querySelector(".close-edit");

			if(isViewing){
				this.shadowRoot.querySelector(".delete-btn").style.display="block";
			}
			//fires when user clicks the exit button in the editing panel
			exitBtn.addEventListener("click", function(){
				//discard changes made to the content displayed in the editing panel
				title.innerText="Add Title";
				content.innerText="Add note here...";
				window.location.hash = "";
				const DATE = document.querySelector("log-type").readLog.date;
				setState("viewing-addl-entries", false, DATE);
			});

		}
		//openbar mode - after user finishes creating/editing an entry, keep the bar open so they can see the changes
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

/** Helper function to create a new entry obejct
 * 
 * @param {string} title 
 * @param {string} content 
 * @return {Object} - Return an object of the form: {title: title, content: content} 
 * 
 * @example myEntry = createEntry(title, content);
 */
function createEntry(title, content){
	return {title: title, content: content};
}