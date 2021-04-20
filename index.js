
let dashboardDiv = document.getElementById("dashboard")

let PION_RED = 1;
let PION_BRON = -1;
let SPACE_EMTPY = 0;

let dashArray = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0]
]
/*
let allPion = []
for(let y = 0; y < 8; y++){
    let arrayLine = []
    for(let x = 0; x < 8; x++){
        if ((y % 2 != 0 && x % 2 != 0) ||
        (y % 2 == 0 && x % 2 == 0))
            arrayLine.push(new Pion(y, x, SPACE_EMTPY)); // white
        else{
            //black
            if( y < 3){ // red
                arrayLine.push(new Pion(y, x, PION_RED))
            }
            else if(y > 4){//bron
                arrayLine.push(new Pion(y, x, PION_BRON))
            }
            else
                arrayLine.push(new Pion(y, x, SPACE_EMTPY))
        }
    }   
    allPion.push(arrayLine); 
}*/

let allPion = [
    [
        new Pion(0, 0, 0),
        new Pion(0, 1, 0),
        new Pion(0, 2, 0),
        new Pion(0, 3, 1),
        new Pion(0, 4, 0),
        new Pion(0, 5, 1),
        new Pion(0, 6, 0),
        new Pion(0, 7, 1)
    ],
    [
        new Pion(1, 0, 1),
        new Pion(1, 1, 0),
        new Pion(1, 2, -1),
        new Pion(1, 3, 0),
        new Pion(1, 4, 1),
        new Pion(1, 5, 0),
        new Pion(1, 6, 1),
        new Pion(1, 7, 0)
    ],
    [
        new Pion(2, 0, 0),
        new Pion(2, 1, 1),
        new Pion(2, 2, 0),
        new Pion(2, 3, 1),
        new Pion(2, 4, 0),
        new Pion(2, 5, 1),
        new Pion(2, 6, 0),
        new Pion(2, 7, 1)
    ],
    [
        new Pion(3, 0, 0),
        new Pion(3, 1, 0),
        new Pion(3, 2, 0),
        new Pion(3, 3, 0),
        new Pion(3, 4, 0),
        new Pion(3, 5, 0),
        new Pion(3, 6, 0),
        new Pion(3, 7, 0)
    ],
    [
        new Pion(4, 0, 0),
        new Pion(4, 1, 0),
        new Pion(4, 2, 0),
        new Pion(4, 3, 0),
        new Pion(4, 4, 0),
        new Pion(4, 5, 0),
        new Pion(4, 6, 0),
        new Pion(4, 7, 0)
    ],
    [
        new Pion(5, 0, -1),
        new Pion(5, 1, 0),
        new Pion(5, 2, -1),
        new Pion(5, 3, 0),
        new Pion(5, 4, -1),
        new Pion(5, 5, 0),
        new Pion(5, 6, -1),
        new Pion(5, 7, 0)
    ],
    [
        new Pion(6, 0, 0),
        new Pion(6, 1, 1),
        new Pion(6, 2, 0),
        new Pion(6, 3, -1),
        new Pion(6, 4, 0),
        new Pion(6, 5, -1),
        new Pion(6, 6, 0),
        new Pion(6, 7, -1)
    ],
    [
        new Pion(7, 0, 0),
        new Pion(7, 1, 0),
        new Pion(7, 2, -1),
        new Pion(7, 3, 0),
        new Pion(7, 4, -1),
        new Pion(7, 5, 0),
        new Pion(7, 6, -1),
        new Pion(7, 7, 0)
    ]

]

// [0, 0, 0, 0, 0, 0, 0, 0],
// [1, 0, 0, 0, -1, 0, -1, 0],
// [0, 1, 0, 1, 0, 0, 0, 0],
// [1, 0, 0, 0, 0, 0, 0, 0],
// [0, 1, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0],
// [0, -1, 0, 0, 0, 0, 0, 0],
// [-1, 0, 0, 0, 0, 0, 1, 0]
let pionToDelete = [];
let allDivDashArray = []

let pionSelected = null;
let colorSelected = null;


function clearSelection() {

    for (let divs of allDivDashArray) {
        for (let div of divs)
            div.classList.remove("box_possibe")
    }
}

function resetDashBoard() {
    dashboardDiv.innerHTML = ""
    allDivDashArray = [];
    colorSelected = null;
    pionSelected = null;
}
function showDash() {
    resetDashBoard();
    let lengthDash = allPion.length;
    let IdDivCreated = 0;
    for (let y = 0; y < lengthDash; y++) {
        let divsRowsPionsCreated = []
        for (let x = 0; x < lengthDash; x++) {
            let col = allPion[y][x].type;
            //console.log(allPion[y][x], y, x)
            if ((y % 2 != 0 && x % 2 != 0) ||
                (y % 2 == 0 && x % 2 == 0))
                divsRowsPionsCreated.push(createPion(col, "white", y, x, IdDivCreated))
            else
                divsRowsPionsCreated.push(createPion(col, "black", y, x, IdDivCreated))

            IdDivCreated++;
        }
        allDivDashArray.push(divsRowsPionsCreated)

    }
}


function createPion(col, bkgColor, y, x, IdDivCreated) {
    let div = document.createElement("div");
    div.classList.add("myBox");
    div.classList.add("box-" + bkgColor)

    div.id = "" + IdDivCreated

    let img = document.createElement("img")

    //1 ==> red;;;; -1 ==> bron ;;;; 0 ==> empty
    if (col != SPACE_EMTPY) {
        div.addEventListener("click", () => {
            pionClicked(col, y, x)
        })
    }
    else
    {
        div.addEventListener("click", (e) => {
            colVideClicked(div, bkgColor)
        })
    }

    if (col == PION_RED) {
        img.classList.add("pionR")
        img.src = "./checker1.png";
    }
    else if (col == PION_BRON) {
        img.classList.add("pionB")
        img.src = "./checker2.png";
    }
    else {
        img.src = "./transparent.png";
    }
    

    div.dataset.position_y = y;
    div.dataset.position_x = x;

    div.appendChild(img);
    dashboardDiv.appendChild(div);
    return div;
}

function showMovement(y, x, pion) {
    let topL = null;
    let topR = null;
    let bottomL = null;
    let bottomR = null;

    let lengthY = allPion.length;
    let lengthX = allPion[0].length;

    let hasTop = hasBottom = hasRight = hasLeft = true;


    let directionToMoves = []
    pionToDelete = [];

    if (y + 1 >= lengthY) {
        hasBottom = false;
    }
    if (y - 1 < 0) {
        hasTop = false;
    }
    if (x + 1 >= lengthX) {
        hasRight = false;
    }
    if (x - 1 < 0) {
        hasLeft = false;
    }

    if (hasLeft) {
        if (hasTop) {
            topL = allPion[y - 1][x - 1].type
        }
        if (hasBottom) {
            bottomL = allPion[y + 1][x - 1].type
        }
    }

    if (hasRight) {
        if (hasTop) {
            topR = allPion[y - 1][x + 1].type
        }
        if (hasBottom) {
            bottomR = allPion[y + 1][x + 1].type
        }
    }


    if (topL != null) {
        if (allPion[y][x].isDame) {
            for (let i = y - 1, j = x - 1; i >= 0 && j >= 0; i--, j--) {
                if (allPion[i][j].type == SPACE_EMTPY)
                    directionToMoves.push([i, j])
                else if (allPion[i][j].type != pion && j - 1 > 0 && i -1 > 0)
                    pionToDelete.push([i, j])
                else if(allPion[i][j].type == pion || allPion[i][j].type == allPion[i+1][j+1].type)
                    break;
            }
        }
        else if (pion == PION_BRON) {
            if (allPion[y][x].isDame) {

            }
            // console.log(pion + " // " + x + y + " must be topL " + PION_BRON)
            if (topL == SPACE_EMTPY) {
                directionToMoves.push([y - 1, x - 1])
            }
            else if (topL != pion) {
                if (x - 2 >= 0 && y - 2 >= 0
                    && allPion[y - 2][x - 2].type == SPACE_EMTPY) {
                    directionToMoves.push([y - 2, x - 2])
                    pionToDelete.push([y - 1, x - 1])
                    //directionToMoves.push(showMovement(y - 2, x - 2, pion))
                }
            }
        }
        else if (pion == PION_RED) {
            if (topL != SPACE_EMTPY) {
                if (topL != pion) {
                    if (x - 2 >= 0 && y - 2 >= 0
                        && allPion[y - 2][x - 2].type == SPACE_EMTPY) {
                        directionToMoves.push([y - 2, x - 2])
                        pionToDelete.push([y - 1, x - 1])
                        //directionToMoves.push(showMovement(y - 2, x - 2, pion))
                    }
                }
            }
        }
    }

    if (topR != null) {
        if (allPion[y][x].isDame) {
            for (let i = y - 1, j = x + 1; i >= 0 && j < allPion.length; i--, j++) {
                if (allPion[i][j].type == SPACE_EMTPY)
                    directionToMoves.push([i, j])
                else if (allPion[i][j].type != pion && j + 1 < allPion.length && i - 1 > 0)
                    pionToDelete.push([i, j])
                else if(allPion[i][j].type == pion || allPion[i][j].type == allPion[i+1][j-1].type)
                    break;
            }
        }
        else if (pion == PION_BRON) {
            // console.log(pion + " must be topR " + PION_BRON)
            if (topR == SPACE_EMTPY) {
                directionToMoves.push([y - 1, x + 1])
            }
            else if (topR != pion) {
                if (x + 2 < lengthX && y - 2 >= 0
                    && allPion[y - 2][x + 2].type == SPACE_EMTPY) {
                    directionToMoves.push([y - 2, x + 2])
                    pionToDelete.push([y - 1, x + 1])
                    //directionToMoves.push(showMovement(y - 2, x + 2, pion))
                }
            }
        }
        else if (pion == PION_RED) {
            if (topR != SPACE_EMTPY) {
                if (topR != pion) {
                    if (x + 2 < lengthX && y - 2 >= 0
                        && allPion[y - 2][x + 2].type == SPACE_EMTPY) {
                        directionToMoves.push([y - 2, x + 2])
                        pionToDelete.push([y - 1, x + 1])
                        //directionToMoves.push(showMovement(y - 2, x + 2, pion))
                    }
                }
            }
        }
    }

    if (bottomL != null) {
        if (allPion[y][x].isDame) {
            for (let i = y +1, j = x-1; i < allPion.length && j >= 0; i++, j--) {
                console.log(i + " // k " + j, allPion[i][j])
                if (allPion[i][j].type == SPACE_EMTPY)
                    directionToMoves.push([i, j])
                // else if (allPion[i][j].type != pion && j - 1 > 0 && i + 1 < allPion.length - 1)
                //     pionToDelete.push([i, j])
                else if(allPion[i][j].type == pion || allPion[i][j].type == allPion[i-1][j+1].type)
                    break;
            }
        }
        else if (pion == PION_RED) {
            // console.log(pion + " must be bottomL " + PION_RED)
            if (bottomL == SPACE_EMTPY) {
                directionToMoves.push([y + 1, x - 1])
            }
            else if (bottomL != pion) {
                if (x - 2 >= 0 && y + 2 < lengthY
                    && allPion[y + 2][x - 2].type == SPACE_EMTPY) {
                    directionToMoves.push([y + 2, x - 2])
                    pionToDelete.push([y + 1, x - 1])
                    //directionToMoves.push(showMovement(y + 2, x - 2, pion))
                }
            }
        }
        else if (pion == PION_BRON) {
            if (bottomL != SPACE_EMTPY) {
                if (bottomL != pion) {
                    if (x - 2 >= 0 && y + 2 < lengthY
                        && allPion[y + 2][x - 2].type == SPACE_EMTPY) {
                        directionToMoves.push([y + 2, x - 2])
                        pionToDelete.push([y + 1, x - 1])
                        //directionToMoves.push(showMovement(y + 2, x - 2, pion))
                    }
                }
            }
        }

    }

    if (bottomR != null) {
        if(allPion[y][x].isDame) {
            for(let i = y + 1, j = x + 1; i < allPion.length  && j < allPion.length; i++,j++ ){
                if( allPion[i][j].type == SPACE_EMTPY)    
                    directionToMoves.push([i, j])
                else if( allPion[i][j].type != pion && j + 1 < allPion.length - 1 && i + 1 < allPion.length - 1)    
                    pionToDelete.push([i, j])
                else if( allPion[i][j].type == pion)
                    break;
                else if(allPion[i][j].type == allPion[i-1][j-1].type)
                    break;
                    console.log(allPion[i][j].type == pion || allPion[i][j].type == allPion[i-1][j-1].type, allPion[i][j].type, allPion[i-1][j-1].type)
                // else if (allPion[i][j].type == pion)
                //     break;
           }
        }
        else if (pion == PION_RED) {
            // console.log(pion + " must be bottomR " + PION_RED)
            if (bottomR == SPACE_EMTPY) {
                directionToMoves.push([y + 1, x + 1])
            }
            else if (bottomR != pion) {
                if (x + 2 < lengthX && y + 2 < lengthY
                    && allPion[y + 2][x + 2].type == SPACE_EMTPY) {
                    directionToMoves.push([y + 2, x + 2])
                    pionToDelete.push([y + 1, x + 1])
                    //directionToMoves.push(showMovement(y + 2, x + 2, pion))
                }
            }
        }
        else if (pion == PION_BRON) {
            console.log(allPion[y][x].isDame)
            if (bottomR != SPACE_EMTPY) {
                if (bottomR != pion) {
                    if (x + 2 < lengthX && y + 2 < lengthY
                        && allPion[y + 2][x + 2].type == SPACE_EMTPY) {
                        directionToMoves.push([y + 2, x + 2])
                        pionToDelete.push([y + 1, x + 1])
                        //directionToMoves.push(showMovement(y + 2, x + 2, pion))
                    }
                }
            }

        }
    }
    return directionToMoves;

}

function sansDame(){

}

function pionClicked(pion, y, x) {
    clearSelection()
    let result = showMovement(y, x, pion);
    pionSelected = [y, x];
    let auxR = result.flat(Infinity);
    //console.log(auxR, auxR.length)
    for (let i = 0, j = 0; i < auxR.length / 2; i++) {
        allDivDashArray[auxR[j]][auxR[j + 1]].classList.add("box_possibe")
        j += 2;
    }
}


function colVideClicked(elt, color) {
    if (color == "black" && pionSelected != null) {

        //console.log(dashArray)
        let position_x = Number.parseInt(elt.dataset.position_x);
        let position_y = Number.parseInt(elt.dataset.position_y);

        console.log(position_y, position_x)
        if (elt.classList.contains("box_possibe")) {

            let aux =  new Pion(position_y, position_x, allPion[position_y][position_x].type,allPion[position_y][position_x].isDame);
            
            allPion[position_y][position_x] = new Pion(position_y, position_x, allPion[pionSelected[0]][pionSelected[1]].type, allPion[pionSelected[0]][pionSelected[1]].isDame);
            
            allPion[pionSelected[0]][pionSelected[1]] = new Pion(pionSelected[0], pionSelected[1], aux.type, aux.isDame);
            
            if (
                (position_x < pionSelected[1] - 1 || position_x > pionSelected[1] + 1)
                &&
                (position_y < pionSelected[0] - 1 || position_y > pionSelected[0] + 1)
            ) {
                let yDelete = xDelete = -1;
                if (position_x > pionSelected[1])
                    xDelete = pionSelected[1] + 1;
                else
                    xDelete = pionSelected[1] - 1;

                if (position_y > pionSelected[0])
                    yDelete = pionSelected[0] + 1
                else
                    yDelete = pionSelected[0] - 1;

                allPion[yDelete][xDelete].type = 0;

            }
            if (allPion[position_y][position_x].type == PION_RED && position_y == allPion.length - 1){
                allPion[position_y][position_x].setDame();
            }
            else if (allPion[position_y][position_x].type == PION_BRON && position_y == 0) {
                allPion[position_y][position_x].setDame();
            }

//            console.log(position_y + " " + position_x + " is Dame " + allPion[pionSelected[0]][pionSelected[1]].y  + " " + allPion[pionSelected[0]][pionSelected[1]].x + " type is " + allPion[pionSelected[0]][pionSelected[1]].type + " // " + allPion[pionSelected[0]][pionSelected[1]].isDame )
            showDash()

        }
    }
}

showDash()