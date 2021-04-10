
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
class PionObject{
    constructor(position, valeur){
        this.position = position;
        this.valeur = valeur;
    }
    canMove(){
        return [this.position[0]-1, this.position[1]+1];
    }
    
}
function showDash() {
    let i = 0;
    for (let row of dash) {
        let j = 0;
        for (let col of row) {
            if ((i%2 != 0 && j%2 != 0) ||
            (i%2 == 0 && j%2 == 0))            
                createPion(col, "white", [i,j])
            else
                createPion(col, "black",[i,j])
            j++;
        }
        i++;
    }
}
function createPion(col, bkgColor, position) {
    let div = document.createElement("div");
    div.classList.add("myBox");
    let img = document.createElement("img")
    div.classList.add("box-" + bkgColor)
    if(col != 0)
        div.addEventListener("click", ()=>{
            pionClicked(col, ...position)
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
    div.appendChild(img);
    dashboard.appendChild(div);
}

function pionClicked(pion, x, y){
    let topL = null;
    let topR = null;
    let bottomL = null;
    let bottomR = null;

    let hasTop = hasBottom = hasRight = hasLeft = true;


    if(x + 1 >= dash.length){
        hasBottom = false;
        // topL = dash[x-1][y-1]
        // topR = dash[x-1][y+1]
        console.log("pas de bottom" + x);}
    if(x -1 < 0)
{
    hasTop = false;
    // bottomL = dash[x + 1][y-1]
    // bottomR = dash[x + 1][y+1]
    console.log("pas de top" + x);
}
    if(y + 1 >= dash[0].length)
{
    hasRight = false;
    // topL = dash[x - 1][y-1]
    // bottomL = dash[x - 1][y+1]

            console.log("pas de right" + y);
}    if(y -1 < 0)
{
    hasLeft = false;
    // topR = dash[x - 1][y+1]
    // bottomR = dash[x + 1][y+1]
            console.log("pas de left" + y);
}    
if(hasLeft){
    if(hasTop)
        topL = dash[x-1][y-1]
    if(hasBottom)
        bottomL = dash[x + 1][y-1]
}
if(hasRight){
    if(hasTop)
        topR = dash[x-1][y+1]
    if(hasBottom)
        bottomR = dash[x + 1][y+1]
}
let mes = ""
if(topR != null && topR == 0)
    mes += "upR "
if(topL != null && topL == 0)
    mes += "upL "

if(bottomR != null && bottomR == 0)
    mes += "downR "
if(bottomL != null && bottomL == 0)
    mes += "downL "
    if(pion == -1) // Bron
    {
    }
    else if(pion == 1) // Red
    {

    }
    console.log(mes)
}

showDash()