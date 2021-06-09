// help-guide.js

/**
 * @typedef {Object} HelpElementObj
 * @property {string} title - The title of the help element.
 * @property {string} content - The description of the help element.
 */

/**
 * @typedef {Object} HelpSectionObj
 * @property {string} sectionTitle - The title of the help section.
 * @property {Array.<string>} sectionDescription - An array of description paragraphs for 
 * @property {Array.<HelpElementObj>} sectionElements - An array of help elements.
 */

/** Class representing a help element. */
class HelpElement extends HTMLElement {
	/**
	 * Create a help element.
	 */
    constructor() {
        super();

		// templated HTML content
		const template = document.createElement("template");

		template.innerHTML = `
			<div class="help-element" id="help-element">
                <h3 id="help-element-title"></h3>
                <p id="help-element-content"></p>
			</div>`;
        // create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		// Apply external styles to the shadow dom
		const helpElementStyle = document.createElement("link");
		helpElementStyle.setAttribute("rel", "stylesheet");
		helpElementStyle.setAttribute("href", "style/css/helpguide.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(helpElementStyle);
    } /* constructor */

	/**
	 * get info
	 * Default function.
	 */
    get info() {
        return null;
    } /* get info */

	/**
	 * set info
	 * Set a help element's title and content
	 * @param {HelpElementObj} info - a JSON object containing the title and
     * content of the help element.
	 * 
	 * @example
	 *      this.info = {
 	 *  				 title: "foo",
 	 *  				 content: "foo",
	 * 					}
	 */
    set info(info) {
        // set title
        const TITLE = this.shadowRoot.getElementById("help-element-title");
        TITLE.innerText = info.title;
        // set content
        const CONTENT = this.shadowRoot.getElementById("help-element-content");
        CONTENT.innerText = info.content;
    } /* set info */
}

customElements.define("help-element", HelpElement);

/** Class representing a section on the help page. */
class HelpSection extends HTMLElement {
	/**
	 * Create a help section.
	 */
    constructor() {
        super();

        // templated HTML content
		const template = document.createElement("template");

		template.innerHTML = `
			<div class="help-section" id="help-section">
                <h2 id="help-section-title"></h2>
                <div id="help-section-description"></div>
                <div id="help-section-elements"></div>
			</div>`;
        // create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		// Apply external styles to the shadow dom
		const helpElementStyle = document.createElement("link");
		helpElementStyle.setAttribute("rel", "stylesheet");
		helpElementStyle.setAttribute("href", "style/css/helpguide.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(helpElementStyle);
    } /* constructor */

	/**
	 * get info
	 * Default function.
	 */
    get info() {
        return null;
    } /* get info */

	/**
	 * set info
	 * Set a help element's title and content
	 * @param {HelpSectionObj} entry - A JS object containing the type, date, 
	 * content, priority, and completed information of the bullet.
	 * 
	 * @example
	 *      this.info = {
 	 *  				 sectionTitle: "foo",
 	 *  				 sectionDescription: [],
 	 *  				 sectionElements: [],
	 * 					}
	 */
    set info(info) {
        // set title
        const TITLE = this.shadowRoot.getElementById("help-section-title");
        TITLE.innerText = info.sectionTitle;
        // set description
        const DESCRIPTION = this.shadowRoot.getElementById("help-section-description");
        info.sectionDescription.forEach(element => {
            let description = document.createElement("p");
            description.innerHTML = element;
            DESCRIPTION.appendChild(description);
        });
        // set help elements
        const HELPELEMENTS = this.shadowRoot.getElementById("help-section-elements");
        info.sectionElements.forEach(element => {
            let section = document.createElement("help-element");
            section.info = element;
            HELPELEMENTS.appendChild(section);
        })
    } /* set info */
}

customElements.define("help-section", HelpSection);

/** Class representing the help page table of contents. */
class HelpTableOfContents extends HTMLElement {
	/**
	 * Create help page's table of contents.
	 */
	constructor() {
		super();
		const template = document.createElement("template");

		template.innerHTML = `
			<h2 class="help-nav-title">Table of Contents</h2>
			<div class="help-toc-container">
			</div>
		`;

		//const shadow = 
		let shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		// dark mode class
		if (document.body.className == "dark-mode") {
			const CONTAINER = this.shadowRoot.querySelector(".help-toc-container");
			CONTAINER.className += " dark-mode";
		}

		// Apply external styles to the shadow dom
		const helpElementStyle = document.createElement("link");
		helpElementStyle.setAttribute("rel", "stylesheet");
		helpElementStyle.setAttribute("href", "style/css/helpguide.css");

		// Attach the created elements to the shadow dom
		shadow.appendChild(helpElementStyle);
	} /* constructor */

	/**
	 * get contents
	 * Default function.
	 */
	get contents() {
		return null;
	} /* get contents */

	/**
	 * set contents
	 * Set the table of contents for the help page.
	 * @param {Array.<HelpSectionObj>} entry - An array containing JS object with 
	 * the type, date, content, priority, and completed information of the bullet.
	 * 
	 * @example
	 *      this.info = [{
 	 *  				 sectionTitle: "foo",
 	 *  				 sectionDescription: [],
 	 *  				 sectionElements: [],
	 * 					},
 	 *  				 sectionTitle: "foo",
 	 *  				 sectionDescription: [],
 	 *  				 sectionElements: [],
	 * 					}];
	 */
	set contents(contents) {
		let tocContainer = this.shadowRoot.querySelector(".help-toc-container");
		contents.forEach(element => {
			let tocLink = document.createElement("div");
			tocLink.className = "toc-link";
			tocLink.id = "toc-link";
			tocLink.innerText = element.sectionTitle;
			tocContainer.appendChild(tocLink);
		});
	} /* set contents */
}

customElements.define("help-toc", HelpTableOfContents);