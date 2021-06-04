//CONSTANTS
const DATABASENAME = "BuJoDatabase";
const BULLETDB = "bulletDB";
const ENTRYDB = "entryDB";
const ERR_DB_NOT_CREATED = "ERROR: Database hasn't been created!";
const ERR_CANT_GET_BULLET = "ERROR: Unable to access bullet with key: ";
const ERR_CANT_ACCESS_BULLET = "ERROR: Unable to access bullet";
const ERR_CANT_DELETE_BULLET = "ERROR: Unable to delete bullet with key: ";

//making sure indexeddb is supported in multiple browsers
Object.defineProperty(window, "indexedDB", {
	value: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
});

/** 
 * createDB
 * Creates an indexedDB database with the name "BuJoDatabase" and version 1.
 * BuJoDatabase contains the object stores "bulletStore" and "entryStore"
 * 
 * @example createDB();
 */
export function createDB() {
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
		bulletStore.createIndex("content", "content", { unique: false });
		bulletStore.createIndex("priority", "priority", { unique: false });
		bulletStore.createIndex("completed", "completed", { unique: false });
		bulletStore.createIndex("levels", "levels", { unique: false });

		//creating entryStore (EntriyDB For additional entries)
		let entryStore = db.createObjectStore(ENTRYDB, {autoIncrement: true});

		//defining columns in entryStore
		entryStore.createIndex("date", "date", {unique: false});
		entryStore.createIndex("title", "title", {unique: false});
		entryStore.createIndex("content", "content", {unique: false});
	};
}

/**
 * createBullet
 * stores bullet into bulletDB (i.e bulletStore)
 * 
 * @param {Object} bullet - A bullet object with the following properties:
 *                         (log, date, priority, content, completed, type, children).
 *                         Example below:
 * let bulletExample = {
 *      "log": "daily",                 string
 *      "date": "05/23/2021",           a string containing a JS Date object
 *      "priority": true,               boolean
 *      "content": "example text hello this is a test", string
 *      "completed": false,             boolean
 *      "type": note, task, event       string
 *      "children": []                  array bulletObject (ideally), 
 *                                      if not ints representing indentation level
 *                                      or key of parent object
 *  };
 * 
 * @return {Promise} A promise that resolves to the key of the newly added bullet, 
 *                          or -1 if unsuccessful
 * 
 * @example 
 *  createBullet(bulletExample);
 */
export function createBullet(bullet) {
	return new Promise((resolve) => {
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
			};
            
			//unable to add bullet, returns -1
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
 * updateBullet
 * Updates the specified bullet to be equal to the new bullet object
 * 
 * @param {(string | number)} key - The key of the bullet to update
 * 
 * @param {Object} bullet - The new bullet object to set the old bullet equal to
 * 
 * @return {Promise} Promise object that resolves totrue if successfully updated, false if not updated
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
 *  (log and date not needed most likely)
 */
export function updateBullet(key, bullet){
	return new Promise((resolve) => {
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
			};
            
			getRequest.onerror = function () {
				console.log.eror(ERR_CANT_GET_BULLET + key);
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
 * getBullet
 * Returns the specified bullet object from the database
 * 
 * @param {(string | number)} key - The key of the bullet to get
 * 
 * @return {Object} The associated bullet, or {} if unable to get bullet
 * 
 * @example getBullet(1);
 */
export function getBullet(key){
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function (){
			let db = request.result;
			let transaction = db.transaction([BULLETDB], "readonly");
			let objStore = transaction.objectStore(BULLETDB);
			let objStoreRequest = objStore.get(Number(key));

			//Bullet object successfully accessed
			objStoreRequest.onsuccess = function (e){
				resolve(e.target.result);
			};
			//Unable to access bullet object
			objStoreRequest.onerror = function(){
				console.log.error(ERR_CANT_GET_BULLET + key);
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
 * deleteBullet
 * Deletes the specified bullet object from the database
 * 
 * @param {(string | number)} key - The key of the bullet to delete
 * 
 * @return {Promise} Promise that resolves true if successful, false if not
 * 
 * @example deleteBullet(1);
 */
export function deleteBullet(key){
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function (){
			let db = request.result;
			let transaction = db.transaction([BULLETDB], "readwrite");
			let objStore = transaction.objectStore(BULLETDB);
			let deleteRequest = objStore.delete(Number(key));

			//Bullet object successfully deleted
			deleteRequest.onsuccess = function() {
				console.log(deleteRequest.result);
				resolve(true);
			};

			//Unable to delete bullet object
			deleteRequest.onerror = function(){
				console.log.error(ERR_CANT_DELETE_BULLET + key);
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
 * getAllPriority
 * Returns an array of all bullets that have the priority property marked
 * as true
 * 
 * @return {Array} an array important bullets
 * 
 * @example getAllPriority()
 */
export function getAllPriority() {
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function(){
			let db = request.result;
			let transaction = db.transaction([BULLETDB], "readonly");
			let objStore = transaction.objectStore(BULLETDB);
			let objStoreRequest = objStore.openCursor(null, "next");
			let matchingBullets = [];
			//Bullet object successfully accessed
			objStoreRequest.onsuccess = function (e){
                
				let cursor = e.target.result;
				if(cursor != null) {
					if(cursor.value.priority == true || cursor.value.priority == "true") {
						matchingBullets.push(cursor.value);
					}
					cursor.continue();
				} else {
					resolve(matchingBullets);
				}
			};
			//Unable to access bullet object
			objStoreRequest.onerror = function(){
				console.log.error(ERR_CANT_ACCESS_BULLET);
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
 * getDailyBullets
 * Returns an array of all bullets for given date
 * 
 * @param {Object} date - a JS Date object
 * @return {Array} an 2d array where the first array contains an array of keys
 *                 and the seocnd array contains the array of bullets
 * example: Array returned is ARRAY
 * key = ARRAY[0][0];
 * object of key is = ARRAY[1][0];
 * 
 * @example getDailyBullets
 */
export function getDailyBullets(date) {
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function(){
			let db = request.result;
			let transaction = db.transaction([BULLETDB], "readonly");
			let objStore = transaction.objectStore(BULLETDB);
			let objStoreRequest = objStore.openCursor(null, "next");
			let matchingBullets = [];
			let matchingKeys = [];
			//Bullet object successfully accessed
			objStoreRequest.onsuccess = function (e){
                
				let cursor = e.target.result;
				if(cursor != null) {
					if (cursor.value.log == "daily") {
						let currDate = cursor.value.date;
						if(currDate.toLocaleDateString("en-US") == date.toLocaleDateString("en-US")) {
							matchingBullets.push(cursor.value);
							matchingKeys.push(cursor.key);
						}
					}
					cursor.continue();
				} else {
					resolve([matchingKeys, matchingBullets]);
				}
			};
			//Unable to access bullet object
			objStoreRequest.onerror = function(){
				console.log.error(ERR_CANT_ACCESS_BULLET);
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
 * getDailyPriority
 * Returns an array of all bullets that have the priority property marked
 * as true for the given date
 * 
 * @param {Object} - date object of current date
 * 
 * @return {Array} an array important bullets for given date
 * 
 * @example getAllPriority()
 */
export function getDailyPriority(date) {
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function(){
			let db = request.result;
			let transaction = db.transaction([BULLETDB], "readonly");
			let objStore = transaction.objectStore(BULLETDB);
			let objStoreRequest = objStore.openCursor(null, "next");
			let matchingBullets = [];
			//Bullet object successfully accessed
			objStoreRequest.onsuccess = function (e){
                
				let cursor = e.target.result;
				if(cursor != null) {
					//checking if it is a priority bullet
					if(cursor.value.priority == true || cursor.value.priority == "true") {
						let currDate = cursor.value.date;
						//checking dates
						if(currDate.toLocaleDateString("en-US") == date.toLocaleDateString("en-US")) {
							matchingBullets.push(cursor.value);
						}
					}
					cursor.continue();
				} else {
					resolve(matchingBullets);
				}
			};
			//Unable to access bullet object
			objStoreRequest.onerror = function(){
				console.log.error(ERR_CANT_ACCESS_BULLET);
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
 * getDailyTodo
 * Returns an array of all bullets that are marked as task and 
 * have the same date
 * 
 * @param {Object} - date object of current date
 * 
 * @return {Array} an array of todo bullets for the day
 * 
 * @example getDailyTodo()
 */
export function getDailyTodo(date) {
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function(){
			let db = request.result;
			let transaction = db.transaction([BULLETDB], "readonly");
			let objStore = transaction.objectStore(BULLETDB);
			let objStoreRequest = objStore.openCursor(null, "next");
			let matchingBullets = [];
			//Bullet object successfully accessed
			objStoreRequest.onsuccess = function (e){
                
				let cursor = e.target.result;
				if(cursor != null) {
					//all uncompeted tasks
					if(cursor.value.type == "task" && cursor.value.completed == false && cursor.value.log == "daily") {
						//Checking dates
						let currDate = cursor.value.date;
						if(currDate.toLocaleDateString("en-US") == date.toLocaleDateString("en-US")) {
							matchingBullets.push(cursor.value);
						}
					}
					cursor.continue();
				} else {
					resolve(matchingBullets);
				}
			};
			//Unable to access bullet object
			objStoreRequest.onerror = function(){
				console.log.error(ERR_CANT_ACCESS_BULLET);
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
 * getMonthlyBullets
 * Returns an array of all bullets that are from the monthly log and have the same month/year
 * 
 * @param {Object} - date object containing month/year we want
 * 
 * @return {Array} a 2d array of monthly bullets and their keys for the month
 * 						-[[Keys], [Bullets]]
 * 
 * @example getMonthlyBullets()
 */
export function getMonthlyBullets(date) {
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function(){
			let db = request.result;
			let transaction = db.transaction([BULLETDB], "readonly");
			let objStore = transaction.objectStore(BULLETDB);
			let objStoreRequest = objStore.openCursor(null, "next");
			let matchingBullets = [];
			let matchingKeys = [];
			//Bullet object successfully accessed
			objStoreRequest.onsuccess = function (e){
                
				let cursor = e.target.result;
				if(cursor != null) {
					//checking whether bullet belongs to the monthly log
					if(cursor.value.log == "monthly") {
						//comparing months
						let currDate = cursor.value.date;
						if(currDate.getMonth() == date.getMonth() && currDate.getFullYear() == date.getFullYear()) {
							matchingBullets.push(cursor.value);
							matchingKeys.push(cursor.key);
						}
					}
					cursor.continue();
				} else {
					resolve([matchingKeys, matchingBullets]);
				}
			};
			//Unable to access bullet object
			objStoreRequest.onerror = function(){
				console.log.error(ERR_CANT_ACCESS_BULLET);
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
 * getFutureBullets
 * Returns an array of all bullets that are the future log, and have the same year
 * 
 * @param {Object} - date object containing the year we want to retrive from
 * 
 * @return {Array} an array of keys and bullets: [[Keys], [Bullets]]
 * 
 * @example getFutureBullets()
 */
export function getFutureBullets(date) {
	return new Promise((resolve) => {
		//opening database
		let request = window.indexedDB.open(DATABASENAME);

		//db opens successfully
		request.onsuccess = function(){
			let db = request.result;
			let transaction = db.transaction([BULLETDB], "readonly");
			let objStore = transaction.objectStore(BULLETDB);
			let objStoreRequest = objStore.openCursor(null, "next");
			let matchingBullets = [];
			let matchingKeys = [];
			//Bullet object successfully accessed
			objStoreRequest.onsuccess = function (e){
                
				let cursor = e.target.result;
				if(cursor != null) {
					//all future bullets
					if(cursor.value.log == "future") {
						//Checking year
						let currDate = cursor.value.date;
						if(currDate.getFullYear() == date.getFullYear()) {
							matchingBullets.push(cursor.value);
							matchingKeys.push(cursor.key);
						}
					}
					cursor.continue();
				} else {
					resolve([matchingKeys, matchingBullets]);
				}
			};
			//Unable to access bullet object
			objStoreRequest.onerror = function(){
				console.log.error(ERR_CANT_ACCESS_BULLET);
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

module.exports = {
    createDB, 
    createBullet, 
    updateBullet, 
    getBullet, 
    deleteBullet, 
    getAllPriority, 
    getDailyBullets, 
    getDailyTodo, 
	getDailyPriority,
	getMonthlyBullets,
	getFutureBullets
};