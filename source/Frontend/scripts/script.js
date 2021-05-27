// script.js
import { router } from './router.js';
import { createWeeklyNav } from "./weekly-nav-script.js";
import { closeMenu } from "./side-nav-script.js";

const SIDENAV  = document.querySelector("side-nav");
const SIDENAVROOT  = SIDENAV.shadowRoot;

// When the back button is hit, set the state with the new page
window.addEventListener('popstate', e => {
	console.log("in popstate");
	router.setState(e.state?.page, true, e.state?.date);
});

// on click listener for daily log button in side nav
const SNDAILYLOG = SIDENAVROOT.getElementById("sn-daily-log");
SNDAILYLOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current date
    let d = new Date();
	router.setState("daily-log", false, d);

    // TODO: update the side bar to weekly-nav
    // TODO: update main-text area

	closeMenu();
});

// on click listener for monthly log button in side nav
const SNMONTHLYLOG = SIDENAVROOT.getElementById("sn-monthly-log");
SNMONTHLYLOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current month
    let d = new Date();
	router.setState("monthly-log", false, d);

    // TODO: update the side bar to task list
    // TODO: update main-text area

	closeMenu();
});

// on click listener for future log button in side nav
const SNFUTURELOG = SIDENAVROOT.getElementById("sn-future-log");
SNFUTURELOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current year
    let d = new Date();
	router.setState("future-log", false, d);

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

	router.setState("daily-log", false, prevDate);
});

// Go to the next main-text log when the '>' button is hit, set the state
NEXTLOG.addEventListener("click", () => {
	const DATE = document.querySelector("log-type").readLog.date;
	// increment the current date
	const nextDate = new Date(DATE)
	nextDate.setDate(nextDate.getDate() + 1)

	router.setState("daily-log", false, nextDate);
});

// Add additional entries bar web component
const addlEntryBar = document.createElement("entry-bar");
addlEntryBar.type = "initial";
const addlEntries = document.querySelector(".additional")
addlEntries.appendChild(addlEntryBar);

