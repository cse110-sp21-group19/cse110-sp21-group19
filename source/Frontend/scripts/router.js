// router.js

import {SIDENAVROOT, closeMenu} from "./side-nav-script.js";
import {createWeeklyNav} from "./weekly-nav-script.js";
export const router = {};


//FIX LATER:router copied from lab to get things going
/**
 * Set the state for the new page
 * @param {string} state The new page to set the state of
 * @param {boolean} statePopped If the request came from a popstate event
 * @param {number} entryNum if state is 'entry', then entryNum is the num
 */
 router.setState = (state, statePopped, entryNum) => {
    switch (state) {
        case "daily-log":
            dailyLog();
            console.log("daily");
            break;
        case "monthly-log":
            monthlyLog();
            console.log("monthly");
            break;
        case "future-log":
            futureLog();
            console.log("future");
            break;
        default:
            console.log("defualt");


    }
  
    // if(!statePopped && window.location.hash != `#${state}`) {
    //   pushToHistory(state, entryNum);
    // }
  }

//functions to complete 
function monthlyLog(){
    let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
    sideNavTitle.textContent = "Monthly Log";
    closeMenu();

    //remove the weekly nav menu
    let weeklyNav = document.querySelector("weekly-nav");
    if(weeklyNav){
        weeklyNav.remove();
    }

    //Complete page transformation here
}

function dailyLog(){
    let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
    sideNavTitle.textContent = "Daily Log";
    closeMenu();

    //add back in the weekly nav menu
    createWeeklyNav();

    //Complete page transformation here
}

function futureLog(){
    let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
    sideNavTitle.textContent = "Future Log";
    closeMenu();

    //remove the weekly nav menu
    let weeklyNav = document.querySelector("weekly-nav");
    if(weeklyNav){
        weeklyNav.remove();
    }
}