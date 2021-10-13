let player1;
let player2;
let newBullet;
let bullets = [];
let newWall;
let walls = [];
let gameOver = false;

function setup() {
  createCanvas(500, 500);
  player1 = new Player(100, 100, "red");
  player2 = new Player(400, 370, "blue");
  newWall = new Wall(50, 150, 120, 30);
  walls.push(newWall);
  newWall = new Wall(150, 60, 30, 120);
  walls.push(newWall);
  newWall = new Wall(330, 150, 120, 30);
  walls.push(newWall);
  newWall = new Wall(330,60,30,120);
  walls.push(newWall);
  newWall = new Wall(50, 300, 120, 30);
  walls.push(newWall);
  newWall = new Wall(150, 300, 30, 120);
  walls.push(newWall);
  newWall = new Wall(330, 300, 120, 30);
  walls.push(newWall);
  newWall = new Wall(330,300,30,120);
  walls.push(newWall);

  angleMode(DEGREES);
}

function draw() {
  //game over:
  if (gameOver != false) {
    if (gameOver === "1") {
      background("red");
      fill('black');
      textSize(30);
      text("Rot hat gewonnen", 120, 200);
    } else {
      if (gameOver === "2") {
        background("blue");
        fill('black');        
        textSize(30);
        text("Blau hat gewonnen", 120, 200);
      }
    }
    return;
  }

  background(220);
  player1.isOutsideCanvas();
  player2.isOutsideCanvas();

  //player-wall collision:
  for (let i = 0; i < walls.length; i++) {
    walls[i].draw();
    if (walls[i].playerCollide(player1) === "r") {
      player1.wallCollideR(walls[i].x);
    }
    if (walls[i].playerCollide(player1) === "l") {
      player1.wallCollideL(walls[i].x + walls[i].width);
    }
    if (walls[i].playerCollide(player1) === "b") {
      player1.wallCollideB(walls[i].y);
    }
    if (walls[i].playerCollide(player1) === "t") {
      player1.wallCollideT(walls[i].y + walls[i].height);
    }

    if (walls[i].playerCollide(player2) === "r") {
      player2.wallCollideR(walls[i].x);
    }
    if (walls[i].playerCollide(player2) === "l") {
      player2.wallCollideL(walls[i].x + walls[i].width);
    }
    if (walls[i].playerCollide(player2) === "b") {
      player2.wallCollideB(walls[i].y);
    }
    if (walls[i].playerCollide(player2) === "t") {
      player2.wallCollideT(walls[i].y + walls[i].height);
    }
  }

  player1.draw();
  player2.draw();

  //bullet-bullet collision:
  for (let i = 0; i < bullets.length; i++) {
    for (let n = bullets.length - 1; n > i; n--) {
      if (n != i) {
        //print("n:", n , "i: ", i)
        if (bullets[i].origin != bullets[n].origin){
        bullets[i].bulletsCollide(bullets[n]);
        if (bullets[i].bulletsCollide(bullets[n])) {
          bullets.splice(i, 1);
          bullets.splice(n > i ? n - 1 : n, 1);
          return;
        }
      }}
    }
  }

  //bullet-player collision:
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
    bullets[i].move();

    if (bullets[i].collide(player1, player2) === "player1") {
      gameOver = "1";
      console.log("Spieler 1 gewinnt");
    } else {
      if (bullets[i].collide(player1, player2) === "player2") {
        gameOver = "2";
        console.log("Spieler 2 gewinnt");
      }
    }

    //bullet out of bounds:
    if (bullets[i].isOutsideCanvas()) {
      bullets.splice(i, 1);
    }
  }

  //movement
  if (keyIsDown(65)) {
    player1.rotateL();
    // print("rotateL");
  }
  if (keyIsDown(68)) {
    player1.rotateR();
    // print("rotateR");
  }
  if (keyIsDown(87)) {
    player1.moveFw();
  }
  if (keyIsDown(83)) {
    player1.moveBw();
  }
  if (keyIsDown(74)) {
    player2.rotateL();
  }
  if (keyIsDown(76)) {
    player2.rotateR();
  }
  if (keyIsDown(73)) {
    player2.moveFw();
  }
  if (keyIsDown(75)) {
    player2.moveBw();
  }

  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < walls.length; j++) {
      // print(bullets[i]);
      // print(bullets[i].wallCollide);
      // print(walls[j]);
      //if (bullets[i].wallCollide(walls[j])) {
      if (bullets[i].wallCollide(walls[j])){
        bullets.splice(i, 1);
        return;
      }
    }
  }
} //draw ende

//shooting:
function keyPressed() {
  // print(keyCode);
  if (keyCode === 16) {
    newBullet = new Bullet(
      player1.x,
      player1.y,
      "red",
      "player1",
      player1.rotation
    );
    bullets.push(newBullet);
    // print(bullets);
  }
  if (keyCode === 66) {
    newBullet = new Bullet(
      player2.x,
      player2.y,
      "blue",
      "player2",
      player2.rotation
    );
    bullets.push(newBullet);
  }
  if (keyCode === 13){
    bullets = [];
    walls = [];
    gameOver = false;
    setup();
    draw();
  }
}
