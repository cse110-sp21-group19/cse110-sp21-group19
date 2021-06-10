// script.js
import { LOGO } from "../components/icons.js";
import { createDB } from "../../Backend/api/bullet_api.js";
import { createDefault, updateMode } from "../../Backend/api/settings_api.js";
import { router } from "./router.js";
import { closeMenu } from "./side-nav-script.js";
import { SUN, MOON } from "../components/icons.js";

const SIDENAV  = document.querySelector("side-nav");
const SIDENAVROOT  = SIDENAV.shadowRoot;


// insert logo on the page
const CONTAINER = document.getElementById("container");
const LOGOCONTAINER = document.createElement("div");
LOGOCONTAINER.className = "logo";
LOGOCONTAINER.innerHTML = LOGO;
document.querySelector("main").insertBefore(LOGOCONTAINER, CONTAINER);

// create database, set default color scheme to light, direct to the daily page
document.addEventListener("DOMContentLoaded", function() {
	createDB();
	createDefault();
	router.setState("daily", false, new Date(), "on-load");
});


// When the back button is hit, set the state with the new page
window.addEventListener("popstate", e => {
	const DATE = document.querySelector("log-type").readLog.date;
	if(DATE.getDay() == 0 && e.state?.date.getDay() == 6 && router.currentState.from == "next"){
		router.setState(e.state?.page, true, e.state?.date, "prev");
	}
	else if(DATE.getDay() == 6 && e.state?.date.getDay() == 0 && router.currentState.from == "prev"){
		router.setState(e.state?.page, true, e.state?.date, "next");
	}
	else if(router.currentState.from == "side-nav"){
		router.setState(e.state?.page, true, e.state?.date, "side-nav");
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

	closeMenu();
});

// on click listener for monthly log button in side nav
const SNMONTHLYLOG = SIDENAVROOT.getElementById("sn-monthly-log");
SNMONTHLYLOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current month
	const d = new Date();
	router.setState("monthly", false, d, "side-nav");

	closeMenu();
});

// on click listener for future log button in side nav
const SNFUTURELOG = SIDENAVROOT.getElementById("sn-future-log");
SNFUTURELOG.addEventListener("click", () => {
	// when clicking on daily log from side nav, open to current year
	const d = new Date();
	router.setState("future", false, d, "side-nav");

	closeMenu();
});

// on click listener for help button in side nav
const SNHELP = SIDENAVROOT.getElementById("sn-help");
SNHELP.addEventListener("click", () => {
	const d = new Date();
	router.setState("help", false, d, "side-nav");

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
	}
	router.setState(LOG, false, prevDate, "prev");
});

// Go to the next main-text log when the '>' button is hit, set the state
NEXTLOG.addEventListener("click", () => {
	const LOGTYPE = document.querySelector("log-type");
	const DATE = LOGTYPE.readLog.date;
	const LOG = LOGTYPE.readLog.type;
	// increment the current date
	const nextDate = new Date(DATE);
	if (LOG == "daily") {
		nextDate.setDate(nextDate.getDate() + 1);
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
	}
	router.setState(LOG, false, nextDate, "next");
});

// set light/dark mode on clicking sun/moon icon
const COLORCONTAINER = SIDENAVROOT.querySelector(".color-mode-container");
COLORCONTAINER.addEventListener("click", () => {
	const IMG = COLORCONTAINER.querySelector("svg");

	// if it is currently light mode, switch to dark
	if (IMG.id === "light-mode") {
		setDarkMode();
		closeMenu();
	}
	// else if it is currently dark mode, switch to light
	else {
		setLightMode();
		closeMenu();
	}
});

/**
 * setDarkMode
 * Set dark mode for the app.
 * 
 * @example
 * 		setDarkMode();
 */
export function setDarkMode() {
	// get log type info to set state
	const LOGTYPE = document.querySelector("log-type");
	const DATE = LOGTYPE.readLog.date;
	const LOG = LOGTYPE.readLog.type;

	// update dark mode classes and change icon to moon
	const COLORCONTAINER = SIDENAVROOT.querySelector(".color-mode-container");
	COLORCONTAINER.innerHTML = MOON;
	const IMG = COLORCONTAINER.querySelector("svg");
	IMG.id = "dark-mode";
	const BODY = document.querySelector("body");
	BODY.className = "dark-mode";

	// set dark mode for additional entries
	const ADDLENTRYBAR = document.querySelector("entry-bar");
	ADDLENTRYBAR.mode = "dark";

	// update the database to dark mode
	updateMode(true);
	
	router.setState(LOG, true, DATE, "color-settings");
} /* setDarkMode */

/**
 * setLightMode
 * Set light mode for the app.
 * 
 * @example
 * 		setLightMode();
 */
export function setLightMode() {
	// get log type info to set state
	const LOGTYPE = document.querySelector("log-type");
	const DATE = LOGTYPE.readLog.date;
	const LOG = LOGTYPE.readLog.type;

	// update light mode classes and change icon to sun
	const COLORCONTAINER = SIDENAVROOT.querySelector(".color-mode-container");
	COLORCONTAINER.innerHTML = SUN;
	const IMG = COLORCONTAINER.querySelector("svg");
	IMG.id = "light-mode";
	const BODY = document.querySelector("body");
	BODY.className = "";

	// set light mode for additional entries
	const ADDLENTRYBAR = document.querySelector("entry-bar");
	ADDLENTRYBAR.mode = "";

	// update the database to dark mode
	updateMode(false);
	
	router.setState(LOG, true, DATE, "color-settings");
} /* setLightMode */
