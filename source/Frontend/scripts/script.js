// script.js
import { createDB } from "../../Backend/api/bullet_api.js";
import { router } from "./router.js";
import { closeMenu } from "./side-nav-script.js";
import { SUN, MOON } from "../components/icons.js";

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

// set light/dark mode on clicking sun/moon icon
const BODY = document.querySelector("body");
const COLORCONTAINER = SIDENAVROOT.querySelector(".color-mode-container");

COLORCONTAINER.addEventListener("click", () => {
	const IMG = COLORCONTAINER.querySelector("svg");
	// diiferent side bars
	const WEEKLYNAV = document.querySelector("weekly-nav");
	const TOODLIST = document.querySelector("todo-list");
	const CALENDAR = document.querySelector("calendar-component");
	const FUTURENAV = document.querySelector("future-nav");

	// main-text
	const BULLETINPUTROOT = document.querySelector("bullet-input").shadowRoot;
	const BULLETINPUT = BULLETINPUTROOT.querySelector(".new-bullet");

	// colors 
	const LIGHT =  "#E5E5E5";
	const DARK  = "#181A18";
	const WHITE =  "white";
	const BLACK =  "black";

	// if it is currently light mode, switch to dark
	if (IMG.id === "") {
		COLORCONTAINER.innerHTML = MOON;
		IMG.id = "dark-mode";
		BODY.className = "dark-mode";

		// style different side-navs
		if (WEEKLYNAV) {
			const WNCONTAINER = WEEKLYNAV.shadowRoot.querySelector(".week-container");
			WNCONTAINER.className += " dark-mode";
			/*
			const WNITEMS = WEEKLYNAV.shadowRoot.querySelectorAll(".wn-item");
			WNITEMS.forEach(element => {
				//element.style.background = DARK;
				element.className += " dark-mode";
			});
			*/
		}
		if (TOODLIST) {
			const TODOITEMS = TOODLIST.shadowRoot.querySelectorAll(".todo-item");
			TODOITEMS.forEach(element => {
				element.className += " dark-mode";
			});
		}
		if (CALENDAR) {
			const CALENDARCOMP = CALENDAR.shadowRoot.querySelector(".calendar");
			CALENDARCOMP.className += " dark-mode";
		}
		if (FUTURENAV) {
			const FUTURECONTAINER = FUTURENAV.shadowRoot.querySelector(".future-container");
			FUTURECONTAINER.className += " dark-mode";
		}
		
		BULLETINPUT.className += " dark-mode";

		const BULLETLISTEL = document.querySelectorAll("bullet-list");
		BULLETLISTEL.forEach(element => {
			element.shadowRoot.querySelectorAll("bullet-entry").forEach(element => {
				element.shadowRoot.querySelector(".entry").className += " dark-mode";
			});
		});
		closeMenu();
	}
	// else if it is currently dark mode, switch to light
	else {
		COLORCONTAINER.innerHTML = SUN;
		IMG.id = "light-mode";
		BODY.className = "";

		// style different side-navs
		if (WEEKLYNAV) {
			const WNCONTAINER = WEEKLYNAV.shadowRoot.querySelector(".week-container");
			WNCONTAINER.className = "week-container";
			/*
			const WNITEMS = WEEKLYNAV.shadowRoot.querySelectorAll(".wn-item");
			WNITEMS.forEach(element => {
				element.className = "wn-item";
			});
			*/
		}
		if (TOODLIST) {
			const TODOITEMS = TOODLIST.shadowRoot.querySelectorAll(".todo-item");
			TODOITEMS.forEach(element => {
				element.className = "todo-item";
			});
		}
		if (CALENDAR) {
			const CALENDARCOMP = CALENDAR.shadowRoot.querySelector(".calendar");
			CALENDARCOMP.className = "calendar";
		}
		if (FUTURENAV) {
			const FUTURECONTAINER = FUTURENAV.shadowRoot.querySelector(".future-container");
			FUTURECONTAINER.className = "future-container";
		}

		BULLETINPUT.className = "new-bullet";

		const BULLETLISTEL = document.querySelectorAll("bullet-list");
		BULLETLISTEL.forEach(element => {
			element.shadowRoot.querySelectorAll("bullet-entry").forEach(element => {
				element.shadowRoot.querySelector(".entry").className = "entry";
			});
		});
	}
	closeMenu();
});
