/**
 * @class {Modal} 
 *
 * This class represents the modal (popup prompts) web component
 */
class modal extends HTMLElement{
	constructor() {
		super();
	
		// templated HTML content
		const template = document.createElement("template");
		// change inner html of template to the correct format
		template.innerHTML = `
			<link rel="stylesheet" href="style/css/modals.css">
			<div id="new-entry-modal" class="new-entry-modal">
				<!-- Modal content -->
				<div class="modal-content">
					<span class="close">&times;</span>
					<h1>Additional Entry</h1>
					<div class="options">
					<p id="note">Blank Note</p>
					<p id = "media">Upload Media</p>
					</div>
				</div>
			</div>

			<div id="text-modal" class="text-modal">
				<!-- Modal content -->
				<div class="text-modal-content">
					<h1 contenteditable="true">Title</h1>
					<div class="elements">
					<ul id="text-area" contenteditable="true">
					</ul>
					</div>
					<div class="text-options">
					<p id="save">Save</p>
					<p id="cancel">Cancel</p>
					</div>
				</div>
				</div>

				<div id="pic-modal" class="pic-modal">
				  <!-- Modal content -->

				  <div class="pic-modal-content">
					<p id="img-save">Save</p>
					<form id="img-form">
						<label for="img">Select image:</label>
						<input type="file" id="img" name="img" accept="image/*">
					</form>
					<p id="img-cancel">Cancel</p>
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
		//select the modals
		let newModal = this.shadowRoot.getElementById("new-entry-modal");
		let textModal = this.shadowRoot.getElementById("text-modal");
		let imgModal = this.shadowRoot.getElementById("pic-modal");
		//select the options for adding text/media
		let addTextEntry = this.shadowRoot.getElementById("note");
		let addImgEntry = this.shadowRoot.getElementById("media");
		let textArea = this.shadowRoot.getElementById("text-area");
		let saveButton = this.shadowRoot.getElementById("save");
		let cancelButton = this.shadowRoot.getElementById("cancel");
		let input = this.shadowRoot.getElementById("img");
		let exitBtn = this.shadowRoot.querySelector(".close");
		let imgSave = this.shadowRoot.getElementById("img-save");
		let imgCancel = this.shadowRoot.getElementById("img-cancel");
		let myImg = new Image();

		newModal.style.display = "block";

		exitBtn.addEventListener("click", function() {
			newModal.style.display = "none";
		});

		addTextEntry.addEventListener("click", function() {
			textArea.addEventListener("click", function(){
				if(textArea.childElementCount == 0){
					let newBullet = document.createElement("li");
					newBullet.innerHTML = "";
					newBullet.setAttribute("contenteditable", true);

					textArea.appendChild(newBullet);

					newBullet.addEventListener("keydown", function(event){
						if(event.code === "Enter"){
							let addlBullet = document.createElement("li");
							addlBullet.innerHTML = "";
							addlBullet.setAttribute("contenteditable", true);
							textArea.appendChild(addlBullet);
						}
					});
					
				}
			});
			newModal.style.display = "none";
			textModal.style.display = "block";


		});
		addImgEntry.addEventListener("click", function() {
			newModal.style.display = "none";
			imgModal.style.display = "block";
		});
		saveButton.addEventListener("click", function(){
			let userText = textArea.innerText;
			//split the inputted text at every newline
			let words = userText.split("\n");
			let textHeight = 40;
			let myCanvas = document.createElement("canvas");
			let ctx = myCanvas.getContext("2d");
			ctx.fillStyle="#E5E5E5";
			ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
			ctx.fillStyle="black";
			ctx.font = "15px Verdana";

			//each newline becomes a bullet
			for(let i = 0; i < words.length; ++i){
				if(words[i] != ""){
					words[i] = "• " + words[i];
					ctx.fillText(words[i], 10, textHeight);
					textHeight += 20;
				}
			}
			//if there are currently less than 3 additional entries, create a new canvas object w/ the appropriate text
			if(document.querySelector(".saved_entries").childElementCount != 3){
				let closeBtn = document.createElement("span");
				let newEntry = document.createElement("div");

				newEntry.setAttribute("class", "new-entry");

				closeBtn.setAttribute("class", "close");
				closeBtn.innerHTML = "&times;";

				newEntry.appendChild(closeBtn);
				newEntry.appendChild(myCanvas);

				document.querySelector(".saved_entries").appendChild(newEntry);

				closeBtn.addEventListener("click", function(){
					//prompt the user to confirm that they want to delete the entry
					if(confirm("Delete this entry?"))
						document.querySelector(".saved_entries").removeChild(newEntry);
				});
			}
			textModal.style.display = "none";
			textArea.innerHTML = "";

		});
		cancelButton.addEventListener("click", function(){
			textModal.style.display = "none";
			textArea.innerHTML = "";
		});
		//event listener for when a new image is uploaded
		input.addEventListener("change", function(event){
			let inputFile = event.target.files[0]; //select the correct input file

			if(inputFile != null){
				myImg.src = URL.createObjectURL(inputFile); //create URL to image file
				myImg.alt = inputFile.name;  //set img alt to the file name

				URL.revokeObjectURL(inputFile); //free memory allocated by URL object
			}
		});
		//event listener for when 'save' is clicked after uploading an image
		imgSave.addEventListener("click", function(){
			let myCanvas = document.createElement("canvas");
			let ctx = myCanvas.getContext("2d");
			let dim = getDimensions(myCanvas.width, myCanvas.height, myImg.width, myImg.height);
			ctx.fillStyle="#E5E5E5";
			ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
			ctx.drawImage(myImg, dim.startX, dim.startY, dim.width, dim.height);
			//if there are currently less than 3 entries, create a new canvas object with the chosen image
			if(document.querySelector(".saved_entries").childElementCount != 3){
				let closeBtn = document.createElement("span");
				let newEntry = document.createElement("div");

				newEntry.setAttribute("class", "new-entry");

				closeBtn.setAttribute("class", "close");
				closeBtn.innerHTML = "&times;";

				newEntry.appendChild(closeBtn);
				newEntry.appendChild(myCanvas);
				document.querySelector(".saved_entries").appendChild(newEntry);

				closeBtn.addEventListener("click", function(){
					//prompt the user to confirm that they want to delete the entry
					if(confirm("Delete this entry?"))
						document.querySelector(".saved_entries").removeChild(newEntry);
				});
			}
			//close the image selection modal
			imgModal.style.display = "none";

		});
		//event listener for the cancel button
		imgCancel.addEventListener("click", function(){
			imgModal.style.display = "none";
		});
	}/*connectedCallback*/

}/*modal*/
//define the custom web component "addl-entrybtn" and associate it to the class "addlEntries"
customElements.define("addl-modal", modal);

/*
* Helper function to resize an image to fit a canvas
*
* @param {number} canvasWidth
* @param {number} canvasHeight
* @param {number} imageWidth
* @param {number} imageHeight
*
* @return {object} dimensions
*/
function getDimensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
	let aspectRatio, height, width, startX, startY;

	// Get the aspect ratio, used so the picture always fits inside the canvas
	aspectRatio = imageWidth / imageHeight;

	// If the apsect ratio is less than 1 it"s a verical image
	if (aspectRatio < 1) {
		// Height is the max possible given the canvas
		height = canvasHeight;
		// Width is then proportional given the height and aspect ratio
		width = canvasHeight * aspectRatio;
		// Start the Y at the top since it"s max height, but center the width
		startY = 0;
		startX = (canvasWidth - width) / 2;
		// This is for horizontal images now
	} else {
		// Width is the maximum width possible given the canvas
		width = canvasWidth;
		// Height is then proportional given the width and aspect ratio
		height = canvasWidth / aspectRatio;
		// Start the X at the very left since it"s max width, but center the height
		startX = 0;
		startY = (canvasHeight - height) / 2;
	}
	return { "width": width, "height": height, "startX": startX, "startY": startY };
}/*getDimensions*/