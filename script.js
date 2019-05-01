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
    if (clickedID === undefined) {
        addRandomBeat(row, beatType);
        setNewSound("none");
        $(".likeButton").css('display', 'block');
    } else {
        createTrashButton(row);
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

//make this scaleable
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
//make scaleable
function addRandomBeat(row, beatType){
    let audio = document.createElement("audio");
    audio.alt = "beat" + row;
    audio.id = "beat" + row;
    let fileNum;
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
    createTrashButton();
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
    document.getElementById("beatbuttons-row" + value).remove();
    clearInterval(myLoop);
    playLoop();
}

async function playLoop(){
    
    let tempo = document.getElementById("tempoRange").value;
    let tempoMarker = 0;
    myLoop = setInterval(async function () {
        let row = rowCount - 1;
        for (let r = 1; r <= row; r++) {
            let myDiv = document.getElementById("beatbuttons-row" + r);
            if(myDiv){
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

function playPause() {
    if (rowCount != 1) {
        if (document.getElementById("playButton").value === "Pause"){
            document.getElementById("playButton").value = "Play";
            clearInterval(myLoop);
        } else {
            document.getElementById("playButton").value = "Pause"
            playLoop();
        }
    }
}

function playPauseRow(clickedID,){
    let button = document.getElementById(clickedID);
    if (button.innerHTML === "Pause") {
        button.value = "Play";
        button.innerHTML = "Play";

    } else {
        button.value = "play";
        button.innerHTML = "Pause";
    }
    clearInterval(myLoop);
    playLoop();

}

function tempoChange() {
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
try {
    function addBeatsToDropdown() {
        for (let i = 1; i <= numClapBeats; i++) {

            let clapContainer = document.getElementById("clapContainer");
            let clapButton = document.createElement("button");
            clapButton.id = "Clap/clap" + i + ".wav";
            clapButton.classList.add("sideBarSound");
            clapButton.onclick = function() {playSound(this.id, "clap")};
            clapButton.ondblclick = function() {makeBeat(rowCount, "clap", this.id)}
            clapButton.innerHTML = "Clap " + i;
            clapContainer.appendChild(clapButton);
        }
        for (let i = 1; i <= numKickBeats; i++) {
            let kickContainer = document.getElementById("kickContainer");
            let kickButton = document.createElement("button");
            kickButton.id = "Kick/kick" + i + ".wav";
            kickButton.classList.add("sideBarSound");
            kickButton.onclick = function () { playSound(this.id) };
            kickButton.ondblclick = function () { makeBeat(rowCount, "kick", this.id) }
            kickButton.innerHTML = "Kick " + i;
            kickContainer.appendChild(kickButton);
        }
        for (let i = 1; i <= numPercussionBeats; i++) {
            let percussionContainer = document.getElementById("percussionContainer");
            let percussionButton = document.createElement("button");
            percussionButton.id = "Percussion/percussion" + i + ".wav";
            percussionButton.classList.add("sideBarSound");
            percussionButton.onclick = function () { playSound(this.id) };
            percussionButton.ondblclick = function () { makeBeat(rowCount, "percussion", this.id) }
            percussionButton.innerHTML = "Cymbal " + i;
            percussionContainer.appendChild(percussionButton);
        }
        for (let i = 1; i <= numQuestionBeats; i++) {
            let questionContainer = document.getElementById("questionContainer");
            let questionButton = document.createElement("button");
            questionButton.id = "Question/question" + i + ".wav";
            questionButton.classList.add("sideBarSound");
            questionButton.onclick = function () { playSound(this.id) };
            questionButton.ondblclick = function () { makeBeat(rowCount, "question", this.id) }
            questionButton.innerHTML = "Who Knows " + i;
            questionContainer.appendChild(questionButton);
        }
        for (let i = 1; i <= numRobotBeats; i++) {
            let robotContainer = document.getElementById("robotContainer");
            let robotButton = document.createElement("button");
            robotButton.id = "Robot/robot" + i + ".wav";
            robotButton.classList.add("sideBarSound");
            robotButton.onclick = function () { playSound(this.id) };
            robotButton.ondblclick = function () { makeBeat(rowCount, "robot", this.id) }
            robotButton.innerHTML = "Electric " + i;
            robotContainer.appendChild(robotButton);
        }
        for (let i = 1; i <= numSnareBeats; i++) {
            let snareContainer = document.getElementById("snareContainer");
            let snareButton = document.createElement("button");
            snareButton.id = "Snare/snare" + i + ".wav";
            snareButton.classList.add("sideBarSound");
            snareButton.onclick = function () { playSound(this.id) };
            snareButton.ondblclick = function () { makeBeat(rowCount, "snare", this.id) }
            snareButton.innerHTML = "Snare " + i;
            snareContainer.appendChild(snareButton);
        }
        for (let i = 1; i <= numVoiceBeats; i++) {
            let voiceContainer = document.getElementById("voiceContainer");
            let voiceButton = document.createElement("button");
            voiceButton.id = "Voice/voice" + i + ".wav";
            voiceButton.classList.add("sideBarSound");
            voiceButton.onclick = function () { playSound(this.id) };
            voiceButton.ondblclick = function () { makeBeat(rowCount, "voice", this.id) }
            voiceButton.innerHTML = "Vocal " + i;
            voiceContainer.appendChild(voiceButton);
        }
        for (let i = 1; i <= numWindBeats; i++) {
            let windContainer = document.getElementById("windContainer");
            let windButton = document.createElement("button");
            windButton.id = "Wind/wind" + i + ".wav";
            windButton.classList.add("sideBarSound");
            windButton.onclick = function () { playSound(this.id) };
            windButton.ondblclick = function () { makeBeat(rowCount, "wind", this.id) }
            windButton.innerHTML = "Horn " + i;
            windContainer.appendChild(windButton);
        }
    }
}     
catch(error){
       console.error(error);
}
addBeatsToDropdown();

function openSignUp() {
    document.getElementById('signUpPage').style.display = 'block';
}
function closeSignUp() {
    document.getElementById('signUpPage').style.display = 'none';
}
//this is supposed to close out of window if clicked elsewhere. 
let modal = document.getElementById('signUpPage');
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}   


    
