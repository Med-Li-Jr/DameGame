class Pion {
    
    constructor(y, x, type, isDame= false){
        this.y = Number.parseInt(y);
        this.x = Number.parseInt(x);
        this.type = Number.parseInt(type);
        this.isDame = isDame;
    }

    setDame(){
        this.isDame = true;
    }

    static createNewPion(pion){
        return new Pion(pion.y,pion.x,pion.type,pion.isDame)
    }
}