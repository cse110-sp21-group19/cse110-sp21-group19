export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * @typedef {Object} LogTypeObj
 * @property {string} type - The type of log of the current page.
 * @property {Date} date - The date of the current page.
 * @property {string} header - The header that will appear over the 
 * main-text area.
 */

// <log-type> custom web component
/** Class representing a the type of log. */
class LogType extends HTMLElement {
	/**
     * Create log type element.
     */
	constructor() {
		super();

		// templated HTML content
		const template = document.createElement("template");
		// Wednesday, September 30 --> 23 characters
		template.innerHTML = `
			<style>
				#js-date-obj {
					display: none;
				}
				h1 {
					width: 29rem;
					text-align: center;
				}
			</style>
			<div class="daily" id="header">
				<div id="js-date-obj"></div>
			</div>
			`;

		// default: set the header to the current date
		const headerEl = document.createElement("h1");
		let d = new Date();
		headerEl.innerText = DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate();
 
		// create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		// attach the created elements to the shadow dom
		shadow.getElementById("header").appendChild(headerEl);
		shadow.getElementById("js-date-obj").innerText = d;
	} /* constructor */


	/**
	 * get readLog
	 * Get the log type information for the current page.
	 * @param {}
	 * @return {LogTypeObj} A js object containing the type, date, and header 
	 * info of the current page.
	 * 
	 * @example
	 *      this.readLog
	 */
	get readLog() {
		const TYPE = this.shadowRoot.getElementById("header").className;
		const DATE = this.shadowRoot.getElementById("js-date-obj").innerText;
		const HEADER = this.shadowRoot.querySelector("h1").innerText;
		let logObj = {
			"type": TYPE, // can be: daily, monthly, future
			"date": new Date(DATE),
			"header": HEADER // string with the appropriate title
		};
		return logObj;
	} /* get readLog */

	/**
	 * set updateLog
	 * Set the log type information on the page. Updates the header above the 
	 * main-text area, the date, and the class name #header to the new type of 
	 * page.
	 * @param {LogTypeObj} logObj - Updated log type object.
	 * 
	 * @example
	 *      this.updateLog = {
	 *							type: "daily",
	 *   						date: Tue May 25 2021 10:28:06 GMT-0700 (Pacific Daylight Time)
	 *   						header: "Monday, May 24"
	 * 							}
	 */
	set updateLog(logObj) {
		// update class name
		let logType = this.shadowRoot.getElementById("header");
		logType.className = logObj.type;

		// update date associated with page
		let logDate = this.shadowRoot.getElementById("js-date-obj");
		logDate.innerText = logObj.date;

		// update main-text header
		let logHeader = this.shadowRoot.querySelector("h1");
		logHeader.innerText = logObj.header;
	} /* set updateLog */
}
	
// Define a custom element for the bullet-input web component   
customElements.define("log-type", LogType);


/**
 * json format:
 * completed will only sometimes be there
 *
 * {
 *   type: "daily", // can be: daily, monthly, future
 *   date: "Tue May 25 2021 10:28:06 GMT-0700 (Pacific Daylight Time)", // JS Date Object
 *   header: "Monday, May 24", // string with the appropriate title
 * }
 */