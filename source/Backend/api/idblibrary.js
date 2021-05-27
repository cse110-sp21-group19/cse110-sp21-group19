import { openDB/* , deleteDB, wrap, unwrap  */} from 'https://unpkg.com/idb?module';

//CONSTANTS
const DATABASENAME = "BuJoDatabase";
const BULLETDB = "bulletDB";
const ERR_DB_NOT_CREATED = "ERROR: Database hasn't been created!";
const ERR_CANT_GET_BULLET = "ERROR: Unable to access bullet with key: ";
const ERR_CANT_DELETE_BULLET = "ERROR: Unable to delete bullet with key: ";

async function createDB() {
    const db = await openDB(DATABASENAME, 1, {
        upgrade(db) {
            //create stores
            const bulletStore = db.createObjectStore(BULLETDB, { autoIncrement: true }); 
                
            // defining columns in BulletStore
            //orderId, log, type, date, priority, content, completed
            bulletStore.createIndex("log", "log", { unique: false });
            bulletStore.createIndex("type", "type", { unique: false });
            bulletStore.createIndex("date", "date", { unique: false });
            bulletStore.createIndex("priority", "priority", { unique: false });
            bulletStore.createIndex("content", "content", { unique: false });
            bulletStore.createIndex("completed", "completed", { unique: false });
            bulletStore.createIndex("orderId", "orderId", { unique: false });
        }
    })
}

async function createBullet(bullet) {
    //opening database
    let db = await openDB(DATABASENAME);

    /* let transaction = db.transaction(BULLETDB, "readwrite");
    let store = transaction.objectStore(BULLETDB); */

    let key = await db.add(BULLETDB, bullet);
    return key;
}


/* -----TESTING----- */
let create = document.getElementById("create");
create.addEventListener("click", createDB);

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

    createBullet(bulletExample).then(function(result) {
        console.log(`Key: ${result}`);
    });
    
});
