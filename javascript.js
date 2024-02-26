
function generateRandomTime(maxTime)
{
    const randomNumber = Math.floor(Math.random() * maxTime);
    return randomNumber;
}

function getNumOfRounds()
{
    const roundInput = document.getElementById("select-rounds");
    let numOfRounds = 0;

    roundInput.addEventListener("input", function (e)
    {
        numOfRounds = parseInt(this.value);
        console.log(numOfRounds);
    })

    
}

getNumOfRounds();

function newRound()
{

    currentRound += 1;

    const maxTime = 5;
    const minTime = 2000;
    const randomWaitTime = minTime + (generateRandomTime(maxTime) * 1000);
    console.log(randomWaitTime);

    console.log("Start");

    setTimeout(() => 
    {
        readyGo();
    }, randomWaitTime);
}

function readyGo()
{
    console.log("READY GO");
    reset();
}

function reset()
{   
    if (currentRound <= maxRounds)
    {
        setTimeout(() =>
        {
            newRound();
        }, 3000);
    }
    else
    {
        console.log("END");
    }
}

let maxRounds = 5;
let currentRound = 0;

///newRound();

