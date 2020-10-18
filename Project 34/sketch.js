//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  dogImage2 = loadImage("dogImg1.png");

  
}

function setup() {
  database = firebase.database();

  createCanvas(1000, 500);

  
  dog = createSprite(250, 350, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogImage2);
  }

  if(keyWentUp(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogImage);
  }

  
  

  if(foodS === 0){
    foodS = 20;
  }

  drawSprites();

  //add styles here
  strokeWeight(3);
  stroke("black");
  textSize(30);
  textFont("Gabriola Regular");
  fill("white");
  text("Food Remaining : " + foodS, 150,150);
  text("Note : ", 550, 50);
  text(" Press UP_ARROW key to feed Drago milk", 550, 100);
  

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  }
  else
  {
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}


