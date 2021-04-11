
let dashboardDiv = document.getElementById("dashboard")
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
let allDivDashArray = []

let pionSelected = null;
let colorSelected = null;

let PION_RED = 1;
let PION_BRON = -1;
let SPACE_EMTPY = 0;

function clearSelection() {

    for (let divs of allDivDashArray) {
        for (let div of divs)
            div.classList.remove("box_possibe")
    }
}

function resetDashBoard(){
    dashboardDiv.innerHTML = ""
    allDivDashArray = [];
    colorSelected = null;
    pionSelected = null;
}
function showDash() {
    resetDashBoard();
    let lengthDash = dashArray.length;
    let IdDivCreated = 0;
    for(let y = 0; y < lengthDash; y++){
        let divsRowsPionsCreated = []
        for(let x = 0; x < lengthDash; x++){
            let col = dashArray[y][x];
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
            pionClicked(col,y,x)
        })
    }
    else
        div.addEventListener("click", (e) => {
            colVideClicked(div, bkgColor)
        })
    
    
    if (col === PION_RED) {
        img.classList.add("pionR")
        img.src = "./checker1.png";
    }
    else if (col === PION_BRON) {
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
function showMovement(y, x, pion){
    let topL = null;
    let topR = null;
    let bottomL = null;
    let bottomR = null;

    let lengthY = dashArray.length;
    let lengthX = dashArray[0].length;

    let hasTop = hasBottom = hasRight = hasLeft = true;


    let directionToMoves = []

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
            topL = dashArray[y - 1][x - 1]
        } 
        if (hasBottom) {
            bottomL = dashArray[y + 1][x - 1]
        }
    }

    if (hasRight) {
        if (hasTop) {
            topR = dashArray[y - 1][x + 1]
        } 
        if (hasBottom) {
            bottomR = dashArray[y + 1][x + 1]
        }
    }


    if(topL != null){
        if(pion === PION_BRON){
            // console.log(pion + " // " + x + y + " must be topL " + PION_BRON)
            if(topL == SPACE_EMTPY){
                directionToMoves.push([y - 1, x - 1])
                console.log(dashArray[y - 2][x - 2], "-----------")
            }
            else if( topL != pion){
                if(x - 2 >= 0 && y - 2 >= 0 
                && dashArray[y - 2][x - 2] === SPACE_EMTPY){
                    directionToMoves.push([y - 2, x - 2])
                    directionToMoves.push(showMovement(y - 2, x - 2, pion))
                }
            }    
        }
    }

    if(topR != null){
        if(pion === PION_BRON){
            // console.log(pion + " must be topR " + PION_BRON)
            if(topR == SPACE_EMTPY){
                directionToMoves.push([y - 1, x + 1])
            }
            else if( topR != pion){
                if(x + 2 < lengthX && y - 2 >= 0 
                && dashArray[y - 2][x + 2] === SPACE_EMTPY){
                    directionToMoves.push([y - 2, x + 2])
                    directionToMoves.push(showMovement(y - 2, x + 2, pion))
                }
            }
    
        }
    }

    if(bottomL != null){
        if(pion === PION_RED){
            // console.log(pion + " must be bottomL " + PION_RED)
            if(bottomL == SPACE_EMTPY){
                directionToMoves.push([y + 1, x - 1])
            }
            else if( bottomL != pion){
                if(x - 2 >= 0 && y + 2 < lengthY  
                && dashArray[y + 2][x - 2] === SPACE_EMTPY){
                    directionToMoves.push([y + 2, x - 2])
                    directionToMoves.push(showMovement(y + 2, x - 2, pion))
                }
            }    
        }

    }

    if(bottomR != null){
        if(pion == PION_RED){
            // console.log(pion + " must be bottomR " + PION_RED)
            if(bottomR == SPACE_EMTPY){
                directionToMoves.push([y + 1, x + 1])
            }
            else if( bottomR != pion){
                if(x + 2 < lengthX && y + 2 < lengthY  
                && dashArray[y + 2][x + 2] === SPACE_EMTPY){
                    directionToMoves.push([y + 2, x + 2])
                    directionToMoves.push(showMovement(y + 2, x + 2, pion))
                }
            }    
        }
    }
    return directionToMoves;

}
function pionClicked(pion, y, x) {
    let topL = null;
    let topR = null;
    let bottomL = null;
    let bottomR = null;
    


    clearSelection()
    let directionToMoves = ""
/*if (topR != null && topR == SPACE_EMTPY) {
        if (pion == PION_BRON) {
            allDivDashArray[y - 1][x + 1].classList.add("box_possibe")
            directionToMoves += "upR "
        }
    }
    else if(topR != null && topR !== pion && x + 2 < lengthX && y - 2 > 0 && dashArray[y - 2][x + 2] === SPACE_EMTPY){
        allDivDashArray[y - 2][x + 2].classList.add("box_possibe")
        directionToMoves += "TookUpR "
    }
    console.log(topL, pion, SPACE_EMTPY)
    if (topL != null && topL == SPACE_EMTPY) {
        if (pion == PION_BRON) {
            allDivDashArray[y - 1][x - 1].classList.add("box_possibe")
            directionToMoves += "upL "
        }
    }
    else if(topL != null && topL !== pion && x - 2 > 0 && y - 2 > 0 && dashArray[x - 2][y - 2] === SPACE_EMTPY){
        allDivDashArray[y - 2][x - 2].classList.add("box_possibe")
        directionToMoves += "TookUpL "
    }
    
    if (bottomR != null && bottomR == SPACE_EMTPY) {
        if (pion == PION_RED) {
            allDivDashArray[y + 1][x + 1].classList.add("box_possibe")
            directionToMoves += "downR "
        }
    }
    else if(bottomR != null && bottomR !== pion && y + 2 < lengthY && x + 2 < lengthX && dashArray[y + 2][x + 2] === SPACE_EMTPY){
        allDivDashArray[y + 2][x + 2].classList.add("box_possibe")
        directionToMoves += "TookDownR "
    }
    if (bottomL != null && bottomL == SPACE_EMTPY) {
        if (pion == PION_RED) {
            allDivDashArray[y + 1][x - 1].classList.add("box_possibe")
            directionToMoves += "downL "
        }
    }
    else if(bottomL != null && bottomL !== pion && x - 2 > 0 &&  y + 2 < lengthY && dashArray[y + 2][x - 2] === SPACE_EMTPY){
        allDivDashArray[y + 2][x - 2].classList.add("box_possibe")
        directionToMoves += "TookDownL "
    }

    if (directionToMoves.length > 0) {
        colorSelected = pion;
        pionSelected = allDivDashArray[y][x];
    }
    if (pion == -1) // Bron
    {
    }
    else if (pion == 1) // Red
    {

    }
    */
    let result = showMovement(y, x, pion);
    let auxR = result.flat(Infinity);
    console.log(auxR, auxR.length)
    for(let i = 0, j=0; i < auxR.length / 2; i++){
        allDivDashArray[auxR[j]][auxR[j+1]].classList.add("box_possibe")
        j+=2;
    }
}
function colVideClicked(elt, color) {
    if (color === "black" && pionSelected != null) {

        let position_x = elt.dataset.position_x;
        let position_y = elt.dataset.position_y;

        if (elt.classList.contains("box_possibe")) {
            
            let aux = dashArray[position_y][position_x] 
            dashArray[position_y][position_x] = dashArray[pionSelected.dataset.position_y][pionSelected.dataset.position_x]
            dashArray[pionSelected.dataset.position_y][pionSelected.dataset.position_x] = aux
            // elt.innerHTML = pionSelected.innerHTML
            // pionSelected.innerHTML = "";
            // clearSelection();
            // let old = [...(pionSelected.classList[pionSelected.classList.length - 1].split(","))]
            //    console.table(dashArray[old[0]][old[1]], dashArray[position[0]][position[1]], colorSelected  )
            // dashArray[old[0]][old[1]] = 0
            // dashArray[position[0]][position[1]] = colorSelected
            //    console.table(dashArray[old[0]][old[1]],dashArray[position[0]][position[1]] )
            showDash()

        }
    }
}

showDash()