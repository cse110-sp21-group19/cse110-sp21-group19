//CONSTANTS
const DATABASENAME = "BuJoDatabase";
const ENTRYDB = "entryDB";
const ERR_DB_NOT_CREATED = "ERROR: Database hasn't been created!";
const ERR_CANT_GET_ENTRY = "ERROR: Unable to access entry with key: ";
const ERR_CANT_ACCESS_ENTRY = "ERROR: Unable to access entry with key: ";
const ERR_CANT_DELETE_ENTRY = "ERROR: Unable to delete entry with key: ";

//making sure indexeddb is supported in multiple browsers
Object.defineProperty(window, "indexedDB", {
	value: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
});

/**
 * createEntry
 * Adds an entry object to the entryStore object store of the database
 * and returns its assigned key
 * 
 * @param {Object} entry - The entry object to add to the database
 * 
 * @return {Promise} A promise which resolves to the entry's key or -1 if unsuccessful
 * 
 * @example 
 *  let testEntry = {
 *      "date": ‘05/20/2021’,
 *      "title": "title",
 *      "content": ajhdsfhjkasdhfjksa
 *  };
 *  createDB(testEntry);
 */
export function createEntry(entry){
	return new Promise((resolve) => {
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
			};
            
			//unable to add entry, returns -1
			storeRequest.onerror = function() {
				resolve(-1);
			};

			transaction.oncomplete = function () {
				db.close();
			};
		};
        
		//unable to open database
		request.onerror = function () {
			console.log.error(ERR_DB_NOT_CREATED);
			resolve(-1);
		};
	});
}

/**
 * updateEntry
 * Updates the specified entry to be equal to the new entry object
 * 
 * @param {(string | number)} key - The key of the entry to update
 * 
 * @param {Object} entry - The new entry object to set the old entry equal to
 * 
 * @return {Promise} A promise which resolves to true if successfully updated, false if not updated
 * 
 * @example 
 *  let testEntry = {
 *      "date": ‘05/20/2021’,
 *      "title": "title",
 *      "contnet": ajhdsfhjkasdhfjksa
 *  };
 *  updateEntry(1, testEntry);
 */
export function updateEntry(key, entry){
	return new Promise((resolve) => {
		//Get attributes to change, (date not needed)
		let title = entry.title;
		let content = entry.content;

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
					//updating attributes
					currEntry.title = title;
					currEntry.content = content;

					let putRequest = store.put(currEntry, key);
                    
					//successfully updated entry
					putRequest.onsuccess = function () { resolve(true); };
                    
					//unable to uppdate entry
					putRequest.onerror = function () { resolve(false); };
				} else {
					resolve(false);
				}
			};
            
			getRequest.onerror = function () {
				console.log.eror(ERR_CANT_GET_ENTRY + key);
				resolve(false);
			};

			transaction.oncomplete = function () {
				db.close();
			};
		};
		//unable to open database
		request.onerror = function () {
			console.log.error(ERR_DB_NOT_CREATED);
			resolve(false);
		};
	});
}

/**
 * getEntry
 * Returns the specified entry object from the database
 * 
 * @param {(string | number)} key - The key of the entry to get
 * 
 * @return {Object} The associated entry object, or {} if unable to get entry
 * 
 * @example getEntry(1);
 */
export function getEntry(key){
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function(){
			let db = request.result;
			let transaction = db.transaction([ENTRYDB], "readonly");
			let objStore = transaction.objectStore(ENTRYDB);
			let objStoreRequest = objStore.get(Number(key));

			//entry object successfully accessed
			objStoreRequest.onsuccess = function (e){
				resolve(e.target.result);
			};
			//unable to access entry object
			objStoreRequest.onerror = function(){
				console.log.error(ERR_CANT_GET_ENTRY + key);
				resolve({});
			};

			transaction.oncomplete = function () {
				db.close();
			};
		};
		//unable to open database
		request.onerror = function(){
			console.log.error(ERR_DB_NOT_CREATED);
			resolve({});
		};
	});
}

/** 
 * deleteEntry
 * Deletes the specified entry object from the database
 * 
 * @param {(string | number)}key - The key of the entry to delete
 * 
 * @return {Promise} A promise which resolves to true if deleted, false if not
 * 
 * @example deleteEntry(1);
 */
export function deleteEntry(key){
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function(){
			let db = request.result;
			let transaction = db.transaction([ENTRYDB], "readwrite");
			let objStore = transaction.objectStore(ENTRYDB);
			let deleteRequest = objStore.delete(Number(key));

			//entry object successfully deleted
			deleteRequest.onsuccess = function () {
				resolve(true);
			};

			//unable to delete entry object
			deleteRequest.onerror = function(){
				console.log.error(ERR_CANT_DELETE_ENTRY + key);
				resolve(false);
			};

			transaction.oncomplete = function () {
				db.close();
			};
		};
		//unable to open database
		request.onerror = function(){
			console.log.error(ERR_DB_NOT_CREATED);
			return false;
		};
	});    
}

/**
 * getDailyEntries
 * Returns an array of all entries for given date, in the order that they
 * are added.
 * 
 * @param {Object} date - a JS Date object
 * @return {Array} an 2d array where the first array contains an array of keys
 *                 and the seocnd array contains the array of bullets
 * example: Array returned is ARRAY
 * key = ARRAY[0][0];
 * object of key is = ARRAY[1][0];
 * 
 * @example getDailyEntries(new Date())
 * 
 */
export function getDailyEntries(date) {
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function(){
			let db = request.result;
			let transaction = db.transaction([ENTRYDB], "readonly");
			let objStore = transaction.objectStore(ENTRYDB);
			let objStoreRequest = objStore.openCursor(null, "next");
			let matchingEntries = [];
			let matchingKeys = [];
			//Bullet object successfully accessed
			objStoreRequest.onsuccess = function (e){
				let cursor = e.target.result;
				if(cursor != null) {
					let currDate = cursor.value.date;

					if(currDate == date) {
						matchingEntries.push(cursor.value);
						matchingKeys.push(cursor.key);
					}
					cursor.continue();
				} else {
					resolve([matchingKeys, matchingEntries]);
				}
			};
			//Unable to access bullet object
			objStoreRequest.onerror = function(){
				console.log.error(ERR_CANT_ACCESS_ENTRY);
				resolve({});
			};

			transaction.oncomplete = function () {
				db.close();
			};
		};
		//unable to open database
		request.onerror = function(){
			console.log.error(ERR_DB_NOT_CREATED);
			resolve({});
		};
	});
}

/* module.exports = {
	createEntry,
	updateEntry,
	getEntry,
	deleteEntry,
	getDailyEntries

}; */