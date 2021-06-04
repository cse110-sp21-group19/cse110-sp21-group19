// help-guide-script

export const helpGuideContent = [{
    "sectionTitle": "Layouts",
    "sectionDescription": [""],
    "sectionElements": [{
        "title": "Daily",
        "content": "Description of Daily Log..."
    },
    {
        "title": "Monthly",
        "content": "Description of Monthly Log..."
    },
    {
        "title": "Future",
        "content": "Description of Future Log..."
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
        "title": "Adding a New Entry",
        "content": "To create a new additional entry..."
    },
    {
        "title": "Editing an Entry",
        "content": "To edit an existing additional entry..."
    },
    {
        "title": "Deleting Entries",
        "content": "To delete an addtional entry..."
    }]
}];

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
}