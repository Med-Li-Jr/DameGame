
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
                divsRowsPionsCreated.push(createPion(col, "white", [y, x], IdDivCreated))
            else
                divsRowsPionsCreated.push(createPion(col, "black", [y, x], IdDivCreated))

            IdDivCreated++;
        }    
        allDivDashArray.push(divsRowsPionsCreated)

    }
}


function createPion(col, bkgColor, position, IdDivCreated) {
    let div = document.createElement("div");
    div.classList.add("myBox");
    div.classList.add("box-" + bkgColor)

    div.id = "" + IdDivCreated

    let img = document.createElement("img")

    //1 ==> red;;;; -1 ==> bron ;;;; 0 ==> empty
    if (col != SPACE_EMTPY) {
        div.addEventListener("click", () => {
            pionClicked(col, ...position)
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
    div.dataset.position_y = position[0];
    div.dataset.position_x = position[1];

    div.appendChild(img);
    dashboardDiv.appendChild(div);
    return div;
}

function pionClicked(pion, y, x) {
    let topL = null;
    let topR = null;
    let bottomL = null;
    let bottomR = null;

    let lengthY = dashArray.length;
    let lengthX = dashArray[0].length;

    let hasTop = hasBottom = hasRight = hasLeft = true;


    if (x + 1 >= lengthY) {
        hasBottom = false;
        // topL = dashArray[x-1][y-1]
        // topR = dashArray[x-1][y+1]
        // console.log("pas de bottom" + x);
    }
    if (x - 1 < 0) {
        hasTop = false;
        // bottomL = dashArray[y + 1][y-1]
        // bottomR = dashArray[y + 1][y+1]
        // console.log("pas de top" + x);
    }
    if (y + 1 >= lengthX) {
        hasRight = false;
        // topL = dashArray[y - 1][y-1]
        // bottomL = dashArray[y - 1][y+1]

        // console.log("pas de right" + y);
    } if (y - 1 < 0) {
        hasLeft = false;
        // topR = dashArray[y - 1][y+1]
        // bottomR = dashArray[y + 1][y+1]
        // console.log("pas de left" + y);
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

    clearSelection()
    let directionToMoves = ""

    if (topR != null && topR == SPACE_EMTPY) {
        if (pion == PION_BRON) {
            allDivDashArray[y - 1][x + 1].classList.add("box_possibe")
            directionToMoves += "upR "
        }
    }
    else if(topR != null && topR !== pion && x + 2 < lengthX && y - 2 > 0 && dashArray[y - 2][x + 2] === SPACE_EMTPY){
        allDivDashArray[y - 2][x + 2].classList.add("box_possibe")
        directionToMoves += "TookUpR "
    }

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
    console.log(directionToMoves)
    //console.log(allDivDashArray[x][y])
}
function colVideClicked(elt, color) {
    if (color === "black" && pionSelected != null) {

        let position_x = elt.dataset.position_x;
        let position_y = elt.dataset.position_y;

        if (elt.classList.contains("box_possibe")) {
            console.log(elt, position_x, position_y, dashArray, pionSelected)
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