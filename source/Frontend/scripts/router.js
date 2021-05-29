// router.js

import { createWeeklyNav } from "./weekly-nav-script.js";
import { DAYS, MONTHS } from '../components/log-type.js';
import { closeMenu } from "./side-nav-script.js";
import { createToDoList } from "./todo-script.js";

export const router = {};

// weekly-nav elements
const WEEKLYNAV = document.querySelector("weekly-nav");
const WEEKLYNAVCONTAINER = WEEKLYNAV.shadowRoot.querySelector("[class='week-container']");

//FIX LATER:router copied from lab to get things going
/**
 * setState
 * Set the state for the new page.
 * @param {string} state The new page to set the state.
 * @param {boolean} statePopped If the request came from a popstate event.
 * @param {number} date The date of the current log.
 */
 router.setState = (state, statePopped, date) => {
    let mainText = document.querySelector(".main-text");
	let entriesBar = document.querySelector("entry-bar");
    switch (state) {
        case "daily-log":
            dailyLog(date);
            console.log("daily " + date);
            break;
        case "monthly-log":
            monthlyLog(date);
            console.log("monthly");
            break;
        case "future-log":
            futureLog();
            console.log("future");
            break;

        case "new-addl-entry":
            mainText.style.display = "none";
            entriesBar.type = "editing";
            break;

        case "viewing-addl-entries":
            mainText.style.display = "block";
            entriesBar.type = "openbar";
            break;
        
        default:
            console.log("default");
            mainText.style.display = "block";
            entriesBar.type = "initial";
    }

    if(!statePopped) { //&& window.location.hash != `#${state}`) {
        pushToHistory(state, date);
    }
}

//TODO ADD DATE IMPLEMENTATION HERE
/**
 * dailyLog
 * Set the state for the a new daily-log page.
 * @param {Date} date The date to associate the page with.
 * 
 * @example
 *      dailyLog("5-24-2021");
 */
function dailyLog(date){
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

        // get the current selected day of the week from the weekly nav
        const WEEKLYNAV = document.querySelector("weekly-nav");
        // If we are currently on a sunday, replace weekly nav menu with prev week
        if (date.getDay() == 0) {
            WEEKLYNAV.remove();
            createWeeklyNav(date);
        }
        // If we are currently on a saturday, replace weekly nav menu with next week
        else if (date.getDay() == 6) {
            WEEKLYNAV.remove();
            createWeeklyNav(date);
        }
        else {
            WEEKLYNAV.selectedDay = date.getDay() + 1;
        }

        // TODO: update the main-text data with getter

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
function monthlyLog(date){
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

        // TODO: update the main-text data with getter

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
function futureLog(){
    const SIDENAVROOT = document.querySelector("side-nav").shadowRoot;
    let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
    sideNavTitle.textContent = "Future Log";

    // defaults to current year
    // FIXME: new behavior
    const LOGTYPE = document.querySelector("log-type");
    let d = new Date();
    // update the header text above main-text area
    let headerText = d.getFullYear();
    const FUTUREINFO = {
        "type": "future",
        "date": d,
        "header": headerText
    }
    LOGTYPE.updateLog = FUTUREINFO;

    //remove the weekly nav menu
    let weeklyNav = document.querySelector("weekly-nav");
    if(weeklyNav){
        weeklyNav.remove();
    }
} /* futureLog */

/**
 * pushToHistory
 * Push a new state to the history stack.
 * @param {string} state The new page to set the state of.
 * @param {number} date Date.
*/
// TODO: Decide the hash for each state
function pushToHistory(state, date) {
    switch (state) {
        case "daily-log":
            history.pushState({ page: "daily-log", date: date }, "", `./#daily${date}`);
            break;
        case "monthly-log":
            history.pushState({ page: "monthly-log", date: date }, "", `./#monthly${date}`);
            break;
        case "future-log":
            history.pushState({ page: "future-log", date: date }, "", `./#future${date}`);
            break;
        case "new-addl-entry":
            history.pushState(null, null, `./#new-addl-entry${date}`);
            break;
        case "viewing-addl-entries":
            history.pushState(null, null, `./#viewing-addl-entries${date}`);
            break;
        default:
            history.pushState({}, '', './');
    }
    return history;
  }