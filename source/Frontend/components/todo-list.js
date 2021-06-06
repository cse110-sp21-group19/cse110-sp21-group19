import { TASKBULLET, TASKCOMPLETE } from "./main-text.js";

class TodoList extends HTMLElement{
	constructor() {
		super();
		const template = document.createElement("template");

		template.innerHTML = `
			<h2 class="todo-title">To-Do List</h2>
			<div class="todo-container">
			</div>
		`;

		//ToDo Item format
		// 
		// <div class="wn-item">
		//     <h2 class="wn-date"><span id="day-of-month"></span><span id="day-of-week"></span> </h2>
		//     <ul class="wn-bullets"></ul>
		// </div>
		// create a shadow root for this web component

		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		// Apply external styles to the shadow dom
		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		// NOTE: it's important that you do NOT include the slash before "style/css/..."
		linkElem.setAttribute("href", "style/css/todo.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(linkElem);
		
	}


	set todoList(list){
		const todoContainer = this.shadowRoot.querySelector(".todo-container");
		
		let scrollContainer = document.createElement("div");
		scrollContainer.className = "scroll-container";
		console.log(todoContainer);
		list.forEach(element =>{
			let day = getDateString(element.date.getDay());
			let date = element.date.getDate();
			let bullets = element.bullets;

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
			})


			let todoItem = document.createElement("div");
			todoItem.className = "todo-item";

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

			console.log(todoItem);
			scrollContainer.appendChild(todoItem);

		});
		todoContainer.appendChild(scrollContainer);
	}

	
}

/**
 * getDateString 
 * Converts integer day of week to its related string.
 * 
 * @param {number} day - An integer of the day of the week (0-6).
 * 
 * @returns A string of the related day of the week of the parameter.
 * 
 * @example
 *      getDateString(day)
 */
 function getDateString(day){
	switch(day){
	case 0:
		return "Sunday";
	case 1:
		return "Monday";
	case 2:
		return "Tuesday";
	case 3:
		return "Wednesday";
	case 4:
		return "Thursday";
	case 5:
		return "Friday";
	case 6:
		return "Saturday";
	default:
		return "Sunday";
	}
}/* getDateString */

customElements.define("todo-list", TodoList);