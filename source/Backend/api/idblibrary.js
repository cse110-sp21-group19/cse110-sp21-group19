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
    let key = await db.add(BULLETDB, bullet);
    db.close();
    return key;
}

async function getBullet(key) {
    let db = await openDB(DATABASENAME);
    let bullet = await db.get(BULLETDB, Number(key));
    db.close()//probably this might be uncessary
    return bullet;
    
}

async function updateBullet(key, bullet) {
    //Not needed to for a bullet: Log, date,
    let priority = bullet.priority;
    let content = bullet.content;
    let completed = bullet.completed;
    let type = bullet.type;
    let children = bullet.children;

    let db = await openDB(DATABASENAME);
    let currentBullet = await db.get(BULLETDB, Number(key));

    //updating bullet
    if (currentBullet !== undefined) {
        currentBullet.priority = priority;
        currentBullet.content = content;
        currentBullet.completed = completed;
        currentBullet.type = type;
        currentBullet.children = children;    

        try {
            await db.put(BULLETDB, currentBullet, Number(key));
            return true;
        } catch (error) {
            console.error("Unable to update bullet");
            return false;
        }
    //updating a nonexistent bullet
    } else {
        return false;
    }


}

async function deleteBullet(key) {
    let db = await openDB(DATABASENAME);
    let result = await db.delete(BULLETDB, Number(key));
    console.log(result);
    if (result !== undefined) {
        result.then(() => {
            console.log("hello2");
            return true;
        }).catch(() => {
            console.log("hello");
            return false;
        });
    } else {
        console.log("hello1");
        return false;
    }
}   

/* ----DIFFERENT TYPES OF GETTERS---- */
//gets all important bullets
async function getAllPriority() {
    let db = await openDB(DATABASENAME);
    let importantBullets = await db.getAllFromIndex(BULLETDB, "priority", "true");
    
    return importantBullets;
}

async function getDailyBullets(date) {
    let db = await openDB(DATABASENAME);
    let dailyBullets = await db.getAllFromIndex(BULLETDB, "date", date);
    
    return dailyBullets;
}

/* -----TESTING----- */
let create = document.getElementById("create");
create.addEventListener("click", createDB);

/* ----ADDING BULLET----- */
let add = document.getElementById("add");
add.addEventListener("click", (event) => {
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

/* ----GETTING BULLET----- */
let getBtn = document.getElementById("get");
getBtn.addEventListener("click", ()=> {
    //make sure the key is a number
    let key = Number(document.getElementById("key").value);
    let result = getBullet(key);
    result.then(function (result) {
        console.log(result);
    });    
});


/* ----UPDATING BULLET----- */
let updateBtn = document.getElementById("update");
updateBtn.addEventListener("click", () => {
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
    let isUpdated = updateBullet(key, bulletExample);
    isUpdated.then((result) => {
        console.log(`Updated?: ${result}`);
    });
});

/* ----DELETE BULLET----- */
let deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", () => {
    let key = document.getElementById("key").value;
    deleteBullet(key).then(result => {
        console.log(`Deleted?: ${result}`);
    })
});

/* ----BULLET GETTERS----- */
let importantBtn = document.getElementById("important");
importantBtn.addEventListener("click", ()=> {
    getAllPriority().then((result) => {
        console.log(result);
    })
})

let dailyBtn = document.getElementById("daily");
dailyBtn.addEventListener("click", () => {
    let date = document.getElementById("dateget").value;
    let splitDate = date.split("-");
    let year = splitDate[0];
    let month = splitDate[1];
    let day = splitDate[2];

    let formattedDate = `${month}/${day}/${year}`;

    getDailyBullets(formattedDate).then((result) => {
        console.log(result);
    });
});
