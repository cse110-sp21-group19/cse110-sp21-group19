//todo-script.js

import { getDailyTodo } from "../../Backend/api/bullet_api.js";
/**
 * createToDoList
 * Function create the todo-list side component for the monthly log.
 * 
 * @param {Date} date - A date object to the first day in the month 
 * @example
 * 	createToDoList("05-01-2021")
 */
export async function createToDoList(date){
    //adding weekly navigation web component
    let todoBullets = await getMonthTodoBullets(date);

    console.log(todoBullets);
    //const TODO = document.createElement("todo-list");
    //document.getElementById("weekly-nav-container").appendChild(TODO);

} /* createToDoList */
//Make TODO Menu here

/**
 * 
 * @param {Date} date  - A date object to the first day in the month 
 */
async function getMonthTodoBullets(date){
    let month = date.getMonth();
        console.log(month)
    let monthBullets = [];
    let currDate = new Date(date);
    while (currDate.getMonth() - 1 === month){
        let dayObj = {
            date: currDate,
            bullets: []
        }
        let bullets = await getDailyTodo(currDate);
        if(bullets.length > 0){
            dayObj.date = new Date(currDate);
            dayObj.bullets = bullets;
            monthBullets.push(dayObj);
        }
        currDate.setDate(currDate.getDate() + 1);
    }

    return monthBullets;
}