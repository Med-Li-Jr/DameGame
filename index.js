let dash = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0]
]

let allRoad = document.getElementsByClassName("myBox");
let len = allRoad.length
let k = 0, j=0;
for(let i = 0; i < len; i++){
    let element = allRoad[i];
    j++;
    if(j==8){
        j = 0;
        k++;
    }
    element.addEventListener("click", elementCliked, false);
    console.log(element);

}

function elementCliked(x,y){
    alert(x + " // " + y)

}