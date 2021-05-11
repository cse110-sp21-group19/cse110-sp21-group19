/* DOM Elements */

// Example Component
/*
const mainText = document.getElementById("main-text");
const exampleComponent = document.createElement("example-element");
mainText.appendChild(exampleComponent);
*/

/*
let bulletType = document.createElement("select");
bulletType.innerHTML = `
    <select id="bullet-type">
        <option value="note" selected>  New Note <h5> - </h5></option> <!-- default is a note bullet-->
        <option value="task"> New Task <h5>&#8226;</h5></option>
        <option value="event"> New Event <h5>&#9900;</h5></option>
    </select>
    `;

let input = document.createElement("input");
input.id = "bullet-input";
input.type = "text";
let mainText = document.getElementById("main-text");
mainText.appendChild(input);

input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        let entry = {
            content: input.value,
            type: bulletType.value
        }

        let newBullet = document.createElement('bullet-entry');
        newBullet.entry = entry;

        let main = document.querySelector('main');
        main.appendChild(newBullet);

        // clear input value after enter
        input.value = '';
        editableEntry();
        deleteEntry();
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
        const toDelete = bulletEntryRoot.querySelector('button');
        toDelete.addEventListener('click', function() {
            entry.remove();
        });
    });
}
*/