# indexedDB notes:
indexedDB is noSQL or document-based database meaning it doesn't actually have any relational tables but instead something called **object stores**.

## Obejct Stores:
Object store is the foundation of indexedDB. Similar to relational databases, **an object store is basically the same as a database table**. "Object stores include one or more indices that operate as a key/pair value in the store and provide a way to quickly locate data". 

You must select a key type for an object store. There are two types of keys: "in-line" and "out-of-line". An in-line key is dependent on the data. For example, the emailAddress column can be used as an in-line key. This key cannot be repeated and enforces uniqueness. So only one unique email can exist in the database. Out-of-line keys are unique keys that are independent of the data (in other words no related to the data).

## Transactions:
Interaction with the database must be in the context of a transaction. "Transaction scopes affect one or more object stores at a time and you define this by passing in an array of object store names in to the function that creates a transaction scope. The secondary argument involved in creating a transaction is the transaction mode."

Transactions use up a lot of resources, so when we are not chaging any of the data, specify as *read-only mode*.

~~~
// mode can either be 'readonly' or 'readwrite'
transaction = db.transaction([list of objectStores], mode);
~~~

## Requests and lifecycle:
"Each operation against the database is described as involving a request to open the database, access an object store, and so on."

![image](https://user-images.githubusercontent.com/21044142/118936816-bc49ef80-b901-11eb-9fc3-ca6e110ce1a2.png)

BETTER OPEN REQUEST WORKFLOW CHART:
![image](https://user-images.githubusercontent.com/21044142/118943960-f7035600-b908-11eb-8485-05bd4417fa99.png)

All intereactions with the database must begin with an **open** request. When opening a database, you pass in a name and a version.
~~~
// opening databse
let request = window.indexedDB.open("name", versionNum);
~~~

During the **open** request, the version number is checked.

- **Database doesn't exist, or current version is greater than requested**: the **upgradeneeded** event is fired.
  - "During the upgrade needed event, you have an opportunity to manipulate object stores by adding or removing stores, keys, and indices."

~~~
//example
request.onupgradeneeded = function(event) {
    // Save the IDBDatabase interface
    let db = request.result;

    // Create an objectStore for this database
    let store = db.createObjectStore("NoteStore", {
        autoIncrement: true
    });
};
~~~

- **Database version is equal to the current version**: **upgradeneeded** event not fired and successful (**onsuccess** event is fired).

- **Database version is less than requested version**: FAIL to open database (**onerror** event fired?)
  - opening a database has a third event **onerror** that handles any errors.

# Database design (object stores)
~~~
Object Stores:
BulletDB:
{
    log: (‘daily’, ‘monthly’, ‘future’)
    type: (‘note’, ‘event’, ‘type’)
    date:
    priority: (true or false)
    content: 
    completed:
    Parent/Indent: (will either be id of parent or how many times to indent)
}

EntriesDB:
{
    Date: ‘05/20/2021’,
    Order:
    Media:
    Type: 
}

FRONTEND BULLET ENTRY ATTRIBUTES:
let entry = {
    "type": BULLETTYPE.value,
    "date": new Date(Date.now()),
    "content": BULLETINPUT.value,
    "priority": false,
    "completed": false
};
~~~

# API Functions:

- createDB(): creates the Databse with 2 stores, bulletStore entriesStore
- createBUllet():

# Other Resources:
IndexedDB demo: https://github.com/craigshoemaker/webstorage-indexeddb

Storing media: https://hacks.mozilla.org/2012/02/storing-images-and-files-in-indexeddb/

Compound indexes: https://stackoverflow.com/questions/16501459/javascript-searching-indexeddb-using-multiple-indexes

Intro to indexeddb: https://www.codemag.com/Article/1411041/Introduction-to-IndexedDB-The-In-Browser-Database

# Updates:

- Completed:
  - createBullet working, createDB, 
- Stuck on:
  - updateBullet: getting the bullet from key gave us undefined, so we moved onto getBullet
  - getBullet: return value shows up as undefined, but when we log it right before we return it is object, something todo with async

### Thursday TODO:
- [ ] Finish function headers
- [ ] Figure out children, think about that
- [ ] GetbyDate functions
- [ ] Finish the rest of the entries_api
- [ ] export to testing file