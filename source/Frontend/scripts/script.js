// script.js
import { router } from './router.js';
import { createWeeklyNav } from "./weekly-nav-script.js";
import { closeMenu } from "./side-nav-script.js";

const SIDENAV  = document.querySelector("side-nav");
const SIDENAVROOT  = SIDENAV.shadowRoot;

// When the back button is hit, set the state with the new page
window.addEventListener("popstate", e => {
	console.trace();
	console.log("in popstate");
	console.log(router.currentState.from);
	const DATE = document.querySelector("log-type").readLog.date;
	if(DATE.getDay() == 0 && e.state?.date.getDay() == 6 && router.currentState.from == "next"){
		router.setState(e.state?.page, true, e.state?.date, "prev");
	}
	else if(DATE.getDay() == 6 && e.state?.date.getDay() == 0 && router.currentState.from == "prev"){
		router.setState(e.state?.page, true, e.state?.date, "next");
	}
	else{
		router.setState(e.state?.page, true, e.state?.date, e.state?.from);
	}
});

// on click listener for daily log button in side nav
const SNDAILYLOG = SIDENAVROOT.getElementById("sn-daily-log");
SNDAILYLOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current date
    let d = new Date();
	router.setState("daily-log", false, d, "side-nav");

    // TODO: update the side bar to weekly-nav
    // TODO: update main-text area

	closeMenu();
});

// on click listener for monthly log button in side nav
const SNMONTHLYLOG = SIDENAVROOT.getElementById("sn-monthly-log");
SNMONTHLYLOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current month
    let d = new Date();
	console.log("YOOOO");
	router.setState("monthly-log", false, d, "side-nav");

    // TODO: update the side bar to task list
    // TODO: update main-text area

	closeMenu();
});

// on click listener for future log button in side nav
const SNFUTURELOG = SIDENAVROOT.getElementById("sn-future-log");
SNFUTURELOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current year
    let d = new Date();
	router.setState("future-log", false, d, "side-nav");

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
	const prevDate = new Date(DATE);
	prevDate.setDate(prevDate.getDate() - 1);

	// let create = false;
	// if(DATE.getDay() == 0){
	// 	create = true;
	// }

	router.setState("daily-log", false, prevDate, "prev");
});

// Go to the next main-text log when the '>' button is hit, set the state
NEXTLOG.addEventListener("click", () => {
	const DATE = document.querySelector("log-type").readLog.date;
	// increment the current date
	const nextDate = new Date(DATE)
	nextDate.setDate(nextDate.getDate() + 1)

	router.setState("daily-log", false, nextDate, "next");
});

// Add additional entries bar web component
const addlEntryBar = document.createElement("entry-bar");
addlEntryBar.type = "initial";
const addlEntries = document.querySelector(".additional")
addlEntries.appendChild(addlEntryBar);

