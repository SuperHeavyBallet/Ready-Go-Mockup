const intervalTypeInput = document.getElementById("interval-type");
const timeIntervalInput = document.getElementById("fixed-time");

const roundInput = document.getElementById("round-number");
const selectedNumOfRounds = document.getElementById("selected-num-of-rounds");
const roundDisplay = document.getElementById("round-display");
const timeDisplay = document.getElementById("time-display");
const waitGoDisplay = document.getElementById("wait-go");

const startButton = document.getElementById("start-button");
let startButtonClicked = false;

let numOfRounds = 1;


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

intervalTypeInput.addEventListener('change', function()
{
   //console.log("Type: " , this.value);


    if (this.value === "fixed")
    {
        console.log("Fixed");
    }
    else if (this.value === "random")
    {
        console.log("Random");
    }
})

roundInput.addEventListener('change', function()
{
    numOfRounds = this.value;
    selectedNumOfRounds.textContent = `Rounds: ${numOfRounds}`;
    
})

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

let maxRounds = 5;
let currentRound = 1;

const maxTime = 5;
const minTime = 2000;



function generateRandomTime(maxTime)
{
    const randomNumber = Math.floor(Math.random() * maxTime);
    
    return randomNumber;
}

function generateRandomSound()
{
    const randomNumber = Math.floor(Math.random() * readyGoAudio.length);
    const randomSound = readyGoAudio[randomNumber];
    return randomSound;
}




function newRound()
{
    startButton.textContent = 'WAIT';
    waitGoDisplay.textContent = "WAIT";
    waitGoDisplay.classList.remove("red");
    waitGoDisplay.classList.add("green");

    // Increment Each ROund on each loop
    

    // Display current round number
    roundDisplay.textContent = `Round: ${currentRound}`;

    let finalTime;

    if (intervalTypeInput.value === "random")
    {
        // Generate random round time
        const randomWaitTime = generateRandomTime(maxTime);
        finalTime = (randomWaitTime * 1000) + minTime;
    }
    else if (intervalTypeInput.value === "fixed")
    {
        console.log("FIXED!!");
        const fixedWaitTime = timeIntervalInput.value;
        finalTime = (fixedWaitTime * 1000) + minTime;
        console.log(finalTime);
    }

    timeDisplay.textContent = `Time: ${finalTime / 1000} Seconds`;

    // Proceed based on random time
    setTimeout(() => 
    {
        readyGo();
    }, finalTime);
}

function readyGo()
{
    beep();
    waitGoDisplay.textContent = "READY GO!";
    waitGoDisplay.classList.remove("green");
    waitGoDisplay.classList.add("red");
    reset();
}

function beep()
{
    const sound = generateRandomSound();
    sound.play();
    startButton.textContent = "START";
    startButtonClicked = false;
}

function reset()
{   
    if (currentRound < numOfRounds)
    {
        setTimeout(() =>
        {
            currentRound += 1;
            newRound();
        }, 1000);
    }
    else
    {
        currentRound = 1;
        console.log("END");
    }
}



startButton.addEventListener("click", () =>
{
    if (!startButtonClicked)
    {
        startButtonClicked = true;
        newRound();
    }
});




