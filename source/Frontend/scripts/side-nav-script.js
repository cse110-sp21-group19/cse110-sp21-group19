//side-nav-script.js
const MENUHEIGHT = "89vh";
const BORDERADIUS = "0.8em";
//Adding the side nav menu web component 


const SIDENAV  = document.createElement("side-nav");
document.getElementById("side-nav-container").appendChild(SIDENAV);
export const SIDENAVROOT = SIDENAV.shadowRoot;
//onclick listener for the side nav menu button
const expand = SIDENAVROOT.querySelector("[class='burger']");
expand.addEventListener("click", ()=>{
    if(expand.classList.contains("opened")){
        closeMenu();
    }
    else{
        openMenu();
    }
});

/*
 * openMenu
 * function to open the side nav menu, adds classes to perform animations/transformations
 * 
 * @example
 * 	openMenu()
 */
function openMenu(){
    let x = SIDENAVROOT.getElementById("x");
    let y = SIDENAVROOT.getElementById("y");
    let z = SIDENAVROOT.getElementById("z");

    let menu = SIDENAVROOT.getElementById("side-nav-menu");
    let title = SIDENAVROOT.getElementById("burger-and-title");

    expand.classList.remove("closed");
	expand.classList.add("opened");

    x.classList.add("transformx");
    y.classList.add("transformy");
    z.classList.add("transformz");


    menu.style.maxHeight = MENUHEIGHT;
    title.style.borderBottomLeftRadius = "0"
    title.style.borderBottomRightRadius = "0";
}/* openMenu */


/*
 * closeMenu
 * function to close the side nav menu, removes classes to perform animations/transformations
 * 
 * @example
 * 	closeMenu()
 */
export function closeMenu(){
    let x = SIDENAVROOT.getElementById("x");
    let y = SIDENAVROOT.getElementById("y");
    let z = SIDENAVROOT.getElementById("z");

    let menu = SIDENAVROOT.getElementById("side-nav-menu");
    let title = SIDENAVROOT.getElementById("burger-and-title");
    menu.style.maxHeight = null;
    
    setTimeout(function() {
        title.style.borderBottomLeftRadius = BORDERADIUS;
        title.style.borderBottomRightRadius = BORDERADIUS;
      }, 400);

    expand.classList.remove("opened");
	expand.classList.add("closed");

    x.classList.remove("transformx");
    y.classList.remove("transformy");
    z.classList.remove("transformz");


}/* closeMenu */