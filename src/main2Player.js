import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Cab} from "./cab";

// let char1xPos
let charMovement = [0,0,0,0,0,0,0,0];
let dropValues = [];
let walkerRefs = [];
let currentWalkers = [];
let maxWalkers = 20;
let p1Score = 0;
let p2Score = 0;
for(let i = 0; i < 8; i++){
  dropValues.push(i * 150 + 47);
}
// let cabsDisplay = [];
let player1;
let player2;
let player3;
let player4;

let cabs = [];

var cab1 = new Cab(400, 800, 4, 200);
cabs.push(cab1);
var cab2 = new Cab(800, 800, 4, 100);
cabs.push(cab2);
var cab3 = new Cab(730, 200, 4, 100);
cabs.push(cab3);
var cab4 = new Cab(400, 200, 4, 100);
cabs.push(cab4);



function keypressing(keyVal, arrayPos) {
  document.addEventListener('keydown', function(event){
    if(event.keyCode == keyVal){
      //console.log("LEFT ARROW");
      charMovement[arrayPos] = 1;

    }
  }, true);

  document.addEventListener('keyup', function(event){
    if(event.keyCode == keyVal){
      //console.log("LEFT ARROW UP");
      charMovement[arrayPos] = 0;
    }
  }, true);
}


$(function(){
  // debugger;
  let walkerOriginaQuery = document.querySelector(".walker");
  let walkersQuery = document.querySelector(".walkers");
  for(let i = 0; i < maxWalkers; i++){
    let walkerClone = walkerOriginaQuery.cloneNode(true);
    // walkerClone.style.top = i * 50 + "px";
    // walkerClone.style.left = i * 50 + "px";
    walkerRefs.push(walkerClone);
    walkersQuery.appendChild(walkerClone);
  }
  player1 = document.querySelector(".char1");
  player2 = document.querySelector(".char2");
  player3 = document.querySelector(".char3");
  player4 = document.querySelector(".char4");

  setInterval(logM, 30);
  setTimeout(function(){spawnWalker(1);}, 2000);
  setTimeout(function(){spawnWalker(-1);}, 3000);

  setInterval(function(){spawnWalker(1);}, 7000);
  setInterval(function(){spawnWalker(-1);}, 7000);

  keypressing(90, 0); //left p1 z
  keypressing(88, 1); //right p1 x
  keypressing(86, 2); //left p1 v
  keypressing(66, 3); //right p1 b
  keypressing(188, 4); //left p2 ,
  keypressing(190, 5); //right p2 .
  keypressing(37, 6); //left p2 left arrow
  keypressing(39, 7); //right p2 right arrow
});

function logM() {
  //console.log("running");
  if (charMovement[0] === 1) {
    cabs[0].movement(-1);
  }
  if (charMovement[1] === 1) {
    cabs[0].movement(1);
  }
  if (charMovement[2] === 1) {
    cabs[1].movement(-1);
  }
  if (charMovement[3] === 1) {
    cabs[1].movement(1);
  }
  if (charMovement[4] === 1) {
    cabs[2].movement(-1);
  }
  if (charMovement[5] === 1) {
    cabs[2].movement(1);
  }
  if (charMovement[6] === 1) {
    cabs[3].movement(-1);
  }
  if (charMovement[7] === 1) {
    cabs[3].movement(1);
  }
  displayCabs(cabs);
  displayWalkers();
  cab1.state = checkState(cab1.posX, cab2.posX, cab1);
  cab3.state = checkState(cab3.posX, cab4.posX, cab3);
  cab2.state = cab1.state;
  cab4.state = cab3.state;
  for(let i = currentWalkers.length - 1; i >= 0; i--){
    // debugger;
    currentWalkers[i].move();
    //if the walker is past y pos, then remove from array, increase score
    if (currentWalkers[i].posY > 700) {
      // if (currentWalkers[i].target != -1){
      //   let a = currentWalkers[i].target;
      //   let b = currentWalkers[i].posX;
      //   if (Math.abs((currentWalkers[i].target * 150 + 47) - currentWalkers[i].posX) < 75){
      //     console.log("reached target destination");
      //     $(".bottombar").removeClass("yellow");
      //   } else {
      //     console.log("reached WRONG destination");
      //     $(".bottombar").removeClass("yellow");
      //   }
      // }
    }
    if (currentWalkers[i].posY < 100) {
      currentWalkers.splice(i, 1);
      p1Score += 100;
      $(".score1").html("Player 1 score: " + p1Score);
    }
    if (currentWalkers[i].posY > 1050) {
      currentWalkers.splice(i, 1);
      p2Score += 100;
      $(".score2").html("Player 2 score: " + p2Score);
    }
    peopleHunting(currentWalkers[i], cab1, i);
    peopleHunting(currentWalkers[i], cab3, i);
  }
}

//recieving at opposite side of car
function peopleHunting(person, car, personId) {
  if (car.posX <= person.posX && car.posX + 200 >= person.posX - 25 && car.posY <= person.posY + 25 && car.posY + 100 >= person.posY && car.state === 2) {
    if (car.posY < 400 && person.speed < 0){
      car.state = 3;
      currentWalkers.splice(personId, 1);
    } else if(car.posY > 400 && person.speed > 0){
      car.state = 3;
      currentWalkers.splice(personId, 1);
    }

  }
}

function checkState(cab1x, cab2x, car) {
  //to make cab
  if (car.state === 3) {
    if (cab1x >= cab2x || cab1x + 100 <= cab2x) {
      let newWalk = new Walker(cab2x + 37.5,car.posY,3);
      //newWalk.target = car.currentPersonTarget;
      //GARBAGE CODE
      if (car.posY > 400){
        newWalk.reverseSpeed();
      }

      //console.log(newWalk.target + ": target transfered to person")
      //car.currentPersonTarget = false;
      currentWalkers.push(newWalk);
        return 0;
    }
    return 3;
  } else if (cab1x <= cab2x && cab1x + 100 >= cab2x) {
    if (cab1x + 20 <= cab2x && cab1x + 80 >= cab2x) {
      //take new passenger
      return 2;
    } else{
      //not broken but still carry
      return 1;
    }
  } else {
    //to break cab
    return 0;
  }
}

function displayCabs(){
  //cabs.forEach(function(cab){
  // debugger;
    player1.style.left = cabs[0].posX + "px";
    player1.style.top = cabs[0].posY + "px";
    player2.style.left = cabs[1].posX + "px";
    player2.style.top = cabs[1].posY + "px";
  //});
    player3.style.left = cabs[2].posX + "px";
    player3.style.top = cabs[2].posY + "px";
    player4.style.left = cabs[3].posX + "px";
    player4.style.top = cabs[3].posY + "px";
}



function Walker( startingPosX, startingPosY, speed){
  this.posX = startingPosX;
  this.posY = startingPosY;
  this.speed = speed;
  //this.target = -1;
}

Walker.prototype.move = function(){
  this.posY += this.speed;
}

Walker.prototype.reverseSpeed = function(){
  this.speed = -this.speed;
}

function spawnWalker(direction){
  let r = Math.floor(Math.random() * 8);
  let newWalk;
  if (direction < 0){
      newWalk  = new Walker(dropValues[r],200,2);
    } else {
      newWalk  = new Walker(dropValues[r],900,2);
      newWalk.reverseSpeed();
    }
  currentWalkers.push(newWalk);
  console.log("SPAWNED NEW WALKER, TOTAL WALKERS: " + currentWalkers.length);
}

//still need to add attribute back eventually
function displayWalkers(){
  for(let i = 0; i < maxWalkers; i++){
    walkerRefs[i].setAttribute("hidden", "hidden");
  }
  for(let i = 0; i < currentWalkers.length; i++){
    walkerRefs[i].removeAttribute('hidden');
    if (i < maxWalkers){
  //  console.log(currentWalkers[i].posY + "is y, and x is: " + currentWalkers[i].posX);
    walkerRefs[i].style.top = currentWalkers[i].posY + "px";
    walkerRefs[i].style.left = currentWalkers[i].posX + "px";
  }
  }
}
//

//display cabs
