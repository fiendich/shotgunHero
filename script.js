const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 700; //set your canvas width...
const CANVAS_HEIGHT = canvas.height = 860;

const GRAVITY = 0.5
class Player {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.height = 100
    }

    draw () {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, 100, 100)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y < CANVAS_HEIGHT) {
            this.velocity.y += GRAVITY
        }
        else {
            this.velocity.y = 0
        }
            this.position.y += this.velocity.y
        this.velocity.y += GRAVITY
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

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}
function animate() {

    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    player.update()
    player2.update()
    
    player.velocity.x = 0
    if (keys.d.pressed) player.velocity.x = 5
        else if (keys.a.pressed) player.velocity.x = -5
}
animate()

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true
            break

        case "a":
            keys.a.pressed = true
            break    

        case "w":
            player.velocity.y = -20
            break    
    }    
})

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false
            break

        case "a":
            keys.a.pressed = false
            break 
    }   
})


















// const spriteWidth = spriteHight = 256;

// const playerImage = new Image();
// playerImage.src = "assets/images/character_sheet_upscaled.png";
// let frameX = 0;
// let frameY = 7;
// let gameFrame = 0;
// const staggerFrames = 7;

// function animate() {
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHight, spriteWidth, spriteHight, 
//         0, 0, 128, 128);
    
//     if (gameFrame % staggerFrames == 0) {
//         if (frameX < 5) frameX++;
//         else frameX = 0;
//     }


//     gameFrame++;
//     requestAnimationFrame(animate);
// }
// animate();
