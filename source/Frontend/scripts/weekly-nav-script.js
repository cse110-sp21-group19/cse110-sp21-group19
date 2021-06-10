//weekly-nav-script.js
import { router } from './router.js';
import { getDailyPriority } from "../../Backend/api/bullet_api.js";

/**
 * createWeeklyNav
 * Takes in a date and creates a weekly nav component from that date and 
 * appends it to the screen.
 * 
 * @param {Date} date - Date object to make the weekly nav menu around.
 * 
 * @returns {Boolean} - true if created and appened, false else
 * 
 * @example
 *  createWeeklyNav("05-25-2021")
 */
export async function createWeeklyNav(date) {
    //creating weekly nav and setting date
    let week = await createDaysOfWeekArray(date);
    const WEEKLYNAV = document.createElement("weekly-nav");
    WEEKLYNAV.daysOfWeek = week;
    WEEKLYNAV.selectedDay = date.getDay() + 1;

    //appending to page and adding onclick listener
    document.getElementById("weekly-nav-container").appendChild(WEEKLYNAV);
    document.getElementById("weekly-nav-container").className += " active";
    const weeklyNavContainer = WEEKLYNAV.shadowRoot.querySelector(".week-container");
    weeklyNavContainer.childNodes.forEach(element => {
        element.addEventListener("click", (event) => {
            if (event.target.className == "wn-date") {
                //which day was selected
                let index = [].indexOf.call( weeklyNavContainer.childNodes, element);
                WEEKLYNAV.selectedDay = index;
    
                //get the newly selected date and update router
                let selectedDate = WEEKLYNAV.selectedInfo;
                router.setState("daily", false, selectedDate, "weekly-nav");
            }
        });
    })
    return true;
} /* createWeeklyNav */


/**
 * createDaysofWeekyArray 
 * Creates an array of days of the week and get all priority bullets of that week
 * 
 * @param {Date} date - A date object of a day in the week that will be created.
 * 
 * @returns {Array} - An array of objects containing the date and a list of priority bullets
 * for the days of the current week.
 * 
 * @example 
 *      createDaysOfWeekArray()
 */
async function createDaysOfWeekArray(date) {
	let daysOfWeek = [];
	let currDate = new Date(date);
	//start on Sunday
	currDate.setDate((currDate.getDate() - currDate.getDay()));
	for(let i = 0; i < 7; i++) {
        let dayObj = {
            date: currDate,
            bullets: []        
        }
        //get priority bullets and add to list
        let bullets = await getDailyPriority(currDate);
        dayObj.date = new Date(currDate);
		dayObj.bullets = bullets;
        daysOfWeek.push(dayObj);
		currDate.setDate(currDate.getDate() + 1);
	}

	return daysOfWeek;
} /* createDaysofWeekArray */