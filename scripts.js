/*
Date picker data - TODO: do in separate file
*/
const datePickerData = [
    {
        id: 'dp-1',
        active: true,
        startDate: true,
        endDate: true
    },
    {
        id: 'dp-2',
        active: true,
        startDate: true,
        endDate: false
    }
    ,
    {
        id: 'dp-3',
        active: true,
        startDate: true,
        endDate: true
    }
];

// Build each data picker HTML
// Ultimately do in nunjucks file TODO
const all_date_pickers = document.querySelector('.all-date-pickers');
all_date_pickers.innerHTML = ''; 

for (let i = 0; i < datePickerData.length; i++) {
    if (datePickerData[i].active) {
        all_date_pickers.innerHTML += `
        <div id="` +  datePickerData[i].id + `" class="date-picker">
            <div class="start-and-end-date">
                <div class="start-date"></div>
            </div>
            
            <div class="dates">
                <div class="month">
                    <div class="arrows prev-month">&lt;</div>
                    <div class="month-and-year"></div>
                    <div class="arrows next-month">&gt;</div>
                </div>
                <div class="week-day-headings"></div>
                <div class="days-grid"></div>
            </div>
        </div>
        `;
    } 
}

// Build each data picker JS
for (let index = 0; index < datePickerData.length; index++) {
    if (datePickerData[index].active) {
        // DECLARATIONS
        const date_picker = document.getElementById(datePickerData[index].id);
        const start_and_end_date_element = date_picker.querySelector('.start-and-end-date');
        const start_date_element = date_picker.querySelector('.start-date');
        
        // if item has an end date
        if (datePickerData[index].endDate) {
            let new_element = document.createElement('div');
            new_element.classList.add('end-date');
            new_element.textContent = 'dd / mm / yyyy';
            start_and_end_date_element.appendChild(new_element);
            const end_date_element = date_picker.querySelector('.end-date');
            end_date_element.addEventListener('click', toggleDatePicker);
        }
       
        
        const dates_element = date_picker.querySelector('.dates');
        const month_element = date_picker.querySelector('.month-and-year');
        const prev_mth_element = date_picker.querySelector('.prev-month');
        const next_mth_element = date_picker.querySelector('.next-month');
        const weekday_headings_element = date_picker.querySelector('.week-day-headings'); 
        const days_element = date_picker.querySelector('.days-grid');
        const months = ['January', 'February', 'March',  'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const weekdays = 'MTWTFSS';

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
        let todaysDay = day;
        let todaysMonth = month;
        let todaysYear = year;

        // selected date: populate in format dd / mm / yy
        start_date_element.textContent = formatDate(date);

        // month selector: display month and year
        displayMonthAndYear();

        // dates grid: populate with days of week
        populateDates();

        // EVENT LISTENERS

        start_date_element.addEventListener('click', toggleDatePicker);
        
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
            weekday_headings_element.innerHTML = '';
            days_element.innerHTML = '';

            for (let i = 0; i < 7; i++) {
                const weekday_heading = document.createElement('div');
                weekday_heading.classList.add('day');
                weekday_heading.textContent = weekdays.slice(i,i+1);
                weekday_headings_element.appendChild(weekday_heading);
            }

            // 0 = Monday, 1 = Tuesday etc
            let first_day_in_month = new Date(year, month, 1).getDay();

            // empty elements prior to first day of month
            for (let i = 0; i < first_day_in_month - 1; i++) {
                const empty_day_element = document.createElement('div');
                empty_day_element.classList.add('day');
                
                // Could do '-' or day in previous month?
                empty_day_element.textContent = '';
                days_element.appendChild(empty_day_element);
            }
            
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

                // add event listener to each date value
                day_element.addEventListener('click', function () {
                    selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
                    selectedDay = (i + 1);
                    selectedMonth = month;
                    selectedYear =  year;
                    start_date_element.textContent = formatDate(selectedDate);
                    populateDates();
                })
                
                // add dataset value to selected date
                start_date_element.dataset.value = selectedDate;

                // add each date
                days_element.appendChild(day_element);
            }
        }
    }  
}

function buildDatePicker(element_id, index) {
    
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
