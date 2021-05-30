
//calendar-script.js

/**
 * createCalendar
 * creates a calendar web component and adds it to the webpage
 * 
 * @param {Date} date date object to the first day of a month
 */
export function createCalendar(date){
	const CAL = document.createElement("calendar-component");
	CAL.month = date;
	document.getElementById("weekly-nav-container").appendChild(CAL);
}

