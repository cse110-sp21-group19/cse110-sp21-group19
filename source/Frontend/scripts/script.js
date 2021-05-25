// script.js
import { router } from './router.js';
import {DAYS, MONTHS} from '../components/log-type.js';

/*
const DHASH = "#daily-log";
const MHASH = "#monthly-log";
const FHASH = "#future-log";

//hash change listener for side nav menu links
function locationHashChanged() {
	if(location.hash == DHASH){
		router.setState("daily-log", false, 0);
	}
	else if(location.hash == MHASH){
		router.setState("monthly-log", false, 0);
	}
	else if(location.hash == FHASH){
		router.setState("future-log", false, 0);
	}

}

window.onhashchange = locationHashChanged;
*/

const SIDENAV  = document.querySelector("side-nav");
const SIDENAVROOT  = SIDENAV.shadowRoot;

// on click listener for daily log button in side nav
const SNDAILYLOG = SIDENAVROOT.getElementById("sn-daily-log");
SNDAILYLOG.addEventListener("click", () => {
    const LOGTYPE = document.querySelector("log-type");
    let d = new Date();
	router.setState("daily-log", true, d);

    // TODO: update the side bar to weekly-nav
    // TODO: update main-text area

	// TODO: Set State
});

// on click listener for monthly log button in side nav
const SNMONTHLYLOG = SIDENAVROOT.getElementById("sn-monthly-log");
SNMONTHLYLOG.addEventListener("click", () => {
    const LOGTYPE = document.querySelector("log-type");
    let d = new Date();
	router.setState("monthly-log", true, d);

    // TODO: update the side bar to task list
    // TODO: update main-text area

	// TODO: Set State
});

// on click listener for future log button in side nav
const SNFUTURELOG = SIDENAVROOT.getElementById("sn-future-log");
SNFUTURELOG.addEventListener("click", () => {
    const LOGTYPE = document.querySelector("log-type");
    let d = new Date();
	router.setState("future-log", true, d);

    // TODO: update the side bar to task list
    // TODO: update main-text area

	// TODO: Set State
});





// weekly-nav elements
const WEEKLYNAV = document.querySelector("weekly-nav");

const PREVLOG = document.getElementById("prev-log");
const NEXTLOG = document.getElementById("next-log");

// Go to the previous main-text log when the '<' button is hit, set the state
PREVLOG.addEventListener("click", () => {
	const DATE = document.querySelector("log-type").readLog.date;
	// decrement the current date
	const prevDate = new Date(DATE)
	prevDate.setDate(prevDate.getDate() - 1)

	router.setState("daily-log", true, prevDate);

	// update selected day on the weekly-nav
	let date = WEEKLYNAV.selectedInfo;
	console.log(date.day);
	let index = [].indexOf.call(DAYS, date.day);
	console.log(index);
	WEEKLYNAV.selectedDay = index;
});

// Go to the next main-text log when the '>' button is hit, set the state
NEXTLOG.addEventListener("click", () => {
	const DATE = document.querySelector("log-type").readLog.date;
	// increment the current date
	const nextDate = new Date(DATE)
	nextDate.setDate(nextDate.getDate() + 1)

	router.setState("daily-log", true, nextDate);

	// update seleceted day on the weekly-nav
	let date = WEEKLYNAV.selectedInfo;
	let index = [].indexOf.call(DAYS, date.day);
	WEEKLYNAV.selectedDay = index+2;
});
