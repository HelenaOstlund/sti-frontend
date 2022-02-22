/*console.log("Initierar mitt spel")
let ageOfGame = 0

setTimeout(age, 1000)

function age() {
    console.log("Game is " + ageOfGame++ + " seconds old!")
    setTimeout(age, 1000)
}*/

/*console.log("Hej Helena")

var appElem = document.getElementById("app")
console.log(appElem)
appElem.innerHTML = "<strong>Helena</strong>"

var rubrik1 = document.createElement("h1")
var rubrik2 = document.createElement("h1")
rubrik1.id="rubrik1"
rubrik1.innerHTML="HEJ HELENA"
appElem.appendChild(rubrik1)
appElem.appendChild(rubrik2)

//rubrik1.innerHTML = "Helena"
//rubrik2.innerHTML = "Helena"

var enTabell = document.createElement("table")

appElem.appendChild(enTabell) 
let btn = document.createElement("button")

btn.innerHTML = "Click me"
document.body.appendChild(btn)

btn.onclick = function () {
    console.log("I am clicked, just so clicked")
    var enRad = document.createElement("tr")
    enTabell.appendChild(enRad)

    var enCell1 = document.createElement("td")    
    var enCell2 = document.createElement("td") 
    enCell1.innerHTML=Math.trunc(10 * Math.random()) +1
    enCell2.innerHTML=Math.floor(10 * Math.random()) +1   
    enRad.appendChild(enCell1)
    enRad.appendChild(enCell2)
    
    enCell.innerHTML = "en cell i raden"

}*/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
/*
// fillRect()
ctx.fillStyle = 'purple'
ctx.fillRect(20, 20, 150, 100);
ctx.fillStyle = 'green'
ctx.fillRect(200, 20, 150, 100);

// strokeRect()
ctx.lineWidth = 5;
ctx.strokeStyle = 'green';
ctx.strokeRect(100, 200, 150, 100)

// clearRect()
ctx.clearRect(25, 25, 140, 90)

// fillText()
ctx.font = '30px Arial'
ctx.fillStyle = 'blue'
ctx.fillText('Hello World', 400, 50)

// strokeText()
ctx.lineWidth = 1;
ctx.strokeStyle = 'orange';
ctx.strokeText('Hello World', 400, 100)

// Paths
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(100, 200);
ctx.lineTo(50, 50);
//ctx.closePath()
ctx.fillStyle = 'blue'
ctx.fill();

ctx.beginPath();
ctx.moveTo(200, 50);
ctx.lineTo(150, 200);
ctx.lineTo(250, 200);
ctx.closePath();
ctx.fillStyle= 'green'
ctx.fill();

ctx.beginPath();
ctx.moveTo(250, 50);
ctx.lineTo(350, 50)
ctx.lineTo(300, 200)
ctx.closePath()
ctx.fillStyle = 'purple'
ctx.fill()

ctx.beginPath();
ctx.moveTo(400, 50);
ctx.lineTo(450, 200)
ctx.lineTo(350, 200)
ctx.closePath()

ctx.fillStyle = 'pink'
ctx.fill()

//Rectangle
ctx.beginPath()
ctx.rect(200, 300, 150, 100)
ctx.fillStyle = 'coral'
ctx.fill()

// Arc (circles)

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// draw head
ctx.beginPath();
ctx.arc(centerX, centerY, 200, 0, Math.PI *2);

// move to mouth
ctx.moveTo(centerX + 100, centerY)
// draw mouth
ctx.arc(centerX, centerY, 100, 0, Math.PI, false)
// move to left eye
ctx.moveTo(centerX-60, centerY-80)
ctx.arc(centerX-80, centerY-80, 20, 0, Math.PI*2)
// movr to right eye
ctx.moveTo(centerX+100, centerY-80)
ctx.arc(centerX+80, centerY-80, 20, 0, Math.PI*2)
ctx.stroke();*/
/*
// animation 1

const circle = {
    x: 200,
    y: 200,
    size: 30,
    dx: 5,
    dy: 4
};

function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'purple';
    ctx.fill();
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCircle();

    // change position
    circle.x += circle.dx;
    circle.y += circle.dy;

    // detect side Walls
    if(circle.x + circle.size> canvas.width || circle.x - circle.size<0){
        circle.dx *= -1;
    }
    // detect top and bottom Walls
    if(circle.y + circle.size> canvas.height || circle.y - circle.size<0){
        circle.dy *= -1;
    }

    requestAnimationFrame(update)
}
    update();
*/

// animation 2 -character
const image = document.getElementById('source');

const player = {
    w: 50,
    h: 70,
    x: 20,
    y: 200,
    speed: 5,
    dx: 0,
    dy: 0
}

function drawPlayer(){
    ctx.drawImage(image, player.x, player.y, player.w, player.h);
}
function clear(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
}
function newPos(){
    player.x += player.dx;
    player.y += player.dy;

    detectWalls();
}

function detectWalls(){
    // Left wall
    if(player.x < 0){
        player.x = 0;
    }
    // right wall
    if(player.x + player.w > canvas.width){
        player.x = canvas.width - player.w;
    }
    // top wall
    if(player.y < 0){
        player.y = 0;
    }
    // bottom wall
    if(player.y + player.h > canvas.height){
        player.y = canvas.height - player.h;
    }
}

function update(){
    clear();
    drawPlayer();
    newPos();

    requestAnimationFrame(update);
}

function moveUp(){
    player.dy = -player.speed;
}
function moveDown(){
    player.dy = player.speed;
}
function moveRight(){
    player.dx = player.speed;
}
function moveLeft(){
    player.dx = -player.speed;
}

function keyDown(e){
    if(e.key === 'ArrowRight' || e.key === 'Right'){
        moveRight();
    }else if(e.key==='ArrowLeft'|| e.key==='Left'){
        moveLeft();
    }else if(e.key==='ArrowUp'|| e.key==='Up'){
        moveUp();
    }else if(e.key==='ArrowDown'|| e.key==='Down'){
        moveDown();
    }
}
function keyUp(e){
    if(
        e.key == 'Right'||
        e.key == 'ArrowRight' ||
        e.key == 'Left' ||
        e.key == 'ArrowLeft' ||
        e.key == 'Up' ||
        e.key == 'ArrowUp' ||
        e.key == 'Down' ||
        e.key == 'ArrowDown'
    ){
       player.dx = 0;
       player.dy = 0; 
    }

}

update();

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)


