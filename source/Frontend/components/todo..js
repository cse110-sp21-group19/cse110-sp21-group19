const SELECTEDBORDERLEFT = "0.5rem solid darkgreen";
const SELECTEDRADIUS = "0.2rem";
const DEFAULTBORDERLEFT = null;
const DEFAULTRADIUS = null;

class ToDo extends HTMLElement{
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

	/*
	 * get selectedInfo
	 * get the date info of the item selected
	 * @param {}
	 * @returns an object containing the date info of the current selected item in the 
	 * weekly nav menu
	 * 
	 * @example
	 *      this.selectedInfo
	 */
	get selectedInfo (){

		const navContainer = this.shadowRoot.querySelector("[class='week-container']");

		//iterate over weekly nav items and return info of item with border
		//(the one with a border is the selected one) 
		let dateObj;
		for(let i = 1; i < navContainer.childNodes.length; i++){
			let currItem = navContainer.childNodes[i];
			if(currItem.style.borderLeft == SELECTEDBORDERLEFT){
				dateObj = {
					"day": currItem.querySelector("[class='wn-date']").querySelector("[id='day-of-week']").textContent,
					"date": currItem.querySelector("[class='wn-date']").querySelector("[id='day-of-month']").textContent,
					"month": currItem.querySelector("p").textContent
				};
			}
		}
		return dateObj;
	}/* get selectedInfo */

	/*
	 * set selectedDay 
	 * set an item in the list as selected
	 * 
	 * @param {number} day - the day of the week of the item that is to be styled as selected
	 * 
	 * @example
	 *      this.selectedDay = day
	 */
	set selectedDay(day){
		const navContainer = this.shadowRoot.querySelector("[class='week-container']");

		for(let i = 1; i < navContainer.childNodes.length; i++){
			if(i == day){
				navContainer.childNodes[i].style.borderTopLeftRadius = SELECTEDRADIUS;
				navContainer.childNodes[i].style.borderBottomLeftRadius = SELECTEDRADIUS;
				//navContainer.childNodes[i].style.border = "0.2rem solid darkgreen";
				navContainer.childNodes[i].style.borderLeft = SELECTEDBORDERLEFT;
			}
			else{
				navContainer.childNodes[i].style.borderTopLeftRadius = DEFAULTRADIUS;
				navContainer.childNodes[i].style.borderBottomLeftRadius = DEFAULTRADIUS;
				navContainer.childNodes[i].style.borderLeft = DEFAULTBORDERLEFT;
			}
		}
	} /* set seletedDay */
}


/**
 * getDateString 
 * converts integer day of week to its related string
 * 
 * @param {number} day - An integer of the day of the week (0-6)
 * 
 * @returns A string of the related day of the week of the parameter
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

customElements.define("todo", ToDo);