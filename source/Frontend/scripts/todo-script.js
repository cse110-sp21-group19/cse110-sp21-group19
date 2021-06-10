//todo-script.js

import { getDailyTodo } from "../../Backend/api/bullet_api.js";

/**
 * createToDoList
 * Function create the todo-list side component for the monthly log.
 * 
 * @param {Date} date - A date object to the first day in the month 
 * 
 * @returns {Boolean} - true if created and appended, false else
 * 
 * @example
 * 	createToDoList("05-01-2021")
 */
export async function createToDoList(date) {
	//adding weekly navigation web component
	let todoBullets = await getMonthTodoBullets(date);
	const TODO = document.createElement("todo-list");
	TODO.todoList = todoBullets;
	document.getElementById("todo-component-container").appendChild(TODO);
	document.getElementById("todo-component-container").className += " active";

	return true;
} /* createToDoList */

/**
 * getMonthTodoBullets
 * get all the todo bullets of a given month
 * 
 * @param {Date} date  - A date object to the first day in the month 
 * 
 * @returns {Array} - An array of arrays of todo bulelts of a month
 * 
 * @example
 *  getMonthTodoBullets("05-01-2021");
 */
async function getMonthTodoBullets(date){
	let month = date.getMonth();
	let monthBullets = [];
	let currDate = new Date(date);
	while (currDate.getMonth() === month) {
		let dayObj = {
			date: currDate,
			bullets: []
		};
		//get bullets and add to list if not empty
		let bullets = await getDailyTodo(currDate);
		if (bullets.length > 0) {
			dayObj.date = new Date(currDate);
			dayObj.bullets = bullets;
			monthBullets.push(dayObj);
		}
		currDate.setDate(currDate.getDate() + 1);
	}
	return monthBullets;
}/* getMonthTodoBullets */
