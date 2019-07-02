export class Cab{

  constructor(startingPosX, startingPosY, speed, playerWidth){
    this.posX = startingPosX;
    this.posY = startingPosY;
    this.width = playerWidth;
    this.state = 0;
    this.health = 100;
    this.direction = "left";
    this.speed = speed;
    this.attackDelay = 1000;
    this.attackTime = 0;
  }

// attack(){
//   if (this.state === 1) {
//     //already attacking
//   } else if (Date.now() - this.attackTime > this.attackDelay) {
//     this.attackTime = Date.now();
//     this.state = 1;
//     setTimeout(() => {
//       this.state = 0;
//     }, 200);
//   }
//   //timeout: reset to state 0
//   //do attack
//
// }

// getHit(){
//   //clear attack timeout, state to stunlock, back to normal
// }


movement(direction){
    if (direction > 0){
      this.direction = "right";
      this.posX += this.getSpeed();
    } else {
      this.direction = "left";
      this.posX -= this.getSpeed();
    }
}

getSpeed(){
  if (this.state === 0){
    return 3;
  }
  if (this.state === 1){
    return 4;
  }
  if (this.state === 2 || this.state === 3){
    return 5;
  }
}
}
