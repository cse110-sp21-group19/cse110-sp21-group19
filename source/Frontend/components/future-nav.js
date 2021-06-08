//future-nav.js

import { MONTHS } from "./log-type.js";
//<future-nav> custom web component
class FutureNav extends HTMLElement{
	constructor() {
		super();
		const template = document.createElement("template");

		template.innerHTML = `
			<h2 class="future-title">Navigate to month</h2>
			<div class="future-container"></div>
		`;

		//ToDo Item format
		// 
		// <div class="wn-item">
		//     <h2 class="wn-date"><span id="day-of-month"></span><span id="day-of-week"></span> </h2>
		//     <ul class="wn-bullets"></ul>
		// </div>
		// create a shadow root for this web component

		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		// Apply external styles to the shadow dom
		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		// NOTE: it's important that you do NOT include the slash before "style/css/..."
		linkElem.setAttribute("href", "style/css/futurenav.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(linkElem);
		
	}


	set year(year){

		const futureContainer = this.shadowRoot.querySelector(".future-container");

		MONTHS.forEach(month =>{
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
		
	}

	
}


customElements.define("future-nav", FutureNav);