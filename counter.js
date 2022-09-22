const CURRENT_TOTAL = "CURRENT_TOTAL"; 
const DAILY_HISTORY = "DAILY_HISTORY";
var currentTotal = Number(window.localStorage.getItem(CURRENT_TOTAL)) == 0 || 10000 
    ? 0 
    : window.localStorage.getItem(CURRENT_TOTAL);


var todaysHistory = [0];
var previousDays =  [];

AddToTotal(currentTotal);
UpdateHistoryDisplay();
// functions 

function DisplayTotal()
{
    document.getElementById("total").innerText = currentTotal;
    window.localStorage.setItem(CURRENT_TOTAL, JSON.stringify(currentTotal));
    console.log(currentTotal);
}

function AddToTotal(value)
{
    todaysHistory.push(currentTotal);
    currentTotal = Math.min((currentTotal + value), 10000); 
    DisplayTotal()
};

function Reset()
{
    todaysHistory.push(currentTotal);
    currentTotal = 0; 
    DisplayTotal()
};

function Back()
{
    let value = todaysHistory.length > 0 
        ? todaysHistory.pop()
        : 0;

    currentTotal = value; 
    DisplayTotal()
};

function Today()
{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return today = `${yyyy}-${mm}-${dd}`;
}

function NewDay()
{
    previousDays.push(`${Today()} : ${currentTotal}`);
    Reset();
    todaysHistory = [0];

    // window.localStorage.setItem(DAILY_HISTORY, previousDays);
    console.log(previousDays);
    
    UpdateHistoryDisplay();
}

function UpdateHistoryDisplay() {
    let currentLog = "Log:";

    for (let idx = previousDays.length; idx > 0; idx--)
        currentLog += `<h2>${previousDays[idx - 1]}</h2>`;

    document.getElementById("daily-history").innerHTML = currentLog;
}
