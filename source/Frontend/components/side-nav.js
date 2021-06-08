//side-nav.js

import { SUN } from "./icons.js";

const FUTURE = "Future Log";
const DAILY = "Daily Log";
const MONTHLY = "Monthly Log";

/**
 * Class represting a custom side nav component
 * @extends HTMLElement
 * 
 * @example
 * <side-nav>
 */

//<side-nav> custom web component
class SideNav extends HTMLElement{

	/**
	 * Create a side nav component
	 */
	constructor() {
		super();

		const template = document.createElement("template");

		template.innerHTML = `
			<style>
				svg {
					width: 2rem;
					height: 2rem;
				}
			</style>
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
						<li id="sn-help" class="sn-link">Help</li>
					</ul>
					<div class="color-mode-container">
						${SUN}
					</div>
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

}/* SideNav */

// Define a custom element for the sidenav web component
customElements.define("side-nav", SideNav);