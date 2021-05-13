// Constant for different bullet types
//  Note Bullets:
const NOTEBULLET = "-"
//  Task Bullets:
const TASKBULLET = "&#9633;";
const TASKCOMPLETE = "&#9745;";
const TASKMIGRATE = "<i class=\"fas fa-chevron-right\"></i>";
const TASKFUTURE = "<i class=\"fas fa-chevron-left\"></i>";
const TASKIRR = "";
//  Event Bullets:
const EVENTBULLET = "<i class=\"far fa-circle\"></i>";

// Priority Markers:
const NOTPRIORITY = "&#9734;";
const PRIORITY = "&#9733;";

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
                    <option value="task"> New Task <h5>&#8226;</h5></option>
                    <option value="event"> New Event <h5>&#9900;</h5></option>
                </select>
                <input type="text" id="bullet-input" placeholder="new bullet...">
            </div>
            `;
        // create bullet selector
        const BULLETSELECT = document.createElement("bullet-select");
 
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
        */
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
                    <select id="bullet-type">
                        <option value="note" selected>-</option> <!-- default is a note bullet-->
                        <option value="task">&#8226;</option>
                        <option value="event">&#9900;</option>
                    </select>
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
    }
  
    /*
     * `get` binds a property to a function that will be called when that property is looked up
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
     */
    get entry() {
        const BULLETTYPEELEM = this.shadowRoot.getElementById("bullet-type");
        let entryObj = {
            "type": BULLETTYPEELEM.value,
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
            && BULLETTYPEELEM.options[BULLETTYPEELEM.selectedIndex].text === TASKCOMPLETE) {
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

        BULLETTYPEELEM.value = entry.type;
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
        if (entry.type === "task" && entry.completed === true) {
            BULLETTYPEELEM.options[BULLETTYPEELEM.selectedIndex].innerHTML = TASKCOMPLETE;
        }
        else {
            BULLETTYPEELEM.options[BULLETTYPEELEM.selectedIndex].innerHTML = TASKBULLET;
        }
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
 * }
 */