// router.js

import { createWeeklyNav } from "./weekly-nav-script.js";
import { createCalendar } from "./calendar-script.js";
import { DAYS, MONTHS } from '../components/log-type.js';
import { createToDoList } from "./todo-script.js";
import { getDailyEntries } from "../../Backend/api/entries_api.js";
import { updateAddlEntries, formatEntries } from "./addl-entries-script.js";

import { createNewBullets, nestedBullets, bulletsFromDB } from "./main-text-script.js";
import { getDailyBullets, getMonthlyBullets, getFutureBullets } from "../../Backend/api/bullet_api.js";
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
	case "daily":
		dailyLog(date, from);
		//console.log("daily " + date);
		break;
	case "monthly":
		monthlyLog(date);
		console.log("monthly");
		break;
	case "future":
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
            "type": "daily",
            "date": date,
            "header": headerText
        }
        LOGTYPE.updateLog = DAILYINFO;


        const currDate = document.querySelector("log-type").readLog.date;
        let todayBullets = await getDailyBullets(currDate);
        createMainText(todayBullets);  
        //get the current selected day of the week from the weekly nav
        let WEEKLYNAV = document.querySelector("weekly-nav");
        //If we are currently on a sunday, replace weekly nav menu with prev week
        if ((date.getDay() == 6 && from == "prev") || (date.getDay() == 0 && from == "next")){

            deleteSideNav();
            createWeeklyNav(date);
            //createWeeklyNav(date);
        }
        else if(from == "monthly" || from == "side-nav"){
            // remove previous side navigation
            deleteSideNav();
            createWeeklyNav(date);
        }
        else if(from == "on-load"){
            createWeeklyNav(date);            
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
        console.log("GET DAILY BULLLETS");
        console.log(todayBullets);
        todayBullets[1].forEach(function(item, index) {
            bulletsFromDB(item, index, bulletStack, todayBullets);
        });

        MAINTEXT.appendChild(BULLETS);
        MAINTEXT.appendChild(INPUT);

        // add ability to create new bullets
        createNewBullets(INPUT, bulletStack);
        // add ability to add nested bullets
        nestedBullets(INPUT, bulletStack);
        */

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
            "type": "monthly",
            "date": date,
            "header": headerText
        }
        LOGTYPE.updateLog = MONTHLYINFO;

        // update main-text area with monthly bullets
        const currDate = document.querySelector("log-type").readLog.date;
        let monthBullets = await getMonthlyBullets(currDate);
        createMainText(monthBullets);

        // remove previous side navigation
        deleteSideNav();

        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		await createToDoList(firstDay);
        createCalendar(firstDay);

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
async function futureLog(date){
	const SIDENAVROOT = document.querySelector("side-nav").shadowRoot;
	let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
	sideNavTitle.textContent = "Future Log";

	const LOGTYPE = document.querySelector("log-type");
	// update the header text above main-text area
	let headerText = date.getFullYear();
	const FUTUREINFO = {
		"type": "future",
		"date": date,
		"header": headerText
	};
	LOGTYPE.updateLog = FUTUREINFO;

    // remove previous side navigation
    deleteSideNav();
    createFutureNav(date);

    updateAddlEntries();

    // update main-text area with future bullets
    const currDate = document.querySelector("log-type").readLog.date;
    let futureBullets = await getFutureBullets(currDate);
    createMainText(futureBullets);

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
        case "daily":
            console.log("here")
            history.pushState({ page: "daily", date: date, from:from}, "", `./#daily${date}`);
            console.log("here")
            break;
        case "monthly":
            history.pushState({ page: "monthly", date: date, from:from}, "", `./#monthly${date}`);
            break;
        case "future":
            history.pushState({ page: "future", date: date, from:from}, "", `./#future${date}`);
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
        document.getElementById("weekly-nav-container").classList.remove("active");
	}
    if(CAL){
        CAL.remove();
        document.getElementById("calendar-component-container").classList.remove("active");
    }
    if(TODO){
        TODO.remove();  
        document.getElementById("todo-component-container").classList.remove("active");
    }
    if(FUTURENAV){
        FUTURENAV.remove();  
        document.getElementById("weekly-nav-container").classList.remove("active");
    }

} /* deleteSideNav */

/**
 * createMainText
 * Create the main-text area for the current log type. Load in the appropriate 
 * bullets and allow the user to create and store new bullets for the current 
 * log.
 * @param {Array} bullets And array of the bullets returned from the database.
*/
async function createMainText(bullets) {
    console.log("YOOOOO");
    // reset current main-text area
    const MAINTEXT = document.getElementById("main-text");
    MAINTEXT.innerHTML = "";
    MAINTEXT.classList.remove("active");
   // document.querySelector(".additional").classList.remove("active");
    // create new bullet list
    const BULLETS = document.createElement("bullet-list");
    BULLETS.id = "bullets";
    // create new bullet input element
    const INPUT = document.createElement("bullet-input");

    // Bullet Nesting Stack
    let bulletStack = [];
    bulletStack.push(BULLETS);

    // Get daily bullets from database
    bullets[1].forEach(function(item, index) {
        bulletsFromDB(item, index, bulletStack, bullets);
    });

    MAINTEXT.appendChild(BULLETS);
    MAINTEXT.appendChild(INPUT);

    // add ability to create new bullets
    createNewBullets(INPUT, bulletStack);
    // add ability to add nested bullets
    nestedBullets(INPUT, bulletStack);


    //
     setTimeout(function(){
        MAINTEXT.classList.add("active");
       // document.querySelector(".additional").classList.add("active");
     }, 40);
} /* createMainText */