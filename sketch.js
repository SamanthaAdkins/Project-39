var backgroundImg, score;
var squirrel,acorn;

function preload(){
  backgroundImg = loadImage("forest.jpeg");
  squirrelImg = loadImage("squirrel.png");
  acornImg = loadImage("acorn.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight);

  squirrel = createSprite(50,displayHeight/2,50,50);
    squirrel.shapeColor = "red";
    squirrel.addImage(squirrelImg);
    squirrel.scale = 0.2;

  acornGroup = new Group();

  score = 0;
  gameState = "start"
}

function draw(){
  background(backgroundImg);

  camera.position.y = displayWidth/2;
  camera.position.x = squirrel.x;

  if(gameState === "start"){
    textSize(50);
    fill("black")
    text("Press Space To Play,", squirrel.x-400, displayHeight/2);
    text("Then Use Arrow Keys To Collect 10 Acorns", squirrel.x-500, displayHeight/1.8);

    squirrel.visible = false;

    if(keyDown("space")){
      gameState = "play";
    }
  }

  if(gameState === "play"){
    textSize(50);
    fill("black")
    text("Score: " + score, squirrel.x-400, displayHeight/2.5);

    squirrel.visible = true;

    if(keyDown(UP_ARROW)){
      squirrel.y -= 5;
    }
    if(keyDown(DOWN_ARROW)){
      squirrel.y += 5;
    }
    if(keyDown(RIGHT_ARROW)){
      squirrel.x += 5;
    }
    if(keyDown(LEFT_ARROW)){
      squirrel.x -= 5;
    }

    if(squirrel.isTouching(acornGroup)){
      acornGroup.destroyEach();
      score += 1;
    }

    //score = score + Math.round(getFrameRate()/30);

    spawnAcorns();

    if(score === 10){
      gameState = "end";
      acornGroup.destroyEach();
    }
  }

  if(gameState === "end"){
    squirrel.visible = false;

    textSize(50);
    fill("black")
    text("You Win!", squirrel.x-400, displayHeight/2);
    text("Press 'R' To Restart", squirrel.x-400, displayHeight/1.8);

    if(keyDown("r")){
      reset();
    }
  }
  drawSprites();
}

function reset(){
  gameState = "play";
  score = 0;
}

function spawnAcorns(){
  if(World.frameCount % 30 === 0){
    var acorn = createSprite(squirrel.x+displayWidth,Math.round(random(displayHeight-displayHeight,displayHeight-50)),40,40);
    acorn.addImage(acornImg);
    acorn.scale = 0.2;

    acornGroup.add(acorn);
  }
}