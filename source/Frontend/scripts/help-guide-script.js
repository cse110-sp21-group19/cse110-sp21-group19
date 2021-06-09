// help-guide-script.js

// stores the content for the help guide
export const helpGuideContent = [{
    "sectionTitle": "Layouts",
    "sectionDescription": [""],
    "sectionElements": [{
        "title": "Daily",
        "content": "The daily log provides an area for rapid logging notes, tasks, and events for each day. Navigate to a new day but either clicking on the arrows above the notes area or clicking one of the days in the weekly overview on the left. The weekly overview will display all the prioritized (starred) tasks in each day."
    },
    {
        "title": "Monthly",
        "content": "The monthly log allows users to jot down bullets for each month. Clicking the arrows above the notes area will navigate to the previous/next month. An overview of every task created in the daily log for current month is displayed in the To-Do List. Clicking on a day in the calendar will navigate the user to the appropriate daily log page."
    },
    {
        "title": "Future",
        "content": "The future log is used to record future notes, tasks, and events for the year. Clicking the arrows above the notes area will navigate to the previous/next year. Quickly navigate to a monthly log by clicking on a month on the left."
    }]
},
{
    "sectionTitle": "Bullets",
    "sectionDescription": ["Bullets are used for rapid-logging ideas. Group bullets together by pressing \“Tab\” key on the input line to nest bullets. To unnest bullets, press \“Shift\” + \“Tab.\”", 
        "Project Eucalyptus supports three types of bullets: notes, tasks, and events. To change the type of bullet, click the bullet selector on the left side of the input line and select the appropriate bullet type."],
    "sectionElements": [{
        "title": "Notes",
        "content": "The note bullet is the default bullet type."
    },
    {
        "title": "Tasks",
        "content": "Task bullets can be marked as completed or incomplete by clicking the square bullet in the main text field."
    },
    {
        "title": "Events",
        "content": "Event bullets are denoted as an open circle. Use this bullet to indicate date-specific bullets."
    }]
},
{
    "sectionTitle": "Updating Bullets",
    "sectionDescription": [""],
    "sectionElements": [{
        "title": "Prioritization",
        "content": "To prioritize a bullet, hover over the bullet in the main text field. Select the star icon on the left side of the field."
    },
    {
        "title": "Editing Content",
        "content": "To edit the content of a bullet, double click on the bullet’s content. Edit the content as needed and press “Enter” to save."
    },
    {
        "title": "Deleting Bullets",
        "content": "To delete a bullet, hover over the bullet in the main text field. Select the ‘X’ button on the right."
    }]
},
{
    "sectionTitle": "Additional Entries",
    "sectionDescription": ["Additional entries allow users to jot down longer notes and add images to any type of layout. To access additional entries, click the “...” button at the bottom right corner of any layout page."],
    "sectionElements": [{
        "title": "Adding a New Text Entry",
        "content": "To create a new text entry, hover over the New Entry icon and select 'New Text Entry'. Change the title and content as you see fit, then press the save icon to save the changes you have made."
    },
    {
        "title": "Adding a New Image Entry",
        "content": "To create a new image entry, hover over the New Entry icon and select 'New Image'. Change the title as you see fit and click anywhere inside the panel to upload an image, then press the save icon to save the changes you have made."
    },
    {
        "title": "Editing a Text Entry",
        "content": "When the additional entries bar is expanded, click on any one of the text entries to view them. Then, change the title and contents of the entry as desired. Click the save button to save your changes."
    },
    {
        "title": "Editing a Image Entry",
        "content": "When the additional entries bar is expanded, click on any one of the image entries to view them. Then, change the title as desired and click the displayed image to upload a new one. Click the save button to save your changes."
    },
    {
        "title": "Deleting Entries",
        "content": "When the additional entries bar is expanded, click on any one of the entries to view them. Click on the trash can icon and confirm that you wish to delete the selected entry."
    }]
}];

/**
 * createHelpPage
 * Creates the help container and page in the main-text area. populates the
 * page with help guide content.
 * @param {array.<helpsectionobj>} entry - an array containing js object with 
 * the type, date, content, priority, and completed information of the bullet.
 *
 * @example
 *     createHelpPage([{
 *  				 sectiontitle: "foo",
 *  				 sectiondescription: [],
 *  				 sectionelements: [],
 * 					},
 *  				 sectiontitle: "foo",
 *  				 sectiondescription: [],
 *  				 sectionelements: [],
 * 					}]);
 */
export function createHelpPage(helpContent) {
    const HELPCONTAINER = document.createElement("div");
    HELPCONTAINER.className = "help-container";
    console.log(HELPCONTAINER);

    helpContent.forEach(element => {
        let section = document.createElement("help-section");
        console.log("in createHelpPage");
        section.info = element;
        HELPCONTAINER.appendChild(section);
    });

    // append help-container to main-text area
    const MAINTEXT = document.getElementById("main-text");
    MAINTEXT.appendChild(HELPCONTAINER);
} /* createHelpPage */

/**
 * createHelpToc
 * Creates the help page table of contents.
 * @param {array.<helpsectionobj>} entry - an array containing js object with 
 * the type, date, content, priority, and completed information of the bullet.
 *
 * @example
 *     createHelpToc([{
 	 *  				 sectiontitle: "foo",
 	 *  				 sectiondescription: [],
 	 *  				 sectionelements: [],
	 * 					},
 	 *  				 sectiontitle: "foo",
 	 *  				 sectiondescription: [],
 	 *  				 sectionelements: [],
	 * 					}]);
 */
export function createHelpToc(helpContent) {
    const HELPTOC = document.createElement("help-toc");
    HELPTOC.contents = helpContent;
} /* createHelpToc */