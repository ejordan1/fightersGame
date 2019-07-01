class Fighter{

  constructor(startingPosX, startingPosY, speed){
    this.posX = startingPosX;
    this.posY = startingPosY;
    this.state = 0;
    this.health = 100;
    this.direction = left;


  }

attack(){
  state = 1;

}

getHit(){
  //clear attack timeout, state to stunlock, back to normal
}


}

movement(direction){
  if (direction > 0){
    this.direction = right;
    this.posX += speed;
  } else {
    this.direction = left;
    this.posX -= speed;
  }
}
