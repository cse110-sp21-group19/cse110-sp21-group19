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

export function setEntrybarType(SHADOW, type, isViewing) {

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
	let mainText = document.querySelector(".main-text");

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
		editing.style.display="none";
		imgEditing.style.display="none";
		inactiveBar.style.display = "none";
		activeBar.style.display="flex";
	}
}


