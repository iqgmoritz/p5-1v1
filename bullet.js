class Bullet {
  constructor(bulletX, bulletY, playerColor, playerOrigin, playerRotation) {
    this.x = bulletX;
    this.y = bulletY;
    this.color = playerColor;
    this.origin = playerOrigin;
    this.origRot = playerRotation;
  }

  draw() {
    fill(this.color);
    circle(this.x, this.y, 10);
  }

  move() {
    if (this.origRot % 360 > 0 && this.origRot < 90) {
      //print("fall1");

      this.x = this.x + sin(this.origRot % 90) * 2;
      this.y = this.y - cos(this.origRot % 90) * 2;
    } else {
      if (this.origRot % 360 > 90 && this.origRot < 180) {
        //print("fall2");

        this.x = this.x + cos(this.origRot % 90) * 2;
        this.y = this.y + sin(this.origRot % 90) * 2;
      } else {
        if (this.origRot % 360 > 180 && this.origRot < 270) {
          //print("fall3");

          this.x = this.x - sin(this.origRot % 90) * 2;
          this.y = this.y + cos(this.origRot % 90) * 2;
        } else {
          if (this.origRot % 360 > 270 && this.origRot < 360) {
            //print("fall4");

            this.x = this.x - cos(this.origRot % 90) * 2;
            this.y = this.y - sin(this.origRot % 90) * 2;
          } else {
            if (this.origRot === 0) {
              this.y -= 2;
            } else {
              if (this.origRot === 90) {
                this.x += 2;
              } else {
                if (this.origRot === 180) {
                  this.y += 2;
                } else {
                  if (this.origRot === 270) {
                    this.x -= 2;
                  } else {
                    if (this.origRot === 360) {
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

  collide(player1, player2) {
    if (this.origin === "player1") {
      if (
        this.x > player2.x - 10 &&
        this.x < player2.x + 10 &&
        this.y > player2.y - 10 &&
        this.y < player2.y + 10
      ) {
        print("collision with player2");
        return "player1";
      }
    }
    if (this.origin === "player2") {
      if (
        this.x > player1.x - 10 &&
        this.x < player1.x + 10 &&
        this.y > player1.y - 10 &&
        this.y < player1.y + 10
      ) {
        print("collision with player1");
        return "player2";
      }
    }
    return false;
  }

  isOutsideCanvas() {
    if (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    ) {
      return true;
    }
    return false;
  }

  bulletsCollide(otherBullet) {
    return (
      this.x > otherBullet.x - 5 &&
      this.x < otherBullet.x + 5 &&
      this.y > otherBullet.y - 5 &&
      this.y < otherBullet.y + 5
    );
  }

  wallCollide(wall) {
    return (
      this.x > wall.x &&
      this.x < wall.x + wall.width &&
      this.y > wall.y &&
      this.y < wall.y + wall.height
    );
  }
}
