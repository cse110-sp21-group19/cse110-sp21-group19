import { getDailyEntries} from "../../Backend/api/entries_api.js";

/**Helper function that takes in entries from the DB and applies necessary formatting changes to display them to the screen.
 * 
 * @param {Array.<Object>} entries 
 * @param {Array.<Object>} keys 
 * @returns {Array.<Object>}
 */
export function formatEntries(entries, keys){
	let toReturn = [];
	for (let i = 0; i < entries.length; ++i){
		//console.log(entries[i]);
		if(entries[i].image){
			let toInsert = {title: entries[i].title, content: "", key: Number(keys[i]), image: "true"};
			toReturn.push(toInsert);
		}
		else{
			let toInsert = {title: entries[i].title, content: entries[i].content, key: Number(keys[i]), image: "false"};
			toReturn.push(toInsert);
		}
		
	}
	return toReturn;
}

/** Helper function that retrieves entries from the DB and displays them to the screen
 * @param {}
 * 
 */
export async function updateAddlEntries() {
	let myDate = document.querySelector("log-type").readLog.header;
	const ADDLENTRYBAR = document.querySelector("entry-bar");

	let entriesList = await getDailyEntries(myDate);
	let keys = entriesList[0];
	let fetchedEntries = entriesList[1];

	ADDLENTRYBAR.entries = formatEntries(fetchedEntries, keys);
}

//Helper functions to insert text at caret position
// SOURCE: https://stackoverflow.com/questions/3510351/how-do-i-add-text-to-a-textarea-at-the-cursor-location-using-javascript

function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}

function offsetToRangeCharacterMove(el, offset) {
    return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
}

function setSelection(el, start, end) {
    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        el.selectionStart = start;
        el.selectionEnd = end;
    } else if (typeof el.createTextRange != "undefined") {
        var range = el.createTextRange();
        var startCharMove = offsetToRangeCharacterMove(el, start);
        range.collapse(true);
        if (start == end) {
            range.move("character", startCharMove);
        } else {
            range.moveEnd("character", offsetToRangeCharacterMove(el, end));
            range.moveStart("character", startCharMove);
        }
        range.select();
    }
}

/** Function that inserts a given character at the caret position in a textarea
 * 
 * @param {Object} el 
 * @param {String} text 
 * 
 * @example insertTextAtCaret(myTextArea, "[INSERTED]");
 */
export function insertTextAtCaret(el, text) {
    var pos = getInputSelection(el).end;
    var newPos = pos + text.length;
    var val = el.value;
    el.value = val.slice(0, pos) + text + val.slice(pos);
    setSelection(el, newPos, newPos);
}


// export function loadEntries(SHADOW, entries, currKey, isViewing){

// 	console.log(SHADOW);

// 	let mainText = document.querySelector(".main-text");
// 	let innerBar = SHADOW.querySelector(".content");
// 	let title = SHADOW.querySelector(".entry-title");
// 	let content = SHADOW.querySelector(".text-content");

// 	//different states of entryBar
// 	let initial = SHADOW.querySelector(".initial");
// 	let editing = SHADOW.querySelector(".editing");
// 	let imgEditing = SHADOW.querySelector(".img-editing");
// 	let imgTitle = SHADOW.querySelectorAll(".entry-title")[1];
// 	let uploaded = SHADOW.querySelector(".uploaded");
// 	let infoText = SHADOW.querySelector(".img-text");

// 	infoText.style.display="none";

// 	//buttons
// 	let deleteButton = SHADOW.querySelector(".delete-btn");
// 	let deleteButtonImg = SHADOW.querySelectorAll(".delete-btn")[1];
	
// 	while(innerBar.firstChild){
// 		innerBar.removeChild(innerBar.firstChild);
// 	}

// 	entries.forEach(entry => {
// 		//console.log(entry);
// 		let newEntry = document.createElement("addl-entry");
// 		newEntry.entry = entry;
// 		//console.log(newEntry.entry.image);
// 		if(newEntry.entry.image){
// 			newEntry.addEventListener("click", async function(){
// 				//change the mode to is viewing
// 				isViewing = true;
// 				document.querySelector("entry-bar").type = "img-editing";
// 				//hide and display relevant components
// 				mainText.style.display="none"
// 				initial.style.display="none";
// 				imgEditing.style.display="block";
// 				deleteButtonImg.style.display="block";

// 				//display the title and image of the current entry to the screen
				
// 				imgTitle.innerText = newEntry.entry.title;
				
// 				//get the key of the current entry
// 				currKey = newEntry.entry.key;
// 				let toUpload = await getEntry(currKey);
// 				let imgUrl = await binaryToImgUrl(toUpload.image);
				
// 				uploaded.src = imgUrl;
// 			});

// 		}else{
// 			newEntry.addEventListener("click", function(){
// 				//change the mode to is viewing
// 				isViewing = true;
	
// 				//hide and display relevant components
// 				mainText.style.display="none"
// 				initial.style.display="none";
// 				editing.style.display="block";
// 				deleteButton.style.display="block";
	
// 				//display the title and contents of the current entry to the screen
// 				title.innerText = newEntry.entry.title;
// 				content.value = newEntry.entry.content;
	
// 				//get the key of the current entry
// 				currKey = newEntry.entry.key;
// 			});
// 		}
// 		if(innerBar.childElementCount > 0){
// 			newEntry.style.marginLeft = "7rem";
// 		}
// 		innerBar.appendChild(newEntry);
		
// 	});
	
// }



