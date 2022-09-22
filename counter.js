var total = 0;
var totalHistory = [0];

AddToTotal(total);

function DisplayTotal()
{
    document.getElementById("total").innerText = value;
}

function AddToTotal(value)
{
    totalHistory.push(total);
    total += value; 
    DisplayTotal()
};

function ResetTotal()
{
    totalHistory.push(total);
    total = 0; 
    DisplayTotal()
};

function Back()
{
    value = totalHistory.length > 0 
        ? totalHistory.pop
        : 0;

    totalHistory.push(total);
    total = value; 
    DisplayTotal()
};