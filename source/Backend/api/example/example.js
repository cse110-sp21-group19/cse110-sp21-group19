// title, text, id?

//checks if it supports indexeddb
/* if (('indexedDB' in window)) {
    console.log('This browser supports IndexedDB');
} */

//making sure indexeddb is supported in multiple browsers
console.log(new Date(Date.now()))
function add(title, text) {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //opening database globally
    let request = window.indexedDB.open("NotesDatabase", 1);
    let db, tx, store /* index */ ;

    /* 3 types of handlers */
    request.onerror = function (event) {
        console.log(`Error: ${event}`);
    };

    request.onupgradeneeded = function (event) {
        // Save the IDBDatabase interface
        let db = request.result;

        // Create an objectStore for this database
        let store = db.createObjectStore("NoteStore", {
            autoIncrement: true
        });
    };

    request.onsuccess = function (event) {
        db = request.result;
        tx = db.transaction("NoteStore", 'readwrite');
        store = tx.objectStore("NoteStore");

        db.onerror = function (event) {
            // Generic error handler for all errors targeted at this database's
            // requests!
            console.error("Database error: " + event.target.errorCode);
        };

        store.put({
            title: title,
            text: text
        });

        tx.oncomplete = function () {
            db.close();
        }

    };
}

let noteTitle = document.getElementById('note_title');
let noteText = document.getElementById('note_content'); 

let submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    add(noteTitle.value, noteText.value);
});