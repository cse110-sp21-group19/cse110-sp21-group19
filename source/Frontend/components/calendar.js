//calendar.js

import { MONTHS } from '../components/log-type.js';

/**
 * Class represting custom calendar web component
 * @extends HTMLElement
 * 
 * @example
 * <calendar-component>
 */
class Calendar extends HTMLElement {

	/**
	 * Create a calendar component skeleton
	 */
	constructor() {
		super();
		const template = document.createElement("template");

		//list items are weird to get rid of small space in between items
		//source: https://css-tricks.com/fighting-the-space-between-inline-block-elements/
		template.innerHTML = `
			<div class="cal-container">
				<div class="calendar">
					<div class="month"></div>

					<ul class="weekdays">
						<li>Su</li
						><li>Mo</li
						><li>Tu</li
						><li>We</li
						><li>Th</li
						><li>Fr</li
						><li>Sa</li>
					</ul>

					<ul class="days">
					</ul>
				</div>
			</div>
		`;

		// create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		// Apply external styles to the shadow dom
		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		// NOTE: it's important that you do NOT include the slash before "style/css/..."
		linkElem.setAttribute("href", "style/css/calendar.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(linkElem);
        
	}

	/**
	 * set month
	 * This function fills the contents of the calendar component to the month
	 * according to the parameter
	 * 
	 * @param {Date} date - a date object to the first day of a month
	 */
	set month(date) {
		let month = date.getMonth();
		let firstDay = date.getDay();
		const shadow = this.shadowRoot;
		shadow.querySelector(".month").textContent= MONTHS[month];
		//empty day boxes
		for (let i = 0; i < firstDay; i++) {
			let emptyDay = document.createElement("li");
			emptyDay.className = "empty-day";
			shadow.querySelector(".days").appendChild(emptyDay);
		}

		//fill calendar with dates
		let currDate = new Date(date);
		while (currDate.getMonth() === month) {
			let newDay = document.createElement("li");
			newDay.className = "day";
			newDay.textContent = currDate.getDate();
			shadow.querySelector(".days").appendChild(newDay);
			currDate.setDate(currDate.getDate() + 1);
		}
	}/* set month */

	/**
	 * set currentDay
	 * sets special styling for whatever day is the current day
	 * 
	 * @param {Date} date - a date object for today
	 */
	set currentDay(date) {
		let selectedDay = date.getDate();
		const shadow = this.shadowRoot;
		shadow.querySelector(".days").childNodes.forEach(day => {
			if (day.className == "day") {
				if (day.textContent == selectedDay) {
					day.classList.add("current-day");
				}
				else {
					day.classList.remove("current-day");
				}
			}
		})
	}/* set currentDay */

}/* Calendar */
 
// Define a custom element for the bullet-entry web component   
customElements.define("calendar-component", Calendar);