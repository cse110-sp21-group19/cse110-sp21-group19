// script.js
import { router } from "./router.js";
import { closeMenu } from "./side-nav-script.js";

import { createDB } from "../../Backend/api/bullet_api.js";
const SIDENAV  = document.querySelector("side-nav");
const SIDENAVROOT  = SIDENAV.shadowRoot;

// const today = new Date();
// router.setState("daily-log", false, today, "first-load");
// create database

document.addEventListener("DOMContentLoaded", function() {
	createDB();
	router.setState("daily", false, new Date(), "on-load");
});


// When the back button is hit, set the state with the new page
window.addEventListener("popstate", e => {
	console.log("in popstate");

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
	const d = new Date();
	router.setState("daily", false, d, "side-nav");

	// TODO: update the side bar to weekly-nav
	// TODO: update main-text area

	closeMenu();
});

// on click listener for monthly log button in side nav
const SNMONTHLYLOG = SIDENAVROOT.getElementById("sn-monthly-log");
SNMONTHLYLOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current month
	const d = new Date();
	router.setState("monthly", false, d, "side-nav");

	// TODO: update the side bar to task list
	// TODO: update main-text area

	closeMenu();
});

// on click listener for future log button in side nav
const SNFUTURELOG = SIDENAVROOT.getElementById("sn-future-log");
SNFUTURELOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current year
	const d = new Date();
	router.setState("future", false, d, "side-nav");

	// TODO: update the side bar to task list
	// TODO: update main-text area

	closeMenu();
});

// weekly-nav elements

const PREVLOG = document.getElementById("prev-log");
const NEXTLOG = document.getElementById("next-log");

// Go to the previous main-text log when the '<' button is hit, set the state
PREVLOG.addEventListener("click", () => {
	const LOGTYPE = document.querySelector("log-type");
	const DATE = LOGTYPE.readLog.date;
	const LOG = LOGTYPE.readLog.type;
	// decrement the current date
	const prevDate = new Date(DATE);
	// set date for daily log
	if(LOG == "daily"){
		prevDate.setDate(prevDate.getDate() - 1);
	}
	// set date for monthly log, note that the date will be set to the first of 
	// the month
	else if (LOG == "monthly") {
		prevDate.setFullYear(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
	}
	// set date for yearly log, note that the month will be set to January and the
	// date will be set to the first of the month
	else {
		prevDate.setFullYear(prevDate.getFullYear() - 1, 1, 1);
		console.log(prevDate);
	}
	router.setState(LOG, false, prevDate, "prev");
});

// Go to the next main-text log when the '>' button is hit, set the state
NEXTLOG.addEventListener("click", () => {
	const LOGTYPE = document.querySelector("log-type");
	const DATE = LOGTYPE.readLog.date;
	const LOG = LOGTYPE.readLog.type;
	// increment the current date
	const nextDate = new Date(DATE)
	if (LOG == "daily") {
		nextDate.setDate(nextDate.getDate() + 1)
	}
	// set date for monthly log, note that the date will be set to the first of 
	// the month
	else if (LOG == "monthly") {
		nextDate.setFullYear(nextDate.getFullYear(), nextDate.getMonth() + 1, 1);
	}
	// set date for yearly log, note that the month will be set to January and the
	// date will be set to the first of the month
	else {
		nextDate.setFullYear(nextDate.getFullYear() + 1, 1, 1);
		console.log(nextDate);
	}
	router.setState(LOG, false, nextDate, "next");
});