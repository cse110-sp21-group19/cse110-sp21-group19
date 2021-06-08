import { router } from "./router.js";
/**
 * createFutureNav
 * create a future nav object and append to the webpage
 * 
 * @param {Date} date - date object to the first day of a year 
 */
export function createFutureNav(date){

	const FUTURENAV = document.createElement("future-nav");
	FUTURENAV.year = date.getFullYear();

	document.getElementById("weekly-nav-container").appendChild(FUTURENAV);
	const FUTURENAVCONTAINER = FUTURENAV.shadowRoot.querySelector(".future-container");
    FUTURENAVCONTAINER.addEventListener("click", (event)=>{
        if(event.target.className == "future-item"){
            //which month was selected 0-11
            let index = [].indexOf.call( FUTURENAVCONTAINER.childNodes, event.target);

			const currYear = document.querySelector("log-type").readLog.date.getFullYear();
			let date = new Date(currYear, index, 1);
			
			router.setState("monthly", false, date, "future");
        }

    });
}

