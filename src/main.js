import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import {Fighter} from "./fighter";

// let char1xPos
let charMovement = [0,0,0,0,0,0,0,0];
// let fightersDisplay = [];
let player1;
let player2;

let fighters = [];

var fighter1 = new Fighter(400, 300, 4);
fighters.push(fighter1);
var fighter2 = new Fighter(800, 300, 4);
fighters.push(fighter2);

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
  player1 = document.querySelector(".char1");
  player2 = document.querySelector(".char2");

  setInterval(logM, 30);

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

  console.log("running");
  if (charMovement[0] === 1) {
    fighters[0].movement(-1);
  }
  if (charMovement[1] === 1) {
    fighters[0].movement(1);
  }
  if (charMovement[2] === 1) {
    fighters[0].attack();

  }
  if (charMovement[3] === 1) {
    //
  }
  if (charMovement[4] === 1) {
    fighters[1].movement(-1);
  }
  if (charMovement[5] === 1) {
    fighters[1].movement(1);
  }
  if (charMovement[6] === 1) {
    fighters[1].attack();
  }
  if (charMovement[7] === 1) {
    //
  }
  displayFighters(fighters);
}

function displayFighters(){
  //fighters.forEach(function(fighter){
  // debugger;
    player1.style.left = fighters[0].posX + "px";
    player1.style.top = fighters[0].posY + "px";
    player2.style.left = fighters[1].posX + "px";
    player2.style.top = fighters[1].posY + "px";
  //});
  if (fighters[0].state === 1) {
    $('.char1').addClass("attack");
  }

  if (fighters[0].state === 0) {
    $('.char1').removeClass("attack");
  }
  if (fighters[1].state === 1) {
    $('.char2').addClass("attack");
  }

  if (fighters[1].state === 0) {
    $('.char2').removeClass("attack");
  }
  console.log(fighters[0].state);

}

//display fighters
