// script.js
import { router } from './router.js';
import { createWeeklyNav } from "./weekly-nav-script.js";
import { closeMenu } from "./side-nav-script.js";

const SIDENAV  = document.querySelector("side-nav");
const SIDENAVROOT  = SIDENAV.shadowRoot;

// on click listener for daily log button in side nav
const SNDAILYLOG = SIDENAVROOT.getElementById("sn-daily-log");
SNDAILYLOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current date
    let d = new Date();
	router.setState("daily-log", true, d);

    // TODO: update the side bar to weekly-nav
    // TODO: update main-text area

	closeMenu();
});

// on click listener for monthly log button in side nav
const SNMONTHLYLOG = SIDENAVROOT.getElementById("sn-monthly-log");
SNMONTHLYLOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current month
    let d = new Date();
	router.setState("monthly-log", true, d);

    // TODO: update the side bar to task list
    // TODO: update main-text area

	closeMenu();
});

// on click listener for future log button in side nav
const SNFUTURELOG = SIDENAVROOT.getElementById("sn-future-log");
SNFUTURELOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current year
    let d = new Date();
	router.setState("future-log", true, d);

    // TODO: update the side bar to task list
    // TODO: update main-text area

	closeMenu();
});





// weekly-nav elements

const PREVLOG = document.getElementById("prev-log");
const NEXTLOG = document.getElementById("next-log");

// Go to the previous main-text log when the '<' button is hit, set the state
PREVLOG.addEventListener("click", () => {
	const DATE = document.querySelector("log-type").readLog.date;
	// decrement the current date
	const prevDate = new Date(DATE)
	prevDate.setDate(prevDate.getDate() - 1)

	const WEEKLYNAV = document.querySelector("weekly-nav");

	//If we are currently on a sunday, replace weekly nav menu with prev week
	if(DATE.getDay() == 0){
		WEEKLYNAV.remove();
		createWeeklyNav(prevDate);
	}
	else{
		WEEKLYNAV.selectedDay = prevDate.getDay() + 1;
	}

	router.setState("daily-log", true, prevDate);
});

// Go to the next main-text log when the '>' button is hit, set the state
NEXTLOG.addEventListener("click", () => {
	const DATE = document.querySelector("log-type").readLog.date;
	// increment the current date
	const nextDate = new Date(DATE)
	nextDate.setDate(nextDate.getDate() + 1)

	const WEEKLYNAV = document.querySelector("weekly-nav");
	//get the current selected day of the week from the weekly nav

	//If we are currently on a saturday, replace weekly nav menu with next week
	if(DATE.getDay() == 6){
		WEEKLYNAV.remove();
		createWeeklyNav(nextDate);
	}
	else{
		WEEKLYNAV.selectedDay = nextDate.getDay() + 1;
	}

	router.setState("daily-log", true, nextDate);
});