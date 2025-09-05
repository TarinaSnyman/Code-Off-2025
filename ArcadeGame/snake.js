//declare variables
var blocksize=25,rows=25,cols=25,board,context;//board
var snakeX= blocksize*5,snakeY=blocksize*5,snakeBody=[];//snake
var foodX,foodY;//food
var velocityX=0, velocityY=0; 
var portalAX, portalAY, portalBX, portalBY; //portals
var gameOver=false;//game over
var score=0, highscore=localStorage.getItem("highScore")||0; //score and highscore
window.onload=function(){ //when page loads
    board=document.getElementById("board");
    board.height=rows*blocksize;
    board.width=cols*blocksize;
    context=board.getContext("2d");//used for drawing on board
    placeFood();
    setTimeout(placePortals, 5000); // portals appear after 15 seconds
    document.addEventListener("keyup",changeDirection);
    setInterval(update, 1000/10); 
}
function placePortals(){
    portalAX = Math.floor(Math.random()*cols)*blocksize;// place the portals
    portalAY = Math.floor(Math.random()*rows)*blocksize;
    portalBX = Math.floor(Math.random()*cols)*blocksize;
    portalBY = Math.floor(Math.random()*rows)*blocksize;
    if((portalAX==foodX && portalAY==foodY) || (portalBX==foodX && portalBY==foodY)) placePortals();    // make sure they don’t overlap food
}
function update(){
    if (gameOver)return;//game over
    context.fillStyle="black";//colour board, food, snake and place
    context.fillRect(0,0,board.width, board.height);
    context.fillStyle="Red";
    context.fillRect(foodX,foodY, blocksize,blocksize);
    if(snakeX==foodX && snakeY==foodY){ //increase snake length and add to score
        snakeBody.push([foodX,foodY]);
        placeFood();
        score++;
        document.getElementById("score").innerText="Score: "+score;
    }
    for(let i=snakeBody.length-1;i>0;i--){snakeBody[i]=snakeBody[i-1]; }
    if(snakeBody.length){snakeBody[0]= [snakeX,snakeY];}
    context.fillStyle="Lime";
    snakeX+=velocityX*blocksize;
    snakeY+=velocityY*blocksize;
    context.fillRect(snakeX,snakeY, blocksize,blocksize);//draw snakehead
    for (let i=0;i<snakeBody.length;i++){ 
        context.fillRect(snakeBody[i][0], snakeBody[i][1],blocksize,blocksize);
    }
    context.fillStyle="blue";// draw portals
    context.fillRect(portalAX, portalAY, blocksize, blocksize);
    context.fillRect(portalBX, portalBY, blocksize, blocksize);
    if(snakeX==portalAX && snakeY==portalAY){ snakeX=portalBX; snakeY=portalBY; placePortals(); }// teleport snake
    else if(snakeX==portalBX && snakeY==portalBY){ snakeX=portalAX; snakeY=portalAY; placePortals(); }
    if(snakeX<0 || snakeX>cols*blocksize||snakeY<0||snakeY>rows*blocksize){ endGame();}//check if game over
    for(let i=0;i<snakeBody.length;i++){
        if (snakeX==snakeBody[i][0]&& snakeY==snakeBody[i][1]){ endGame();}
    }
}
function placeFood(){// place food at a random locations
    foodX=Math.floor(Math.random()*cols)*blocksize;
    foodY=Math.floor(Math.random()*rows)*blocksize;
}
function changeDirection(e){//move the snakehead
    if(e.code=="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }else if(e.code=="ArrowDown"&& velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }else if(e.code=="ArrowLeft"&& velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }else if (e.code=="ArrowRight"&& velocityX!=-1){
        velocityX=1;
        velocityY=0;}
}
function endGame(){//game over banner and score
    gameOver=true;
    if(score>highscore){
        highscore=score;
        localStorage.setItem("highScore",highscore);
    }
    document.getElementById("finalScore").innerText="Score: "+score;
    document.getElementById("highScore").innerText="High Score: "+highscore;
    let banner=document.getElementById("gameOverBanner");
    banner.classList.add("show");
    document.addEventListener("keydown", function handler(e){
        if (e.code==="Enter"){
            document.removeEventListener("keydown",handler);//remove listner to pevent multiple reloads
            this.location.reload(); //reload page
        }
    })
}