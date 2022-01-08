// DECLARATIONS

const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');

// EVENT LISTENERS

date_picker_element.addEventListener('click', toggleDatePicker);

// FUNCTIONS

/**
 * toggle date picker
 * if click not within dates toggle on and off active class to dates_element
 * @param {object} event object 
 */
function toggleDatePicker(e) {
    if (!checkEventPathForClass(e.path, 'dates')) {
        dates_element.classList.toggle('active');
    }
}

// HELPER FUNCTIONS

/**
 * checks if full path (of where clicked) doesn't contain selector
 * @param {array} path - nested hierarchy of path 
 * @param {string} selector - selector to check against
 * @returns {boolean}
 */
function checkEventPathForClass (path, selector) {
    console.log(path);
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}
