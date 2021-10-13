class Wall{
  constructor(wallX, wallY, wallWidth, wallHeight){
    this.x = wallX;
    this.y = wallY;
    this.width = wallWidth;
    this.height = wallHeight;
  }
  
  draw(){
    fill('darkgrey');
    rect(this.x, this.y, this.width, this.height);
  }
  
  playerCollide(player){
    
    if (player.x + 10> this.x && player.x + 10< this.x + this.width/2 && player.y > this.y && player.y < this.y + this.height){
      return("r");
    }
    
    if (player.x < this.x + this.width + 10 && player.x > this.x + this.width/2 && player.y > this.y && player.y < this.y + this.height) {
      return("l");
    }
    
    if (player.y > this.y - 10 && player.y < this.y + this.height/2 && player.x > this.x && player.x < this.x + this.width){
      return("b")
    }
    
    if (player.y < this.y + this.height + 10 && player.y > this.y + this.height/2 && player.x > this.x && player.x < this.x + this.width){
      return("t");
    }  
      
      return (player.x > this.x && player.x < this.x + this.width && player.y > this.y && player.y < this.y + this.height)
  }
}