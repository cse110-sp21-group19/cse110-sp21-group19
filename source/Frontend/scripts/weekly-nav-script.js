//weekly nav script

import {router} from "./router.js";
let today = new Date();
createWeeklyNav(today);
let WEEKLYNAV = document.querySelector("weekly-nav");
WEEKLYNAV.shadowRoot.querySelector("[class='week-container']").style.opacity = "1";
WEEKLYNAV.shadowRoot.querySelector("[class='weekly-nav-title']").style.opacity = "1";
/**
 * createWeeklyNav
 * Takes in a date and creates a weekly nav component from that date and 
 * appends it to the screen.
 * 
 * @param {Date} date - Date object to make the weekly nav menu around.
 * 
 * @example
 *  createWeeklyNav(date)
 */
export function createWeeklyNav(date) {
	//adding weekly navigation web component
	let week = createDaysOfWeekArray(date);
	const WEEKLYNAV = document.createElement("weekly-nav");
	WEEKLYNAV.daysOfWeek = week;
	WEEKLYNAV.selectedDay = date.getDay() + 1;
	document.getElementById("weekly-nav-container").appendChild(WEEKLYNAV);
	//Onclick listener for the items inside the weekly nav
	WEEKLYNAV.shadowRoot.querySelector("[class='week-container']").style.opacity = "0";
	WEEKLYNAV.shadowRoot.querySelector("[class='weekly-nav-title']").style.opacity = "0";
	const weeklyNavContainer = WEEKLYNAV.shadowRoot.querySelector("[class='week-container']");
	weeklyNavContainer.addEventListener("click", (event)=>{
		if(event.target.className == "wn-item"){
			//which day was selected
			let index = [].indexOf.call( weeklyNavContainer.childNodes, event.target);
			WEEKLYNAV.selectedDay = index;

			//get the newly selected date and update router
			let selectedDate = WEEKLYNAV.selectedInfo;
			router.setState("daily-log", false, selectedDate, "weekly-nav");
           
		}

	});
} /* createWeeklyNav */


/**
 * createDaysofWeekyArray 
 * Creates an array of days of the week for a given week.
 * 
 * @param {Date} date - A date object of a day in the week that will be created.
 * 
 * @returns An array of date objects (As is, if we attatch important bullets, this will change)
 * for the days of the current week.
 * 
 * @example 
 *      createDaysOfWeekArray()
 */
function createDaysOfWeekArray(date) {
	//NOTE: if we want to pass data into the weekly nav like important bullets we can attach to this array
	let daysOfWeek = [];
	let currDate = new Date(date);
	//start on Sunday
	currDate.setDate((currDate.getDate() - currDate.getDay()));
	for(let i = 0; i < 7; i++){
		daysOfWeek.push(new Date(currDate));
		currDate.setDate(currDate.getDate() + 1);
	}

	return daysOfWeek;
} /* createDaysofWeekArray */