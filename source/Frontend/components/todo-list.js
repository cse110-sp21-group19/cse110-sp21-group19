//todo-list.js

import { TASKBULLET, TASKCOMPLETE } from "./icons.js";
import { DAYS } from "./log-type.js"

/**
 * Class represting a custom todolist component
 * @extends HTMLElement
 * 
 * @example
 * <todo-list>
 */
class TodoList extends HTMLElement{

	/**
	 * Create a skeleton todolist component, starts off as empty
	 */
	constructor() {
		super();
		const template = document.createElement("template");

		template.innerHTML = `
			<h2 class="todo-title">To-Do List</h2>
			<div class="todo-container">
				<div class ="scroll-container">
					<div class="todo-item">
						<div class="no-items">Nothing To Do!</div>
					</div>
				</div>
			</div>
		`;

		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		// Apply external styles to the shadow dom
		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		// NOTE: it's important that you do NOT include the slash before "style/css/..."
		linkElem.setAttribute("href", "style/css/todo.css");

		// dark mode class
		if (document.body.className == "dark-mode") {
			const TODOITEM = this.shadowRoot.querySelector(".todo-item");
			TODOITEM.className += " dark-mode";
		}

		// Attach the created elements to the shadow dom
		shadow.appendChild(linkElem);
		
	}


	/**
	 * set todoList
	 * This function fills the contents of the todo list component with an array
	 * of arrays of task bullet items
	 * 
	 * @param {Array} list - array of arrays of bullets items of type task
	 * 
	 * @example
	 * todo-list.todoList = bullets[];
	 */
	set todoList(list){
		const scrollContainer = this.shadowRoot.querySelector(".scroll-container");

		//If the list is not empty
		 if (list.length > 0) {
			 //get rid of empty marker
		 	scrollContainer.innerHTML = "";
			list.forEach(element => {
				let day = DAYS[element.date.getDay()];
				let date = element.date.getDate();
				let bullets = element.bullets;

				//put bullets in bullet section
				let todoBullets = document.createElement("div");
				todoBullets.className = "todo-bullets-container";
				bullets.forEach(bullet=>{
					let bulletElem = document.createElement("div");
					bulletElem.className = "todo-bullet";
					let bulletType = document.createElement("span");
					bulletType.id = "bullet-type";
					if(bullet.completed){
						bulletType.innerHTML = TASKCOMPLETE;
						bulletElem.style.textDecoration = "line-through";
					}
					else{
						bulletType.innerHTML = TASKBULLET;
					}
		
					bulletElem.appendChild(bulletType);
					bulletElem.innerHTML += bullet.content;
					todoBullets.appendChild(bulletElem);
				});

				//date section
				let todoItem = document.createElement("div");
				todoItem.className = "todo-item";
				// dark mode class
				if (document.body.className == "dark-mode") {
					todoItem.className += " dark-mode";
				}

				let todoDate = document.createElement("div");
				todoDate.className = "todo-date";
				let dayOfWeek = document.createElement("span");
				dayOfWeek.id = "day-of-week";
				dayOfWeek.textContent = day;
				let dayOfMonth = document.createElement("span");
				dayOfMonth.id = "day-of-month";
				dayOfMonth.textContent = date;

				todoDate.appendChild(dayOfMonth);
				todoDate.appendChild(dayOfWeek);

				todoItem.appendChild(todoDate);
				todoItem.appendChild(todoBullets);

				scrollContainer.appendChild(todoItem);

			});
		}
	}/* set todoList */	
}/* TodoList */

// Define a custom element for the todolist web component
customElements.define("todo-list", TodoList);