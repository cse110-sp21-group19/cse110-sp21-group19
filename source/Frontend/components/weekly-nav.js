//weekly-nav.js
import { NOTEBULLET, TASKBULLET, TASKCOMPLETE, EVENTBULLET} from "./main-text.js";

const SELECTEDBORDERLEFT = "0.5rem solid darkgreen";
const SELECTEDRADIUS = "0.2rem";
const DEFAULTBORDERLEFT = null;
const DEFAULTRADIUS = null;

//<weekly-nav> custom web component
class WeeklyNav extends HTMLElement{
	constructor() {
		super();
		const template = document.createElement("template");

		template.innerHTML = `
			<h2 class="weekly-nav-title"></h2>
			<div class="week-container">
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
		linkElem.setAttribute("href", "style/css/weeklynav.css");
		
		// dark mode class
		if (document.body.className == "dark-mode") {
			const CONTAINER = this.shadowRoot.querySelector(".week-container");
			CONTAINER.className += " dark-mode";
		}

		// Attach the created elements to the shadow dom
		shadow.appendChild(linkElem);
		
	}


	/**
	 * set daysOfWeek takes in an array of objects which contains date objects of a week 
	 * and fills the weekly nav menu with objects corresponding to those days. Those date
	 * objects could also contain important bullet info to fill menu.
	 * 
	 * @param {Array} week - an array of objects corresponding to one week
	 * example object
	 * dayObj = {
	 * 		date: date;
	 * 		bullets: [];
	 * }
	 * @example
	 *      this.daysOfWeek = week
	 */
	set daysOfWeek(week){
		console.log(week);
		//set the weekly-nav title
		const navTitle = this.shadowRoot.querySelector("[class='weekly-nav-title']");
		navTitle.innerHTML = getWeeklyNavTitle(week[0].date, week[6].date);
		const navContainer = this.shadowRoot.querySelector(".week-container");
		//Add each day to the nav menu
		week.forEach(element => {
			let day = getDateString(element.date.getDay());
			let date = element.date.getDate();
			let month = element.date.getMonth();
			let year = element.date.getFullYear();
			let bullets = element.bullets;

			let priorityBullets = document.createElement("div");
			priorityBullets.className = "wn-bullets-container";

			appendBullets(priorityBullets, bullets);

			let navItem = document.createElement("div");
			navItem.className = "wn-item";
			/*
			// dark mode class
			if (document.body.className == "dark-mode") {
				navItem.className += " dark-mode";
			}
			*/


			let navDate = document.createElement("div");
			navDate.className = "wn-date";
			let dayOfWeek = document.createElement("span");
			dayOfWeek.id = "day-of-week";
			dayOfWeek.textContent = day;
			let dayOfMonth = document.createElement("span");
			dayOfMonth.id = "day-of-month";
			dayOfMonth.textContent = date;

			//create hidden month object in order to retrieve it later on click
			let hiddenMonth = document.createElement("p");
			hiddenMonth.className = "wn-month";
			hiddenMonth.textContent = month;

			let hiddenYear = document.createElement("p");
			hiddenYear.className = "wn-year";
			hiddenYear.textContent = year;

			navDate.appendChild(dayOfMonth);
			navDate.appendChild(dayOfWeek);

			navItem.appendChild(navDate);
			navItem.appendChild(hiddenMonth);
			navItem.appendChild(hiddenYear);
			navItem.appendChild(priorityBullets);


			navContainer.appendChild(navItem);

		}); 

	
	}/* set daysOfWeek */

	/**
	 * get selectedInfo
	 * get the date info of the item selected
	 * @param {}
	 * @returns a date object containing the date info of the current selected item in the 
	 * weekly nav menu
	 * 
	 * @example
	 *      this.selectedInfo
	 */
	get selectedInfo() {

		const navContainer = this.shadowRoot.querySelector(".week-container");

		//iterate over weekly nav items and return info of item with border
		//(the one with a border is the selected one) 
		let dateInfo;
		let dateObj;
		for(let i = 1; i < navContainer.childNodes.length; i++){
			let currItem = navContainer.childNodes[i];
			if(currItem.style.borderLeft == SELECTEDBORDERLEFT){
				dateInfo = {
					"day": currItem.querySelector("[class='wn-date']").querySelector("[id='day-of-week']").textContent,
					"date": currItem.querySelector("[class='wn-date']").querySelector("[id='day-of-month']").textContent,
					"month": currItem.querySelector("[class='wn-month']").textContent,
					"year": currItem.querySelector("[class='wn-year']").textContent
				};

				dateObj = new Date(dateInfo.year, dateInfo.month, dateInfo.date);
			}
		}
		return dateObj;
	}/* get selectedInfo */

	/**
	 * set selectedDay 
	 * Set an item in the list as selected.
	 * 
	 * @param {number} day - The day of the week of the item that is to be styled as selected.
	 * 
	 * @example
	 *      this.selectedDay = day
	 */
	set selectedDay(day){
		const navContainer = this.shadowRoot.querySelector(".week-container");

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

	set updatePriorityBullets(bullets) {
		const navContainer = this.shadowRoot.querySelector("[class='week-container']");
		for (let i = 1; i < navContainer.childNodes.length; i++) {
			let currItem = navContainer.childNodes[i];
			if (currItem.style.borderLeft == SELECTEDBORDERLEFT) {
				let priorityBullets = navContainer.childNodes[i].querySelector(".wn-bullets-container");
				//remove existing children
				while (priorityBullets.firstChild) {
					priorityBullets.removeChild(priorityBullets.firstChild);
				}
				//repopulate list
				appendBullets(priorityBullets, bullets);
			}
		}
	}
}


/**
 * appendBullets()
 * Helper function to help populate the priority bullets list on each weekly nav item.
 * 
 * @param {Element} container - The element in which to append the bullets to
 * @param {Array} bullets - An array of bullet entry objects to append to container
 * 
 * @example
 * 	appendBullets(container, bullets);
 */
function appendBullets(container, bullets){
	bullets.forEach(bullet => {
		let bulletElem = document.createElement("div");
		bulletElem.className = "wn-bullet";
		let bulletType = document.createElement("span");
		bulletType.id = "bullet-type";
		//bullet icon depending on the bullet type
		switch (bullet.type){
		case "note":
			bulletType.innerHTML = NOTEBULLET;
			break;
		case "event":
			bulletType.innerHTML = EVENTBULLET;
			break;
		case "task":
			if(bullet.completed){
				bulletType.innerHTML = TASKCOMPLETE;
				bulletElem.style.textDecoration = "line-through";
			}
			else{
				bulletType.innerHTML = TASKBULLET;
			}
			break;
		default:
			bulletType.innerHTML = NOTEBULLET;

		}
		bulletElem.appendChild(bulletType);
		bulletElem.innerHTML += bullet.content;
		container.appendChild(bulletElem);
	});
} /* appendBullets */

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

/**
 * getWeeklyNavTitle 
 * Formats the title on top of the weekly nav menu.
 * Also address edge case if week is between two months and/or two years.
 * 
 * @param {Date} first - A date object referring to the first day of the week.
 * @param {Date} last - A date object referring to the last day of the week.
 * 
 * @returns A string of the correct title in the format "Month, Year" or 
 * "Month1/Month2, Year" or "Month1/Month2, Year1/Year2".
 * 
 * @example
 *      getWeekyNavTitle(first, last)
 */
function getWeeklyNavTitle(first, last){
	let title = "";
	const months= ["January","February","March","April","May","June","July",
		"August","September","October","November","December"];
	if(first.getMonth() == last.getMonth()){
		title += months[first.getMonth()];
	}
	else{
		title +=  months[first.getMonth()] + "/" + months[last.getMonth()];
	}

	if(first.getFullYear() == last.getFullYear()){
		title += " " + first.getFullYear();
	}
	else{
		title += " " + first.getFullYear() + "/" + last.getFullYear();
	}

	return title;
}/* getWeeklyNavTitle */

// Define a custom element for the weekly nav web component   
customElements.define("weekly-nav", WeeklyNav);