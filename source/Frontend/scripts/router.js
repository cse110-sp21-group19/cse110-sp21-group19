// router.js

import { createWeeklyNav } from "./weekly-nav-script.js";
import { createCalendar } from "./calendar-script.js";
import { DAYS, MONTHS } from '../components/log-type.js';
import { createToDoList } from "./todo-script.js";
import { getDailyEntries } from "../../Backend/api/entries_api.js";
import { updateAddlEntries, formatEntries } from "./addl-entries-script.js";

import { createNewBullets, nestedBullets, bulletsFromDB } from "./main-text-script.js";
import { getDailyBullets, getMonthlyBullets, getFutureBullets } from "../../Backend/api/bullet_api.js";
import { createDefault, updateMode, getMode } from "../../Backend/api/settings_api.js";
import { setLightMode, setDarkMode } from "./script.js";
import { createFutureNav } from "./future-nav-script.js";

import { helpGuideContent, createHelpPage } from "./help-guide-script.js";

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
    case "help":
        help();
        console.log("help");
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
        const ADDLENTRYBAR = document.createElement("entry-bar");
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
        else if(from == "monthly" || from == "side-nav"){
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
            const ADDLENTRIES = document.querySelector(".additional")

            let entriesList = await getDailyEntries(DATE);
            let keys = entriesList[0];
            let fetchedEntries = entriesList[1];

            ADDLENTRYBAR.type = "initial";
            //ADDLENTRYBAR.mode = "dark";
            ADDLENTRYBAR.entries = formatEntries(fetchedEntries, keys);
            ADDLENTRIES.appendChild(ADDLENTRYBAR);

            const MAINTEXTINPUT = document.querySelector("bullet-input");
            if (!MAINTEXTINPUT) {
                const currDate = document.querySelector("log-type").readLog.date;
                let todayBullets = await getDailyBullets(currDate);
                createMainText(todayBullets);
            }

            let colorMode = await getMode();
            console.log(colorMode);
            if (colorMode) {
                setDarkMode();
            }
            else {
                setLightMode();
            }
        }
        else if (from == "color-settings") {
            deleteSideNav();
            await createWeeklyNav(date);
            WEEKLYNAV = document.querySelector("weekly-nav");
            WEEKLYNAV.shadowRoot.querySelector(".week-container").style.opacity = "1";
            WEEKLYNAV.shadowRoot.querySelector(".weekly-nav-title").style.opacity = "1";
        }
        else {
            WEEKLYNAV.selectedDay = date.getDay() + 1;
        }
        
		updateAddlEntries();

            const currDate = document.querySelector("log-type").readLog.date;
            let todayBullets = await getDailyBullets(currDate);
            createMainText(todayBullets);
        /*
        const currDate = document.querySelector("log-type").readLog.date;
        let todayBullets = await getDailyBullets(currDate);
        createMainText(todayBullets);
        */

        // set color theme
        //await createDefault();
        /*
        let colorMode = await getMode();
        console.log(colorMode);
        if (colorMode) {
            setDarkMode();
        }
        else {
            setLightMode();
        }
        */

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

        // remove previous side navigation
        deleteSideNav();

        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        console.log(firstDay.getMonth());
		await createToDoList(firstDay);
        createCalendar(firstDay);

        updateAddlEntries();

        // update main-text area with monthly bullets
        const currDate = document.querySelector("log-type").readLog.date;
        let monthBullets = await getMonthlyBullets(currDate);
        createMainText(monthBullets);
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
 * help 
 * Set the state for the a help guide page.
 * 
 * @example
 *      help();
 */
function help(){
    const SIDENAVROOT = document.querySelector("side-nav").shadowRoot;
    let sideNavTitle = SIDENAVROOT.getElementById("side-nav-title");
    sideNavTitle.textContent = "Help";

	const LOGTYPE = document.querySelector("log-type");
	// update the header text above main-text area
	const HELPINFO = {
		"type": "help",
		"date": new Date(),
		"header": "Help Guide"
	};
	LOGTYPE.updateLog = HELPINFO;

    // remove the weekly nav menu
    deleteSideNav();
    
    // hide additional entries
    let addlEntries = document.querySelector("entry-bar");
    if(addlEntries){
        addlEntries.style.display="none";
    }

    // hide top arrow navigation
    const PREVARROW = document.getElementById("prev-log");
    const NEXTARROW = document.getElementById("next-log");
    PREVARROW.style.display = "transparent";
    NEXTARROW.style.display = "transparent";
   
    // change main-text header
    //document.querySelector("log-type").shadowRoot.querySelector("h1").innerText = "Help Guide";
    // clear main-text area
    document.getElementById("main-text").innerText = "";
    // add help page data
    createHelpPage(helpGuideContent);
    
    // add table of contents
    const HELPSEC = document.querySelectorAll("help-section");
    const HELPTOC = document.createElement("help-toc");
    HELPTOC.contents = helpGuideContent;
    document.getElementById("weekly-nav-container").appendChild(HELPTOC);
    HELPTOC.shadowRoot.querySelector(".help-toc-container").querySelectorAll(".toc-link").forEach((element, index) => {
        element.addEventListener("click", () => {
            let scrollPos = HELPSEC[index].shadowRoot.getElementById("help-section-title").offsetTop;
            let scrollPosInitial = HELPSEC[0].shadowRoot.getElementById("help-section-title").offsetTop;
            document.querySelector(".help-container").scrollTop = scrollPos - scrollPosInitial;
        });
    });


} /* help */

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
        case "help":
            history.pushState({ page: "help", date: date, from:from}, "", `./#help`);
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
    const HELPNAV = document.querySelector("help-toc");

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
    if(HELPNAV){
        HELPNAV.remove();  
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
    bullets[1].forEach(function(item, index) {
        bulletsFromDB(item, index, bulletStack, bullets);
    });

    MAINTEXT.appendChild(BULLETS);
    MAINTEXT.appendChild(INPUT);
    const BULLETINPUT = INPUT.shadowRoot.getElementById("bullet-input");
    BULLETINPUT.style.paddingLeft = (40 * (bulletStack.length-1) + 8)+ "px";

    // add ability to create new bullets
    createNewBullets(INPUT, bulletStack);
    // add ability to add nested bullets
    nestedBullets(INPUT, bulletStack);
} /* createMainText */
