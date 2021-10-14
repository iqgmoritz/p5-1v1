class Player {
  constructor(playerX, playerY, playerColor) {
    this.x = playerX;
    this.y = playerY;
    this.color = playerColor;
    this.rotation = 0;
    this.shield = false;
  }

  draw() {
    if (this.shield === true){
      strokeWeight(1);
      fill('lightblue');
      circle(this.x, this.y, 30);
      strokeWeight(4);
    }
    fill(this.color);
    circle(this.x, this.y, 20);
    strokeWeight(4);

    //print("rotation: ", this.rotation);
    if (this.rotation > 360) {
      this.rotation -= 360;
    }
    if (this.rotation % 360 > 0 && this.rotation < 90) {
      //print("fall1");
      line(
        this.x,
        this.y,
        this.x + sin(this.rotation % 90) * 10,
        this.y - cos(this.rotation % 90) * 10
      );
    } else {
      if (this.rotation % 360 > 90 && this.rotation < 180) {
        //print("fall2");
        line(
          this.x,
          this.y,
          this.x + cos(this.rotation % 90) * 10,
          this.y + sin(this.rotation % 90) * 10
        );
      } else {
        if (this.rotation % 360 > 180 && this.rotation < 270) {
          //print("fall3");
          line(
            this.x,
            this.y,
            this.x - sin(this.rotation % 90) * 10,
            this.y + cos(this.rotation % 90) * 10
          );
        } else {
          if (this.rotation % 360 > 270 && this.rotation < 360) {
            //print("fall4");
            line(
              this.x,
              this.y,
              this.x - cos(this.rotation % 90) * 10,
              this.y - sin(this.rotation % 90) * 10
            );
          } else {
            if (this.rotation === 0) {
              line(this.x, this.y, this.x, this.y - 10);
            } else {
              if (this.rotation === 90) {
                line(this.x, this.y, this.x + 10, this.y);
              } else {
                if (this.rotation === 180) {
                  line(this.x, this.y, this.x, this.y + 10);
                } else {
                  if (this.rotation === 270) {
                    line(this.x, this.y, this.x - 10, this.y);
                  } else {
                    if (this.rotation === 360) {
                      line(this.x, this.y, this.x, this.y - 10);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  moveFw() {
    if (this.rotation % 360 > 0 && this.rotation < 90) {
      //print("fall1");

      this.x = this.x + sin(this.rotation % 90) * 2;
      this.y = this.y - cos(this.rotation % 90) * 2;
    } else {
      if (this.rotation % 360 > 90 && this.rotation < 180) {
        //print("fall2");

        this.x = this.x + cos(this.rotation % 90) * 2;
        this.y = this.y + sin(this.rotation % 90) * 2;
      } else {
        if (this.rotation % 360 > 180 && this.rotation < 270) {
          //print("fall3");

          this.x = this.x - sin(this.rotation % 90) * 2;
          this.y = this.y + cos(this.rotation % 90) * 2;
        } else {
          if (this.rotation % 360 > 270 && this.rotation < 360) {
            //print("fall4");

            this.x = this.x - cos(this.rotation % 90) * 2;
            this.y = this.y - sin(this.rotation % 90) * 2;
          } else {
            if (this.rotation === 0) {
              this.y -= 2;
            } else {
              if (this.rotation === 90) {
                this.x += 2;
              } else {
                if (this.rotation === 180) {
                  this.y += 2;
                } else {
                  if (this.rotation === 270) {
                    this.x -= 2;
                  } else {
                    if (this.rotation === 360) {
                      this.y -= 2;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  moveBw() {
    if (this.rotation % 360 > 0 && this.rotation < 90) {
      //print("fall1");

      this.x = this.x - sin(this.rotation % 90) * 2.5;
      this.y = this.y + cos(this.rotation % 90) * 2.5;
    } else {
      if (this.rotation % 360 > 90 && this.rotation < 180) {
        //print("fall2");

        this.x = this.x - cos(this.rotation % 90) * 2.5;
        this.y = this.y - sin(this.rotation % 90) * 2.5;
      } else {
        if (this.rotation % 360 > 180 && this.rotation < 270) {
          //print("fall3");

          this.x = this.x + sin(this.rotation % 90) * 2.5;
          this.y = this.y - cos(this.rotation % 90) * 2.5;
        } else {
          if (this.rotation % 360 > 270 && this.rotation < 360) {
            //print("fall4");

            this.x = this.x + cos(this.rotation % 90) * 2.5;
            this.y = this.y + sin(this.rotation % 90) * 2.5;
          } else {
            if (this.rotation === 0) {
              this.y += 2.5;
            } else {
              if (this.rotation === 90) {
                this.x += 2.5;
              } else {
                if (this.rotation === 180) {
                  this.y -= 2.5;
                } else {
                  if (this.rotation === 270) {
                    this.x -= 2.5;
                  } else {
                    if (this.rotation === 360) {
                      this.y -= 2.5;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  rotateR() {
    this.rotation += 3;
  }

  rotateL() {
    if (this.rotation > 0) {
      this.rotation -= 3;
    } else {
      if (this.rotation === 0) {
        this.rotation = 360;
      }
    }
  }
  
  isOutsideCanvas(){
    if (this.x < 10){
      this.x = 10;
    } 
    if (this.x > canvas.width/2 - 10){
      this.x = canvas.width/2 - 10;
    }
    if (this.y < 10){
      this.y = 10;
    }
    if (this.y > canvas.height/2 - 10){
      this.y = canvas.height/2 - 10;
    }
  }
  
  wallCollideR(x){
    this.x = x - 10;
  }
  
  wallCollideL(x){
    this.x = x + 10;
  }
  
  wallCollideB(y){
    this.y = y - 10;
  }
  
  wallCollideT(y){
    this.y = y + 10
  }
}
