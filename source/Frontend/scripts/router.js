// router.js

import { createWeeklyNav } from "./weekly-nav-script.js";
import { DAYS, MONTHS } from '../components/log-type.js';
import { closeMenu } from "./side-nav-script.js";
import { createToDoList } from "./todo-script.js";

import { editableEntry, deleteEntry, prioritizeEntry, completeTask } from "./main-text-script.js";
import { getDailyBullets, createBullet } from "../../Backend/api/bullet_api.js";

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
 * @param {string} from Where the setState came from
 */

 router.setState = (state, statePopped, date, from) => {
    let mainText = document.querySelector(".main-text");
    let entriesBar = document.querySelector("entry-bar");
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
        pushToHistory(state, date, from);
    }
}

router.currentState = null;
//TODO ADD DATE IMPLEMENTATION HERE
/**
 * dailyLog
 * Set the state for the a new daily-log page.
 * @param {Date} date The date to associate the page with.
 * 
 * @example
 *      dailyLog("5-24-2021");
 */
async function dailyLog(date, from){
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


        //get the current selected day of the week from the weekly nav
        let WEEKLYNAV = document.querySelector("weekly-nav");
        //If we are currently on a sunday, replace weekly nav menu with prev week
        if ((date.getDay() == 6 && from == "prev") || (date.getDay() == 0 && from == "next")){
            console.log("HELLO")
            WEEKLYNAV.shadowRoot.querySelector("[class='week-container']").style.opacity = "0";
            WEEKLYNAV.shadowRoot.querySelector("[class='weekly-nav-title']").style.opacity = "0";
            setTimeout(function() {
                WEEKLYNAV.remove();
                createWeeklyNav(date);
              }, 150);
            setTimeout(function() {
                WEEKLYNAV = document.querySelector("weekly-nav");
                WEEKLYNAV.shadowRoot.querySelector("[class='week-container']").style.opacity = "1";
                WEEKLYNAV.shadowRoot.querySelector("[class='weekly-nav-title']").style.opacity = "1";
              }, 300);
            }
        else {
            WEEKLYNAV.selectedDay = date.getDay() + 1;
        }
        

        // reset current main-text area
        const MAINTEXT = document.getElementById("main-text");
        MAINTEXT.innerHTML = "";

        // create new bullet list
        const BULLETS = document.createElement("bullet-list");
        BULLETS.id = "bullets";
        // create new bullet input element
        const INPUT = document.createElement("bullet-input");
        const INPUTROOT = INPUT.shadowRoot;
        const BULLETINPUT = INPUTROOT.getElementById("bullet-input");

        // Bullet Nesting Stack
        let bulletStack = [];
        bulletStack.push(BULLETS);

        // Get daily bullets from database
        const currDate = document.querySelector("log-type").readLog.date;
        let todayBullets = await getDailyBullets(currDate);
        todayBullets[1].forEach(function (item, index) {
            let newBullet = document.createElement("bullet-entry");
            newBullet.entry = item;
            const BULLETLIST = bulletStack[bulletStack.length - 1].shadowRoot.getElementById("bullet-list");
            BULLETLIST.appendChild(newBullet);


            let bulletKey = todayBullets[0][index];

            editableEntry(bulletKey, newBullet);
            prioritizeEntry(bulletKey, newBullet);
            completeTask(bulletKey, newBullet);
            deleteEntry(bulletKey, newBullet);
        });

        MAINTEXT.appendChild(BULLETS);
        MAINTEXT.appendChild(INPUT);

        // create new bullets
        createNewBullets(INPUT, BULLETINPUT, bulletStack);
        // nested bullets
        nestedBullets(INPUT, BULLETINPUT, bulletStack);
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
 * @param {string} from where the setState was called from
*/
function pushToHistory(state, date, from) {
    //console.log("push from: " + from)
    router.currentState = {
        page: "daily-log", date: date, from:from
    };
    switch (state) {
        case "daily-log":
            history.pushState({ page: "daily-log", date: date, from:from}, "", `./#daily${date}`);
            break;
        case "monthly-log":
            history.pushState({ page: "monthly-log", date: date, from:from}, "", `./#monthly${date}`);
            break;
        case "future-log":
            history.pushState({ page: "future-log", date: date, from:from}, "", `./#future${date}`);
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
  
function createNewBullets(inputElement, bulletInput, bulletStack) {
    inputElement.addEventListener("keyup", async function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            // create new entry information on enter
            let entry = {
                "priority": false,
                "content": bulletInput.value,
                "completed": false,
                "type": bulletInput.value,
            };

            let newBullet = document.createElement("bullet-entry");
            newBullet.entry = entry;

            // append new bullet entries to main-text element
            const BULLETLIST = bulletStack[bulletStack.length - 1].shadowRoot.getElementById("bullet-list");
            BULLETLIST.appendChild(newBullet);

            // clear INPUT value after enter
            bulletInput.value = "";

            // add new bullet to DB
            let bulletKey = await createBullet(newBullet.entry);

            editableEntry(bulletKey, newBullet);
            prioritizeEntry(bulletKey, newBullet);
            completeTask(bulletKey, newBullet);
            deleteEntry(bulletKey, newBullet);
        }
    });
}

function nestedBullets(inputElement, bulletInput, bulletStack) {
    inputElement.addEventListener("keydown", function (event) {
        // FIXME: Backspace doesn't work yet, will prevent backspace behavior all together
        // Unnest by one level on shift + tab
        if ((event.shiftKey && event.key === "Tab")) {
            event.preventDefault();
            if (bulletStack.length > 1) {
                bulletStack.pop(bulletStack[bulletStack.length - 1]);
                // unindent the input text
                bulletInput.style.paddingLeft = (40 * (bulletStack.length-1) + 8)+ "px";
            }
        }
        // Nest by one level on tab
        else if (event.key === "Tab") {
            // prevent tab key from moving to next button
            this.focus();
            event.preventDefault();
            const newSublist = document.createElement("bullet-list");
            bulletStack[bulletStack.length - 1].shadowRoot.getElementById("bullet-list").appendChild(newSublist);
            bulletStack.push(newSublist);
            // indent the input text
            bulletInput.style.paddingLeft = (40 * (bulletStack.length-1) + 8)+ "px";
        }
    });
}