// router.js

import {SIDENAVROOT, closeMenu} from "./side-nav-script.js";
import {createWeeklyNav} from "./weekly-nav-script.js";
import {DAYS, MONTHS} from './script.js';
export const router = {};

// main-text header elements
const PREVLOG = document.getElementById("prev-log");
const NEXTLOG = document.getElementById("next-log");
const HEADER = document.querySelector(".daily-log-title > h1");

// weekly-nav elements
const WEEKLYNAV = document.querySelector("weekly-nav");
const WEEKLYNAVCONTAINER = WEEKLYNAV.shadowRoot.querySelector("[class='week-container']");

//FIX LATER:router copied from lab to get things going
/**
 * Set the state for the new page
 * @param {string} state The new page to set the state of
 * @param {boolean} statePopped If the request came from a popstate event
 * @param {number} date The date of the current log
 */
 router.setState = (state, statePopped, date) => {
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
        default:
            console.log("default");
    }
    // if(!statePopped && window.location.hash != `#${state}`) {
    //   pushToHistory(state, entryNum);
    // }
}

//TODO ADD DATE IMPLEMENTATION HERE
/**
 * dailyLog
 * Set the state for the a new daily-log page
 * @param {string} state The new page to set the state of
 * @param {boolean} statePopped If the request came from a popstate event
 * @param {Date} date The date object of the current log
 * 
 * @example
 *      dailyLog("5-24-2021");
 */
function dailyLog(date){
    // behavior if clicked the '<' or '>' button from the main-text header
    if (date) {
        // TODO: change the main-text header to the appropriate date
        console.log("dailyLog Function: " + date);
        HEADER.innerHTML = DAYS[date.getDay()] + ", " + MONTHS[date.getMonth()] + " " + date.getDate();
        // TODO: update the main-text data
        // TODO: change the weekly-nav indicator to the appropriate date
    }
    // default behavior from side nav
    else {
        let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
        sideNavTitle.textContent = "Daily Log";
        closeMenu();

        //add back in the weekly nav menu
        createWeeklyNav();

        //Complete page transformation here
    }
} /* dailyLog */

  

/**
 * monthlyLog
 * Set the state for the a new monthly-log page
 * @param {string} state The new page to set the state of
 * @param {boolean} statePopped If the request came from a popstate event
 * @param {number} date The date of the current log
 * 
 * @example
 *      monthlyLog("5-24-2021");
 */
//functions to complete 
function monthlyLog(date){
    // behavior if clicked the '<' or '>' button from the main-text header
    if (date) {
        // TODO: change the main-text header to the appropriate date
        HEADER.innerHTML = "hi";
        // TODO: update the main-text data
        // TODO: change the weekly-nav indicator to the appropriate date
    }
    // default behavior from side nav
    else {
        let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
        sideNavTitle.textContent = "Monthly Log";
        closeMenu();

        //remove the weekly nav menu
        let weeklyNav = document.querySelector("weekly-nav");
        if(weeklyNav){
            weeklyNav.remove();
        }
    }

    //Complete page transformation here
} /* monthlyLog */


/**
 * futureLog
 * Set the state for the a new future-log page
 * @param {string} state The new page to set the state of
 * @param {boolean} statePopped If the request came from a popstate event
 * @param {number} date The date of the current log
 * 
 * @example
 *      futureLog();
 */
function futureLog(){
    let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
    sideNavTitle.textContent = "Future Log";
    closeMenu();

    //remove the weekly nav menu
    let weeklyNav = document.querySelector("weekly-nav");
    if(weeklyNav){
        weeklyNav.remove();
    }
} /* futureLog */