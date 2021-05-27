// script.js

import { router } from './router.js';

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

// Add Date to the top of the daily log
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let d = new Date();
document.getElementById("date").querySelector("h1").innerHTML = DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate();
