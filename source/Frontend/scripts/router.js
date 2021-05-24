import {SIDENAVROOT, closeMenu} from "./side-nav-script.js";


export const router = {};

const PREVLOG = document.getElementById("prev-log");
const NEXTLOG = document.getElementById("next-log");

router.setState = (state, statePopped, entryId) => {
    switch (state) {
        case "daily-log":
            dailyLog(entryId);
            console.log("daily " + entryId);
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
            console.log("default");
    }
}

function dailyLog(id){
    if (id) {
        document.querySelector(".daily-log-title > h1").innerHTML = "hi";
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
}

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