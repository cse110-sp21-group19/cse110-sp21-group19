/*
bullet object:
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

entry object:  
        {
            Date: ‘05/20/2021’,
            Order: (auto increment),
            Bullets: [“text1”, “text2”],
        }
*/
//CONSTANTS
const DATABASENAME = "BuJoDatabase";
const BULLETDB = "bulletDB";
const ENTRYDB = "entryDB";
const ERR_DB_NOT_CREATED = "ERROR: Database hasn't been created!";
const ERR_CANT_GET_BULLET = "ERROR: Unable to access bullet with key: ";
const ERR_CANT_GET_ENTRY = "ERROR: Unable to access entry with key: ";
const ERR_CANT_DELETE_BULLET = "ERROR: Unable to delete bullet with key: ";
const ERR_CANT_DELETE_ENTRY = "ERROR: Unable to delete entry with key: ";

//making sure indexeddb is supported in multiple browsers
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

/** 
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
        
        //defining columns in BulletStore
        //orderId, log, type, date, priority, content, completed
        bulletStore.createIndex("log", "log", { unique: false });
        bulletStore.createIndex("type", "type", { unique: false });
        bulletStore.createIndex("date", "date", { unique: false });
        bulletStore.createIndex("priority", "priority", { unique: false });
        bulletStore.createIndex("content", "content", { unique: false });
        bulletStore.createIndex("completed", "completed", { unique: false });
        bulletStore.createIndex("orderId", "orderId", { unique: false });

        //creating entryStore (EntriyDB For additional entries)
        let entryStore = db.createObjectStore(ENTRYDB, {autoIncrement: true});

        //defining columns in entryStore
        entryStore.createIndex("date", "date", {unique: false});
    }
}

/**
 * createBullet
 * stores bullet into bulletDB (i.e bulletStore)
 * 
 * @param {Object} bullet - A bullet object with the following properties:
 *                         (log, date, priority, content, completed, type, children).
 *                         Example below:
 * let bulletExample = {
 *      "log": "daily",
 *      "date": "05/23/2021",
 *      "priority": true,
 *      "content": "example text hello this is a test",
 *      "completed": false,
 *      "type": note, task, event
 *      "children": []
 *  };
 * 
 * @return {Promise Object} A promise that resolves to the key of the newly added bullet, 
 *                      or -1 if unsuccessful
 * 
 * @example 
 *  createBullet(bulletExample);
 */
function createBullet(bullet) {
    return new Promise((resolve, reject) => {
        //opening database
        let request = window.indexedDB.open(DATABASENAME);

        request.onsuccess = function () {
            let db = request.result;
            let transaction = db.transaction([BULLETDB], "readwrite");
            let store = transaction.objectStore(BULLETDB);

            let storeRequest = store.add(bullet);

            //return the key on newly added bullet
            storeRequest.onsuccess = function () {
                resolve(storeRequest.result);
            }
            
            //unable to add bullet, returns -1
            storeRequest.onerror = function() {
                resolve(-1);
            }

            transaction.oncomplete = function () {
                db.close();
            }
        }
        
        //unable to open database
        request.onerror = function () {
            console.log.error(ERR_DB_NOT_CREATED);
            resolve(-1);
        }
    });
}

/**
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
    return new Promise((resolve, reject) => {
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
            let getRequest = store.get(Number(key));

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
                    putRequest.onsuccess = function () { resolve(true); };
                    
                    //unable to uppdate bullet
                    putRequest.onerror = function () { resolve(false); };
                } else {
                    resolve(false);
                }
            }
            
            getRequest.onerror = function () {
                console.log.eror(ERR_CANT_GET_BULLET + key);
                resolve(false);
            }

            transaction.oncomplete = function () {
                db.close();
            }
        }
        //unable to open database
        request.onerror = function () {
            console.log.error(ERR_DB_NOT_CREATED);
            resolve(false);
        }
    });
}

/**
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
    return new Promise((resolve, reject) => {
        //opening database
        let request = window.indexedDB.open(DATABASENAME);

        //db opens successfully
        request.onsuccess = function(event){
            let db = request.result;
            let transaction = db.transaction([BULLETDB], "readonly");
            let objStore = transaction.objectStore(BULLETDB);
            let objStoreRequest = objStore.get(Number(key));

            //Bullet object successfully accessed
            objStoreRequest.onsuccess = function (e){
                resolve(e.target.result);
            }
            //Unable to access bullet object
            objStoreRequest.onerror = function(event){
                console.log.error(ERR_CANT_GET_BULLET + key);
                resolve({});
            }

            transaction.oncomplete = function () {
                db.close();
            }
        }
        //unable to open database
        request.onerror = function(event){
            console.log.error(ERR_DB_NOT_CREATED);
            resolve({});
        }
    });
}

/**
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
    return new Promise((resolve, reject) => {
        //opening database
        let request = window.indexedDB.open(DATABASENAME);

        //db opens successfully
        request.onsuccess = function(event){
            let db = request.result;
            let transaction = db.transaction([BULLETDB], "readwrite");
            let objStore = transaction.objectStore(BULLETDB);
            let deleteRequest = objStore.delete(Number(key));

            //Bullet object successfully deleted
            deleteRequest.onsuccess = function (event) {
                console.log(deleteRequest.result);
                resolve(true);
            }

            //Unable to delete bullet object
            deleteRequest.onerror = function(event){
                console.log.error(ERR_CANT_DELETE_BULLET + key);
                resolve(false);
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
    });    
}

//gettting all priority/important bullets
function getAllPriority() {
    return new Promise((resolve, reject) => {
        //opening database
        let request = window.indexedDB.open(DATABASENAME);

        //db opens successfully
        request.onsuccess = function(event){
            let db = request.result;
            let transaction = db.transaction([BULLETDB], "readonly");
            let objStore = transaction.objectStore(BULLETDB);
            let objStoreRequest = objStore.openCursor(null, 'next');
            let matchingBullets = [];
            //Bullet object successfully accessed
            objStoreRequest.onsuccess = function (e){
                
                let cursor = e.target.result;
                if(cursor != null) {
                    if(cursor.value.priority == true) {
                        matchingBullets.push(cursor.value);
                    }
                    cursor.continue();
                } else {
                    resolve(matchingBullets);
                }
            }
            //Unable to access bullet object
            objStoreRequest.onerror = function(event){
                console.log.error(ERR_CANT_GET_BULLET + key);
                resolve({});
            }

            transaction.oncomplete = function () {
                db.close();
            }
        }
        //unable to open database
        request.onerror = function(event){
            console.log.error(ERR_DB_NOT_CREATED);
            resolve({});
        }
    });
}

function getDailyBullets(date) {
    return new Promise((resolve, reject) => {
        //opening database
        let request = window.indexedDB.open(DATABASENAME);

        //db opens successfully
        request.onsuccess = function(event){
            let db = request.result;
            let transaction = db.transaction([BULLETDB], "readonly");
            let objStore = transaction.objectStore(BULLETDB);
            let objStoreRequest = objStore.openCursor(null, 'next');
            let matchingBullets = [];
            //Bullet object successfully accessed
            objStoreRequest.onsuccess = function (e){
                
                let cursor = e.target.result;
                if(cursor != null) {
                    if(cursor.value.date == date) {
                        matchingBullets.push(cursor.value);
                    }
                    cursor.continue();
                } else {
                    resolve(matchingBullets);
                }
            }
            //Unable to access bullet object
            objStoreRequest.onerror = function(event){
                console.log.error(ERR_CANT_GET_BULLET + key);
                resolve({});
            }

            transaction.oncomplete = function () {
                db.close();
            }
        }
        //unable to open database
        request.onerror = function(event){
            console.log.error(ERR_DB_NOT_CREATED);
            resolve({});
        }
    });
}

//Call createDB when the page loads to make sure db is created
window.addEventListener("DOMContentLoaded", () => {
    createDB();
});

//export { createDB };