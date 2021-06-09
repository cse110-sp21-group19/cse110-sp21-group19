// <bullet-entry> custom web component
class BulletEntry extends HTMLElement {
    constructor() {
        super();

        // templated HTML content
        const template = document.createElement('template');
  
        template.innerHTML = `
            <style>
                .bullet-entry {
                    width: 100%;
                }
                .bullet-entry:hover {
                    background-color: #d0ecfd;
                    display: inline-block;
                }
                .bullet-entry:hover > select, .bullet-entry:hover > button {
                    color: grey;
                }
                input[type=text], select, button {
                    padding: 12px;
                    margin: 4px 0;
                    box-sizing: border-box;
                    border: none;
                    background-color: transparent;
                }
                select, button {
                    cursor: pointer;
                }
                input[type=text] {
                    width: 70%;
                }
                select {
                    width: 20%;
                    -o-appearance: none;
                    -ms-appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    text-align-last: right;
                }
                button {
                    color: transparent;
                    width: auto;
                }
                .bullet-enry:hover > button:hover {
                    color: black;
                }
            </style>
            <div class="entry"></div>
            `;
  
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