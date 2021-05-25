import {DAYS, MONTHS} from '../scripts/script.js';

// <log-type> custom web component
class LogType extends HTMLElement {
	constructor() {
		super();

		// templated HTML content
		const template = document.createElement("template");

		template.innerHTML = `
			<div class="daily" id="header">
			</div>
			`;
		// default: set the header to the current date
        const headerEl = document.createElement("h1");
        let d = new Date();
        headerEl.innerHTML = DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate();
 
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
	}

    /*
	 * `get` binds a property to a function that will be called when that property is looked up
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
	 */
	get readLog() {
        const TYPE = this.shadowRoot.getElementById("header").className;
		const HEADER = this.shadowRoot.querySelector("h1").innerHTML;
		let logObj = {
            "type": TYPE, // can be: daily, monthly, future
            "header": HEADER, // string with the appropriate title
		};

        console.log(logObj);
		return logObj;
	}

	/*
	 * `set` binds an object property to a function to be called when there is an attempt to set that property
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
	 */
	set updateDate(date) {
		// set header text
		const HEADER = this.shadowRoot.querySelector("h1").innerHTML;
        HEADER = DAYS[date.getDay()] + ", " + MONTHS[date.getMonth()] + " " + date.getDate();
	}
    
    set updateType(type) {
        // update class name
        console.log("set type");
        const TYPE = this.shadowRoot.getElementById("header").className;
        TYPE = type;
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
 *   header: "Monday, May 24", // string with the appropriate title
 * }
 */