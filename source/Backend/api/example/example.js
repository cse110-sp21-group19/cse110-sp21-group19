/*
BulletDB:
        { 
            Id: (autoincrement),
            log: (‘daily’, ‘monthly’, ‘future’),
            type: (‘note’, ‘event’, ‘task’),
            Date: (MM/DD/YEAR) 05*,
            priority: (true or false),
            content: (text content of bullet),
            Completed: (true or false),
            Parent/Indent: (will either be id of parent or how many times to indent)
        }

EntriesDB:  
        {
            Date: ‘05/20/2021’,
            Order: (auto increment),
            Type: image or text,
            Bullets: [“text1”, “text2”],
            Media: (blob representation)
        }
*/
//CONSTANTS
const DATABASENAME = "BuJoDatabase";
const BULLETDB = "bulletDB"
const ERR_DB_NOT_CREATED = "ERROR: Database hasn't been created!";

//making sure indexeddb is supported in multiple browsers
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// let db, tx, store /* index */ ;

/*
 * createDB
 * Creates an indexedDB database with the name "BuJoDatabase" and version 1.
 * BuJoDatabase contains the object stores "bulletStore" and "entryStore"
 * 
 * @example createDB();
 */
function createDB() {
    let request = window.indexedDB.open(DATABASENAME, 1);
    request.onupgradeneeded = function () {
        let db = request.result;
        //error opening database
        db.onerror = function (event) {
            console.error("Database error: " + event.target.errorCode);
        };

        //creating BulletStore(BulletsDB)
        let bulletStore = db.createObjectStore(BULLETDB, { autoIncrement: true }); 
        
        // defining columns in BulletStore
        //orderId, log, type, date, priority, content, completed
        bulletStore.createIndex("log", "log", { unique: false });
        bulletStore.createIndex("type", "type", { unique: false });
        bulletStore.createIndex("date", "date", { unique: false });
        bulletStore.createIndex("priority", "priority", { unique: false });
        bulletStore.createIndex("content", "content", { unique: false });
        bulletStore.createIndex("completed", "completed", { unique: false });
        bulletStore.createIndex("orderId", "orderId", { unique: false });

        //creating EntriesStore (EntriesDB For additional entries)
    }
}

/* 
 * createBullet
 * stores bullet into bulletDB (bulletStore)
 * 
 * @param bullet object
 * let bulletExample = {
 *      "log": "daily",
 *      "date": "05/23/2021",
 *      "priority": true,
 *      "content": "example text hello this is a test",
 *      "completed": false,
 *      "type": note, task, event
 *       "children": []
 *   };
 * 
 * @return The key of the newly added bullet, or -1 if unsuccessful
 * 
 * @example
 */
function createBullet(bullet) {
    
    //opening database
    let request = window.indexedDB.open(DATABASENAME);

    request.onsuccess = function () {
        let db = request.result;
        let transaction = db.transaction([BULLETDB], "readwrite");
        let store = transaction.objectStore(BULLETDB);

        let storeRequest = store.put(bullet);

        //return the key on newly added bullet
        storeRequest.onsuccess = function (event) {
            return callback(event.target.result);
        }
        
        //unable to add bullet, returns -1
        storeRequest.onerror = function() {
            return -1;
        }

        transaction.oncomplete = function () {
            db.close();
        }
    }
    
    //unable to open database
    request.onerror = function () {
        console.log.error(ERR_DB_NOT_CREATED);
    }
}

/*
 * updateBullet
 * Updates the specified bullet to be equal to the new bullet object
 * 
 * @param key - The key of the bullet to update
 * 
 * @param bullet - The new bullet object to set the old bullet equal to
 * 
 * @return true if successful, false if not
 * 
 * @example 
 *  let bulletExample = {
 *      "log": "daily",
 *      "date": "05/23/2021",
 *      "priority": true,
 *      "content": "example text hello this is a test",
 *      "completed": false,
 *      "type": note, task, event
 *      "children": []
 *  };
 *  updateBullet(1, bulletExample);
 */
function updateBullet(key, bullet){
    let 
    //opening database
    let request = window.indexedDB.open(DATABASENAME);

    request.onsuccess
    //unable to open database
    request.onerror = function () {
        console.log.error(ERR_DB_NOT_CREATED);
    }
}

/*
 * getBullet
 * Returns the specified bullet object from the database
 * 
 * @param key - The key of the bullet to get
 * 
 * @return The bullet object
 * 
 * @example getBullet(1);
 */
function getBullet(key){

    //opening database
    let request = window.indexedDB.open(DATABASENAME);

    request.onsuccess = function(event){

    }

    //unable to open database
    request.onerror = function(event){
        
    }
}

/*
 * deleteBullet
 * Deletes the specified bullet object from the database
 * 
 * @param key - The key of the bullet to delete
 * 
 * @return true if successful, false if not
 * 
 * @example deleteBullet(1);
 */
function deleteBullet(key){

    //opening database
    let request = window.indexedDB.open(DATABASENAME);
}

let create = document.getElementById("create");
create.addEventListener("click", createDB);

document.getElementById("add").addEventListener("click", addTest);