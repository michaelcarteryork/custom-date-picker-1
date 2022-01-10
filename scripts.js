// DECLARATIONS
const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.selected-date');
const dates_element = document.querySelector('.dates');
const month_element = document.querySelector('.month-and-year');
const prev_mth_element = document.querySelector('.prev-month');
const next_mth_element = document.querySelector('.next-month');
const days_element = document.querySelector('.days-grid');
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
displayMonthAndYear();

// populate selected date value in format dd / mm / yy
selected_date_element.textContent = formatDate(date);

// populate with days of week
populateDates();

// EVENT LISTENERS

date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', () => changeMonth(1));
prev_mth_element.addEventListener('click', () => changeMonth(-1));

// FUNCTIONS

/**
 * display month and year in month selector
 */
function displayMonthAndYear() {
    month_element.textContent = months[month] + ' ' + year;
}

/**
 * change month and display new month and year
 * @param {integer} monthIncrement - 1 for forward month, -1 for back month 
 */
function changeMonth(monthIncrement) {
    month += monthIncrement;
    if (month == 12) {
        month = 0;
        year ++;
    }
    if (month == -1) {
        month = 11;
        year --;
    }
    displayMonthAndYear();
    populateDates();
}

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

/**
 * populate days of month grid
 * to get numnber of days in current month:
 * go one month ahead
 * then get last day in previous month
 */
function populateDates() {
    days_element.innerHTML = '';
    let amount_days = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < amount_days; i++) {
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;

        // add class for selected day
        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            day_element.classList.add('selected');
        }

        // add class for today
        if (todaysDay == (i + 1) && todaysYear == year && todaysMonth == month) {
            day_element.classList.add('today');
        }

        days_element.appendChild(day_element);
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
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}

/**
 * format date from date parameter
 * @param {object} d - date object 
 * @returns date in format dd / mm / yyyy
 */
function formatDate(d) {
    let day = d.getDate();
    if (day < 10) {day = '0' + day};

    let month = d.getMonth() + 1;
    if (month < 10) {month = '0' + month};

    let year = d.getFullYear();
    return day + ' / ' + month + ' / ' + year;
}
