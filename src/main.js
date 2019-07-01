import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Fighter} from "fighter";

let char1xPos;
let char1;
let charMovement = [0,0,0,0,0,0];
let fightersDisplay = [];
let fighters = [];

fighter1 = new Fighter(400, 300, 3);
fighters.push(fighter1);

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
  char1 = document.querySelector(".char1");
  fightersDisplay.push(char1);

  let a = setInterval(logM, 15);

  keypressing(37, 0); //left button
  keypressing(39, 1); //right button
  keypressing(38, 2); //up
  keypressing(40, 3); //down
});

function logM(){
  if (charMovement[0] === 1) {
    fighters[0].movement(-1);
  }
  if (charMovement[1] === 1) {
    fighters[0].movement(1);
  }
  if (charMovement[2] === 1) {
    fighters[0].attack();
    // $('.char1').addClass("attack");
    // setTimeout(function(){
    //   $('.char1').removeClass("attack");
    // }, 200);
  }
  if (charMovement[3] === 1) {
    console.log("down");
  }
}

function dispayFighters(fighters){
  fighters.forEach()
  char1.style.left = fighter.posX;
}

//display fighters
