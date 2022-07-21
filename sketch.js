var k = 1;
var i = 1;
var life = 5;
var score = 0;

function preload(){
  playerImg = loadImage("boyRunning2.gif");
  bgImg = loadImage("bg5.jpg");
  coinImg = loadImage("coin.png");
  rockImg = loadImage("rock2.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
player =  createSprite(400, 300, 50, 50);
player.addImage(playerImg);
player.scale = 0.6

ground = createSprite((width*10)/2,height,width*10,10);

coinGroup = new Group();
rockGroup = new Group();

player.debug = false;
player.setCollider("rectangle",0,0,1,player.height-40)
}

function draw() {
  background("blue"); 
  camera.position.x = player.x;
  imageMode(CENTER) 
  image(bgImg,width/2,height/2,width*10,height)

  if(keyDown(RIGHT_ARROW)){
player.x = player.x + 10;
  }
   
 if(keyDown(UP_ARROW) && player.y>height/2){
   player.y = player.y - 10
 }
 
 if (keyDown(DOWN_ARROW) && player.y<height){
   player.y = player.y + 10
 }

 if(keyDown("space")){
   player.velocityY = -10;
 }
player.velocityY = player.velocityY + 0.8;
player.collide(ground);

if(player.isTouching(coinGroup)){
  coinGroup.destroyEach();
  score = score+5;
}

if(player.isTouching(rockGroup)){
  life = life-1;
}

spawnObastacles();
spawnCoins();
  drawSprites();
  textSize(20);
  fill("white")
text("Score: "+score,camera.position.x-600,50);
text("Life: "+life,camera.position.x-600,70);

}

function spawnCoins(){
if(frameCount % 100 === 0){
coinX = (width/2)*k
coinY = Math.round(random(100,height-300))
coin =createSprite(coinX,coinY,50,50)
coin.addImage(coinImg)
coin.scale = 0.5;
k = k+1
coinGroup.add(coin);
}
}

function spawnObastacles(){
  if(frameCount % 90 === 0){
rockX = (width/2)*i;
rockY = height-100;
rock = createSprite(rockX,rockY,20,50)
rock.addImage(rockImg)
rock.scale = 0.9;
i = i+1
rock.setCollider("rectangle",0,0,5,5)
rockGroup.add(rock)
rock.debug = true;

  }
}

