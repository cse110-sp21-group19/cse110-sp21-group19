import { createEntry, updateEntry, getEntry, deleteEntry, getDailyEntries } from './entries_api.js';

/* -----CREATING ENTRY---- */
let addBtn = document.getElementById("entryadd");
addBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    let date = document.getElementById("entrydate").value;
    let title = document.getElementById("entrytitle").value;
    let content = document.getElementById("entrycontent").value;

    let entryExample = {
        "date": date,
        "title": title,
        "content": content
    };

    //example
    let key = await createEntry(entryExample);
    console.log(key);
});

/* -----GETTING ENTRY----*/
let get = document.getElementById("entryget");
get.addEventListener("click", async function(event){
    let key = document.getElementById("entrykey").value;
    let result = await getEntry(Number(key));
    console.log(result);
});

/* -----UPDATING ENTRY----*/
let update = document.getElementById("entryupdate");
update.addEventListener("click", async function(event){
    let date = document.getElementById("entrydate").value;
    let title = document.getElementById("entrytitle").value;
    let content = document.getElementById("entrycontent").value;

    let entryExample = {
        "date": date,
        "title": title,
        "content": content
    };

    let key = document.getElementById("entrykey").value;
    let result = await updateEntry(Number(key), entryExample);
    console.log(result);
});

/* -----DELETING ENTRY----*/
let deleteBtn = document.getElementById("entrydelete");
deleteBtn.addEventListener("click", async () => {
    let key = document.getElementById("entrykey").value;
    let result = await deleteEntry(Number(key));/* .then(result => {
        console.log(`Deleted?: ${result}`);
    }); */
    console.log(`Deleted: ${result}`);
}); 

/*-----GETTING BY DATE----*/
let dailyBtn = document.getElementById("entrydaily");
dailyBtn.addEventListener("click", () => {
    //parsing date input value to mm/dd/year format
    let date = document.getElementById("dateget2").value;
    let splitDate = date.split("-");
    let year = splitDate[0];
    let month = splitDate[1];
    let day = splitDate[2];

    let formattedDate = `${month}/${day}/${year}`;

    getDailyEntries(formattedDate).then((result) => {
        console.log(result);
    });
});