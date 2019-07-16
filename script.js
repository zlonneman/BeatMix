let numClapBeats = 14;
let numKickBeats = 17;
let numPercussionBeats = 14;
let numQuestionBeats = 18;
let numRobotBeats = 13;
let numSnareBeats = 28;
let numVoiceBeats = 12;
let numWindBeats = 9;
let totalBeats = numWindBeats + numVoiceBeats + numRobotBeats + 
                 numPercussionBeats + numClapBeats + numKickBeats + 
                 numQuestionBeats + numSnareBeats;


function makeBeat(row, beatType, clickedID) {
    beatType = beatType || determineBeatType();
    let i = 1;
    let centerbox = document.getElementById("center");
    let newDiv = document.createElement("div");
    newDiv.id = "beatbuttons-row" + row;
    newDiv.class = "beatrows";
    centerbox.appendChild(newDiv);
    let beatrows = document.getElementById("beatbuttons-row" + row);
    addImage(beatType, row);
    for (i; i <= 16; i++) {
        
        let button = document.createElement("button");
        button.classList.add("rowbutton");
        button.id = "r" + row + "c" + i;
        button.value = "false"
        button.style.background = "black"; //tried changing this on style sheet but didn't work
        button.onclick = function() {turnBeatOn(button.id, row)};
        beatrows.appendChild(button);  
    } 
    createTrashButton(row);
    if (clickedID === undefined) {
        addRandomBeat(row, beatType);
        setNewSound("none");
        $(".likeButton").css('display', 'block');
    } else {
        let audio = document.createElement("audio");
        audio.alt = "beat" + row;
        audio.id = "beat" + row;
        audio.src = "SampleSwap/HITS/" + clickedID;
        document.getElementById("beatbuttons-row" + row).appendChild(audio);
    }
    let playButton = document.createElement("button");
    playButton.classList.add("playPauseRow");
    playButton.classList.add("playButton");
    playButton.id = "playPauseRow" + row;
    playButton.value = "Pause";
    playButton.innerHTML = "Pause";
    playButton.onclick = function () { playPauseRow(this.id) }; // not sure why I need to state function..
    beatrows.appendChild(playButton);
    
    if (row === 1){
        playLoop();
    };
    return rowCount = row + 1;

}

function determineBeatType(){
    let randNum = Math.ceil(Math.random() * totalBeats);
    let beatType = "";
    if (randNum <= numWindBeats) {
        beatType = "wind";
    } else if (randNum <= numWindBeats + numVoiceBeats) {
        beatType = "voice";
    } else if (randNum <= numWindBeats + numVoiceBeats + numRobotBeats) {
        beatType = "robot";
    } else if (randNum <= numWindBeats + numVoiceBeats + numRobotBeats + numPercussionBeats) {
        beatType = "percussion";
    } else if (randNum <= numWindBeats + numVoiceBeats + numRobotBeats + numPercussionBeats + numClapBeats) {
        beatType = "clap";
    } else if (randNum <= numWindBeats + numVoiceBeats + numRobotBeats + numPercussionBeats + numClapBeats + numKickBeats) {
        beatType = "kick";
    } else if (randNum <= numWindBeats + numVoiceBeats + numRobotBeats + numPercussionBeats + numClapBeats + numKickBeats + numQuestionBeats) {
        beatType = "question";
    } else {
        beatType = "snare";
    }
    return beatType;
}
function turnBeatOn(whichBeatButton, row) {
    let currentButton = document.getElementById(whichBeatButton);
    if(currentButton.value === "false"){
        currentButton.style.backgroundColor = "aqua";
        currentButton.value = "true"
    } else {
        currentButton.style.backgroundColor = "black";
        currentButton.value = "false"
    };
};

function addRandomBeat(row, beatType){
    let audio = document.createElement("audio");
    audio.alt = "beat" + row;
    audio.id = "beat" + row;
    let fileNum;
    //could use switch, but im not sure how that would save time.
    if (beatType === "wind"){
        fileNum = Math.ceil(Math.random() * numWindBeats);
        audio.src = "SampleSwap/HITS/Wind/wind" + fileNum + ".wav";
    } else if (beatType === "voice") {
        fileNum = Math.ceil(Math.random() * numVoiceBeats);
        audio.src = "SampleSwap/HITS/Voice/voice" + fileNum + ".wav";
    } else if (beatType === "robot") {
        fileNum = Math.ceil(Math.random() * numRobotBeats);
        audio.src = "SampleSwap/HITS/Robot/robot" + fileNum + ".wav";
    } else if (beatType === "percussion") {
        fileNum = Math.ceil(Math.random() * numPercussionBeats);
        audio.src = "SampleSwap/HITS/Percussion/percussion" + fileNum + ".wav";
    } else if (beatType === "clap") {
        fileNum = Math.ceil(Math.random() * numClapBeats);
        audio.src = "SampleSwap/HITS/Clap/clap" + fileNum + ".wav";
    } else if (beatType === "kick") {
        fileNum = Math.ceil(Math.random() * numKickBeats);
        audio.src = "SampleSwap/HITS/Kick/kick" + fileNum + ".wav";
    } else if (beatType === "question") {
        fileNum = Math.ceil(Math.random() * numQuestionBeats);
        audio.src = "SampleSwap/HITS/Question/question" + fileNum + ".wav";
    } else {
        fileNum = Math.ceil(Math.random() * numSnareBeats);
        audio.src = "SampleSwap/HITS/Snare/snare" + fileNum + ".wav";
    }
    document.getElementById("beatbuttons-row" + row).appendChild(audio);
    addRandomTempo(row);
}

function addRandomTempo(row){
    let measure = [];
    let fourCount = [];
    for (let i = 1; i <= 4; i++) {
        if (Math.random() < 0.50) {
            measure.push(1);
        } else {
            measure.push(0);
        };
        if (Math.random() < 0.5) {
            fourCount.push(1);
        } else {
            fourCount.push(0);
        };
    };
    if (sumArr(measure) === 0 || sumArr(fourCount) === 0){
        addRandomTempo(row);
    } else {
        for (let j = 0; j < 4; j++) {
            if (measure[j] === 1) {
                for (let x = 0; x < 4; x++) {
                    if (fourCount[x] === 1) {
                        turnBeatOn("r" + row + "c" + ((j * 4) + (x + 1)), row);
                        
                    };
                };
            };
        };
    };
}

function addImage(imgName, row) {
    let img = document.createElement("img");
    img.src = imgName + ".png";
    img.alt = "audio" + row;
    img.classList.add("beatImages");
    img.width = 40;
    img.height = 40;
    document.getElementById("beatbuttons-row" + row).appendChild(img);
    return row;
}

function setNewSound(displayValue){
    $(".newsoundbutton").css('display', displayValue);
}

function createTrashButton(row) {
    row = row || rowCount - 1;
    let trashButton = document.createElement("img");
    trashButton.src = "trashBin.png";
    trashButton.classList.add("trashButton");
    trashButton.classList.add("beatImages");
    trashButton.id = "trashButton" + row;
    trashButton.width = 40;
    trashButton.height = 40;
    trashButton.value = row;
    trashButton.onclick = function () { trashRow(this.value) }; // not sure why I need to state function..
    document.getElementById("beatbuttons-row" + row).appendChild(trashButton);
}

function keepBeat(){
    $(".newsoundbutton").css('display', 'block');
    $(".likeButton").css('display', 'none');
}

function deleteBeat(row){
    row -= 1;
    if (row === 1){
        clearInterval(myLoop);
    };
    document.getElementById("beatbuttons-row" + row).remove();
    makeBeat(row);
    
} 

function trashRow(value) {
    if (value == rowCount-1){
        keepBeat();
    }
    document.getElementById("beatbuttons-row" + value).remove();
}

async function playLoop(){
    
    let tempo = document.getElementById("tempoRange").value;
    let tempoMarker = 0;
    myLoop = setInterval(async function () {
        let row = rowCount - 1;
        for (let r = 1; r <= row; r++) {
            let myDiv = document.getElementById("beatbuttons-row" + r);
            if(myDiv){
                if (tempoMarker === 0) {
                    document.getElementById("r" + r + "c" + 16).style.opacity = 1;
                } else {
                    document.getElementById("r" + r + "c" + (tempoMarker)).style.opacity = 1;
                }
                document.getElementById("r" + r + "c" + (tempoMarker + 1)).style.opacity = 0.25;
                //set an if statement to say if the row is paused or played
                if (document.getElementById("playPauseRow" + r).value === "Pause"){
                    if (document.getElementById("r" + r + "c" + (tempoMarker + 1)).value === "true") {
                        let sound = document.getElementById("beat" + r);
                        sound.preload = 'auto';
                        sound.load();
                        let cloneSound = sound.cloneNode();
                        cloneSound.play();
                    }
                }
            }
        };
        if (tempoMarker < 15) {
            tempoMarker = tempoMarker + 1;
        } else {
            tempoMarker = 0;
        };
    }, (1000 / tempo)); 
    return myLoop
    
}

function playStop() { //main play/pause button
    if (rowCount != 1) {
        if (document.getElementById("playButton").value === "Stop"){
            document.getElementById("playButton").value = "Play";
            for (let r = 1; r <= rowCount-1; r++) {
                let myDiv = document.getElementById("beatbuttons-row" + r);
                if (myDiv){
                    for (let c = 1; c <= 16; c++) {
                        document.getElementById("r" + r + "c" + c).style.opacity = 1;
                    }
                }
            }
            clearInterval(myLoop);
        } else {
            document.getElementById("playButton").value = "Stop"
            playLoop();
        }
    }
}

function playPauseRow(clickedID,){ //individual play pause button
    let button = document.getElementById(clickedID);
    if (button.innerHTML === "Pause") {
        button.value = "Play";
        button.innerHTML = "Play";

    } else {
        button.value = "Pause";
        button.innerHTML = "Pause";
    }
}

function tempoChange() {
    for (let r = 1; r <= rowCount - 1; r++) {
        let myDiv = document.getElementById("beatbuttons-row" + r);
        if (myDiv) {
            for (let c = 1; c <= 16; c++) {
                document.getElementById("r" + r + "c" + c).style.opacity = 1;
            }
        }
    }
    clearInterval(myLoop);
    playLoop();
}


function sumArr(arr){
    sum = 0;
    for (i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    return sum;
}

function playSound(clickedID) {
    let audio = document.createElement("audio");
    audio.src = "SampleSwap/HITS/" + clickedID;
    audio.play();
}

function addBeatsToDropdown() {
    for (let i = 1; i <= numClapBeats; i++) {
        let clapContainer = document.getElementById("clapContainer");
        let clapList = document.createElement("li");
        clapList.classList.add("sideBarSound");
        clapList.innerHTML = "Clap " + i;
        clapContainer.appendChild(clapList);

        let playButton = document.createElement("i");
        playButton.id = "Clap/clap" + i + ".wav";
        playButton.classList.add("fa");
        playButton.classList.add("fa-play-circle-o");
        playButton.onclick = function() {playSound(this.id, "clap")};
        clapList.appendChild(playButton);

        let plusButton = document.createElement("i");
        plusButton.classList.add("fa");
        plusButton.classList.add("fa-plus-square-o");
        plusButton.onclick = function () { makeBeat(rowCount, "clap", playButton.id) };
        clapList.appendChild(plusButton);
    }
    for (let i = 1; i <= numKickBeats; i++) {
        let kickContainer = document.getElementById("kickContainer");
        let kickList = document.createElement("li");
        kickList.classList.add("sideBarSound");
        kickList.innerHTML = "Kick " + i;
        kickContainer.appendChild(kickList);

        let playButton = document.createElement("i");
        playButton.id = "Kick/kick" + i + ".wav";
        playButton.classList.add("fa");
        playButton.classList.add("fa-play-circle-o");
        playButton.onclick = function () { playSound(this.id, "kick") };
        kickList.appendChild(playButton);

        let plusButton = document.createElement("i");
        plusButton.classList.add("fa");
        plusButton.classList.add("fa-plus-square-o");
        plusButton.onclick = function () { makeBeat(rowCount, "kick", playButton.id) };
        kickList.appendChild(plusButton);
    }
    for (let i = 1; i <= numPercussionBeats; i++) {
        let percussionContainer = document.getElementById("percussionContainer");
        let percussionList = document.createElement("li");
        percussionList.classList.add("sideBarSound");
        percussionList.innerHTML = "Cymbal " + i;
        percussionContainer.appendChild(percussionList);

        let playButton = document.createElement("i");
        playButton.id = "Percussion/percussion" + i + ".wav";
        playButton.classList.add("fa");
        playButton.classList.add("fa-play-circle-o");
        playButton.onclick = function () { playSound(this.id, "percussion") };
        percussionList.appendChild(playButton);

        let plusButton = document.createElement("i");
        plusButton.classList.add("fa");
        plusButton.classList.add("fa-plus-square-o");
        plusButton.onclick = function () { makeBeat(rowCount, "percussion", playButton.id) };
        percussionList.appendChild(plusButton);
    }
    for (let i = 1; i <= numQuestionBeats; i++) {
        let questionContainer = document.getElementById("questionContainer");
        let questionList = document.createElement("li");
        questionList.classList.add("sideBarSound");
        questionList.innerHTML = "Who Knows" + i;
        questionContainer.appendChild(questionList);

        let playButton = document.createElement("i");
        playButton.id = "Question/question" + i + ".wav";
        playButton.classList.add("fa");
        playButton.classList.add("fa-play-circle-o");
        playButton.onclick = function () { playSound(this.id, "question") };
        questionList.appendChild(playButton);

        let plusButton = document.createElement("i");
        plusButton.classList.add("fa");
        plusButton.classList.add("fa-plus-square-o");
        plusButton.onclick = function () { makeBeat(rowCount, "question", playButton.id) };
        questionList.appendChild(plusButton);
    }
    for (let i = 1; i <= numRobotBeats; i++) {
        let robotContainer = document.getElementById("robotContainer");
        let robotList = document.createElement("li");
        robotList.classList.add("sideBarSound");
        robotList.innerHTML = "Electric " + i;
        robotContainer.appendChild(robotList);

        let playButton = document.createElement("i");
        playButton.id = "Robot/robot" + i + ".wav";
        playButton.classList.add("fa");
        playButton.classList.add("fa-play-circle-o");
        playButton.onclick = function () { playSound(this.id, "robot") };
        robotList.appendChild(playButton);

        let plusButton = document.createElement("i");
        plusButton.classList.add("fa");
        plusButton.classList.add("fa-plus-square-o");
        plusButton.onclick = function () { makeBeat(rowCount, "robot", playButton.id) };
        robotList.appendChild(plusButton);
    }
    for (let i = 1; i <= numSnareBeats; i++) {
        let snareContainer = document.getElementById("snareContainer");
        let snareList = document.createElement("li");
        snareList.classList.add("sideBarSound");
        snareList.innerHTML = "Snare " + i;
        snareContainer.appendChild(snareList);

        let playButton = document.createElement("i");
        playButton.id = "Snare/snare" + i + ".wav";
        playButton.classList.add("fa");
        playButton.classList.add("fa-play-circle-o");
        playButton.onclick = function () { playSound(this.id, "snare") };
        snareList.appendChild(playButton);

        let plusButton = document.createElement("i");
        plusButton.classList.add("fa");
        plusButton.classList.add("fa-plus-square-o");
        plusButton.onclick = function () { makeBeat(rowCount, "snare", playButton.id) };
        snareList.appendChild(plusButton);
    }
    for (let i = 1; i <= numVoiceBeats; i++) {
        let voiceContainer = document.getElementById("voiceContainer");
        let voiceList = document.createElement("li");
        voiceList.classList.add("sideBarSound");
        voiceList.innerHTML = "Vocal " + i;
        voiceContainer.appendChild(voiceList);

        let playButton = document.createElement("i");
        playButton.id = "Voice/voice" + i + ".wav";
        playButton.classList.add("fa");
        playButton.classList.add("fa-play-circle-o");
        playButton.onclick = function () { playSound(this.id, "voice") };
        voiceList.appendChild(playButton);

        let plusButton = document.createElement("i");
        plusButton.classList.add("fa");
        plusButton.classList.add("fa-plus-square-o");
        plusButton.onclick = function () { makeBeat(rowCount, "voice", playButton.id) };
        voiceList.appendChild(plusButton);
    }
    for (let i = 1; i <= numWindBeats; i++) {
        let windContainer = document.getElementById("windContainer");
        let windList = document.createElement("li");
        windList.classList.add("sideBarSound");
        windList.innerHTML = "Horn " + i;
        windContainer.appendChild(windList);

        let playButton = document.createElement("i");
        playButton.id = "Wind/wind" + i + ".wav";
        playButton.classList.add("fa");
        playButton.classList.add("fa-play-circle-o");
        playButton.onclick = function () { playSound(this.id, "wind") };
        windList.appendChild(playButton);

        let plusButton = document.createElement("i");
        plusButton.classList.add("fa");
        plusButton.classList.add("fa-plus-square-o");
        plusButton.onclick = function () { makeBeat(rowCount, "wind", playButton.id) };
        windList.appendChild(plusButton);
    }
}

addBeatsToDropdown();

function openSignUp() {
    document.getElementById('signUpPage').style.display = 'block';
    document.getElementById("transparentScreen").style.display = "block";
}
function closeSignUp() {
    document.getElementById('signUpPage').style.display = 'none';
    document.getElementById("transparentScreen").style.display = "none";
}
/*
let screen = document.getElementById('transparentScreen');
window.onclick = function (event) {
    if (event.target === screen) {
        screen.style.display = "none";
        document.getElementById('signUpPage').style.display = 'none';
        
    }
}   
*/
