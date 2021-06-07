//todolist.js

//TODO: Complete this webcomponent
class TodoList extends HTMLElement{
	constructor() {
		super();
		const template = document.createElement("template");

		//TODO: Fix the styling
		template.innerHTML = `
			<h2 class="todo-title">To-Do List</h2>
			<div class="todo-container">
			</div>
		`;

		//Week Item format
		// <div class="wn-item-mask">
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

		//TODO
	}

}

customElements.define("todo-list", TodoList);