// DECLARATIONS

const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const month_element = document.querySelector('.date-picker .dates .month .month-and-year');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const days_element = document.querySelector('.date-picker .dates .days');
const months = ['January', 'February', 'March',  'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// initial values for current date, day, month and year
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

// these values change on user selection
let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

// today (doesn't change)
let todaysDate = date;
let todaysDay = day;
let todaysMonth = month;
let todaysYear = year;

// set month and year (in monnth selector)
month_element.textContent = months[month] + ' ' + year;

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
