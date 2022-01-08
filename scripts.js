// DECLARATIONS

// the whole date picker
const date_picker_element = document.querySelector('.date-picker');

// the current date displayed at the top
const selected_date_element = document.querySelector('.date-picker .selected-date');

// month selector and days grid
const dates_element = document.querySelector('.date-picker .dates');

// EVENT LISTENERS

// if date picker clicked run toggleDatePicker function
date_picker_element.addEventListener('click', toggleDatePicker);

// FUNCTIONS
/*
function to show/hide month selector and days grid
has access to event object
event object path array of values of full nested path
*/
function toggleDatePicker(e) {
    console.log('2tdp');
    /*
    if path doesn't contain dates
    ie if outside of month selector and days grid toggle picker
    */
    if (!checkEventPathForClass(e.path, 'dates')) {
        // toggle on and off active class (which reveals element)
        dates_element.classList.toggle('active');
    }
    
}

// HELPER FUNCTIONS

/*
without this, clicking an element within the picker will toggle/close the picker
where we click we get an event, this gives us a path of where we clicked
so if we click on an element within the date picker it will give us the 
full paths of what the parents of that element are
loop through every item
if there is a classList (so not just a floating classless item)
which matches the selector we are passing through then return false
*/
function checkEventPathForClass (path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}
