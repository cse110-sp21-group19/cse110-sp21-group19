// Constant for different bullet types
//  Note Bullets:
const NOTEBULLET = "-"
//  Task Bullets:
const TASKBULLET = "□";
const TASKCOMPLETE = "☑";
//const TASKBULLET = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"/></svg>`;
//const TASKCOMPLETE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"/></svg>`;

const TASKMIGRATE = "<i class=\"fas fa-chevron-right\"></i>";
const TASKFUTURE = "<i class=\"fas fa-chevron-left\"></i>";
const TASKIRR = "";
//  Event Bullets:
const EVENTBULLET = "&#9675;";

// Priority Markers:
const NOTPRIORITY = "&#9734;";
const PRIORITY = "★";

// <bullet-select> custom web component
/*
class BulletSelect extends HTMLElement {
    constructor() {
        super();

        // templated HTML content
        const template = document.createElement("template");

        template.innerHTML = `
            <div id="bullet-selector">
                <select id="bullet-type">
                    <option value="note" selected>  New Note <h5> - </h5></option> <!-- default is a note bullet-->
                    <option value="task"> New Task <h5>&#8226;</h5></option>
                    <option value="event"> New Event <h5>&#9900;</h5></option>
                </select>
            </div>
            `;

        // create a shadow root for this web component
        const shadow = this.attachShadow({ mode: "open" });
        // attach cloned content of template to shadow DOM 
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Apply external styles to the shadow dom
        /*
        const bulletInputStyle = document.createElement('link');
        bulletInputStyle.setAttribute("rel", "stylesheet");
        bulletInputStyle.setAttribute("href", "style/css/bulletinput.css");

        // Attach the created elements to the shadow dom
        shadow.appendChild(bulletInputStyle);
        
    }
    // getter
    get entry() {
        return this.getAttribute("value");
    }
  
    // setter
    set entry(value) {
        this.setAttribute("value", value);
    }
}
    
// Define a custom element for the bullet-entry web component   
customElements.define('bullet-select', BulletSelect);
*/

// <bullet-input> custom web component
class BulletInput extends HTMLElement {
    constructor() {
        super();

        // templated HTML content
        const template = document.createElement("template");

        template.innerHTML = `
            <div class="new-bullet" id="new-bullet">
                <select id="bullet-type">
                    <option value="note" selected>  New Note <h5> - </h5></option> <!-- default is a note bullet-->
                    <option value="task"> New Task <h5>&#9633;</h5></option>
                    <option value="event"> New Event <h5>&#9675;</h5></option>
                </select>
                <input type="text" id="bullet-input" placeholder="New note...">
            </div>
            `;
        // create bullet selector
        const BULLETSELECT = document.createElement("bullet-select");
 
        // create a shadow root for this web component
        const shadow = this.attachShadow({ mode: "open" });
        // attach cloned content of template to shadow DOM 
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Apply external styles to the shadow dom
        const bulletInputStyle = document.createElement('link');
        bulletInputStyle.setAttribute("rel", "stylesheet");
        bulletInputStyle.setAttribute("href", "style/css/bulletinput.css");

        // Attach the created elements to the shadow dom
        shadow.appendChild(bulletInputStyle);
        shadow.appendChild(BULLETSELECT);
    }
}
    
// Define a custom element for the bullet-entry web component   
customElements.define('bullet-input', BulletInput);


// <bullet-entry> custom web component
class BulletEntry extends HTMLElement {
    constructor() {
        super();

        // templated HTML content
        const template = document.createElement('template');
  
        template.innerHTML = `
            <div class="entry">
                <div class="bullet-entry">
                    <button id="prioritize-bullet" type="button"></button>
                    <span id="bullet-type"></span>
                    <input id="bullet-inputted" type="text" readonly>
                    <button id="delete-bullet" type="button">X</button>
                </div>
            </div>
            `;
  
        // create a shadow root for this web component
        const shadow = this.attachShadow({ mode: 'open' });

        // attach cloned content of template to shadow DOM 
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Apply external styles to the shadow dom
        const bulletEntryStyle = document.createElement('link');
        bulletEntryStyle.setAttribute('rel', 'stylesheet');
        bulletEntryStyle.setAttribute('href', 'style/css/bulletentry.css');

        // Attach the created elements to the shadow dom
        shadow.appendChild(bulletEntryStyle);

        this.shadowRoot.getElementById("prioritize-bullet").innerHTML = NOTPRIORITY;
        this.shadowRoot.getElementById("bullet-type").innerHTML = NOTEBULLET;
    }
  
    /*
     * `get` binds a property to a function that will be called when that property is looked up
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
     */
    get entry() {
        const BULLETTYPEELEM = this.shadowRoot.getElementById("bullet-type").innerHTML;
        let entryObj = {
            "type": BULLETTYPEELEM,
            "date": "", // FIXME
            "content": this.shadowRoot.getElementById("bullet-inputted").value,
            "priority": false,
            "completed": false
        };

        // set priority value
        if (this.shadowRoot.getElementById("prioritize-bullet").innerHTML === PRIORITY) {
            entryObj.priority = true;
        }

        // set completed value
        if (entryObj.type === "task"
            && BULLETTYPEELEM === TASKCOMPLETE) {
            entryObj.completed = true;
        }

        return entryObj;
    }

    /*
     * `set` binds an object property to a function to be called when there is an attempt to set that property
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
     */
    set entry(entry) {
        
        const BULLETTYPEELEM = this.shadowRoot.getElementById("bullet-type");
        let bulletHTML;
        if (entry.type === "note") {
            bulletHTML = NOTEBULLET;
        }
        else if (entry.type === "event") {
                bulletHTML = EVENTBULLET;
        }
        // event
        else {
            if (entry.completed) {
                bulletHTML = TASKCOMPLETE;
            }
            else {
                bulletHTML = TASKBULLET;
            }

        }

        BULLETTYPEELEM.innerHTML = bulletHTML;
        // TODO: do something with entry.date
        this.shadowRoot.getElementById("bullet-inputted").value = entry.content;

        // set priority value
        if (entry.priority === true) {
            this.shadowRoot.getElementById("prioritize-bullet").innerHTML = PRIORITY;
        }
        else {
            this.shadowRoot.getElementById("prioritize-bullet").innerHTML = NOTPRIORITY;
        }

        // set completed value
        /*
        if (entry.type === TASKCOMPLETE && entry.completed === true) {
            BULLETTYPEELEM.options[BULLETTYPEELEM.selectedIndex].innerHTML = TASKCOMPLETE;
        }
        else {
            BULLETTYPEELEM.options[BULLETTYPEELEM.selectedIndex].innerHTML = TASKBULLET;
        }
        */
    }

}
    
// Define a custom element for the bullet-entry web component   
customElements.define('bullet-entry', BulletEntry);

/**
 * JSON Format:
 * completed will only sometimes be there
 *
 * {
 *   type: "foo", // can be: note, task, event
 *   date: "foo",
 *   content: "foo",
 *   priority: false, // default
 *   completed: false // default
 *   children: [] // json objects (bullet-entries)
 * }
 */