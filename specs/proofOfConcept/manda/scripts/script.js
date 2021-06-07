/* DOM Elements */
const input = document.getElementById('bullet-input');
const bulletType = document.getElementById('bullet-type');

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