

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
        $(".likebutton").css('display', 'block');
        $(".dislikeButton").css('display', 'block');
        
        return rowCount = row + 1;
    }
}

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
        currentButton.style.backgroundColor = "rgb(100, 245, 255)";
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
    $(".newsoundbutton").css('display', 'block');
    $(".likebutton").css('display', 'none');
    $(".dislikeButton").css('display', 'none');
}
function deleteBeat(row){
    row -= 1;
    document.getElementById("beatbuttons-row" + row).remove();
    $(".newsoundbutton").css('display', 'block');
    $(".likebutton").css('display', 'none');
    $(".dislikeButton").css('display', 'none');
    return rowCount = row;
}
let myLoop;
async function playLoop(){
    let row = rowCount;
    let tempo = document.getElementById("tempoRange").value;
    myLoop = setInterval(async function(){
        for (let r = 1; r <= row; r++){
            for (let pos = 0; pos < 16; pos++) {
                playBeatsInColumn(r, (pos + 1), tempo);
            }
        }
    }, tempo * 1000);   
    function playBeatsInColumn(row, col, tempo){
        let interval = ((col - 1) / (16 / tempo) * 1000);
        if (document.getElementById("r" + row + "c" + col).value ===  "true"){
            let sound = document.getElementById("beat" + row);
            sound.preload = 'auto';
            sound.load();
            let cloneSound = sound.cloneNode();
            setTimeout(async function() {
                cloneSound.play();
            }, interval);
        }
    }
}

async function playSound(row) {
    document.getElementById("beat" + row).play();
}

function playPause() {
    if (document.getElementById("playButton").value === "Pause"){
        document.getElementById("playButton").value = "Play";
        clearInterval(myLoop);
    } else {
        document.getElementById("playButton").value = "Pause"
        playLoop();
    }

}


function sumArr(arr){
    sum = 0;
    for (i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    return sum;
}


