// Constant for different bullet types
//  Note Bullets:
const NOTEBULLET = "-"
//  Task Bullets:
const TASKBULLET = "&#9633;";
const TASKCOMPLETE = "&#9745;";
const TASKMIGRATE = "<i class=\"fas fa-chevron-right\"></i>";
const TASKFUTURE = "<i class=\"fas fa-chevron-left\"></i>";
const TASKIRR = "";
//  Event Bullets:
const EVENTBULLET = "<i class=\"far fa-circle\"></i>";

// Priority Markers:
const NOTPRIORITY = "&#9734;";
const PRIORITY = "&#9733;";

// TODO: FIGURE OUT HOW TO DECLARE GLOBAL VARIABLES

// DOM Elements
const MAINTEXT = document.getElementById("main-text");

const BULLETS = document.createElement("div");
BULLETS.id = "bullets";

const INPUT = document.createElement("bullet-input");
const INPUTROOT = INPUT.shadowRoot;
const BULLETINPUT = INPUTROOT.getElementById("bullet-input");

//const BULLETROOT = BULLETINPUT.shadowRoot;
//const BULLETTYPE = BULLETROOT.getElementById("bullet-type");
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
        newBullet.entry;

        // append new bullet entries to main-text element
        BULLETS.appendChild(newBullet);

        // clear INPUT value after enter
        BULLETINPUT.value = '';
        editableEntry();
        deleteEntry();
        prioritizeEntry();
    }
});

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
}

function deleteEntry() {
    let bulletEntry = document.querySelectorAll('bullet-entry');
    bulletEntry.forEach((entry) => {
        let bulletEntryRoot = entry.shadowRoot;
        const toDelete = bulletEntryRoot.getElementById('delete-bullet');
        toDelete.addEventListener('click', function() {
            entry.remove();
        });
    });
}

function prioritizeEntry() {
    let bulletEntry = document.querySelectorAll('bullet-entry');
    bulletEntry.forEach((entry) => {
        let bulletEntryRoot = entry.shadowRoot;
        const toPrioritize = bulletEntryRoot.getElementById('prioritize-bullet');
        toPrioritize.addEventListener('click', function() {
            console.log(entry.entry.priority);
            const ENTRYDATA = entry.entry;
            let ISPRIORITIZED = ENTRYDATA.priority;
            entry.innerHTML = "&#9733;";
            if (ISPRIORITIZED) {
                ENTRYDATA.innerHTML = NOTPRIORITY;
            }
            else {
                ENTRYDATA.innerHTML = PRIORITY;
            }
            entry.entry.priority = true; //!ISPRIORITIZED
            console.log(entry.entry.priority);
        });
    });
}