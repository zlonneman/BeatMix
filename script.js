

function makeBeat(row) {
    if (row <= 16){
        let randNum = Math.ceil(Math.random() * 9);
        let i = 1;
        let centerbox = document.getElementById("center");
        let newDiv = document.createElement("div");
        newDiv.id = "beatbuttons-row" + row;
        newDiv.class = "beatrows";
        centerbox.appendChild(newDiv);
        let beatrows = document.getElementById("beatbuttons-row" + row);
        addImage(randNum, row);
        for (i; i <= 16; i++) {
            
            let button = document.createElement("button");
            button.classList.add("rowbutton");
            button.id = "r" + row + "c" + i;
            button.value = "false"
            button.style.background = "black"; //tried changing this on style sheet but didn't work
            button.onclick = function() {turnBeatOn(button.id, row)};
            beatrows.appendChild(button);  
        } 
        addRandomBeat(row, randNum);
        setNewSound("none");
        $(".likebutton").css('display', 'block');
        $(".dislikeButton").css('display', 'block');
        return rowCount = row + 1;
    }
}

function turnBeatOn(whichBeatButton, row) {
    let currentButton = document.getElementById(whichBeatButton);
    let audio = document.getElementById("beat" + row);
    if(currentButton.value === "false"){
        currentButton.style.backgroundColor = "rgb(100, 245, 255)";
        currentButton.value = "true"
        //audio.play(); //add this to my settime out func
    } else {
        currentButton.style.backgroundColor = "black";
        currentButton.value = "false"
    };
};

function addRandomBeat(row, randNum){
    
    let audio = document.createElement("audio");
    audio.alt = "beat" + row;
    audio.id = "beat" + row;
    audio.src = "beatsounds/audio-" + randNum + ".wav"
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
function addImage(randNum, row) {
    let img = document.createElement("img");
    img.src = "beatsounds/audioimg-" + randNum + ".png";
    img.alt = "audio" + row;
    img.width = 50;
    img.height = 25;
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

function runSound(){
    let row = rowCount;
    let tempo = document.getElementById("tempoRange").value;
    for (let r = 1; r <= row; r++){
        for (let pos = 0; pos < 16; pos++) {
            playBeatsInColumn(r, (pos + 1), tempo);
        }
    }
}
function playBeatsInColumn(row, col, tempo){
    let interval = ((col - 1) / tempo) * 1000;
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

async function playSound(row) {
    document.getElementById("beat" + row).play();
}


function sumArr(arr){
    sum = 0;
    for (i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    return sum;
}


