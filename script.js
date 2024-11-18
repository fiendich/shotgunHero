const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 700; //set your canvas width...
const CANVAS_HEIGHT = canvas.height = 860;

class Player {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
    }

    draw () {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, 100, 100)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.velocity.y += 0.5
    }
}

const player = new Player({
    x: 0,
    y: 0,
})
const player2 = new Player({
    x: 300,
    y: 100,
})


function animate() {

    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    player.update()
    player2.update()
    
    y ++ 
}
animate()
















/*
const spriteWidth = spriteHight = 256;

const playerImage = new Image();
playerImage.src = "assets/images/character_sheet_upscaled.png";
let frameX = 0;
let frameY = 6;
let gameFrame = 0;
const staggerFrames = 5;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHight, spriteWidth, spriteHight, 
        0, 0, 160, 160);
    
    if (gameFrame % staggerFrames == 0) {
        if (frameX < 9) frameX++;
        else frameX = 0;
    }


    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
*/