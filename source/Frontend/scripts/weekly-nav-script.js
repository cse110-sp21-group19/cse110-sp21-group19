//weekly nav script
import {DAYS, MONTHS} from './script.js';

createWeeklyNav();

export function createWeeklyNav(date){
    //adding weekly navigation web component
    let week = createDaysOfWeekArray();
    const WEEKLYNAV = document.createElement("weekly-nav");
    WEEKLYNAV.daysOfWeek = week;
    if (date) {
        WEEKLYNAV.selectedDay = date;
    }
    else {
        let today = new Date();
        WEEKLYNAV.selectedDay = today.getDay() + 1;
    }
    document.getElementById("weekly-nav-container").appendChild(WEEKLYNAV);

    //Onclick listener for the items inside the weekly nav
    const weeklyNavContainer = WEEKLYNAV.shadowRoot.querySelector("[class='week-container']");
    weeklyNavContainer.addEventListener("click", (event)=>{
        if(event.target.className == "wn-item"){
            //which day was selected
            let index = [].indexOf.call( weeklyNavContainer.childNodes, event.target);
            WEEKLYNAV.selectedDay = index;

            //change title on top of main text ... LATER will change what is on maintext
            let selectedInfo = WEEKLYNAV.selectedInfo;
            let dailyLogTitle = selectedInfo.day + ", " + MONTHS[selectedInfo.month] + " " + selectedInfo.date;
            document.getElementsByClassName("daily-log-title")[0].querySelector("h1").innerHTML = dailyLogTitle;
        }

    });
}


/*
 * createDaysofWeekyArray 
 * creates an array of days of the week for the current week
 * 
 * @param {}
 * 
 * @returns An array of date objects (As is, if we attatch important bullets, this will change)
 * for the days of the current week
 * 
 * @example 
 *      createDaysOfWeekArray()
 */
function createDaysOfWeekArray(date){
	//NOTE: if we want to pass data into the weekly nav like important bullets we can attach to this array
	let daysOfWeek = [];
	let currDate = new Date();
	//start on Sunday
	currDate.setDate((currDate.getDate() - currDate.getDay()));
	for(let i = 0; i < 7; i++){
		daysOfWeek.push(new Date(currDate));
		currDate.setDate(currDate.getDate() + 1);
	}

	return daysOfWeek;
} /* createDaysofWeekArray */