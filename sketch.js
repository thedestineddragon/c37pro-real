var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex ;
var ground ;
var invisibleGround;
var ObstaclesGroup ;
var CloudsGroup,restart,gameover;
var count = 0;
var treximage,cactusimage,gameImage,restartImage,bgImage;
function preload(){
  treximage = loadImage("trexi.png")
  cactusimage = loadImage("cac.png")
  gameImage = loadImage("gameover1.png")
  restartImage = loadImage("restart1.png")
  bgImage = loadImage("bg.jpg")
}
function setup() {
  createCanvas(800,800);
  trex = createSprite(200,615,20,50);
  trex.addImage("trex",treximage);
  treximage.resize(50,50)
  camera.position.x = 100
  camera.position.y = trex.y;
  ground = createSprite(400,650,400,20);
  ground.x = ground.width /2;
  invisibleGround = createSprite(200,650,400,5);
  invisibleGround.visible = false;
  ObstaclesGroup = createGroup();
  CloudsGroup = createGroup();
  restart = createSprite(150,500,10,10);
  restart.addImage("res",restartImage);
  gameover = createSprite(150,550,10,10);
  gameover.addImage("game",gameImage)
  restart.visible=false;
  gameover.visible=false;
}

function draw() {
  background(bgImage);
  text("Score: "+ count, 250, 500);
  if(gameState === PLAY){
    gameImage.resize(5,5);
    restartImage.resize(5,5);
    ground.velocityX = -6;
    
    count = Math.round(World.frameCount/4);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space") && trex.y >= 359){
      trex.velocityY = -12 ;
    }
  
   
    trex.velocityY = trex.velocityY + 0.8;
    
    
    spawnClouds();
  
    
    spawnObstacles();
    
   
    if(ObstaclesGroup.isTouching(trex)){
      gameImage.resize(50,50);
      restartImage.resize(50,50);
      gameState = END;
    }
  }
  
  else if(gameState === END) {
gameover.visible = true;
restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
  
  }
  if(mousePressedOver(restart)) {
    reset();
    gameState === PLAY;
  }
  trex.collide(invisibleGround);
  
  drawSprites();
}
  function reset(){
    gameState = PLAY;
    gameover.visible=false;
    restart.visible=false
    ObstaclesGroup.destroyEach();
    count=0;
    CloudsGroup.destroyEach();
   }

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,620,10,40);
    obstacle.addImage("ob",cactusimage);
    cactusimage.resize(50,50)
    obstacle.velocityX = -6;
    obstacle.lifetime = 70;
    ObstaclesGroup.add(obstacle);
  }
  
}

function spawnClouds() {
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,620,40,10);
    cloud.velocityX = -3;
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    CloudsGroup.add(cloud);
  }
  
}