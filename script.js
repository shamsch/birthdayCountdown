//caching the DOM elements

const days_p = document.getElementById("days");
const hours_p = document.getElementById("hours");
const minutes_p = document.getElementById("minutes");
const seconds_p = document.getElementById("seconds");
const age1_span = document.getElementById("age1");
const age2_span = document.getElementById("age2");
const ordinal_span= document.getElementById("ordinal");
const birthday_div = document.getElementById("birthday");
const countdownContainer_div = document.getElementById("container");
const message_div = document.getElementById("message");

//calculates the next birthday and return as a string of type DD MMM YYYY
function nextBirthDay() {
    var dateString = "";

    const date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1; //+1 because getMonth() counts from 0, so January is 0 
    let currentDate = date.getDate();

    //birthday is 22 August so this checks whether current year's birthday is yet to occur or has past
    if (currentDate < 22 || currentMonth <= 8) {
        dateString = "22 Aug " + currentYear;
        nthBirthDay();
        return (dateString);
    }
    else {
        currentYear += 1;
        dateString = "22 Aug " + currentYear;
        nthBirthDay();
        return (dateString);
    }

}

//this function calculates the order of the next birthday, hence n-th birthday, dispalys it in the countdown/ or birthday wish message
function nthBirthDay() {
    const date = new Date();
    const currentYear = date.getFullYear();
    age1_span.innerHTML = currentYear - 2000;
    age2_span.innerHTML = currentYear - 2000;
    ordinal_span.innerHTML= giveOrdinalSuffix(currentYear-2000);
}

//checks whether it should be st,nd,rd, or th year old 
function giveOrdinalSuffix(number){
    let result="";
    switch(number%10) {
        case 1:
            result="st";
            break;
        case 2:
            result="nd";
            break;
        case 3:
            result="rd";
            break;
        default:
            result="th";
            break;
      }
    return result;
}

//check if today's date is my birthday or not 
function itIsNotMyBirthday() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; //+1 because getMonth() counts from 0, so January is 0 
    const currentDay = currentDate.getDate();
    const currentDayAndMonth = currentDay + " " + currentMonth;
    const myBirthDate = "22 8";

    if (currentDayAndMonth == myBirthDate) {
        nthBirthDay();
        return false;
    }
    else {
        return true;
    }
}


//this function is essentially the meat of this project
function CountDown() {
    if (itIsNotMyBirthday()) {
        const currentDate = new Date();
        const birthDay = new Date(nextBirthDay());

        //this is the math 
        const differenceInSeconds = (birthDay.getTime() - currentDate.getTime())/1000;
        const days = Math.floor(differenceInSeconds / (3600 * 24 ));
        const hours = (Math.floor(differenceInSeconds / 3600) % 24)+1;
        const mins = Math.floor(differenceInSeconds / 60) % 60;
        const seconds = Math.floor(differenceInSeconds) % 60;
        //upating it in the HTML doc
        days_p.innerHTML = days;
        hours_p.innerHTML = hours;
        minutes_p.innerHTML = mins;
        seconds_p.innerHTML = seconds;
    }
    else {
        //on my actual birthday the count down is not displayed, instead it says happy n-th birthday 
        countdownContainer_div.style.display = 'none';
        message_div.style.display = 'none';
        birthday_div.style.display = 'block';
    }

}

//running the function which in turn calls all the other function 
CountDown();

//setInterval() continues to call the function every one second or 1000 milliseconds 
setInterval(CountDown, 1000);
