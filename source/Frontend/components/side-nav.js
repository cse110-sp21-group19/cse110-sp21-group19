//
const FUTURE = "Future Log";
const DAILY = "Daily Log";
const MONTHLY = "Monthly Log";

//const DHASH = "#daily-log";
//const MHASH = "#monthly-log";
//const FHASH = "#future-log";

class SideNav extends HTMLElement{
	constructor() {
		super();

		const template = document.createElement("template");

        //         <ul id="side-nav-menu">
        //             <a id="sn-future-log" class="sn-link" href="#"><li>${FUTURE}</li></a>
        //             <a id="sn-daily-log" class="sn-link" href="#"><li>${DAILY}</li></a>
        //             <a id="sn-monthly-log" class="sn-link" href="#"><li>${MONTHLY}</li></a>
        //         </ul>
        //     </div>
		template.innerHTML = `
			<div id="burger-and-title" class="burger-and-title">
				<div class="burger" id="side-nav-burger">
					<div class="x" id="x"></div>
					<div class="y" id="y"></div>
					<div class="z" id="z"></div>
				</div>   
				<h1 id="side-nav-title" class="side-nav-title">Daily Log</h1>
			</div>
			<div class="side-nav-menu-container">
				<div class="side-nav-menu" id="side-nav-menu">
					<ul>
						<li id="sn-daily-log" class="sn-link">${DAILY}</li>
						<li id="sn-monthly-log" class="sn-link">${MONTHLY}</li>
						<li id="sn-future-log" class="sn-link">${FUTURE}</li>
					</ul>
				</div>
			</div>
		`;

		// create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		// Apply external styles to the shadow dom
		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		// NOTE: it's important that you do NOT include the slash before "style/css/..."
		linkElem.setAttribute("href", "style/css/sidenav.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(linkElem);
        
	}

}
 


customElements.define("side-nav", SideNav);