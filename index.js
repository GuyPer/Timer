// Gloval Variables

// Elements
// big clock
const elmTimerSeconds=document.querySelector("#divSeconds");
const elmTimerMinutes=document.querySelector("#divMinutes");
const elmTimerHours=document.querySelector("#divHours");
// Stop BTN
const elmStopBtn=document.querySelector("#stopTheTimer");
// BGC Body
let bgcBody=document.querySelector("body")
// inputs
const userHoursInput=document.querySelector("#inputHours");
const userMinutessInput=document.querySelector("#inputMinutes");
const userSecondsInput=document.querySelector("#inputSeconds");


// Rest of variables
let counter=0;/*counter=0 not running, counter=1 on run, counter=2 only on stop mode*/
let stopMode=0; /*stopmode=0 timer running, stopmode=1 , timer stopped */
let myTimer;
let secCounter;
let minCounter;
let hoursCounter;



// FUNCTIONS 


/*
clear user values after:
1) Timer finished
2) press on "Start the Timer" button with illegal values 
3) press on "zero the Timer" button
*/
const clearValues =() => {
    userHoursInput.value = "";
    userMinutessInput.value = "";
    userSecondsInput.value = "";
}


// Function that check if counter of Seconds+Minutes+hours is equal to 0.
// if yes --> return true 
const isAllCountersIsZero=()=>{
if (secCounter==0 && minCounter==0 && hoursCounter==0){
    return true;}
}


// functions related to decrease hours,minutes and  seconds:
// hours: 
const decreaseHours=() => {
    hoursCounter--;
    elmTimerHours.innerHTML = hoursCounter;
}
// minutes:
const decreaseMinutes=() => {
    minCounter--;
    elmTimerMinutes.innerHTML = minCounter;
}
// seconds:
const decreaseSeconds=()=> {
    console.log("good");
    secCounter--;
    elmTimerSeconds.innerHTML = secCounter;
}


// Functions of new cycles to Minutes and Seconds
// new cycle of seconds:
const secNewCycle=() => {
    secCounter = 59;
    elmTimerSeconds.innerHTML = secCounter;
}
// new cycles of minutes
const minNewCycle=() => {
    minCounter = 59;
    elmTimerMinutes.innerHTML = minCounter;
}


// arrive from click on button "Start The Timer"
const runTheTimer=()=>{
    secCounter=elmTimerSeconds.innerHTML;
    minCounter=elmTimerMinutes.innerHTML;
    hoursCounter=elmTimerHours.innerHTML;  
// Check if timer is over --> hours:00 minutes:00 seconds:00
// if yes --> clear the values
    if(isAllCountersIsZero())
    {
        clearInterval(myTimer);
        console.log(myTimer);
        return
    }
// all edge scenarios happends:
    if(secCounter==0){
        if(minCounter==0 && hoursCounter>0){
            decreaseHours();
            minNewCycle();
            secNewCycle();
        }
        else if(minCounter!==0){
            decreaseMinutes();
            secNewCycle();
        }
        else{
            decreaseMinutes();
        }
    }
// else = most of time:
    else{
        decreaseSeconds();
        if(isAllCountersIsZero()){
        clearValues;
        bgcBody.style.backgroundColor="goldenrod";
        }
    }
}


// 2 options:
// 1) After all values checked as legal numbers
// 2) After press on "Stop The Timer" btn on second mode of ---> RESUME THE TIMER   
const startTimer=()=>{
    myTimer=setInterval(runTheTimer,1000);
}


// arrive from setTheValues function and check if values are legal numbers
// true ---> NOT LEGAL ; false ---> LEGAL
const checkTheValues=(hoursChosen,minutesChosen,secondsChosen)=>{
if (isNaN(hoursChosen) || isNaN(minutesChosen) ||isNaN(secondsChosen)|| minutesChosen>60 || secondsChosen>60){
alert("Please write legal values");
    clearValues();
    counter--;
return true;
}
else{
    elmTimerSeconds.innerHTML=secondsChosen;
    elmTimerMinutes.innerHTML=minutesChosen;
    elmTimerHours.innerHTML=hoursChosen;
    return false;}
}



// Arrive from "start The Timer!" button.
// 1) check if LEGAL VALUES, if yes --> go to Start the timer
// 2) 
const setTheValues=()=>{
// if counter=1 --> running mode already --> so return.
if (counter==1){
    return}
    else{
// increase counter to be on running mode (counter will be = 1)
    counter++
    const hoursChosen=Number(userHoursInput.value);
    const minutesChosen=Number(userMinutessInput.value);
    const secondsChosen=Number(userSecondsInput.value)
    if (hoursChosen==0 && minutesChosen==0 && secondsChosen==0)
    {
        alert ("Please write values, then press start");
        clearValues();
        // in case all values = 0 counter will be again 0 --> Timer not runnig 
        counter--;
        return
    }
// check if values are real numbers or NaN,if true--> NaN, if false --> Numbers in the  good range ---> then continue to startTimer Function.
    if(checkTheValues(hoursChosen,minutesChosen,secondsChosen)){
        console.log("Invalid");
        }
        else{console.log("valid");
        startTimer();}
    }
}


// Arrive from onclick - Stop the timer
const stopTheClock = () =>{
// see if counter = 0 --> not started yet, so return from function
    if (counter==0){return}
// see if all values (seconds,minutes,hours)= 0 --> if yes return
    else if (isAllCountersIsZero()){return}
    else {
// counter should arrive value 2
    counter++
    console.log(counter);
    }
// if stopMode = 0 --> Stop
    if(stopMode==0){
    clearInterval(myTimer);
    elmStopBtn.innerHTML="Resume The Timer";
    stopMode++;
// counter will be 1 again 
    counter--;
// if stopMode =1 --> resume
    }
    else{
    startTimer(myTimer);
    elmStopBtn.innerHTML="Stop The Timer";
    stopMode--;
// counter will be 1 again 
    counter--;
    }
}

// Arrive from onclick 
const zeroTheTimer=()=>{
    bgcBody.style.backgroundColor="#262222"
    clearInterval(myTimer);
    elmTimerSeconds.innerHTML=0;
    elmTimerMinutes.innerHTML=0;
    elmTimerHours.innerHTML=0;
    clearValues();
    if(counter==1){counter--;
    stopMode=0;
    elmStopBtn.innerHTML="Stop The Timer";
}
}
