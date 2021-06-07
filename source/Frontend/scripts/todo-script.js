//todo-script.js


/**
 * createToDoList
 * Function create the todo-list side component for the monthly log.
 * 
 * @example
 * 	createToDoList()
 */
export function createToDoList(){
	//adding weekly navigation web component
	const TODO = document.createElement("todo-list");
	document.getElementById("weekly-nav-container").appendChild(TODO);

} /* createToDoList */
//Make TODO Menu here