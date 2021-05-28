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
            "date": ‘05/20/2021’,
            "bullets": [“text1”, “text2”, ...]
        }
*/

/**
 * createEntry
 * Adds an entry object to the entryStore object store of the database
 * and returns its assigned key
 * 
 * @param entry - The entry object to add to the database
 * 
 * @return A promise which resolves to the entry's key or -1 if unsuccessful
 * 
 * @example 
 *  let testEntry = {
 *      "date": ‘05/20/2021’,
 *      "bullets": [“text1”, “text2”, ...]
 *  };
 *  createDB(testEntry);
 */
function createEntry(entry){
    return new Promise((resolve, reject) => {
        //opening database
        let request = window.indexedDB.open(DATABASENAME);

        //successfully opened database
        request.onsuccess = function () {
            let db = request.result;
            let transaction = db.transaction([ENTRYDB], "readwrite");
            let store = transaction.objectStore(ENTRYDB);

            let storeRequest = store.add(entry);

            //return the key on newly added entry
            storeRequest.onsuccess = function () {
                resolve(storeRequest.result);
            }
            
            //unable to add entry, returns -1
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
 * updateEntry
 * Updates the specified entry to be equal to the new entry object
 * 
 * @param key - The key of the entry to update
 * 
 * @param entry - The new entry object to set the old entry equal to
 * 
 * @return A promise which resolves to true if successfully updated, false if not updated
 * 
 * @example 
 *  let testEntry = {
 *      "date": ‘05/20/2021’,
 *      "bullets": [“text1”, “text2”, ...]
 *  };
 *  updateEntry(1, testEntry);
 */
function updateEntry(key, entry){
    return new Promise((resolve, reject) => {
        //Get attributes to change
        let bullets = entry.bullets;

        //opening database
        let request = window.indexedDB.open(DATABASENAME);

        //successfully opened database
        request.onsuccess = function () {
            let db = request.result;
            let transaction = db.transaction([ENTRYDB], "readwrite");
            let store = transaction.objectStore(ENTRYDB);
            let getRequest = store.get(Number(key));

            getRequest.onsuccess = function (event) {
                let currEntry = event.target.result;
                
                if (currEntry !== undefined) {
                    currEntry.bullets = bullets;

                    let putRequest = store.put(currEntry, key);
                    
                    //successfully updated entry
                    putRequest.onsuccess = function () { resolve(true); };
                    
                    //unable to uppdate entry
                    putRequest.onerror = function () { resolve(false); };
                } else {
                    resolve(false);
                }
            }
            
            getRequest.onerror = function () {
                console.log.eror(ERR_CANT_GET_ENTRY + key);
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
 * getEntry
 * Returns the specified entry object from the database
 * 
 * @param key - The key of the entry to get
 * 
 * @return The associated entry object, or {} if unable to get entry
 * 
 * @example getEntry(1);
 */
function getEntry(key){
    return new Promise((resolve, reject) => {
        //opening database
        let request = window.indexedDB.open(DATABASENAME);

        //db opens successfully
        request.onsuccess = function(event){
            let db = request.result;
            let transaction = db.transaction([ENTRYDB], "readonly");
            let objStore = transaction.objectStore(ENTRYDB);
            let objStoreRequest = objStore.get(Number(key));

            //entry object successfully accessed
            objStoreRequest.onsuccess = function (e){
                resolve(e.target.result);
            }
            //unable to access entry object
            objStoreRequest.onerror = function(event){
                console.log.error(ERR_CANT_GET_ENTRY + key);
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

/*
 * deleteEntry
 * Deletes the specified entry object from the database
 * 
 * @param key - The key of the entry to delete
 * 
 * @return A promise which resolves to true if deleted, false if not
 * 
 * @example deleteEntry(1);
 */
function deleteEntry(key){
    return new Promise((resolve, reject) => {
        //opening database
        let request = window.indexedDB.open(DATABASENAME);

        //db opens successfully
        request.onsuccess = function(event){
            let db = request.result;
            let transaction = db.transaction([ENTRYDB], "readwrite");
            let objStore = transaction.objectStore(ENTRYDB);
            let deleteRequest = objStore.delete(Number(key));

            //entry object successfully deleted
            deleteRequest.onsuccess = function (event) {
                resolve(true);
            }

            //unable to delete entry object
            deleteRequest.onerror = function(event){
                console.log.error(ERR_CANT_DELETE_ENTRY + key);
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