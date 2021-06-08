import { createEntry, deleteEntry, getEntry, updateEntry } from "../../../Backend/api/entries_api.js";
import { binaryToImgUrl, imgToBinary} from "../../scripts/binary-helpers.js"
import { insertTextAtCaret } from "../../scripts/addl-entries-script.js"
//global variable to keep track of whether user is viewing an existing entry or creating a new one
var isViewing = false;
//variable that tracks the key of the entry currently being viewed
var currKey = 0;


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
					<path d="M0 18C0 8.05888 8.05888 0 18 0H43C52.9411 0 61 8.05888 61 18C61 27.9411 52.9411 36 43 36H18C8.05888 36 0 27.9411 0 18Z" fill="#FFA33F"/>
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
							<div class="dropdown-content">
								<span class="create-note">New Note</span>
								<span class="create-img">New Image</span>
							</div>
						</div>
					<div class="content">
					</div>
				</div>
			</div>
			</div>
			<div class="editing">
				<span class="close-edit">&times;</span>
				<h1 class="entry-title" contenteditable="True">Add Title</h1>
				<div class="delete-btn-wrapper">
					<svg class="delete-btn" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="25" cy="25" r="25" fill="#71B637"/>
						<path d="M22.1111 31.2C22.4942 31.2 22.8616 31.0472 23.1325 30.7753C23.4034 30.5034 23.5556 30.1346 23.5556 29.75V21.05C23.5556 20.6654 23.4034 20.2966 23.1325 20.0247C22.8616 19.7528 22.4942 19.6 22.1111 19.6C21.728 19.6 21.3606 19.7528 21.0897 20.0247C20.8188 20.2966 20.6667 20.6654 20.6667 21.05V29.75C20.6667 30.1346 20.8188 30.5034 21.0897 30.7753C21.3606 31.0472 21.728 31.2 22.1111 31.2ZM36.5556 13.8H30.7778V12.35C30.7778 11.1963 30.3212 10.0899 29.5086 9.27409C28.6959 8.4583 27.5937 8 26.4444 8H23.5556C22.4063 8 21.3041 8.4583 20.4914 9.27409C19.6788 10.0899 19.2222 11.1963 19.2222 12.35V13.8H13.4444C13.0614 13.8 12.694 13.9528 12.4231 14.2247C12.1522 14.4966 12 14.8654 12 15.25C12 15.6346 12.1522 16.0034 12.4231 16.2753C12.694 16.5472 13.0614 16.7 13.4444 16.7H14.8889V32.65C14.8889 33.8037 15.3454 34.9101 16.1581 35.7259C16.9708 36.5417 18.073 37 19.2222 37H30.7778C31.927 37 33.0292 36.5417 33.8419 35.7259C34.6546 34.9101 35.1111 33.8037 35.1111 32.65V16.7H36.5556C36.9386 16.7 37.306 16.5472 37.5769 16.2753C37.8478 16.0034 38 15.6346 38 15.25C38 14.8654 37.8478 14.4966 37.5769 14.2247C37.306 13.9528 36.9386 13.8 36.5556 13.8ZM22.1111 12.35C22.1111 11.9654 22.2633 11.5966 22.5342 11.3247C22.8051 11.0528 23.1725 10.9 23.5556 10.9H26.4444C26.8275 10.9 27.1949 11.0528 27.4658 11.3247C27.7367 11.5966 27.8889 11.9654 27.8889 12.35V13.8H22.1111V12.35ZM32.2222 32.65C32.2222 33.0346 32.07 33.4034 31.7992 33.6753C31.5283 33.9472 31.1609 34.1 30.7778 34.1H19.2222C18.8391 34.1 18.4717 33.9472 18.2008 33.6753C17.93 33.4034 17.7778 33.0346 17.7778 32.65V16.7H32.2222V32.65ZM27.8889 31.2C28.272 31.2 28.6394 31.0472 28.9103 30.7753C29.1812 30.5034 29.3333 30.1346 29.3333 29.75V21.05C29.3333 20.6654 29.1812 20.2966 28.9103 20.0247C28.6394 19.7528 28.272 19.6 27.8889 19.6C27.5058 19.6 27.1384 19.7528 26.8675 20.0247C26.5966 20.2966 26.4444 20.6654 26.4444 21.05V29.75C26.4444 30.1346 26.5966 30.5034 26.8675 30.7753C27.1384 31.0472 27.5058 31.2 27.8889 31.2Z" fill="black"/>
					</svg>
				</div>
				<textarea class="text-content" contenteditable="True" placeholder="Add a Note..."></textarea>
				<div class="save-btn-wrapper">
					<svg class="save-btn" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M23.75 26.2507H6.25C4.86929 26.2507 3.75 25.1314 3.75 23.7507V6.25073C3.75 4.87002 4.86929 3.75073 6.25 3.75073H20L26.25 10.0007V23.7507C26.25 25.1314 25.1307 26.2507 23.75 26.2507Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M21.25 26.2507V16.2507H8.75V26.2507" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M8.75 3.75073V10.0007H18.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			</div>
			
			<div class="img-editing">
              <span class="close-edit">&times;</span>
              <h1 class="entry-title" contenteditable="True">Add Title</h1>
              <svg class="delete-btn" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="#71B637"/>
                <path d="M22.1111 31.2C22.4942 31.2 22.8616 31.0472 23.1325 30.7753C23.4034 30.5034 23.5556 30.1346 23.5556 29.75V21.05C23.5556 20.6654 23.4034 20.2966 23.1325 20.0247C22.8616 19.7528 22.4942 19.6 22.1111 19.6C21.728 19.6 21.3606 19.7528 21.0897 20.0247C20.8188 20.2966 20.6667 20.6654 20.6667 21.05V29.75C20.6667 30.1346 20.8188 30.5034 21.0897 30.7753C21.3606 31.0472 21.728 31.2 22.1111 31.2ZM36.5556 13.8H30.7778V12.35C30.7778 11.1963 30.3212 10.0899 29.5086 9.27409C28.6959 8.4583 27.5937 8 26.4444 8H23.5556C22.4063 8 21.3041 8.4583 20.4914 9.27409C19.6788 10.0899 19.2222 11.1963 19.2222 12.35V13.8H13.4444C13.0614 13.8 12.694 13.9528 12.4231 14.2247C12.1522 14.4966 12 14.8654 12 15.25C12 15.6346 12.1522 16.0034 12.4231 16.2753C12.694 16.5472 13.0614 16.7 13.4444 16.7H14.8889V32.65C14.8889 33.8037 15.3454 34.9101 16.1581 35.7259C16.9708 36.5417 18.073 37 19.2222 37H30.7778C31.927 37 33.0292 36.5417 33.8419 35.7259C34.6546 34.9101 35.1111 33.8037 35.1111 32.65V16.7H36.5556C36.9386 16.7 37.306 16.5472 37.5769 16.2753C37.8478 16.0034 38 15.6346 38 15.25C38 14.8654 37.8478 14.4966 37.5769 14.2247C37.306 13.9528 36.9386 13.8 36.5556 13.8ZM22.1111 12.35C22.1111 11.9654 22.2633 11.5966 22.5342 11.3247C22.8051 11.0528 23.1725 10.9 23.5556 10.9H26.4444C26.8275 10.9 27.1949 11.0528 27.4658 11.3247C27.7367 11.5966 27.8889 11.9654 27.8889 12.35V13.8H22.1111V12.35ZM32.2222 32.65C32.2222 33.0346 32.07 33.4034 31.7992 33.6753C31.5283 33.9472 31.1609 34.1 30.7778 34.1H19.2222C18.8391 34.1 18.4717 33.9472 18.2008 33.6753C17.93 33.4034 17.7778 33.0346 17.7778 32.65V16.7H32.2222V32.65ZM27.8889 31.2C28.272 31.2 28.6394 31.0472 28.9103 30.7753C29.1812 30.5034 29.3333 30.1346 29.3333 29.75V21.05C29.3333 20.6654 29.1812 20.2966 28.9103 20.0247C28.6394 19.7528 28.272 19.6 27.8889 19.6C27.5058 19.6 27.1384 19.7528 26.8675 20.0247C26.5966 20.2966 26.4444 20.6654 26.4444 21.05V29.75C26.4444 30.1346 26.5966 30.5034 26.8675 30.7753C27.1384 31.0472 27.5058 31.2 27.8889 31.2Z" fill="black"/>
              </svg>
              <div class="img-content">
			  	<span class="img-text">Click here to upload an image...</span>
                	<img class="uploaded">
                <form class="img-form">
                  <input class="choose-img" type="file" id="img" name="img" accept="image/*">
                </form>
              </div>
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
		let mainText = document.querySelector(".main-text");
		let innerBar = this.shadowRoot.querySelector(".content");
		let title = this.shadowRoot.querySelectorAll(".entry-title")[0];
		let imgTitle = this.shadowRoot.querySelectorAll(".entry-title")[1];
		let content = this.shadowRoot.querySelector(".text-content");
		let imgContent = this.shadowRoot.querySelector(".img-editing > .img-content");
		let uploaded = this.shadowRoot.querySelector(".uploaded");
		let infoText = this.shadowRoot.querySelector(".img-text");

		//different states of entryBar
		let initial = this.shadowRoot.querySelector(".initial");
		let editing = this.shadowRoot.querySelector(".editing");
		let imgEditing = this.shadowRoot.querySelector(".img-editing");
		let imgSelector = this.shadowRoot.querySelector(".choose-img");

		//buttons
		let saveBtn = this.shadowRoot.querySelector(".save-btn");
		let saveBtnImg = this.shadowRoot.querySelectorAll(".save-btn")[1];
		let deleteButton = this.shadowRoot.querySelector(".delete-btn");
		let deleteButtonImg = this.shadowRoot.querySelectorAll(".delete-btn")[1];
		let exitBtnText = this.shadowRoot.querySelectorAll(".close-edit")[0];
		let exitBtnImg = this.shadowRoot.querySelectorAll(".close-edit")[1];

		
		//hide the delete button by default
		deleteButton.style.display="none";
		
		textAreaFeatures(this.shadowRoot);
		//event listener that allows user to upload image
		imgContent.addEventListener("click", function(){
			imgSelector.click();
			if(isViewing){
				infoText.style.display="none";
			}
		});

		//clear cached files
		imgSelector.addEventListener("click", function(){
			if (infoText.style.display="block"){
				imgSelector.value="";
			}
		});

		//preview the image to upload
		imgSelector.addEventListener("change", function(){
			if(this.files[0]){
				infoText.style.display="none";
				uploaded.src = URL.createObjectURL(this.files[0]);
			}
		});

		//event listener that fires everytime the save button is clicked
		saveBtn.addEventListener("click", async function(){
			const DATE = document.querySelector("log-type").readLog.header;
			let entryTitle = title.innerText;
			let entryContent = content.value;
			let newNote = document.createElement("addl-entry");
			//create a new text-entry component with the saved title and contents
			let entry = makeEntry(entryTitle, entryContent, 0, false);
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
				content.value = newNote.entry.content;

				//get the key of the current entry
				currKey = newNote.entry.key;
			});

			//if we are not viewing an existing entry
			
			if(!isViewing){
				//adjust the margin between subsequent entries
				if(innerBar.childElementCount > 0){
					newNote.style.marginLeft = "7rem";
				}
				//append the newly created entry
				let bulletKey = await createEntry({
					date: DATE,
					title: newNote.entry.title,
					content: newNote.entry.content
				});
				newNote.entry = {title: newNote.entry.title, content: newNote.entry.content, key: bulletKey, image: "false"};
				innerBar.appendChild(newNote);
	
				mainText.style.display = "block";
				document.querySelector("entry-bar").type="openbar";	
				title.innerText="Add Title";
				content.value="";
				content.placeholder="Add note here...";
			}
			//if we are viewing an existing entry
			else{
				//find the current entry in the document and update its contents
				for(let i = 0; i < innerBar.childElementCount; ++i){
					let currEntry;
					if(innerBar.children[i].entry.key == currKey){
						currEntry = innerBar.children[i];
						currEntry.entry = makeEntry(entryTitle, entryContent, currKey);
						break;
					} 
				}

				//update DB
				updateEntry(currKey,
					{	date: DATE,
						title: newNote.entry.title,
						content: newNote.entry.content,
					});
				window.alert("Changes saved!");
			}
		
		});

		saveBtnImg.addEventListener("click", async function(){
			const DATE = document.querySelector("log-type").readLog.header;
			let entryTitle = imgTitle.innerText;
			let newNote = document.createElement("addl-entry");
			//create a new text-entry component with the saved title and contents
			let entry = makeEntry(entryTitle, "", 0, true);
			newNote.entry = entry;
			
			//fires everytime the new entry is clicked
			newNote.addEventListener("click", async function(){
				//change the mode to is viewing
				isViewing = true;
				//hide and display relevant components
			
				infoText.style.display="none";
				mainText.style.display="none"
				initial.style.display="none";
				imgEditing.style.display="block";
				deleteButtonImg.style.display="block";

				//display the title and image of the current entry to the screen
				
				imgTitle.innerText = newNote.entry.title;
				
				//get the key of the current entry
				currKey = newNote.entry.key;
				let toUpload = await getEntry(currKey);
				let imgUrl = await binaryToImgUrl(toUpload.image);
				uploaded.src = imgUrl;
			});


			if(!isViewing){
				
				//adjust the margin between subsequent entries
				if(innerBar.childElementCount > 0){
					newNote.style.marginLeft = "7rem";
				}
				//append the newly created entry
				let binImg = await imgToBinary(imgSelector.files[0]);

				let bulletKey = await createEntry({
					date: DATE,
					title: newNote.entry.title,
					image: binImg
				});

				newNote.entry = {title: newNote.entry.title, content: "", key: bulletKey, image: "true"};
				innerBar.appendChild(newNote);

				mainText.style.display = "block";
				imgEditing.style.display = "none";
				document.querySelector("entry-bar").type="openbar";	
				title.innerText="Add Title";
				
			}
			//if we are viewing an existing entry
			else{
				//find the current entry in the document and update its contents
				for(let i = 0; i < innerBar.childElementCount; ++i){
					let currEntry;
					if(innerBar.children[i].entry.key == currKey){
						currEntry = innerBar.children[i];
						currEntry.entry = makeEntry(entryTitle, "", currKey, true);
						break;
					} 
				}

				if (imgSelector.files[0]){	//if a new image has been uploaded
					let binImg = await imgToBinary(imgSelector.files[0]);
					uploaded.src = URL.createObjectURL(imgSelector.files[0]);
					updateEntry(currKey,
						{	date: DATE,
							title: newNote.entry.title,
							image: binImg,
						});
					imgSelector.value="";
				}else{	
					console.log("image has not been changed");
					let toUpload = await getEntry(currKey);
					updateEntry(currKey,
						{	date: DATE,
							title: newNote.entry.title,
							image: toUpload.image,
						});
				}
				
				window.alert("Changes saved!");
			}
		});

		//event listener for deleting an entry
		deleteButton.addEventListener("click", function(){
			deleteNote();
		});

		deleteButtonImg.addEventListener("click", function(){
			deleteImg();
		});
		
		exitBtnText.addEventListener("click", function(){
			//discard changes made to the content displayed in the editing panel
			title.innerText="Add Title";
			content.value="";
			content.placeholder="Add note here..."
			//const DATE = document.querySelector("log-type").readLog.date;
			mainText.style.display = "block";
			editing.style.display="none";
			document.querySelector("entry-bar").type="openbar";
		});
		exitBtnImg.addEventListener("click", function(){
			//discard changes made to the content displayed in the editing panel
			imgTitle.innerText="Add Title";
			content.value="";
			content.placeholder="Add note here..."
			//const DATE = document.querySelector("log-type").readLog.date;
			mainText.style.display = "block";
			imgEditing.style.display="none";
			uploaded.src="";
			infoText.style.display="none";
			document.querySelector("entry-bar").type="openbar";
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
		let editing = this.shadowRoot.querySelector(".editing");
		let imgEditing = this.shadowRoot.querySelector(".img-editing");

		if (initial.style.display == "block" && activeBar.style.display == "none"){
			return "initial";
		}
		if(editing.style.display == "block"){
			return "editing";
		}
		if(imgEditing.style.display == "block"){
			return "img-editing";
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
		setEntrybarType(this.shadowRoot, type, isViewing);
	}

	set mode(mode){
		if(mode=="dark"){
			//expanded bar
			this.shadowRoot.querySelector(".content").style.background="#2A2D32";

			//editing screen for note
			this.shadowRoot.querySelector(".text-content").style.background="#2A2D32";
			this.shadowRoot.querySelector(".text-content").style.color="white";
			this.shadowRoot.querySelector(".entry-title").style.color="white";
			this.shadowRoot.querySelector(".close-edit").style.color="white";

			//editing screen for image
			this.shadowRoot.querySelector(".img-content").style.background="#2A2D32";
			this.shadowRoot.querySelector(".img-text").style.color="white";
			this.shadowRoot.querySelectorAll(".entry-title")[1].style.color="white";
			this.shadowRoot.querySelectorAll(".close-edit")[1].style.color="white";

		}
	}

	/**	Setter that loads the entries to the page, given an array of entries from the database
	 * 
	 * @param {Array.<Object>} entries
	 * 
	 * @example ENTRYBAR.entries = loadedEntries;
	 */
	set entries(entries){
		let mainText = document.querySelector(".main-text");
		let innerBar = this.shadowRoot.querySelector(".content");
		let title = this.shadowRoot.querySelector(".entry-title");
		let content = this.shadowRoot.querySelector(".text-content");

		//different states of entryBar
		let initial = this.shadowRoot.querySelector(".initial");
		let editing = this.shadowRoot.querySelector(".editing");
		let imgEditing = this.shadowRoot.querySelector(".img-editing");
		let imgTitle = this.shadowRoot.querySelectorAll(".entry-title")[1];
		let uploaded = this.shadowRoot.querySelector(".uploaded");
		let infoText = this.shadowRoot.querySelector(".img-text");

		infoText.style.display="none";

		//buttons
		let deleteButton = this.shadowRoot.querySelector(".delete-btn");
		let deleteButtonImg = this.shadowRoot.querySelectorAll(".delete-btn")[1];
		
		while(innerBar.firstChild){
			innerBar.removeChild(innerBar.firstChild);
		}

		entries.forEach(entry => {
			//console.log(entry);
			let newEntry = document.createElement("addl-entry");
			newEntry.entry = entry;
			//console.log(newEntry.entry.image);
			if(newEntry.entry.image){
				newEntry.addEventListener("click", async function(){
					//change the mode to is viewing
					isViewing = true;
					document.querySelector("entry-bar").type = "img-editing";
					//hide and display relevant components
					mainText.style.display="none"
					initial.style.display="none";
					imgEditing.style.display="block";
					deleteButtonImg.style.display="block";
	
					//display the title and image of the current entry to the screen
					
					imgTitle.innerText = newEntry.entry.title;
					
					//get the key of the current entry
					currKey = newEntry.entry.key;
					let toUpload = await getEntry(currKey);
					let imgUrl = await binaryToImgUrl(toUpload.image);
					
					uploaded.src = imgUrl;
				});

			}else{
				newEntry.addEventListener("click", function(){
					//change the mode to is viewing
					isViewing = true;
		
					//hide and display relevant components
					mainText.style.display="none"
					initial.style.display="none";
					editing.style.display="block";
					deleteButton.style.display="block";
		
					//display the title and contents of the current entry to the screen
					title.innerText = newEntry.entry.title;
					content.value = newEntry.entry.content;
		
					//get the key of the current entry
					currKey = newEntry.entry.key;
				});
			}
			if(innerBar.childElementCount > 0){
				newEntry.style.marginLeft = "7rem";
			}
			innerBar.appendChild(newEntry);
		});
		
	}	
}/*entryBar*/

//define the custom web component "entry-bar" and associate it to the class "entryBar"
customElements.define("entry-bar", entryBar);

function setEntrybarType(SHADOW, type) {
	let initial = SHADOW.querySelector(".initial");
	let editing = SHADOW.querySelector(".editing");
	let imgEditing = SHADOW.querySelector(".img-editing");
	let inactiveBar = SHADOW.querySelector(".inactive-bar");
	let activeBar = SHADOW.querySelector(".active-bar");
	let closeBtn = SHADOW.querySelector(".close");
	let newTextEntry = SHADOW.querySelector(".create-note");
	let newImgEntry = SHADOW.querySelector(".create-img");
	let uploaded = SHADOW.querySelector(".uploaded");
	let infoText = SHADOW.querySelector(".img-text");
	let imgContent = SHADOW.querySelector(".img-content");
	let mainText = document.querySelector(".main-text-container");
	let title = SHADOW.querySelectorAll(".entry-title")[0];
	let content = SHADOW.querySelector(".text-content");
	let imgTitle = SHADOW.querySelectorAll(".entry-title")[1];
	let deleteButton = SHADOW.querySelector(".delete-btn");

	imgContent.style.overflow = "hidden";
	
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
		newTextEntry.addEventListener("click", function(){
			//since we are adding a new entry, set the is viewing mode to false
			isViewing = false;
			deleteButton.style.display="none";
			mainText.style.display = "none";
			document.querySelector("entry-bar").type="editing";
		});
		newImgEntry.addEventListener("click", function(){
			//since we are adding a new entry, set the is viewing mode to false
			isViewing = false;
			mainText.style.display = "none";
			document.querySelector("entry-bar").type="img-editing";
		});
	}

	else if(type == "editing"){
		//toggle the relevant elements
		initial.style.display="none";
		editing.style.display="block";
		mainText.style.display="none";
		console.log("reached");
	
		if(isViewing){
			SHADOW.querySelector(".delete-btn").style.display="block";
		}
		//fires when user clicks the exit button in the editing panel
		

	}
	else if(type == "img-editing"){
		//toggle the relevant elements
		uploaded.src="";
		infoText.style.display="block";
		imgContent.style.overflow = "hidden";

		initial.style.display="none";
		imgEditing.style.display="block";
	
		if(isViewing){
			SHADOW.querySelector(".delete-btn").style.display="block";
			infoText.style.display="none";
		}
		//fires when user clicks the exit button in the editing panel
		

	}
	//openbar mode - after user finishes creating/editing an entry, keep the bar open so they can see the changes
	else{
		initial.style.display="block";
		mainText.style.display = "block";
		editing.style.display="none";
		imgEditing.style.display="none";
		inactiveBar.style.display = "none";
		activeBar.style.display="flex";

		title.innerText=" Add Title";
		content.value="";
		content.placeholder="Add note here...";
		imgTitle.innerText="Add Title";
		infoText.style.display="block";
		uploaded.src="";
	}
}

/** Helper function to create a new entry object
 * 
 * @param {string} title 
 * @param {string} content 
 * @param {Number} key
 * @param {boolean} image
 * @return {Object} - Return an object of the form: {title: title, content: content, key: key} 
 * 
 * @example myEntry = createEntry(title, content, key);
 */
function makeEntry(title, content, key, image){
	if(image){
		return {title: title, content: content, key: key, image: "true"};
	}
	return {title: title, content: content, key: key, image: "false"};
}

/** Helper function to delete a text entry
 * 
 * @param {}
 */
function deleteNote() {
	let SHADOW = document.querySelector("entry-bar").shadowRoot;
	let mainText = document.querySelector(".main-text");
	let innerBar = SHADOW.querySelector(".content");
	let title = SHADOW.querySelectorAll(".entry-title")[0];
	let content = SHADOW.querySelector(".text-content");

	let deleteButton = SHADOW.querySelector(".delete-btn");

	//find the current entry in the document
	let response = confirm("Delete this entry?");

	//if user wants to delete the entry, find and delete the entry
	if(response){
		for(let i = 0; i < innerBar.childElementCount; ++i){
			console.log(innerBar.children[i]);
			if(innerBar.children[i].entry.key == currKey){
				let currEntry = innerBar.children[i];
				console.log(currEntry);
				innerBar.removeChild(currEntry)
				break;
			} 
		}

		//delete this entry from the database
		deleteEntry(currKey);

		//adjust the margin of the first entry
		if(innerBar.children[0]){
			innerBar.children[0].style.marginLeft = "1rem";
		}

		//redirect to homepage
		mainText.style.display = "block";
		document.querySelector("entry-bar").type="openbar";

		//hide the delete button and reset the content to display in the editing panel
		deleteButton.style.display="none";
		title.innerText=" Add Title";
		content.value="";
		content.placeholder="Add note here...";
	}
}

/** Helper function to delete an image entry
 * 
 * @param {}
 */
function deleteImg() {
	let SHADOW = document.querySelector("entry-bar").shadowRoot;
	let mainText = document.querySelector(".main-text");
	let innerBar = SHADOW.querySelector(".content");
	let imgTitle = SHADOW.querySelectorAll(".entry-title")[1];
	let uploaded = SHADOW.querySelector(".uploaded");
	let infoText = SHADOW.querySelector(".img-text");
	let deleteButtonImg = SHADOW.querySelectorAll(".delete-btn")[1];
	
	//find the current entry in the document
	let response = confirm("Delete this entry?");

	//if user wants to delete the entry, find and delete the entry
	if(response){
		for(let i = 0; i < innerBar.childElementCount; ++i){
			console.log(innerBar.children[i]);
			if(innerBar.children[i].entry.key == currKey){
				let currEntry = innerBar.children[i];
				console.log(currEntry);
				innerBar.removeChild(currEntry)
				break;
			} 
		}

		//delete this entry from the database
		deleteEntry(currKey);

		//adjust the margin of the first entry
		if(innerBar.children[0]){
			innerBar.children[0].style.marginLeft = "1rem";
		}

		//redirect to homepage
		mainText.style.display = "block";
		document.querySelector("entry-bar").type="openbar";

		//hide the delete button and reset the content to display in the editing panel
		deleteButtonImg.style.display="none";
		imgTitle.innerText="Add Title";
		infoText.style.display="block";
		uploaded.src="";
	}
}

/** Helper function that allows users to add tabs and bullets to text entries
 * @param {Object} SHADOW - the shadowRoot of the entry-bar component
 */
function textAreaFeatures(SHADOW) {
	let content = SHADOW.querySelector(".text-content");
	//allow for tabs
	content.addEventListener("keydown", function(e){
		if(e.key==="Tab"){
			e.preventDefault();
			insertTextAtCaret(content, "\t");
		}
	});
}
