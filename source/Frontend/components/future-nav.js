//future-nav.js

import { MONTHS } from "./log-type.js";

/**
 * Class represting a custom future nav component
 * @extends HTMLElement
 * 
 * @example
 * <future-nav>
 */
class FutureNav extends HTMLElement {

	/**
	 * Create a calendar component skeleton
	 */
	constructor() {
		super();
		const template = document.createElement("template");

		template.innerHTML = `
			<h2 class="future-title">Navigate to month</h2>
			<div class="future-container"></div>
		`;

		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		// Apply external styles to the shadow dom
		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		// NOTE: it's important that you do NOT include the slash before "style/css/..."
		linkElem.setAttribute("href", "style/css/futurenav.css");

		// dark mode class
		if (document.body.className == "dark-mode") {
			const CONTAINER = this.shadowRoot.querySelector(".future-container");
			CONTAINER.className += " dark-mode";
		}

		// Attach the created elements to the shadow dom
		shadow.appendChild(linkElem);
		
	}


	/**
	 * set year
	 * This function fills the contents of the future nav component to the year
	 * according to the parameter
	 * 
	 * @param {String} year - the year to create the future nav component
	 * 
	 * @example
	 * future-nav.year = 2021
	 */
	set year(year) {

		const futureContainer = this.shadowRoot.querySelector(".future-container");

		//append each month of a year to the nav
		MONTHS.forEach(month => {
			let futureItem =  document.createElement("div");
			futureItem.className = "future-item";

			let futureDate = document.createElement("div");
			futureDate.className = "future-date";
			let monthTitle = document.createElement("span");
			monthTitle.id = "month-title";
			monthTitle.textContent = month;
			let yearTitle = document.createElement("span");
			yearTitle.id = "year-title";
			yearTitle.textContent = year;

			futureDate.appendChild(monthTitle);
			futureDate.appendChild(yearTitle);

			futureItem.appendChild(futureDate)

			futureContainer.appendChild(futureItem);
		});
	}/* set year */
}/* FutureNav */

// Define a custom element for the future nav web component
customElements.define("future-nav", FutureNav);