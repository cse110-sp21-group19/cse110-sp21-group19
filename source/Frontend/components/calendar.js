//calendar.js
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
class Calendar extends HTMLElement{
	constructor() {
		super();

		const template = document.createElement("template");

		template.innerHTML = `
			<div class="month"></div>

	  		<ul class="weekdays">
				<li>Mo</li>
				<li>Tu</li>
				<li>We</li>
				<li>Th</li>
				<li>Fr</li>
				<li>Sa</li>
				<li>Su</li>
	  		</ul>

	  		<ul class="days">
			</ul>
		`;

		// create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		// Apply external styles to the shadow dom
		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		// NOTE: it's important that you do NOT include the slash before "style/css/..."
		linkElem.setAttribute("href", "style/css/calendar.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(linkElem);
        
	}

	set month(date){
		let month = date.getMonth();
		let firstDay = date.getDay();
		const shadow = this.shadowRoot;
		//shadow.querySelector(".month").textContent(MONTHS[month]);
		for(let i = 0; i < firstDay; i++){
			let emptyDay = document.createElement("li");
			emptyDay.className = "empty-day";
			shadow.querySelector(".days").appendChild(emptyDay);
		}

		while (date.getMonth() === month){
			let newDay = document.createElement("li");
			newDay.className = "day";
			shadow.querySelector(".days").appendChild(newDay);
			date.setDate(date.getDate() + 1);
		}
	}

}
 


customElements.define("calendar-component", Calendar);