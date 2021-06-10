//future-nav-script

import { router } from "./router.js";

/**
 * createFutureNav
 * create a future nav object and append to the webpage
 * 
 * @param {Date} date - date object to any day in the year
 * 
 * @example
 * 	createFutureNav("01-01-2021");
 */
export function createFutureNav(date){

	//create the future nav component and set the year
	const FUTURENAV = document.createElement("future-nav");
	FUTURENAV.year = date.getFullYear();

	//append to page and add onclick listener
	document.getElementById("weekly-nav-container").appendChild(FUTURENAV);
	document.getElementById("weekly-nav-container").className += " active";
	const FUTURENAVCONTAINER = FUTURENAV.shadowRoot.querySelector(".future-container");
	FUTURENAVCONTAINER.addEventListener("click", (event) => {
		//when month is clicked switch to that monthly log
		if (event.target.className == "future-item") {
			//which month was selected 0-11
			let index = [].indexOf.call( FUTURENAVCONTAINER.childNodes, event.target);
			const currYear = document.querySelector("log-type").readLog.date.getFullYear();
			let date = new Date(currYear, index, 1);
			router.setState("monthly", false, date, "future");
		}
	});
}/* createFutureNav */

