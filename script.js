


function makeButtons(row) {
    if (row <= 16){
        let i = 1;
        let centerbox = document.getElementById("center");
        let newDiv = document.createElement("div");
        newDiv.id = "beatbuttons-row" + row;
        newDiv.class = "beatrows";
        centerbox.appendChild(newDiv);
        let beatrows = document.getElementById("beatbuttons-row" + row);
        for (i; i <= 16; i++) {
            let button = document.createElement("button");
            button.classList.add("rowbutton");
            button.id = "b" + i;
            beatrows.appendChild(button);  
        } 
        return x = row + 1;
    }
}

