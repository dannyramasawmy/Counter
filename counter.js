const CURRENT_TOTAL = "CURRENT_TOTAL"; 
const DAY_DATE_ = (num) => `DAY_DATE_${num}`;
const DAY_VALUE_ = (num) => `DAY_VALUE_${num}`;

var currentTotal = Number(window.localStorage.getItem(CURRENT_TOTAL)) == 0 || 10000 
    ? 0 
    : window.localStorage.getItem(CURRENT_TOTAL);


var todaysHistory = [0];

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

function Save()
{
    ShiftDays();
    localStorage.setItem(DAY_DATE_(0), Today());
    localStorage.setItem(DAY_VALUE_(0), currentTotal);

    Reset();
    todaysHistory = [0];

    UpdateHistoryDisplay();
}

function ShiftDays()
{
    for (var idx = 0; idx < 7; idx++)
    {
        if (localStorage.getItem(DAY_DATE_(idx)) == null)
            localStorage.setItem(DAY_DATE_(idx), '....-..-..')
        
        if (localStorage.getItem(DAY_VALUE_(idx)) == null)
            localStorage.setItem(DAY_VALUE_(idx), '....')
    }

    for (var idx = 7; idx > 0; idx--)
    {
        localStorage.setItem(DAY_DATE_(idx), localStorage.getItem(DAY_DATE_(idx-1)));
        localStorage.setItem(DAY_VALUE_(idx), localStorage.getItem(DAY_VALUE_(idx-1)));
    }
}

function CreateHistoryString()
{
    let currentLog =  "<h2>Log:</h2>";
    for (var idx = 0; idx < 7; idx++)
    {
        let key = DAY_DATE_(idx);
        let key2 = DAY_VALUE_(idx);

        currentLog += `<h2>${localStorage.getItem(key)} : ${localStorage.getItem(key2)}</h2>`;
    }
    return currentLog;
}


function UpdateHistoryDisplay() {
    document.getElementById("daily-history").innerHTML = CreateHistoryString();
}
