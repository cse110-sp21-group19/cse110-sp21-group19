//CONSTANTS
const DATABASENAME = "BuJoDatabase";
const SETTINGDB = "settingDB";
const ERR_DB_NOT_CREATED = "ERROR: Database hasn't been created!";

/**
 * createDefault()
 * adds default darkMode input set as false
 * 
 * @return {number} - key of newly added item, (not needed to store)
 * 
 * @example createDefault();
 */
export function createDefault(){
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//successfully opened database
		request.onsuccess = function () {
			let db = request.result;
			let transaction = db.transaction([SETTINGDB], "readwrite");
			let store = transaction.objectStore(SETTINGDB);

            let defaultSettings = {"darkMode": false};
			let storeRequest = store.add(defaultSettings, 1);

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
 * updateMode
 * updates the current darkMode to either true or false
 * 
 * @param {boolean} - whether darkmode is on or off
 * 
 * @return {boolean} - true if updated successfully, false if not
 * 
 * @example updateMode(true);
 */
export function updateMode(darkMode){
	return new Promise((resolve) => {

		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//successfully opened database
		request.onsuccess = function () {
			let db = request.result;
			let transaction = db.transaction([SETTINGDB], "readwrite");
			let store = transaction.objectStore(SETTINGDB);
            let key = 1;
			let getRequest = store.get(key);

			getRequest.onsuccess = function (event) {
				let currSettings = event.target.result;
                
				if (currSettings !== undefined) {
					//updating attributes
					currSettings.darkMode = darkMode;

					let putRequest = store.put(currSettings, key);
                    
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
 * getMode
 * Returns the true or false for dark mode as strings
 * 
 * @return {boolean} returns either true, or false for darkMode
 * 
 * @example getEntry();
 */
export function getMode(){
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function(){
			let db = request.result;
			let transaction = db.transaction([SETTINGDB], "readonly");
			let objStore = transaction.objectStore(SETTINGDB);
            let key = 1;
			let objStoreRequest = objStore.get(key);

			//entry object successfully accessed
			objStoreRequest.onsuccess = function (e){
				resolve(e.target.result.darkMode);
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