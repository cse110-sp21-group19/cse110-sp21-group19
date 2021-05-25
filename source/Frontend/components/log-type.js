export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// <log-type> custom web component
class LogType extends HTMLElement {
	constructor() {
		super();

		// templated HTML content
		const template = document.createElement("template");

		template.innerHTML = `
			<style>
				#js-date-obj {
					display: none;
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

		// Apply external styles to the shadow dom
		// const bulletInputStyle = document.createElement("link");
		// bulletInputStyle.setAttribute("rel", "stylesheet");
		// bulletInputStyle.setAttribute("href", "style/css/bulletinput.css");
		// Attach the created elements to the shadow dom
		//shadow.appendChild(bulletInputStyle);

		shadow.getElementById("header").appendChild(headerEl);
		shadow.getElementById("js-date-obj").innerText = d;
	}

    /*
	 * `get` binds a property to a function that will be called when that property is looked up
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
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
		console.log("in getter");
		console.log(logObj);
		return logObj;
	}

	/*
	 * `set` binds an object property to a function to be called when there is an attempt to set that property
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
	 */
	
    set updateLog(logObj) {
        // update class name
        let logType = this.shadowRoot.getElementById("header").className;
        logType = logObj.type;

		// update date associated with page
        let logDate = this.shadowRoot.getElementById("js-date-obj");
        logDate.innerText = logObj.date;

		// update main-text header
        let logHeader = this.shadowRoot.querySelector("h1");
        logHeader.innerText = logObj.header;
		//console.log("in setter");
		//console.log("updated type: " + logType);
		//console.log("updated date: " + logDate);
		//console.log("updated header: " + logHeader);
	}
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