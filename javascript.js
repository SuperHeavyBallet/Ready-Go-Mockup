
function generateRandomTime(maxTime)
{
    const randomNumber = Math.floor(Math.random() * maxTime);
    return randomNumber;
}

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

newRound();

