
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage ; 
var FoodGroup, obstacleGroup ; 
var survivalTime , BananaCollected , invisibleBananaCollected;
var Ground,background, b_image , gameover , g_image;

var PLAY = 1;
var END = 0;
var game = PLAY;

var size = 0.1 ;


function preload(){
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png",
"sprite_3.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

bananaImage = loadImage("banana.png");
obstaceImage = loadImage("obstacle.png");
ground_image = loadImage("jungle.png");
g_image = loadImage("gameover.png");
b_image = loadImage("jungle.png");
 
}
function setup() {
  createCanvas(400,400);


  monkey  = createSprite(30,350);
  monkey.addAnimation("running" , monkey_running);
  monkey.scale = 0.05;
  // monkey.debug = true;
  

  background = createSprite(200,200);
  banana = createSprite(0,0,1,1);
  obstacle = createSprite(0,0,1,1);
  Ground = createSprite(200,380,400,5);
  gameover = createSprite(200,200);
  
  
  
  survivalTime = 0;
  BananaCollected = 0; 

  FoodGroup = new Group();
  obstacleGroup = new Group();
}
function draw() {
  // background("lightgreen");
  background.addImage(b_image);
  background.scale = 2.5;

  
  move();
  if(game == PLAY){
  gameover.visible = false;
  monkey.visible = true;
  monkey.changeAnimation("running" , monkey_running);
  monkey.scale = size;
  grow();
  touch();
  jump();
  Obstacles();
  food();
  drawSprites();

  if(frameCount % 10 == 0){
    survivalTime++;
  }  
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.remove(obstacle);
    obstacle.lifetime = 0;
    game = END;
    
  }
    

}
  fill("lightgreen");
  stroke(0);
  textSize(20);
  text("Survival Time = "+ survivalTime , 145,50);
  
  fill("yellow");
  stroke(0);
  textSize(20);
  text("Bananas Collected = "+ BananaCollected , 125,75);
  if(game === END){

    Ground.visible = true;
    monkey.collide(Ground);

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameover.visible = true ; 
    gameover.addImage(g_image);
    gameover.scale = 2;

    monkey.visible = false;

    drawSprites();
    textSize(25);
    fill("red");
    stroke(0);
    text("PRESS 'R' to restart !!" , 100 , 300);
    if(keyDown("r")){
      reset();
    }
  
  }
  
}
function food(){
  var x = Math.round(random(200,350));
  var y = 175;
  if(frameCount % 100 == 0){
  banana = createSprite(x,y);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifetime = 200;
  // banana.debug = true;
  FoodGroup.add(banana);
  }
   
}
function Obstacles(){
  var x = Math.round(random(200,350));
  var y = 385;
  if(frameCount % 300 == 0){
    obstacle = createSprite(x,y);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -2;
    obstacle.lifetime = 200;
  }
  obstacleGroup.add(obstacle);
}
function jump(){
  if(keyDown("space") && monkey.y >= 120){
    monkey.velocityY = -10;
  }
  monkey.velocityY += 0.5;
  Ground.visible = true;
  monkey.collide(Ground);

  banana.depth = monkey.depth;
  monkey.depth += 1;
}
function touch(){
  if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.remove(banana);
    banana.lifetime = 0;
    // FoodGroup.setLifetimeEach(0);
    BananaCollected += 1;
    invisibleBananaCollected = BananaCollected;
  }
}
function reset(){
  game = PLAY;
  size = 0.1 ; 
  monkey.visible = true
  survivalTime = 0;
  BananaCollected=0;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
}
function grow(){
  if(invisibleBananaCollected % 7 == 0 && BananaCollected > 0){
    invisibleBananaCollected += 1 ;
    size = size + 0.01;
  }
}
function move(){
  background.velocityX = -2;
  if(background.x < 50){
    background.x = background.width/2;
    Ground.x = Ground.width/2;
  }
}