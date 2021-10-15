class PowerUp{
    constructor(powerUpX, powerUpY){
        this.x = powerUpX;
        this.y = powerUpY;
    }

    draw(){
        fill('aqua');
        circle(this.x, this.y, 30);
    }

    collectCheck(player){
        if(player.x > this.x - 15 && player.x < this.x + 15 && player.y > this.y - 15 && player.y < this.y + 15){
            player.shield = true;
            return true;
        }
    }
}