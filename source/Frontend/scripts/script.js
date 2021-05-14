
document.addEventListener("DOMContentLoaded", () => {

    //adding side navigation web component
    let newSideNav  = document.createElement("side-nav");
    document.getElementById("side-nav-container").appendChild(newSideNav);

    //adding weekly navigation web component
    let week = createDaysOfWeekArray();
    let newWeeklyNavMenu = document.createElement("weekly-nav");
    newWeeklyNavMenu.daysOfWeek = week;
    document.getElementById("weekly-nav-container").appendChild(newWeeklyNavMenu);
    
    
});

/**
 * createDaysofWeekyArray creates an array of days of the week for the current week
 * 
 * @returns An array of date objects (As is, if we attatch important bullets, this will change)
 * for the days of the current week
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