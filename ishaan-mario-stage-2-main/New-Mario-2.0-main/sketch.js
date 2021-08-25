var mario,platformGroup,obstacleGroup;
var marioAnimation,obstacleAnimation,groundAnimation,wallAnimation
var flag; 
var LOSE = 0;
var PLAY = 1;
var WIN = 2;
var gameState = PLAY;
function preload()
{
 marioAnimation = loadAnimation("images/Capture1.png","images/Cature3.png","images/Capture4.png");
 obstacleAnimation = loadAnimation("images/obstacle1.png");
 wallAnimation = loadAnimation("images/wall.png");
 groundAnimation = loadAnimation("images/ground.png");
 flagAnimation = loadAnimation("images/Flag.png");
}

function setup() {
  createCanvas(displayWidth, 668);

  var countDistanceX = 0;
  var platform;
  var gap;
  console.log(countDistanceX);
  //creating a mario player
  mario = new Player();

  //creating a group
  platformGroup = createGroup();

  for (var i=0;i<26;i++)
	 {
      frameRate(30)
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);
      gap=random([0,0,0,0,200]);
      countDistanceX = countDistanceX + platform.this.spt.width + gap; 
      console.log(countDistanceX);
      //adding wall to the game
      if(i%3 === 0){
        wall = new Wall(countDistanceX);
        platformGroup.add(wall.spt);
      }

      //adding obstacle to the game
      if(i%4 == 0){
        obstacle = new Obstacle(countDistanceX);
        obstacleGroup.add(obstacle.spt)
      }
     }
 flag = createSprite(countDistanceX-150,height-320);
 flag.addAnimation("flagImg",flagAnimation);
 flag.scale = 0.09;
 flag.setCollider("rectangle",0.0,1100,6520)
}

function draw() {
  background('skyblue');
  //code to move the camera
  translate(-mario.spt.x+width/2,0);
  if(gameState == PLAY){
    if(obstacleGroup.isTouching(mario.spt)||mario.spt.y>height){
      gameState = LOSE;
    }
  }
  //apply gravity to mario set colliding to platform
  mario.applyGravity();
  mario.spt.collide(platformGroup);

  //calling various function for control mario
  if(keyDown ("left")){
    mario.moveLeft();

  }
  if(keyDown("right")){
    mario.moveRight();
  }
  if(keyDown("up")&& mario.spt.velocityY === 0){
    mario.jump();
  }
  drawSprites();
}



