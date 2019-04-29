

function makeBeat(row) {
    if (row <= 16){
        
        let beatType = determineBeatType();
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
        addRandomBeat(row, beatType);
        setNewSound("none");
        $(".likeButton").css('display', 'block');
        let playButton = document.createElement("button");
        playButton.classList.add("playPauseRow");
        playButton.classList.add("playButton");
        playButton.id = "playPauseRow" + row;
        playButton.onclick = function() {playPauseRow(this.id, this.value)}; // not sure why I need to state function..
        playButton.value = "Pause";
        beatrows.appendChild(playButton);
        
        if (row === 1){
            playLoop();
        };
        return rowCount = row + 1;
    }
}
//make this scaleable
function determineBeatType(){
    let randNum = Math.ceil(Math.random() * 126);
    let beatType = "";
    if (randNum <= 9) {
        beatType = "wind";
    } else if (randNum <= 21) {
        beatType = "voice";
    } else if (randNum <= 34) {
        beatType = "robot";
    } else if (randNum <= 48) {
        beatType = "percussion";
    } else if (randNum <= 63) {
        beatType = "clap";
    } else if (randNum <= 80) {
        beatType = "kick";
    } else if (randNum <= 98) {
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
        fileNum = Math.ceil(Math.random() * 9);
        audio.src = "SampleSwap/HITS/Wind/wind" + fileNum + ".wav";
    } else if (beatType === "voice") {
        fileNum = Math.ceil(Math.random() * 12);
        audio.src = "SampleSwap/HITS/Voice/voice" + fileNum + ".wav";
    } else if (beatType === "robot") {
        fileNum = Math.ceil(Math.random() * 13);
        audio.src = "SampleSwap/HITS/Robot/robot" + fileNum + ".wav";
    } else if (beatType === "percussion") {
        fileNum = Math.ceil(Math.random() * 14);
        audio.src = "SampleSwap/HITS/Percussion/percussion" + fileNum + ".wav";
    } else if (beatType === "clap") {
        fileNum = Math.ceil(Math.random() * 15);
        audio.src = "SampleSwap/HITS/Clap/clap" + fileNum + ".wav";
    } else if (beatType === "kick") {
        fileNum = Math.ceil(Math.random() * 17);
        audio.src = "SampleSwap/HITS/Kick/kick" + fileNum + ".wav";
    } else if (beatType === "question") {
        fileNum = Math.ceil(Math.random() * 18);
        audio.src = "SampleSwap/HITS/Question/question" + fileNum + ".wav";
    } else {
        fileNum = Math.ceil(Math.random() * 28);
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
    img.style.position = "relative";
    img.style.top = "2px";
    img.style.left = "1px";
    img.style.padding ="5px 5px";
    img.width = 40;
    img.height = 40;
    document.getElementById("beatbuttons-row" + row).appendChild(img);
    return row;
}

function setNewSound(displayValue){
    $(".newsoundbutton").css('display', displayValue);
}

function keepBeat(){
    let row = rowCount - 1;
    $(".newsoundbutton").css('display', 'block');
    $(".likeButton").css('display', 'none');
    let trashButton = document.createElement("button");
    trashButton.classList.add("trashButton");
    trashButton.id = "trashButton" + row;
    trashButton.value = row;
    trashButton.onclick = function () { trashRow(this.value) }; // not sure why I need to state function..
    document.getElementById("beatbuttons-row" + row)    .appendChild(trashButton);
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

function playPauseRow(clickedID, clickedValue){
    if (clickedValue === "Pause") {
        document.getElementById(clickedID).value = "Play";
    } else {
        document.getElementById(clickedID).value = "Pause";
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


