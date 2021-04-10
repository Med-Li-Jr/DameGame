
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
function showDash() {
    let i = 1;
    for (let row of dash) {
        let j = 1;
        for (let col of row) {
            if ((i%2 != 0 && j%2 != 0) ||
            (i%2 == 0 && j%2 == 0))            
                createPion(col, "white")
            else
                createPion(col, "black")
            j++;
        }
        i++;
    }
}
function createPion(col, bkgColor) {
    let div = document.createElement("div");
    div.classList.add("myBox");
    let img = document.createElement("img")
    div.classList.add("box-" + bkgColor)
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

showDash()