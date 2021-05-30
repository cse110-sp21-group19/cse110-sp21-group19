import { createDB, createBullet, getBullet, updateBullet, deleteBullet, getAllPriority, getDailyBullets } from './bullet_api.js';

/* TESTING BULLET API */

/* -----CREATING DATABASE----- */
 let create = document.getElementById("create", createDB);
create.addEventListener("click", createDB);

/* -----CREATING BULLET---- */
let addBtn = document.getElementById("add");
addBtn.addEventListener("click", async (event) => {
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

    //example
    let key = await createBullet(bulletExample);
    console.log(key);

    //this also works
    //createBullet(bulletExample).then((result) => console.log(result));

});

/* -----GETTING BULLET----*/
let get = document.getElementById("get");
get.addEventListener("click", async function(event){
    let key = document.getElementById("key").value;
    let result = await getBullet(Number(key));
    console.log(result);
});

/* -----UPDATING BULLET----*/
let update = document.getElementById("update");
update.addEventListener("click", async function(event){
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
    let result = await updateBullet(Number(key), bulletExample);
    console.log(result);
});

/* -----DELETING BULLET----*/
let deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", async () => {
    let key = document.getElementById("key").value;
    let result = await deleteBullet(Number(key));/* .then(result => {
        console.log(`Deleted?: ${result}`);
    }); */
    console.log(`Deleted: ${result}`);
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
    //parsing date input value to mm/dd/year format
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