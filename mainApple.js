var canvas=document.getElementById("canvas")
canvas.width=600;
canvas.height= 600;

var ctx=canvas.getContext("2d");
var snakeWidth=10;
var snakeHeight=10;

var NORTH="NORTH";
var SOUTH="SOUTH";
var EAST="EAST";
var WEST="WEST";

var refreshRate=70;
var cuurentDirection=EAST;
var defaultSnakeHead={x:0,y:0};

var snake=[];
snake.unshift(defaultSnakeHead);

var initialApple= new apple(Math.round(Math.random()*(canvas.width/snakeWidth)+1),Math.round(Math.random()*(canvas.width/snakeWidth)+1));

var score=0;

function apple(x,y)
{
 this.x=x;
 this.y=y;
}

// Create Grid Lines
function horizontalLines(x,y)
{
    ctx.fillStyle="grey";
    ctx.fillRect(x,y,canvas.width,snakeHeight);
}
function verticallLines(x,y)
{
    ctx.fillStyle="grey";
    ctx.fillRect(x,y,snakeWidth,canvas.height);
}

//Drawing the Snake
function drawSnake(snake)
{
    reconstructBase();
for (let index = 0; index < snake.length; index++) {
     //console.log(cuurentDirection);
    const element = snake[index];
    ctx.fillStyle="green";
   // console.log("Draw Rect"+ element.x);

    ctx.fillRect(element.x*snakeHeight,element.y*snakeWidth,snakeHeight,snakeWidth);    
}
    snake.pop();
   
    if(cuurentDirection==EAST)
    {snake.unshift({x:defaultSnakeHead.x+1,y:defaultSnakeHead.y});
    defaultSnakeHead.x=defaultSnakeHead.x+1;
    if(defaultSnakeHead.x*snakeHeight>canvas.width)
    alert("Game Over");
    }
    
    if(cuurentDirection==SOUTH)
    {snake.unshift({x:defaultSnakeHead.x,y:defaultSnakeHead.y+1});
   
    defaultSnakeHead.y=defaultSnakeHead.y+1;
    if(defaultSnakeHead.y*snakeWidth>canvas.height)
    alert("Game Over");   
}
    
    
    if(cuurentDirection==NORTH)
        {snake.unshift({x:defaultSnakeHead.x,y:defaultSnakeHead.y-1});
       
     defaultSnakeHead.y=defaultSnakeHead.y-1;   
     if(defaultSnakeHead.y*snakeWidth<0)
        alert("Game Over");
    }

    
    
    if(cuurentDirection==WEST)
            {snake.unshift({x:defaultSnakeHead.x-1,y:defaultSnakeHead.y});
           
            defaultSnakeHead.x=defaultSnakeHead.x-1;
            if(defaultSnakeHead.x*snakeWidth<0)
            alert("Game Over");
           
           
        }

        console.log(defaultSnakeHead.x*snakeHeight);
        console.log(defaultSnakeHead.y*snakeWidth);
    }




document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
        cuurentDirection=WEST;
           
            break;
        case 38:
        cuurentDirection=NORTH;
           
            break;
        case 39:
        cuurentDirection=EAST;
            
            break;
        case 40:
        cuurentDirection=SOUTH;
            
            break;
    }
};

function checkSnakeCollideItSelf(snake)
{
    for (let index = 0; index < snake.length; index++) {
    
        for (let index1 = index+1; index1 < snake.length; index1++) {
    if(snake[index].x==snake[index1].x && snake[index].y==snake[index1].y)
{
    console.log("Colliding");
    return true;
}
        
        }
    

    }

return false;
}


function reconstructBase()
{ ctx.clearRect(0,0,canvas.width,canvas.height);
// for (let index = 0; index < canvas.height; index=index+2*snakeHeight) {
    
//    horizontalLines(0,index);
//      verticallLines(index,0);
// }

   if(checkSnakeCollideItSelf(snake)==true)
   {alert("****** Self Collision ******** ;(");}
    ctx.fillStyle="red";
    ctx.fillRect(initialApple.x*snakeHeight,initialApple.y*snakeWidth,snakeHeight,snakeWidth); 
  if(initialApple.x==defaultSnakeHead.x&&initialApple.y==defaultSnakeHead.y)
{
    initialApple.x=Math.round(Math.random()*(canvas.width/snakeWidth));
    initialApple.y=Math.round(Math.random()*(canvas.width/snakeWidth));
    snake.push(defaultSnakeHead.x+1,defaultSnakeHead.y);
    score++;
    refreshRate=refreshRate-5;
}
document.getElementById("scoreCard").innerText=score;

}



reconstructBase();

setInterval( drawSnake,refreshRate,snake);

