//side-nav-script.js
import {DAYS, MONTHS} from '../components/log-type.js';
import { SUN, MOON } from "../components/icons.js";

const MENUHEIGHT = "89vh";
const BORDERADIUS = "0.8em";

const LIGHT =  "#E5E5E5";
const DARK  = "#181A18";
const WHITE =  "white";
const BLACK =  "black";

//Adding the side nav menu web component 

const SIDENAV  = document.createElement("side-nav");
document.getElementById("side-nav-container").appendChild(SIDENAV);
//onclick listener for the side nav menu button
const SIDENAVROOT = SIDENAV.shadowRoot;
const expand = SIDENAVROOT.querySelector("[class='burger']");
expand.addEventListener("click", () => {
    if(expand.classList.contains("opened")){
        closeMenu();
    }
    else{
        openMenu();
    }
});

/** 
 * openMenu
 * Function to open the side nav menu, adds classes to perform animations/transformations.
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


/**
 * closeMenu
 * Function to close the side nav menu, removes classes to perform animations/transformations.
 * 
 * @example
 * 	closeMenu()
 */
export function closeMenu(){
    console.log("sup yall")
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

/**
 * colorToggle
 * Allows user to click on the sun/moon icon in the side navigation to change 
 * the color theme to light/dark mode.
 * 
 * @example
 * 	colorToggle()
 */
//export function colorToggle() {
    const BODY = document.querySelector("body");
    const COLORCONTAINER = SIDENAVROOT.querySelector(".color-mode-container");


    COLORCONTAINER.addEventListener("click", () => {
        const IMG = COLORCONTAINER.querySelector("svg");
        const WNITEMS = document.querySelector("weekly-nav").shadowRoot.querySelectorAll(".wn-item");
        const BULLETINPUTROOT = document.querySelector("bullet-input").shadowRoot;
        const BULLETINPUT = BULLETINPUTROOT.querySelector(".new-bullet");
        const BULLETSELECTOR = BULLETINPUTROOT.getElementById("bullet-type");
        const BULLETINPUTBAR = BULLETINPUTROOT.getElementById("bullet-input");
        // if it is currently light mode, switch to dark
        //if (IMG.id === "light-mode") {
        if (IMG.id === "") {
            COLORCONTAINER.innerHTML = MOON;
            IMG.id = "dark-mode";
            BODY.className = "dark-mode";

            WNITEMS.forEach(element => {
                element.style.background = DARK;
            });
            
            BULLETINPUT.className += " dark-mode";

            const BULLETLISTEL = document.querySelectorAll("bullet-list");
            BULLETLISTEL.forEach(element => {
                element.shadowRoot.querySelectorAll("bullet-entry").forEach(element => {
                    element.shadowRoot.querySelector(".entry").className += " dark-mode";
                });
            });
        }
        // else if it is currently dark mode, switch to light
        else {
            COLORCONTAINER.innerHTML = SUN;
            IMG.id = "light-mode";
            BODY.className = "";
            WNITEMS.forEach(element => {
                element.style.background = WHITE;
            });
            BULLETINPUT.className = "new-bullet";

            const BULLETLISTEL = document.querySelectorAll("bullet-list");
            BULLETLISTEL.forEach(element => {
                element.shadowRoot.querySelectorAll("bullet-entry").forEach(element => {
                    element.shadowRoot.querySelector(".entry").className = "entry";
                });
            });
        }
        closeMenu();
    })

//} /* colorToggle */