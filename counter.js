var currentTotal = 0;
var totalHistory = [0];

AddToTotal(currentTotal);

function DisplayTotal()
{
    document.getElementById("total").innerText = currentTotal;
    console.log(currentTotal);
}

function AddToTotal(value)
{
    totalHistory.push(currentTotal);
    currentTotal += value; 
    DisplayTotal()
};

function Reset()
{
    totalHistory.push(currentTotal);
    currentTotal = 0; 
    DisplayTotal()
};

function Back()
{
    let value = totalHistory.length > 0 
        ? totalHistory.pop()
        : 0;

    currentTotal = value; 
    DisplayTotal()
};