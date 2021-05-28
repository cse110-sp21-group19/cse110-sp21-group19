import {createDB} from './bullet_api';

/* ---TESTING--- */

/* -----CREATING DATABASE----- */
let create = document.getElementById("create", createDB);
create.addEventListener("click", createDB);

let addBtn = document.getElementById("add");
addBtn.addEventListener("click", (event) => {
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

let get = document.getElementById("get");
get.addEventListener("click", async function(event){
    let key = document.getElementById("key").value;
    let result = await getBullet(Number(key));
    console.log(result);
});

let deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", async () => {
    let key = document.getElementById("key").value;
    let result = await deleteBullet(Number(key));/* .then(result => {
        console.log(`Deleted?: ${result}`);
    }); */
    console.log(`Deleted: ${result}`);
});