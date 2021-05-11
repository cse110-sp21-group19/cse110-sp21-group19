// Constant for different bullet types
//  Note Bullets:
const NOTEBULLET = "-"
//  Task Bullets:
const TASKBULLET = "<i class=\"fas fa-circle\"></i>";
const TASKCOMPLETE = "<i class=\"fas fa-times\"></i>";
const TASKMIGRATE = "<i class=\"fas fa-chevron-right\"></i>";
const TASKFUTURE = "<i class=\"fas fa-chevron-left\"></i>";
const TASKIRR = "";
//  Event Bullets:
const EVENTBULLET = "<i class=\"far fa-circle\"></i>";

// <bullet-select> custom web component
class BulletSelect extends HTMLSelectElement {
    constructor() {
        super();

        // templated HTML content
        const template = document.createElement("template");

        template.innerHTML = `
            <select id="bullet-select">
                <option value="note" selected=""><span id="bullet-descrip">New Note </span></option> <!-- default is a note bullet-->
                <option value="task"><span id="bullet-descrip">New Task </span></option>
                <option value="event"><span id="bullet-descrip">New Event </span></option>
            </select>
            `;
        let bulletSelector = document.getElementById("bullet-select");
        let bulletSelections = bulletSelector.children;

        // add appropriate bullet symbol for each bullet type
        for (let i = 0; i < bulletSelections.length; i++) {
            if (bulletSelections[i].value === "note") {
                bulletSelections[i].innerHTML += NOTEBULLET;
                // set to note bullet by default
                // TODO: set note to the user set bullet
                bulletSelections[i].selected = true;
            }
            else if (bulletSelections[i].value === "task") {
                bulletSelections[i].innerHTML += TASKBULLET;
            }
            else if (bulletSelections[i].value === "event") {
                bulletSelections[i].innerHTML += EVENTBULLET;
            }
        }
       

        // create a shadow root for this web component
        const shadow = this.attachShadow({ mode: 'open' });
        // attach cloned content of template to shadow DOM 
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '/style/css/bulletentry.css');

        // Attach the created element to the shadow dom
        shadow.appendChild(linkElem);
    }
}
// Define a custom element for the BulletSelect web component
customElements.define('bullet-select', BulletSelect);


// <main-text> custom web component
class MainText extends HTMLElement {
    constructor() {
        super();

        // templated HTML content
        const template = document.createElement("template");

        template.innerHTML = "<div class=\"entry\"></div>";

        // create a shadow root for this web component
        this.attachShadow({ mode: 'open' });
        // attach cloned content of template to shadow DOM 
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /*
    * getEntry
    * 
    * @param N/A
    * @return {object} An entry object
    *
    * @example
    * 
    *   obj.getEntry;
    */
    get getEntry() {
        return this.getAttribute("entry");
    }/* getEntry */

    /*
    * setEntry
    * 
    * @param {object} An entry object
    * 
    * @example
    * 
    *   obj.setEntry = "{attribute: value}";
    */
   set setEntry(entry) {
        let entryDiv = document.querySelector(".entry");
        
        // create an unordered list for the entry
        let bulletList = document.createElement("ul");

        // initial prompt for new entry
        let bulletSelector = document.createElement('bullet-select');
       

        this.setAttribute('entry', entry);
   }/* setEntry */
}
// Define a custom element for the MainText web component
customElements.define('main-text', MainText);






// <bullet-entry> custom web component
class BulletEntry extends HTMLElement {
    constructor() {
        super();

        // templated HTML content
        const template = document.createElement('template');
  
        template.innerHTML = `<div class="entry"></div>`;
  
        // create a shadow root for this web component
        this.attachShadow({ mode: 'open' })
        // attach cloned content of template to shadow DOM 
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  
    /*
     * `get` binds a property to a function that will be called when that property is looked up
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
     */
    get entry() {
        return this.getAttribute('entry');
    }
  
    /*
     * `set` binds an object property to a function to be called when there is an attempt to set that property
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
     */
    set entry(entry) {
      
        let bulletDiv = this.shadowRoot.querySelector('.entry');
        bulletDiv.className = "bullet-entry";

        // create bullet selector for each entry
        let bulletSelector = document.createElement('select');
        let noteBullet = document.createElement('option');
        noteBullet.value = "note";
        noteBullet.innerHTML = " - ";
        bulletSelector.appendChild(noteBullet);
        let taskBullet = document.createElement('option');
        taskBullet.value = "task";
        taskBullet.innerHTML = "&#8226;"; 
        bulletSelector.appendChild(taskBullet);
        let eventBullet = document.createElement('option');
        eventBullet.value = "event";
        eventBullet.innerHTML = "&#9900;";
        bulletSelector.appendChild(eventBullet);
        
        // set default bullet to user selected one
        let bulletSelections = bulletSelector.children;
        for (var i = 0; i < bulletSelections.length; i++) {
            if (bulletSelections[i].value === entry.type) {
                    bulletSelections[i].selected = true;
            }
        }
        bulletDiv.appendChild(bulletSelector);

        // add bullet text content
        let bulletContent = document.createElement('input');
        bulletContent.setAttribute('id', 'bullet-inputted');
        bulletContent.type = 'text';
        bulletContent.value = entry.content;
        bulletContent.readOnly = true;
        bulletDiv.appendChild(bulletContent);

        // button to delete
        let bulletDelete = document.createElement('button');
        bulletDelete.type = 'button';
        bulletDelete.innerHTML = 'X';
        bulletDiv.appendChild(bulletDelete);
    
        this.setAttribute('entry', entry);
    }
}
    
    /*
    * Define a custom element for the JournalEntry web component, 
    * where 'journal-entry' is the string that represents this element.
    * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
    */ 
    customElements.define('bullet-entry', BulletEntry);
    
/**
 * JSON Format:
 * image and audio will only sometimes be there
 *
 * {
 *   title: 'foo',
 *   date: 'foo',
 *   content: 'foo',
 *   image: {
 *     src: 'foo.com/bar.jpg',
 *     alt: 'foo'
 *   },
 *   audio: 'foo.com/bar.mp3'
 * }
 */