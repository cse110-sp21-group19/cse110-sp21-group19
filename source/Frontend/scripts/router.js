// router.js

import { createWeeklyNav } from "./weekly-nav-script.js";
import { createCalendar } from "./calendar-script.js";
import { DAYS, MONTHS } from '../components/log-type.js';
import { createToDoList } from "./todo-script.js";
import { getDailyEntries } from "../../Backend/api/entries_api.js";
import { updateAddlEntries, formatEntries } from "./addl-entries-script.js";

import { createNewBullets, nestedBullets, bulletsFromDB } from "./main-text-script.js";
import { getDailyBullets } from "../../Backend/api/bullet_api.js";
import { createFutureNav } from "./future-nav-script.js";

export const router = {};

//FIX LATER:router copied from lab to get things going
/**
 * setState
 * Set the state for the new page.
 * @param {string} state The new page to set the state.
 * @param {boolean} statePopped If the request came from a popstate event.
 * @param {number} date The date of the current log.
 * @param {string} from Where the setState came from
 */

router.setState = (state, statePopped, date, from) => {
	switch (state) {
	case "daily-log":
		dailyLog(date, from);
		//console.log("daily " + date);
		break;
	case "monthly-log":
		monthlyLog(date);
		console.log("monthly");
		break;
	case "future-log":
		futureLog(date);
		console.log("future");
		break;
	default:
		console.log("default");
	}

	if(!statePopped) { //&& window.location.hash != `#${state}`) {
		pushToHistory(state, date, from);
	}
};

router.currentState = null;
//TODO ADD DATE IMPLEMENTATION HERE
/**
 * dailyLog
 * Set the state for the a new daily-log page.
 * @param {Date} date The date to associate the page with.
 * @param {string} from Where the setState came from
 * 
 * @example
 *      dailyLog("5-24-2021");
 */
export async function dailyLog(date, from){
    const SIDENAVROOT = document.querySelector("side-nav").shadowRoot;
    let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
    sideNavTitle.textContent = "Daily Log";
    // behavior if clicked the '<' or '>' button from the main-text header
    if (date) {
        const LOGTYPE = document.querySelector("log-type");
        // update the header text above main-text area
        let headerText = DAYS[date.getDay()] + ", " + MONTHS[date.getMonth()] + " " + date.getDate();
        const DAILYINFO = {
            "type": "daily-log",
            "date": date,
            "header": headerText
        }
        LOGTYPE.updateLog = DAILYINFO;


        //get the current selected day of the week from the weekly nav
        let WEEKLYNAV = document.querySelector("weekly-nav");

        //If we are currently on a sunday, replace weekly nav menu with prev week
        if ((date.getDay() == 6 && from == "prev") || (date.getDay() == 0 && from == "next")){
            WEEKLYNAV.shadowRoot.querySelector(".week-container").style.opacity = "0";
            WEEKLYNAV.shadowRoot.querySelector(".weekly-nav-title").style.opacity = "0";
            setTimeout(function() {
                WEEKLYNAV.remove();
                createWeeklyNav(date);
              }, 150);
            setTimeout(function() {
                WEEKLYNAV = document.querySelector("weekly-nav");
                WEEKLYNAV.shadowRoot.querySelector(".week-container").style.opacity = "1";
                WEEKLYNAV.shadowRoot.querySelector(".weekly-nav-title").style.opacity = "1";
              }, 300);
            }
        else if(from == "monthly-log" || from == "side-nav"){
            // remove previous side navigation
            deleteSideNav();
            await createWeeklyNav(date);
            WEEKLYNAV = document.querySelector("weekly-nav");
            WEEKLYNAV.shadowRoot.querySelector(".week-container").style.opacity = "1";
            WEEKLYNAV.shadowRoot.querySelector(".weekly-nav-title").style.opacity = "1";
        }
        else if(from == "on-load"){
            await createWeeklyNav(date);
            WEEKLYNAV = document.querySelector("weekly-nav");
            WEEKLYNAV.shadowRoot.querySelector(".week-container").style.opacity = "1";
            WEEKLYNAV.shadowRoot.querySelector(".weekly-nav-title").style.opacity = "1";

            
            const DATE = document.querySelector("log-type").readLog.header;
            const ADDLENTRYBAR = document.createElement("entry-bar");
            const ADDLENTRIES = document.querySelector(".additional")

            let entriesList = await getDailyEntries(DATE);
            let keys = entriesList[0];
            let fetchedEntries = entriesList[1];

            ADDLENTRYBAR.type = "initial";
            ADDLENTRYBAR.entries = formatEntries(fetchedEntries, keys);
            ADDLENTRIES.appendChild(ADDLENTRYBAR);
        }
        else {
            WEEKLYNAV.selectedDay = date.getDay() + 1;
        }
        
		updateAddlEntries();

        /*
        const currDate = document.querySelector("log-type").readLog.date;
        console.log(currDate);
        let todayBullets = await getDailyBullets(currDate);
        console.log("todayBullets");
        console.log(todayBullets);
        createMainText(todayBullets);
        */

        // reset current main-text area
        const MAINTEXT = document.getElementById("main-text");
        MAINTEXT.innerHTML = "";

        // create new bullet list
        const BULLETS = document.createElement("bullet-list");
        BULLETS.id = "bullets";
        // create new bullet input element
        const INPUT = document.createElement("bullet-input");

        // Bullet Nesting Stack
        let bulletStack = [];
        bulletStack.push(BULLETS);

        // Get daily bullets from database
        const currDate = document.querySelector("log-type").readLog.date;
        let todayBullets = await getDailyBullets(currDate);
        todayBullets[1].forEach(function(item, index) {
            bulletsFromDB(item, index, bulletStack, todayBullets);
        });

        MAINTEXT.appendChild(BULLETS);
        MAINTEXT.appendChild(INPUT);

        // add ability to create new bullets
        createNewBullets(INPUT, bulletStack);
        // add ability to add nested bullets
        nestedBullets(INPUT, bulletStack);

    }
} /* dailyLog */



/**
 * monthlyLog
 * Set the state for the a new monthly-log page.
 * @param {Date} date The date to associate the page with.
 * 
 * @example
 *      monthlyLog("5-24-2021");
 */
async function monthlyLog(date){
    const SIDENAVROOT = document.querySelector("side-nav").shadowRoot;
    let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
    sideNavTitle.textContent = "Monthly Log";
    // behavior if clicked the '<' or '>' button from the main-text header
    if (date) {
        const LOGTYPE = document.querySelector("log-type");
        // update the header text above main-text area
        let headerText = MONTHS[date.getMonth()] + " " + date.getFullYear();
        const MONTHLYINFO = {
            "type": "monthly-log",
            "date": date,
            "header": headerText
        }
        LOGTYPE.updateLog = MONTHLYINFO;

        // remove previous side navigation
        deleteSideNav();

        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        console.log(firstDay.getMonth());
		await createToDoList(firstDay);
        createCalendar(firstDay);
        // TODO: update the main-text data with getter
        updateAddlEntries();

    }
} /* monthlyLog */


/**
 * futureLog
 * Set the state for the a new future-log page.
 * @param {Date} date The date to associate the page with.
 * 
 * @example
 *      futureLog();
 */
function futureLog(date){
	const SIDENAVROOT = document.querySelector("side-nav").shadowRoot;
	let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
	sideNavTitle.textContent = "Future Log";

	const LOGTYPE = document.querySelector("log-type");
	// update the header text above main-text area
	let headerText = date.getFullYear();
	const FUTUREINFO = {
		"type": "future-log",
		"date": date,
		"header": headerText
	};
	LOGTYPE.updateLog = FUTUREINFO;

    // remove previous side navigation
    deleteSideNav();

    createFutureNav(date);
} /* futureLog */

/**
 * pushToHistory
 * Push a new state to the history stack.
 * @param {string} state The new page to set the state of.
 * @param {number} date Date.
 * @param {string} from where the setState was called from
*/
function pushToHistory(state, date, from) {
    //console.log("push from: " + from)
    router.currentState = {
        page: state, date: date, from:from
    };
    switch (state) {
        case "daily-log":
            console.log("here")
            history.pushState({ page: "daily-log", date: date, from:from}, "", `./#daily${date}`);
            console.log("here")
            break;
        case "monthly-log":
            history.pushState({ page: "monthly-log", date: date, from:from}, "", `./#monthly${date}`);
            break;
        case "future-log":
            history.pushState({ page: "future-log", date: date, from:from}, "", `./#future${date}`);
            break;
        default:
            history.pushState({}, '', './');
    }
    console.log(history);
    return history;
}


/**
 * deleteSideNav
 * Delete the existing side navigation.
*/
function deleteSideNav() {
	const WEEKLYNAV = document.querySelector("weekly-nav");
    const CAL = document.querySelector("calendar-component");
    const TODO = document.querySelector("todo-list");
    const FUTURENAV = document.querySelector("future-nav");

	if(WEEKLYNAV){
		WEEKLYNAV.remove();
	}
    if(CAL){
        CAL.remove();
    }
    if(TODO){
        TODO.remove();  
    }
    if(FUTURENAV){
        FUTURENAV.remove();  
    }

} /* deleteSideNav */


async function createMainText(bullets) {
    // reset current main-text area
    const MAINTEXT = document.getElementById("main-text");
    MAINTEXT.innerHTML = "";

    // create new bullet list
    const BULLETS = document.createElement("bullet-list");
    BULLETS.id = "bullets";
    // create new bullet input element
    const INPUT = document.createElement("bullet-input");

    // Bullet Nesting Stack
    let bulletStack = [];
    bulletStack.push(BULLETS);

    console.log("in createMainText");
    console.log(bullets);
    // Get daily bullets from database
    bullets[1].forEach(function(item, index) {
        bulletsFromDB(item, index, bulletStack, todayBullets);
    });

    MAINTEXT.appendChild(BULLETS);
    MAINTEXT.appendChild(INPUT);

    // add ability to create new bullets
    createNewBullets(INPUT, bulletStack);
    // add ability to add nested bullets
    nestedBullets(INPUT, bulletStack);
}