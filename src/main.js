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
for(let i = 0; i < 8; i++){
  dropValues.push(i * 150 + 47);
}
// let cabsDisplay = [];
let player1;
let player2;

let cabs = [];

var cab1 = new Cab(400, 500, 4, 200);
cabs.push(cab1);
var cab2 = new Cab(800, 500, 4, 100);
cabs.push(cab2);




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

  setInterval(logM, 30);
  setInterval(spawnWalker, 2000);

  keypressing(65, 0); //left p1
  keypressing(68, 1); //right p1
  keypressing(87, 2); //up p1
  keypressing(83, 3); //down p1
  keypressing(37, 4); //left p2
  keypressing(39, 5); //right p2
  keypressing(38, 6); //up p2
  keypressing(40, 7); //down p2
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
    cabs[0].attack();

  }
  if (charMovement[3] === 1) {
    //
  }
  if (charMovement[4] === 1) {
    cabs[1].movement(-1);
  }
  if (charMovement[5] === 1) {
    cabs[1].movement(1);
  }
  if (charMovement[6] === 1) {
    //
  }
  if (charMovement[7] === 1) {
    //
  }
  displayCabs(cabs);
  displayWalkers();
  cab1.state = checkState(cab1.posX, cab2.posX, cab1);
  for(let i = currentWalkers.length - 1; i >= 0; i--){
    // debugger;
    currentWalkers[i].move();
    //if the walker is past y pos, then remove from array, increase score
    if (currentWalkers[i].posY > 700) {
      if (currentWalkers[i].target != -1){
        let a = currentWalkers[i].target;
        let b = currentWalkers[i].posX;
        if (Math.abs((currentWalkers[i].target * 150 + 47) - currentWalkers[i].posX) < 75){
          console.log("reached target destination");
          $(".bottombar").removeClass("yellow");
        } else {
          console.log("reached WRONG destination");
          $(".bottombar").removeClass("yellow");
        }
      }
    }
    if (currentWalkers[i].posY > 850) {
      currentWalkers.splice(i, 1);
    }
    peopleHunting(currentWalkers[i], cab1, i);
  }
}

function peopleHunting(person, car, personId) {


  if (car.posX <= person.posX && car.posX + 200 >= person.posX - 25 && car.posY <= person.posY + 25 && car.posY + 100 >= person.posY && car.state === 2) {
    car.currentPersonTarget = Math.floor(Math.random() * 8);
    console.log(car.currentPersonTarget + " : THIS IS CURRENT TARGET");
    $("#c" + car.currentPersonTarget).addClass("yellow");
    car.state = 3;
    currentWalkers.splice(personId, 1);
  }
}

function checkState(cab1x, cab2x, car) {
  //to make cab
  if (cab1.state === 3) {
    if (cab1x >= cab2x || cab1x + 100 <= cab2x) {
      let newWalk = new Walker(cab2x + 37.5,600,3);
      newWalk.target = car.currentPersonTarget;
      console.log(newWalk.target + ": target transfered to person")
      car.currentPersonTarget = false;
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
  if (cabs[0].state === 1) {
    $('.char1').addClass("attack");
  }

  if (cabs[0].state === 0) {
    $('.char1').removeClass("attack");
  }
  if (cabs[1].state === 1) {
    $('.char2').addClass("attack");
  }

  if (cabs[1].state === 0) {
    $('.char2').removeClass("attack");
  }

}



function Walker( startingPosX, startingPosY, speed){
  this.posX = startingPosX;
  this.posY = startingPosY;
  this.speed = speed;
  this.target = -1;
}

Walker.prototype.move = function(){
  this.posY += this.speed;
}

function spawnWalker(){
  let r = Math.floor(Math.random() * 8);
  let newWalk = new Walker(dropValues[r],200,3);
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
