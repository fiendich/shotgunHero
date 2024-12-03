const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 700; //set your canvas width...
const CANVAS_HEIGHT = canvas.height = 860;

const collisionBlocks1 = []

floor1Collisions.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol != 0) {
            collisionBlocks1.push(
                new CollisionBlock({
                    position: {
                        x: x * 20,
                        y: y * 20
                    }
                })
            )
        }
    })
})






const GRAVITY = 0.5
const TRACTIONX = 1

const player = new Player({
    position: {
        x: 300,
        y: 400,
    },
    collisionBlocks: collisionBlocks1,
    imageSrc: "./assets/images/character/stop.png",
    animations: {
        Idle: {
            imageSrc: "./assets/images/character/idle.png",
            frameRate: 6,
        },
        Fall: {
            imageSrc: "./assets/images/character/fall.png",
            frameRate: 6,
        },
        Stop: {
            imageSrc: "./assets/images/character/stop.png",
            frameRate: 4,
        },
    },
})

const shotgun = new Shotgun({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/images/shotgun/Weapon/idle.png",
    frameRate: 15,
})
const shotgunFX = new ShotgunFX({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/images/shotgun/FX/muzzle_flash.png",
    frameRate: 14
})


const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "assets/images/floors/floor1.png",  
})

let mouse_X, mouse_Y;

// Get canvas position relative to the viewport
const canvasRect = canvas.getBoundingClientRect();

window.addEventListener('mousemove', (e) => {
    // Convert global mouse position to canvas-relative position
    mouse_X = e.clientX - canvasRect.left;
    mouse_Y = e.clientY - canvasRect.top;

    // Optional: Log for debugging
    // console.log(`Mouse Canvas Position: (${mouse_X}, ${mouse_Y})`);
});

    

function animate() {

    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    background.update()
    collisionBlocks1.forEach(collisionBlock => {
        collisionBlock.update()
    })

    
    player.update()
    shotgun.update()
    shotgunFX.update()
    
    if (keys.d.pressed) {
        player.velocity.x = 7}
        else if (keys.a.pressed) player.velocity.x = -7
    //console.log(mouse_X, mouse_Y);


}
animate()



window.addEventListener("click", (event) => {
    shotgun.shoot()
    shotgunFX.startShooting()
});

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        shotgun.shoot()
        shotgunFX.startShooting()
    }
})

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





