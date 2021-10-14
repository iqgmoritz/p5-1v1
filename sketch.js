let player1;
let player2;
let newBullet;
let bullets = [];
let newWall;
let walls = [];
let powerup;
let r;
let r2;
let gameOver = false;
let map = "?";
let theCross;
let theCrossImg;
let middleBlock;
let middleBlockImg;
let square;
let squareImg;

function preload() {
  theCrossImg = loadImage('thecross.png');
  middleBlockImg = loadImage('middleblock.png');
  squareImg = loadImage('square.png');
}
function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  theCross = createButton("The Cross");
  theCross.position(50, 150);
  middleBlock = createButton("Middle Block");
  middleBlock.position(155, 150);
  square = createButton("Square");
  square.position(280, 150);
}

function draw() {
  //mapauswahl:
  if (map === "?") {
    background('grey');
    fill('black');
    text("Karte auswählen", 150, 100);
    theCross.show();
    theCross.mousePressed(mapTheCross);
    image(theCrossImg, 40, 175, 100, 100);
    middleBlock.show();
    middleBlock.mousePressed(mapMiddleBlock);
    image(middleBlockImg, 150, 175, 100, 100);
    square.show();
    square.mousePressed(mapSquare);
    image(squareImg, 260, 175, 100, 100);
    return;
  }
  //game over:
  if (gameOver != false) {
    if (gameOver === "1") {
      background("red");
      fill('black');
      textSize(30);
      text("Rot hat gewonnen", 120, 200);
    } else if (gameOver === "2") {
      background("blue");
      fill('black');
      textSize(30);
      text("Blau hat gewonnen", 120, 200);

    }
    return;
  }

  background(220);
  player1.isOutsideCanvas();
  player2.isOutsideCanvas();
  powerup.collectCheck(player1);
  if (powerup.collectCheck(player1)) {
    powerup.x = -100;
    powerup.y = -100;
  }
  if (powerup.collectCheck(player2)) {
    powerup.x = -100;
    powerup.y = -100;
  }
  powerup.collectCheck(player2);


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
  powerup.draw();


  //bullet-bullet collision:
  for (let i = 0; i < bullets.length; i++) {
    for (let n = bullets.length - 1; n > i; n--) {
      if (n != i) {
        //print("n:", n , "i: ", i)
        if (bullets[i].origin != bullets[n].origin) {
          bullets[i].bulletsCollide(bullets[n]);
          if (bullets[i].bulletsCollide(bullets[n])) {
            bullets.splice(i, 1);
            bullets.splice(n > i ? n - 1 : n, 1);
            return;
          }
        }
      }
    }
  }

  //bullet-player collision:
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
    bullets[i].move();

    if (bullets[i].collide(player1, player2) === "player1" && player2.shield === false) {
      gameOver = "1";
      bullets.splice(i, 1);
    } else if (bullets[i].collide(player1, player2) === "player1" && player2.shield === true) {
      player2.shield = false;
      bullets.splice(i, 1);
    } else if (bullets[i].collide(player1, player2) === "player2" && player1.shield === false) {
      gameOver = "2";
      bullets.splice(i, 1);
    } else if (bullets[i].collide(player1, player2) === "player2" && player1.shield === true) {
      player1.shield = false;
      bullets.splice(i, 1);
    }
  }


  for (let i = 0; i < bullets.length; i++) {
    //bullet out of bounds:
    if (bullets[i].isOutsideCanvas()) {
      bullets.splice(i, 1);
    }
  }

  //powerup spawning
  //mapTheCross:
  r = int(random(1, 1000));
  if (powerup.x === -100) {
    if (r === 1) {
      r2 = int(random(1, 5));
      if (map === "TheCross") {
        powerup = new PowerUp(250, 250);
      }
      if (map === "MiddleBlock") {
        if (r2 === 1) {
          powerup = new PowerUp(250, 50);
        } else if (r2 === 2) {
          powerup = new PowerUp(250, 450);
        } else if (r2 === 3) {
          powerup = new PowerUp(50, 250);
        } else if (r2 === 4) {
          powerup = new PowerUp(450, 250);
        }
      }
      if (map === "Square") {
        if (r2 === 1) {
          powerup = new PowerUp(250, 380);
        } else if (r2 === 2) {
          powerup = new PowerUp(250, 120);
        } else if (r2 === 3) {
          powerup = new PowerUp(120, 250);
        } else if (r2 === 4) {
          powerup = new PowerUp(380, 250);
        }
      }
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
      if (bullets[i].wallCollide(walls[j])) {
        bullets.splice(i, 1);
        return
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
  if (keyCode === 13) {
    bullets = [];
    walls = [];
    gameOver = false;
    setup();
    draw();
    if (map === "TheCross") {
      mapTheCross();
    }
    if (map === "MiddleBlock") {
      mapMiddleBlock();
    }
    if (map === "Square") {
      mapSquare();
    }
  }
  if (keyCode === 27) {
    map = "?"
    setup();
    draw();
    bullets = [];
    walls = [];
    powerup.x = -100;
  }
}

function mapTheCross() {
  map = "TheCross";
  //print("thecross");
  theCross.hide();
  middleBlock.hide();
  square.hide();
  newWall = new Wall(50, 150, 120, 30);
  walls.push(newWall);
  newWall = new Wall(150, 60, 30, 120);
  walls.push(newWall);
  newWall = new Wall(330, 150, 120, 30);
  walls.push(newWall);
  newWall = new Wall(330, 60, 30, 120);
  walls.push(newWall);
  newWall = new Wall(50, 300, 120, 30);
  walls.push(newWall);
  newWall = new Wall(150, 300, 30, 120);
  walls.push(newWall);
  newWall = new Wall(330, 300, 120, 30);
  walls.push(newWall);
  newWall = new Wall(330, 300, 30, 120);
  walls.push(newWall);

  player1 = new Player(100, 100, "red", 135);
  player2 = new Player(400, 370, "blue", 315);
  powerup = new PowerUp(250, 250);
}

function mapMiddleBlock() {
  map = "MiddleBlock";
  //print("middleblock");
  theCross.hide();
  middleBlock.hide();
  square.hide();
  newWall = new Wall(150, 150, 200, 200)
  walls.push(newWall);
  newWall = new Wall(225, 75, 50, 350);
  walls.push(newWall);
  newWall = new Wall(75, 225, 350, 50);
  walls.push(newWall);
  newWall = new Wall(0, 0, 100, 100);
  walls.push(newWall);
  newWall = new Wall(400, 400, 100, 100);
  walls.push(newWall);
  newWall = new Wall(0, 400, 100, 100);
  walls.push(newWall);
  newWall = new Wall(400, 0, 100, 100);
  walls.push(newWall);

  player1 = new Player(50, 250, "red", 90);
  player2 = new Player(450, 250, "blue", 270);
  powerup = new PowerUp(250, 50);
}

function mapSquare() {
  map = "Square"
  //print("square");
  theCross.hide();
  middleBlock.hide();
  square.hide();
  newWall = new Wall(100, 100, 40, 100);
  walls.push(newWall);
  newWall = new Wall(100, 100, 100, 40);
  walls.push(newWall);
  newWall = new Wall(100, 300, 40, 100);
  walls.push(newWall);
  newWall = new Wall(100, 360, 100, 40);
  walls.push(newWall);
  newWall = new Wall(360, 300, 40, 100);
  walls.push(newWall);
  newWall = new Wall(300, 360, 100, 40);
  walls.push(newWall);
  newWall = new Wall(360, 100, 40, 100);
  walls.push(newWall);
  newWall = new Wall(300, 100, 100, 40);
  walls.push(newWall);
  newWall = new Wall(200, 200, 100, 100);
  walls.push(newWall);
  player1 = new Player(50, 250, "red", 90);
  player2 = new Player(450, 250, "blue", 270);
  powerup = new PowerUp(250, 380);
}