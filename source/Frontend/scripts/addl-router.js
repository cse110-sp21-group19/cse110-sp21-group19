export const router = {};

/**
* setState changes the page based on the current URL
**/
router.setState = function() {
	let currUrl = window.location.hash;
	let mainText = document.querySelector(".main-text");
	let entriesBar = document.querySelector("entry-bar");

	switch (currUrl){
	case "#editing":
		mainText.style.display = "none";
		entriesBar.type = "editing";
		break;
	case "":
		mainText.style.display = "block";
		entriesBar.type = "initial";
		break;
	case "#hasentries":
		mainText.style.display = "block";
		entriesBar.type = "openbar";
		break;
	}
}