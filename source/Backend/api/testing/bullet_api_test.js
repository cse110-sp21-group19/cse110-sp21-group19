import { createDB, createBullet, getBullet, updateBullet, deleteBullet, getAllPriority, getDailyBullets, getDailyPriority, getDailyTodo } from "../bullet_api.js";
import { createDefault, updateMode, getMode } from "../settings_api.js";

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
	let date = new Date(document.getElementById("date").value);
	let priority = Boolean(document.getElementById("priority").value);
	let content = document.getElementById("content").value;
	let completed = Boolean(document.getElementById("completed").value);
	let level = document.getElementById("level").value;

	let bulletExample = {
		"log": log,
		"type": type,
		"date": date,
		"priority": priority,
		"content": content,
		"completed": completed,
		"level": level
	};

	//example
	let key = await createBullet(bulletExample);
	console.log(key);

	//this also works
	//createBullet(bulletExample).then((result) => console.log(result));

});

/* -----GETTING BULLET----*/
let get = document.getElementById("get");
get.addEventListener("click", async function(){
	let key = document.getElementById("key").value;
	let result = await getBullet(Number(key));
	console.log(result);

	createDefault();

});

/* -----UPDATING BULLET----*/
let update = document.getElementById("update");
update.addEventListener("click", async function(){
	let log = document.getElementById("log").value;
	let type = document.getElementById("type").value;
	let date = new Date(document.getElementById("date").value);
	let priority = Boolean(document.getElementById("priority").value);
	let content = document.getElementById("content").value;
	let completed = Boolean(document.getElementById("completed").value);
	let level = document.getElementById("level").value;

	let bulletExample = {
		"log": log,
		"type": type,
		"date": date,
		"priority": priority,
		"content": content,
		"completed": completed,
		"level": level
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

	/* 	let key = document.getElementById("key").value;
	let result = await deleteBullet(Number(key));/* .then(result => {
        console.log(`Deleted?: ${result}`);
    }); 
	console.log(`Deleted: ${result}`); */

	updateMode(true);

	let test = await getMode();
	console.log(test);

}); 

/* ----BULLET GETTERS----- */
let importantBtn = document.getElementById("important");
importantBtn.addEventListener("click", ()=> {
	getAllPriority().then((result) => {
		console.log(result);
	});
});

/* Daily bullets */
let dailyBtn = document.getElementById("daily");
dailyBtn.addEventListener("click", () => {
	let date = new Date(document.getElementById("dateget").value);
	getDailyBullets(date).then((result) => {
		console.log(result);
	});
});

/* important daily bullets */
let dailyImptBtn = document.getElementById("dailypriority");
dailyImptBtn.addEventListener("click", () => {
	let date = new Date(document.getElementById("dateget").value);

	getDailyPriority(date).then((result) => {
		console.log(result);
	});
});

/* daily todo bullets */
let dailyTodoBtn = document.getElementById("dailytodo");
dailyTodoBtn.addEventListener("click", () => {
	let date = new Date(document.getElementById("dateget").value);
    
	getDailyTodo(date).then((result) => {
		console.log(result);
	});
});