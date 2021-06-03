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

class HelpElement extends HTMLElement {
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
		this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    get info() {
        return null;
    }

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
    }
}

customElements.define("help-element", HelpElement);

class HelpSection extends HTMLElement {
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
		this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    get info() {
        return null;
    }

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
        console.log("in section.info setter");
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
    }
}

customElements.define("help-section", HelpSection);

/*
class HelpGuide extends HTMLElement {
    constructor() {
        super();

        // templated HTML content
		const template = document.createElement("template");

		template.innerHTML = `
			<div class="help-element" id="help-element">
                <h3 id="help-element-title"></h3>
                <p id="help-element-content"></p>
			</div>
			`;
        // create a shadow root for this web component
		const shadow = this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

customElements.define("help-guide", HelpGuide);
*/