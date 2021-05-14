
class WeeklyNav extends HTMLElement{
    constructor() {
        super();
        const template = document.createElement('template');

        //TODO: Fix the styling
        template.innerHTML = `
            <div class="week-container">
                <div class="wn-item">
                    <h2 class="wn-day-of-week"></h2>
                    <h3 class="wn-date"></h3>
                    <ul class="wn-bullets"></ul>
                </div>
            </div>
        `;

        // create a shadow root for this web component
        const shadow = this.attachShadow({ mode: 'open' });
        // attach cloned content of template to shadow DOM 
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute("rel", "stylesheet");
        // NOTE: it's important that you do NOT include the slash before "style/css/..."
        linkElem.setAttribute("href", "style/css/weeklynav.css");

        // Attach the created elements to the shadow dom
        shadow.appendChild(linkElem);
        
    }


    set daysOfWeek(week){
        const navContainer = this.shadowRoot.querySelector("[class='week-container']");

        //Add each day to the nav menu
        week.forEach(element => {
            let day = getDateString(element.getDay());
            //convert month and date to string of form M/D
            let date = (element.getMonth() + 1) + "/" + element.getDate();

            let navItem = document.createElement("div");
            navItem.className = "wn-item";
            let navDay = document.createElement("h2");
            navDay.className = "wn-day-of-week";
            navDay.textContent = day;
            let navDate = document.createElement("h3");
            navDate.className = "wn-date";
            navDate.textContent = date;

            navItem.appendChild(navDay);
            navItem.appendChild(navDate);
            navContainer.appendChild(navItem);
        });
    
    }
}


/**
 * getDateString - converts integer day of week to its related string
 * 
 * @param {*} day - An integer of the day of the week (0-6)
 * 
 * @returns A string of the related day of the week of the parameter
 */
function getDateString(day){
    switch(day){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Sunday";
    }
}/* getDateString */

customElements.define('weekly-nav', WeeklyNav);