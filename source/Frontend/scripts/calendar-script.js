
//calendar-script.js

import { router } from "./router.js";

/**
 * createCalendar
 * creates a calendar web component and adds it to the webpage
 * 
 * @param {Date} date date object to the first day of a month
 */
export function createCalendar(date){
	const CAL = document.createElement("calendar-component"); 
	CAL.month = date;
	CAL.currentDay = new Date();
	document.getElementById("calendar-component-container").appendChild(CAL);
	document.getElementById("calendar-component-container").className += " active";
	CAL.shadowRoot.querySelector(".days").addEventListener("click", (event)=>{
		if(event.target.className == "day"){
				const LOGTYPE = document.querySelector("log-type");
				let day = event.target.textContent;
				let month = LOGTYPE.readLog.date.getMonth();
				let year = LOGTYPE.readLog.date.getFullYear();
				let selectedDate = new Date(year, month, day);
				router.setState("daily", false, selectedDate, "monthly");
		}
	});
}

