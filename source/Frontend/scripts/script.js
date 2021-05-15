
//Adding the side nav menu web component 
const SIDENAV  = document.createElement("side-nav");
document.getElementById("side-nav-container").appendChild(SIDENAV);

//adding weekly navigation web component
let week = createDaysOfWeekArray();
const WEEKLYNAV = document.createElement("weekly-nav");
WEEKLYNAV.daysOfWeek = week;
document.getElementById("weekly-nav-container").appendChild(WEEKLYNAV);

//Onclick listener for the items inside the weekly nav
const weeklyNavContainer = WEEKLYNAV.shadowRoot.querySelector("[class='week-container']");
weeklyNavContainer.addEventListener("click", (event)=>{
    if(event.target.className == "wn-item"){
        //which day was selected
        let index = [].indexOf.call( weeklyNavContainer.childNodes, event.target);
        WEEKLYNAV.selectedDay = index;

        //change title on top of main text ... LATER will change what is on maintext
        let selectedDay = WEEKLYNAV.selectedInfo;
        let dailyLogTitle = selectedDay.day + ", " + MONTHS[selectedDay.month] + " " + selectedDay.date;
        document.getElementsByClassName("daily-log-title")[0].querySelector("h1").innerHTML = dailyLogTitle;
    }

});

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
 function createDaysOfWeekArray(){
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

// Add Date to the top of the daily log
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let d = new Date();
document.getElementById("date").querySelector("h1").innerHTML = DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate();

