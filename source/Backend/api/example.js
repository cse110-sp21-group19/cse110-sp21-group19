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
const ERR_CANT_GET_BULLET = "ERROR: Unable to access bullet with key: ";
const ERR_CANT_DELETE_BULLET = "ERROR: Unable to delete bullet with key: ";

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

        let storeRequest = store.add(bullet);

        //return the key on newly added bullet
        storeRequest.onsuccess = function () {
            return storeRequest.result;
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
        return -1;
    }
}

/*
 * getBullet
 * Returns the specified bullet object from the database
 * 
 * @param key - The key of the bullet to get
 * 
 * @return The associated bullet object, or {} if unable to get bullet
 * 
 * @example getBullet(1);
 */
function getBullet(key){
    //opening database
    let request = window.indexedDB.open(DATABASENAME);

    //db opens successfully
    request.onsuccess = function(event){
        let db = request.result;
        let transaction = db.transaction([BULLETDB], "readonly");
        let objStore = transaction.objectStore(BULLETDB);
        let objStoreRequest = objStore.get(key);

        //Bullet object successfully accessed
        objStoreRequest.onsuccess = function (e){
            console.log(e.target.result);
            return e.target.result;
        }
        //Unable to access bullet object
        objStoreRequest.onerror = function(event){
            console.log.error(ERR_CANT_GET_BULLET + key);
            return {};
        }

        transaction.oncomplete = function () {
            db.close();
        }
    }
    //unable to open database
    request.onerror = function(event){
        console.log.error(ERR_DB_NOT_CREATED);
        return {};
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
 * @return true if successfully updated, false if not updated
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
 *  When we update bullets, we usually update: 
 *      priority, content, completed, type, children
 */
function updateBullet(key, bullet){
    let priority = bullet.priority;
    let content = bullet.content;
    let completed = bullet.completed;
    let type = bullet.type;
    let children = bullet.children;

    //opening database
    let request = window.indexedDB.open(DATABASENAME);
    //successfully opened database
    request.onsuccess = function () {
        let db = request.result;
        let transaction = db.transaction([BULLETDB], "readwrite");
        let store = transaction.objectStore(BULLETDB);

        //indexing bullet
        let getRequest = store.get(key);

        getRequest.onsuccess = function (event) {
            let currBullet = event.target.result;
            
            if (currBullet !== undefined) {
                currBullet.priority = priority;
                currBullet.content = content;
                currBullet.completed = completed;
                currBullet.type = type;
                currBullet.children = children;

                let putRequest = store.put(currBullet, key);
                
                //successfully updated bullet
                putRequest.onsuccess = function () { return true; };
                
                //unable to uppdate bullet
                putRequest.onerror = function () { return false; };

            }
        }
        
        getRequest.onerror = function () {
            console.log.eror(ERR_CANT_GET_BULLET + key);
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

    //db opens successfully
    request.onsuccess = function(event){
        let db = request.result;
        let transaction = db.transaction([BULLETDB], "readwrite");
        let objStore = transaction.objectStore(BULLETDB);
        let objStoreRequest = objStore.delete(key);

        //Bullet object successfully deleted
        objStoreRequest.onsuccess = function(event){
            return true;
        }
        //Unable to delete bullet object
        objStoreRequest.onerror = function(event){
            console.log.error(ERR_CANT_DELETE_BULLET + key);
            return false;
        }

        transaction.oncomplete = function () {
            db.close();
        }
    }
    //unable to open database
    request.onerror = function(event){
        console.log.error(ERR_DB_NOT_CREATED);
        return false;
    }
}

let submit = document.getElementById("submit");



let key;
// document.getElementById("add").addEventListener("click", addTest);
submit.addEventListener("click", (event) => {
    event.preventDefault();

    let log = document.getElementById("log").value;
    let type = document.getElementById("type").value;
    let date = document.getElementById("date").value;
    let priority = document.getElementById("priority").value;
    let content = document.getElementById("content").value;
    let completed = document.getElementById("completed").value;
    let children = document.getElementById("children").value;

    let bulletExample = {
        "log": log,
        "type": type,
        "date": date,
        "priority": priority,
        "content": content,
        "completed": completed,
        "children": children
    };

    key = createBullet(bulletExample);
});

let update = document.getElementById("update");
update.addEventListener("click", (event) => {
    let log = document.getElementById("log").value;
    let type = document.getElementById("type").value;
    let date = document.getElementById("date").value;
    let priority = document.getElementById("priority").value;
    let content = document.getElementById("content").value;
    let completed = document.getElementById("completed").value;
    let children = document.getElementById("children").value;

    let bulletExample = {
        "log": log,
        "type": type,
        "date": date,
        "priority": priority,
        "content": content,
        "completed": completed,
        "children": children
    };

    let key = document.getElementById("key").value;
    let result = getBullet(Number(key));
    console.log(result);
});

let create = document.getElementById("create", createDB);
create.addEventListener("click", (event) => {
    createDB();
});