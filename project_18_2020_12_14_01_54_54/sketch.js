var backgroundImage;

var bananaImage;
var stoneImage;

var monkey, monkey_stomping;


var invisibleGround;

var score;

var num;
var gameState;


var gameOver, gameOverImage;
var restart, restartImage;

var breakSound, eatSound;

var lives;

function preload () {
  
  backgroundImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  
  
  monkey_stomping = 
loadImage ("Monkey_01.png", "Monkey_02.png",  "Monkey_03.png")
loadImage ("Monkey_04.png", "Monkey_05.png", "Monkey_06.png")
loadImage("Monkey_07.png", "Monkey_08.png", "Monkey_09.png");
loadImage("Monkey_10.png")  
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  
  breakSound = loadSound("break.mp3");
  eatSound = loadSound("crunch.mp3");
  
}

function setup() {
  
  createCanvas(600, 300);
  
  gameState = "play";
  
  
  score = 0;
  num = 0;
  lives = 2;
  
  
  
  bg = createSprite(200, 0, 0, 0);
  bg.addAnimation("backg", backgroundImage);
  
  
  
  monkey = createSprite(90, 250, 0, 0);
  monkey.addAnimation("stomping", monkey_stomping);
  monkey.scale = 0.12;
  
  
  
  invisibleGround = createSprite(300, 290, 600, 35);
  invisibleGround.visible = false;
  
  
  gameOver = createSprite(300, 40, 0, 0)
  gameOver.addImage("ended", gameOverImage);
  gameOver.scale = 0.8
  
  
  
 restart = createSprite(310, 85, 0, 0);
 restart.addImage("restart", restartImage);
 restart.scale = 0.5;

  
  BananasGroup = new Group();
  StonesGroup = new Group();
  
  
}

function draw() {
  
 background(220); 
  
  //console.log(Math.round(monkey.y));
  
  
  
  
  if(gameState === "play") {
   gameOver.visible = false;
   restart.visible = false; 
    
  spawnRocks();
  spawnBananas();
    
    
  }
  
 if(keyDown("space") && gameState === "play") {
   
  monkey.velocityY = -14
    
  }
  
  
  
  
  monkey.velocityY += 0.8;
  
  
  
  
  //console.log(monkey.scale);
  
  if(BananasGroup.isTouching(monkey)) {
    
    eatSound.play();
    
     BananasGroup.destroyEach();
     score += 2;
    
     
     }
  
  switch(score) {
   
    case 4: monkey.scale = 0.2;
      
      break;
         
         
         
         }
    
    
  if(StonesGroup.isTouching(monkey)) {
    
    breakSound.play();
    
     num += 1;
    lives -= 1;
    
     score -= 1;
    
    StonesGroup.destroyEach();
    BananasGroup.destroyEach();
    
     
     }
  
  
  
  if(num === 2) {
   
    gameState = "end";
    
  }

  monkey.collide(invisibleGround);

  
  if (gameState === "end") {
    
    gameOver.visible = true;
    restart.visible = true; 
    
    num = 0; 
    
    score = 0;
    
    monkey.visible = false;
    
  }
  
  
  if(mousePressedOver(restart) && gameState === "end") {
    
    reset();
    
  }
  
  
  
  drawSprites();
  
  if(gameState === "play") {
  
  textSize(23);
  textStyle(BOLD);
  fill(0);
  
  
  text("Score: " + score, 10, 20)
  
  text("Lives: " + lives, 510, 20);
  
  }
  
}


function spawnBananas() {
  
  if(frameCount % 80 === 0) {
    
    var banana = createSprite(510, 150, 0, 0);
    banana.addImage(bananaImage);
    banana.velocityX = -7;
    banana.scale = 0.07;
    banana.lifetime = 75;
     
    BananasGroup.add(banana) 
    
  }
  
 }


function spawnRocks() {
  
  if(frameCount % 80 === 0) {
    
    var stone = createSprite(510, 240, 0, 0);
    stone.addImage(stoneImage);
    stone.velocityX = -7;
    stone.scale = 0.26;
    stone.lifetime = 75;
    //stone.debug = true;
    
    
    stone.setCollider("circle", 0, 10, 127);
    
    
    StonesGroup.add(stone)
    
}
  
 }

function reset() {
  
  lives = 2;
  
  monkey.scale = 0.12;
  
  gameOver.visible = false;
  restart.visible = false;
  
  monkey.visible = true;
  
  gameState = "play";
  
  
  
  }





