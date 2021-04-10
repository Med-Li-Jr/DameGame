
let dashboard = document.getElementById("dashboard")
let dash = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0]
]
let pionSelected = null;
let colorSelected = null;
let allDivDash = []
class PionObject {
    constructor(position, valeur) {
        this.position = position;
        this.valeur = valeur;
    }
    canMove() {
        return [this.position[0] - 1, this.position[1] + 1];
    }

}
function showDash() {
    dashboard.innerHTML = ""
    allDivDash = [];
    colorSelected = null;
    pionSelected = null;
    console.log(dash.length)
    console.log()
    console.log(allDivDash.length)
    console.log()
    console.log(colorSelected)
    console.log()
    console.log(pionSelected)
    let i = 0;
    let idDiv = 0;
    for (let row of dash) {
        let j = 0;
        let aux = []
        for (let col of row) {
            if ((i % 2 != 0 && j % 2 != 0) ||
                (i % 2 == 0 && j % 2 == 0))
                aux.push(createPion(col, "white", [i, j], idDiv))
            else
                aux.push(createPion(col, "black", [i, j], idDiv))
            j++;
            idDiv++;
        }
        i++;
        allDivDash.push(aux);
    }
}
function createPion(col, bkgColor, position, idDiv) {
    let div = document.createElement("div");
    div.classList.add("myBox");
    div.classList.add("" + idDiv);

    let img = document.createElement("img")
    div.classList.add("box-" + bkgColor)
    if (col != 0) {
        div.addEventListener("click", () => {
            pionClicked(col, ...position)
        })
    }
    else
        div.addEventListener("click", (e) => {
            colVideClicked(div, bkgColor)
        })
    if (col === 1) {
        img.src = "./checker1.png";
    }
    else if (col === -1) {
        img.src = "./checker2.png";
    }
    else {
        img.src = "./transparent.png";
    }
    div.classList.add(position[0] + "," + position[1]);
    
    div.appendChild(img);
    dashboard.appendChild(div);
    return div;
}

function colVideClicked(elt, color) {
    if (color === "black" && pionSelected != null) {
        let position = [...(elt.classList[elt.classList.length -2].split(","))]
        
        if(elt.classList.contains("box_possibe")){
            elt.innerHTML = pionSelected.innerHTML
            pionSelected.innerHTML = "";
            clearSelection();
            let old = [...(pionSelected.classList[pionSelected.classList.length -1].split(","))]
        //    console.table(dash[old[0]][old[1]], dash[position[0]][position[1]], colorSelected  )
            dash[old[0]][old[1]] = 0
            dash[position[0]][position[1]] = colorSelected
        //    console.table(dash[old[0]][old[1]],dash[position[0]][position[1]] )
            showDash()


            
        }
    }
}
function clearSelection(){

    for (let divs of allDivDash) {
        for (let div of divs)
            div.classList.remove("box_possibe")
    }
}
function pionClicked(pion, x, y) {
    let topL = null;
    let topR = null;
    let bottomL = null;
    let bottomR = null;

    let hasTop = hasBottom = hasRight = hasLeft = true;


    if (x + 1 >= dash.length) {
        hasBottom = false;
        // topL = dash[x-1][y-1]
        // topR = dash[x-1][y+1]
        console.log("pas de bottom" + x);
    }
    if (x - 1 < 0) {
        hasTop = false;
        // bottomL = dash[x + 1][y-1]
        // bottomR = dash[x + 1][y+1]
        console.log("pas de top" + x);
    }
    if (y + 1 >= dash[0].length) {
        hasRight = false;
        // topL = dash[x - 1][y-1]
        // bottomL = dash[x - 1][y+1]

        console.log("pas de right" + y);
    } if (y - 1 < 0) {
        hasLeft = false;
        // topR = dash[x - 1][y+1]
        // bottomR = dash[x + 1][y+1]
        console.log("pas de left" + y);
    }
    if (hasLeft) {
        if (hasTop) {
            topL = dash[x - 1][y - 1]
        } if (hasBottom) {

            bottomL = dash[x + 1][y - 1]
        }
    }
    if (hasRight) {
        if (hasTop) {
            topR = dash[x - 1][y + 1]
        } if (hasBottom) {
            bottomR = dash[x + 1][y + 1]
        }
    }
    clearSelection()
    pionSelected = null;
    let mes = ""
    if (topR != null && topR == 0) {
        allDivDash[x - 1][y + 1].classList.add("box_possibe")
        mes += "upR "

    }
    if (topL != null && topL == 0) {
        allDivDash[x - 1][y - 1].classList.add("box_possibe")
        mes += "upL "
    }
    if (bottomR != null && bottomR == 0) {
        allDivDash[x + 1][y + 1].classList.add("box_possibe")
        mes += "downR "
    }
    if (bottomL != null && bottomL == 0) {
        allDivDash[x + 1][y - 1].classList.add("box_possibe")
        mes += "downL "
    }
    if (mes.length > 0)
    {
        colorSelected = pion;
            pionSelected = allDivDash[x][y];
}
    if (pion == -1) // Bron
    {
    }
    else if (pion == 1) // Red
    {

    }
    console.log(mes)
    //console.log(allDivDash[x][y])
}

showDash()