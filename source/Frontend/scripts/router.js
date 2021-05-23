// router.js
export const router = {};

/**
 * Set the state for the new page
 * @param {string} state The new page to set the state of
 * @param {boolean} statePopped If the request came from a popstate event
 * @param {number} entryNum if state is 'entry', then entryNum is the num
 */
 router.setState = (state, statePopped, entryNum) => {
    switch (state) {
        case "daily-log":
            console.log("daily");
            break;
        case "monthly-log":
            console.log("monthly");
            break;
        case "future-log":
            console.log("future");
            break;
        default:
            console.log("defualt");


    }
  
    // if(!statePopped && window.location.hash != `#${state}`) {
    //   pushToHistory(state, entryNum);
    // }
  }