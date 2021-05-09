var path,pathImg;

var mainRacer;
var mainRacerImg1,mainRacerImg2;

var player1,player2,player3;
var player1Img1,player2Img1,player3Img1;
var player1Img2,player2Img2,player3Img2;

var pinkCG,yellowCG,redCG;

var obstacle1,obstacle2,obstacle3;
var obstacleGrp;

var gameover,gameoverImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance = 0;

function preload(){
  
  pathImg = loadImage("Road.png");
  gameoverImg = loadImage("gameOver.png")
  
  //main racer images
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2 = loadAnimation("mainPlayer3.png");
  
  //opponent 1 images
  player1Img1 = loadAnimation("opponent1.png","opponent2.png");
  player1Img2 = loadAnimation("opponent3.png");
  
  //opponent 2 Images
  player2Img1 = loadAnimation("opponent4.png","opponent5.png");
  player2Img2 = loadAnimation("opponent6.png");
  
  //opponent 3 Images
  player3Img1 = loadAnimation("opponent7.png","opponent8.png");
  player3Img2 = loadAnimation("opponent9.png");
  
  //obstacles Images
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  
}

function setup(){
  
  createCanvas(750,300);

  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);

  //creating boy running
  mainRacer  = createSprite(70,150,20,20);
  mainRacer.addAnimation("SahilRunning",mainRacerImg1);
  mainRacer.scale = 0.06;
  
  //gameover
  gameover = createSprite(450,150)
  gameover.addImage(gameoverImg);
  gameover.scale = 0.8;
  
  mainRacer.debug = false;
  mainRacer.setCollider("circle",0,0,650);
  
  pinkCG = createGroup();
  yellowCG = createGroup();
  redCG = createGroup();
  obstacleGrp = createGroup();
  
}

function draw() {
  
  background(0);
  
  if(gameState === PLAY){

     camera.position.x = width/2
     mainRacer.y = World.mouseY;

     gameover.visible = false;

     edges= createEdgeSprites();
     mainRacer.collide(edges);

     //distance score
     distance = distance + Math.round(getFrameRate()/60);

    //code to reset the background
    path.velocityX = -(6 + 2*distance/150);
    if(path.x < 0 ){
     path.x = width/2;

   
    } 
     var select_oppoPlayer = Math.round(random(1,4));
      if(World.frameCount % 250 == 0){
        if(select_oppoPlayer == 1){
         pinkCyclists();
        }else if(select_oppoPlayer == 2){
         yellowCyclists();
        }else if(select_oppoPlayer == 3){
         redCyclists();
        }else{
         spawnObstacles();
        }
      }
    
      if(mainRacer.isTouching(pinkCG)){
         gameState = END;
         player1.velocityY = 0;
         player1.addAnimation("opponentPlayer1",player1Img2);
      }else if(mainRacer.isTouching(yellowCG)){
         gameState = END;
         player2.velocityY = 0;
         player2.addAnimation("opponentPlayer2",player2Img2);
      }else if(mainRacer.isTouching(redCG)){
         gameState = END;
         player3.velocityY = 0;
         player3.addAnimation("opponentPlayer3",player3Img2);
      }
    
      if(mainRacer.isTouching(obstacleGrp)){
       //  gameState = END;
       mainRacer.scale = 0.06
         
       }

       switch(distance){
         case 100:mainRacer.scale = 0.07;
         break;
         case 200:mainRacer.scale = 0.08;
         break;
         case 300:mainRacer.scale = 0.09;
         break;
       }


    
    }
    else if(gameState === END){
       
         gameover.visible = true;
         path.velocityX = 0;
         mainRacer.addAnimation("SahilRunning",mainRacerImg2);
         mainRacer.velocityX = 0;
         pinkCG.setVelocityXEach(0);
         pinkCG.setLifetimeEach(-1);
         yellowCG.setVelocityXEach(0);
         yellowCG.setLifetimeEach(-1);
         redCG.setVelocityXEach(0);
         redCG.setLifetimeEach(-1);
         obstacleGrp.setVelocityXEach(0);
         obstacleGrp.setLifetimeEach(-1);
      
         if(keyDown(UP_ARROW)){
           reset();
         }
     }
  
  drawSprites();
  
  //score text
  textSize(20);
  fill(255);
  text("Distance: "+ distance,600,30)
  
  //reset text
  if(gameState == END){
      textSize(15);
      text("Press 'Up Arrow Key' to Restart the game!",310,200);
     }
  
}
function pinkCyclists(){
  
  player1 = createSprite(1100,Math.round(random(50,250),10,10));
  player1.scale = 0.06;
  player1.velocityX = -(6 + 2*distance/150);
  player1.addAnimation("opponentPlayer1",player1Img1);
  player1.setLifetime = 170;
  player1.debug = false;
  player1.setCollider("circle",0,0,630);
  pinkCG.add(player1);
  
}
function yellowCyclists(){
  
  player2 = createSprite(1100,Math.round(random(50,250),10,10));
  player2.scale = 0.06;
  player2.velocityX = -(6 + 2*distance/150);
  player2.addAnimation("opponentPlayer2",player2Img1);
  player2.setLifetime = 170;
  player2.debug = false;
  player2.setCollider("circle",0,0,630);
  yellowCG.add(player2);
  
}
function redCyclists(){
  
  player3 = createSprite(1100,Math.round(random(50,250),10,10));
  player3.scale = 0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3",player3Img1);
  player3.setLifetime = 170;
  player3.debug = false;
  player3.setCollider("circle",0,0,630);
  redCG.add(player3);
  
}

function reset(){ 
  
  gameState = PLAY;
  mainRacer.addAnimation("SahilRunning",mainRacerImg1);
  gameover.visible = false;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  obstacleGrp.destroyEach();
  distance = 0;
  
}

function spawnObstacles(){
  
   var obstacle = createSprite(1100,Math.round(random(50,250),10,10));
   obstacle.velocityX = -(6 + 2*distance/150);
    
  //generating obstacles randomly
  var rand = Math.round(random(1,3));
  switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
     default: break;
    }
    
    obstacle.scale = 0.10;
    obstacleGrp.add(obstacle);
  
  obstacle.debug = false;
  obstacle.setCollider("circle",0,0,350);

}
