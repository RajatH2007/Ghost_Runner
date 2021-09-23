var gameState= "play";
var tower, towerImg;
var door, doorImg;
var climber,climberImg;
var doorGrp,climberGrp;
var ghost, ghostImg;
var invisBlock, invisBlockGrp;
var spooky, spookyS;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg= loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookyS=loadSound("spooky.wav");
  doorGrp=new Group();
  climberGrp= new Group();
  invisBlockGrp= new Group();
}

function setup(){
  createCanvas(550,600);
  spookyS.loop();
  
  tower= createSprite(200,0,400,600);
  tower.addImage(towerImg);
  //tower.scale=1.5;
  
  ghost= createSprite(200,300,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  
  
}

function draw(){
  
  if (gameState=="play"){
    tower.velocityY=4;
    if(tower.y>600){
      tower.y=0;
    }
    
    if (keyDown("space")){
      ghost.velocityY =-6; 
    }
    ghost.velocityY=ghost.velocityY+0.5;
    
    if (keyDown("left")){
      ghost.x=ghost.x-3;
    }

     if (keyDown("right")){
      ghost.x=ghost.x+3;
    }
    
    if (climberGrp.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
    if (invisBlockGrp.isTouching(ghost)||ghost.y>600){
      gameState="end";
    }
    
    doorRand();
    drawSprites();
  }
  
  if (gameState=="end"){
    background("black");
    textSize(25);
    fill("yellow");
    text("Game Over",200,300);
   }
  }

function doorRand(){
  if (frameCount%180==0){
    door=createSprite(Math.round(random(50,400)),-30,10,40);
    door.addImage(doorImg);
    door.scale=0.8;
    door.velocityY=2;
    door.lifetime=750;
    doorGrp.add(door);
    door.depth=ghost.depth-1;
    
    
    climber= createSprite(door.x,0,60,10);
    climber.addImage(climberImg);
    climber.velocityY=2;
    climber.scale=0.6
    climber.lifetime=750;
    climberGrp.add(climber);
    
    invisBlock=createSprite(door.x,10,60,10);
    invisBlock.visible=false;
    invisBlock.velocityY=2;
    invisBlock.lifetime=750;
    invisBlockGrp.add(invisBlock);
    invisBlock.setCollider("rectangle",0,0,60,10);
    
  }
}
