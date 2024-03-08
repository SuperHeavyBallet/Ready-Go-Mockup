const callTypeInput = document.getElementById("call-type");
const callTypeDisplay = document.getElementById("call-type-display");
let callType = "go";

const intervalTypeInput = document.getElementById("interval-type");
const timeIntervalLabel = document.getElementById("fixed-time-label")
const timeIntervalInput = document.getElementById("fixed-time");

const roundInput = document.getElementById("round-number");
const selectedNumOfRounds = document.getElementById("selected-num-of-rounds");
const roundDisplay = document.getElementById("round-display");
const timeDisplay = document.getElementById("time-display");
//const waitGoDisplay = document.getElementById("wait-go");

const startButton = document.getElementById("start-button");
const clickPrompt = document.getElementById("click-prompt");
let startButtonClicked = false;

let numOfRounds = 1;
let maxRounds = 5;
let currentRound = 1;

const maxTime = 5;
const minTime = 2000;

//#region Ready Go Audio Clips
const readyGo00 = new Audio("audio/ReadyGo/Ready_Go_00.mp3");
const readyGo01 = new Audio("audio/ReadyGo/Ready_Go_01.mp3");
const readyGo02 = new Audio("audio/ReadyGo/Ready_Go_02.mp3");
const readyGo03 = new Audio("audio/ReadyGo/Ready_Go_03.mp3");
const readyGo04 = new Audio("audio/ReadyGo/Ready_Go_04.mp3");
const readyGo05 = new Audio("audio/ReadyGo/Ready_Go_05.mp3");
const readyGo06 = new Audio("audio/ReadyGo/Ready_Go_06.mp3");
const readyGo07 = new Audio("audio/ReadyGo/Ready_Go_07.mp3");
const readyGo08 = new Audio("audio/ReadyGo/Ready_Go_08.mp3");
const readyGo09 = new Audio("audio/ReadyGo/Ready_Go_09.mp3");
const readyGo10 = new Audio("audio/ReadyGo/Ready_Go_10.mp3");
const readyGo11 = new Audio("audio/ReadyGo/Ready_Go_11.mp3");
const readyGo12 = new Audio("audio/ReadyGo/Ready_Go_12.mp3");

const readyGoAudio = [
    readyGo00,
    readyGo01,
    readyGo02,
    readyGo03,
    readyGo04,
    readyGo05,
    readyGo06,
    readyGo07,
    readyGo08,
    readyGo09,
    readyGo10,
    readyGo11,
    readyGo12,
];
//#endregion

//#region Go Audio Clips

const go00 = new Audio("audio/Go/Go_00.mp3");
const go01 = new Audio("audio/Go/Go_01.mp3");
const go02 = new Audio("audio/Go/Go_02.mp3");
const go03 = new Audio("audio/Go/Go_03.mp3");
const go04 = new Audio("audio/Go/Go_04.mp3");
const go05 = new Audio("audio/Go/Go_05.mp3");
const go06 = new Audio("audio/Go/Go_06.mp3");
const go07 = new Audio("audio/Go/Go_07.mp3");
const go08 = new Audio("audio/Go/Go_08.mp3");
const go09 = new Audio("audio/Go/Go_09.mp3");

const goAudio = [
    go00,
    go01,
    go02,
    go03,
    go04,
    go05,
    go06,
    go07,
    go08,
    go09
]

//#endregion

//#region Event Listeners
callTypeInput.addEventListener('change', function()
{
    callType = this.value;
    if (callType === 'go')
    {
        callTypeDisplay.textContent = "Call Type: Go!"
    }
    else if (callType === "ready-go")
    {
        callTypeDisplay.textContent = "Call Type: Ready Go!"
    }
    console.log(callType);
})


intervalTypeInput.addEventListener('change', function()
{
    reset("hard-reset");

    if (this.value === "fixed")
    {
        timeIntervalLabel.classList.remove("hidden");
        timeIntervalInput.classList.remove("hidden");
    }
    else if (this.value === "random")
    {
        timeIntervalLabel.classList.add("hidden");
        timeIntervalInput.classList.add("hidden");
    }
})

roundInput.addEventListener('change', function()
{
    reset("hard-reset");
    numOfRounds = this.value;
    selectedNumOfRounds.textContent = `Rounds: ${numOfRounds}`;
    
})

startButton.addEventListener("click", () =>
{
    if (!startButtonClicked)
    {
        startButtonClicked = true;
        clickPrompt.classList.add("invisible");
        newRound();
    }
});
//#endregion

//#region Random Generators

function generateRandomTime(maxTime)
{
    const randomNumber = Math.floor(Math.random() * maxTime);
    
    return randomNumber;
}

function generateRandomSound()
{
    if (callType === "go")
    {
        const randomNumber = Math.floor(Math.random() * goAudio.length);
        const randomSound = goAudio[randomNumber];
        return randomSound;
    }
    else if (callType === "ready-go")
    {
        const randomNumber = Math.floor(Math.random() * readyGoAudio.length);
        const randomSound = readyGoAudio[randomNumber];
        return randomSound;
    }

    
}
//#endregion


function newRound()
{

    countdownButtonState();
    
    let finalTime;

    if (intervalTypeInput.value === "random")
    {
        // Generate random round time
        const randomWaitTime = generateRandomTime(maxTime);
        finalTime = (randomWaitTime * 1000) + minTime;
        timeDisplay.textContent = `Time: Random`;
    }
    else if (intervalTypeInput.value === "fixed")
    {
        const fixedWaitTime = timeIntervalInput.value;
        finalTime = (fixedWaitTime * 1000) + minTime;
        timeDisplay.textContent = `Time: ${finalTime / 1000} Seconds`;
    }

    

    // Proceed based on random time
    setTimeout(() => 
    {
        readyGo();
    }, finalTime);
}

function readyGo()
{
    beep();
    readyGoButtonState();

    setTimeout(() =>
        {
            reset();
        }, 2000);
    
}

function beep()
{
    const sound = generateRandomSound();
    sound.play();
    
}

function reset(typeOfReset)
{   
    
    waitingButtonState();
    startButtonClicked = false;

    if (typeOfReset != "hard-reset")
    {
        if (currentRound < numOfRounds)
        {
            currentRound += 1;
            newRound();
        }
        else
        {
            currentRound = 1;
    
        }
    }
   
}





//#endregion Button States
function waitingButtonState()
{
    startButton.classList.add("orange");
    startButton.classList.remove("red");
    startButton.classList.remove("blue");

    startButton.textContent = "START";

    clickPrompt.classList.remove("invisible");
}

function countdownButtonState()
{
    startButton.textContent = 'WAIT';

    startButton.classList.add("blue");
    startButton.classList.remove("red");
    startButton.classList.remove("orange");

    //waitGoDisplay.textContent = "WAIT";
    //waitGoDisplay.classList.remove("red");
    //waitGoDisplay.classList.add("green");

    clickPrompt.classList.add("invisible");

    roundDisplay.textContent = `Round: ${currentRound}`;
}

function readyGoButtonState()
{
    startButton.classList.add("red");
    startButton.classList.remove("blue");
    startButton.classList.remove("orange");

    if (callType === 'go')
    {
        startButton.textContent = "GO!";
    }
    else if (callType === 'ready-go')
    {
        startButton.textContent = "READY GO!";
    }
    
}
//#endregion



