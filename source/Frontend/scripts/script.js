// TODO: FIGURE OUT HOW TO DECLARE GLOBAL VARIABLES
// Constants for different bullet types
//  Note Bullets:
const NOTEBULLET = "-"
//  Task Bullets:
const TASKBULLET = "□";
const TASKCOMPLETE = "☑";
//const TASKBULLET = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"/></svg>`;
//const TASKCOMPLETE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"/></svg>`;

const TASKMIGRATE = "<i class=\"fas fa-chevron-right\"></i>";
const TASKFUTURE = "<i class=\"fas fa-chevron-left\"></i>";
const TASKIRR = "";
//  Event Bullets:
const EVENTBULLET = "<i class=\"far fa-circle\"></i>";

// Priority Markers:
const NOTPRIORITY = "&#9734;";
const PRIORITY = "★";

// BULLET STUFF
// DOM Elements
const MAINTEXT = document.getElementById("main-text");

const BULLETS = document.createElement("div");
BULLETS.id = "bullets";

const INPUT = document.createElement("bullet-input");
const INPUTROOT = INPUT.shadowRoot;
const BULLETINPUT = INPUTROOT.getElementById("bullet-input");

const BULLETTYPE = INPUTROOT.getElementById("bullet-type");

MAINTEXT.appendChild(BULLETS);
MAINTEXT.appendChild(INPUT);

INPUT.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        let entry = {
            "type": BULLETTYPE.value,
            "date": new Date(Date.now()),
            "content": BULLETINPUT.value,
            "priority": false,
            "completed": false
        };

        let newBullet = document.createElement('bullet-entry');
        newBullet.entry = entry;

        // append new bullet entries to main-text element
        BULLETS.appendChild(newBullet);

        // clear INPUT value after enter
        BULLETINPUT.value = '';

        editableEntry();
        prioritizeEntry(newBullet);
        completeTask(newBullet);
        deleteEntry();
    }
});


/*
* editableEntry
* Allow each bullet entry to be edited on a double click.
* @param {}
*
* @example
*     editableEntry();
*/
// TODO: when user clicks away, make the bullet readOnly
function editableEntry() {
    let bulletEntry = document.querySelectorAll('bullet-entry');
    bulletEntry.forEach((entry) => {
        let bulletEntryRoot = entry.shadowRoot;
        const inputted = bulletEntryRoot.getElementById('bullet-inputted');
        if (inputted) {
            // all to edit on double click
            inputted.addEventListener('dblclick', function() {
                inputted.readOnly = false;
            });
            // after 'Enter' return to 'readOnly' mode
            inputted.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    inputted.readOnly = true;
                }
            });
        }
    });
} /* editableEntry */

/*
* deleteEntry
* Delete bullet when the 'X' button is clicked.
* @param {}
*
* @example
*     deleteEntry();
*/
function deleteEntry() {
    let bulletEntry = document.querySelectorAll('bullet-entry');
    bulletEntry.forEach((entry) => {
        let bulletEntryRoot = entry.shadowRoot;
        const toDelete = bulletEntryRoot.getElementById('delete-bullet');
        toDelete.addEventListener('click', function() {
            entry.remove();
        });
    });
} /* deleteEntry */

/*
* prioritizeEntry
* Prioritize and deprioritize bullet by toggling the star icon.
* @param {object} - a bullet-type element
*
* @example
*     prioritizeEntry(entry);
*/
function prioritizeEntry(newEntry) {
    let bulletEntryRoot = newEntry.shadowRoot;
    const toPrioritize = bulletEntryRoot.getElementById('prioritize-bullet');
    toPrioritize.addEventListener("click", function() {
        if (toPrioritize.innerHTML === PRIORITY) {
            toPrioritize.innerHTML = NOTPRIORITY;
            toPrioritize.style.color = "transparent";
        }
        else {
            toPrioritize.innerHTML = PRIORITY;
            toPrioritize.style.color = "black";
        }
    });
}  /* prioritizeEntry */

/*
* completeTask
* Check and uncheck task bullet. Adds strikethrough to checked tasks.
* @param {object} - a bullet-type element
*
* @example
*     completeTask(entry);
*/
function completeTask(newEntry) {
    let bulletEntryRoot = newEntry.shadowRoot;
    const toComplete = bulletEntryRoot.getElementById("bullet-type");
    const content = bulletEntryRoot.getElementById("bullet-inputted");
    toComplete.addEventListener("click", function() {
        if (toComplete.innerHTML === TASKBULLET) {
            toComplete.innerHTML = TASKCOMPLETE;
            content.style.textDecoration = "line-through";
        }
        else if (toComplete.innerHTML === TASKCOMPLETE) {
            toComplete.innerHTML = TASKBULLET;
            content.style.textDecoration = "none";
        }
    });
} /* completeTask */

//Adding the side nav menu web component 
const SIDENAV  = document.createElement("side-nav");
document.getElementById("side-nav-container").appendChild(SIDENAV);

//adding weekly navigation web component
let week = createDaysOfWeekArray();
const WEEKLYNAV = document.createElement("weekly-nav");
WEEKLYNAV.daysOfWeek = week;
document.getElementById("weekly-nav-container").appendChild(WEEKLYNAV);

//Onclick listener for the items inside the weekly nav
const weeklyNavContainer = WEEKLYNAV.shadowRoot.querySelector("[class='week-container']");
weeklyNavContainer.addEventListener("click", (event)=>{
    if(event.target.className == "wn-item"){
        //which day was selected
        let index = [].indexOf.call( weeklyNavContainer.childNodes, event.target);
        WEEKLYNAV.selectedDay = index;

        //change title on top of main text ... LATER will change what is on maintext
        let selectedDay = WEEKLYNAV.selectedInfo;
        let dailyLogTitle = selectedDay.day + ", " + months[selectedDay.month] + " " + selectedDay.date;
        document.getElementsByClassName("daily-log-title")[0].querySelector("h1").innerHTML = dailyLogTitle;
    }
});

/*
 * createDaysofWeekyArray creates an array of days of the week for the current week
 * 
 * @returns An array of date objects (As is, if we attatch important bullets, this will change)
 * for the days of the current week
 * 
 * @example 
 *      createDaysOfWeekArray()
 */
 function createDaysOfWeekArray(){
    //NOTE: if we want to pass data into the weekly nav like important bullets we can attach to this array
    let daysOfWeek = [];
    let currDate = new Date();
    //start on Sunday
    currDate.setDate((currDate.getDate() - currDate.getDay()));
    for(let i = 0; i < 7; i++){
        daysOfWeek.push(new Date(currDate));
        currDate.setDate(currDate.getDate() + 1);
    }

    return daysOfWeek;
} /* createDaysofWeekArray */

const months= ["January","February","March","April","May","June","July",
"August","September","October","November","December"];
