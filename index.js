const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 700; //set your canvas width...
const CANVAS_HEIGHT = canvas.height = 860;

const collisionBlocks1 = []
const collisionBlocks2 = []
//const collisionBlocks3 = []

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


floor2Collisions.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol != 0) {
            collisionBlocks2.push(
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


const currentFloor = new Floor({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "assets/images/floors/floor1.png",
    floors: {
        Floor1: {
            imageSrc: "assets/images/floors/floor1.png",
            frameRate: 1,
        },
        Floor2: {
            imageSrc: "assets/images/floors/floor2.png",
            frameRate: 1,
        },
    },
    collisions: [collisionBlocks1, collisionBlocks2],
});


const player = new Player({
    position: {
        x: 300,
        y: 400,
    },
    collisionBlocks: currentFloor.currentCollisions,
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
    animations: {
        Idle: {
            imageSrc: "./assets/images/shotgun/Weapon/idle.png",
            frameRate: 15,
            frameBuffer: 5
        },
        Shoot: {
            imageSrc: "./assets/images/shotgun/Weapon/shooting_chamber_opened.png",
            frameRate: 14,
            frameBuffer: 3
        },
        Reload: {
            imageSrc: "./assets/images/shotgun/FX/Reload.png",
            frameRate: 14,
            frameBuffer: 3
        }
    },
})

const shotgunFX = new ShotgunFX({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/images/shotgun/FX/muzzle_flash.png",
    frameRate: 14,
    animations: {
        Flash: {
            imageSrc: "./assets/images/shotgun/FX/muzzle_flash.png",
            frameRate: 14
        },
        Shell: {
            imageSrc: "./assets/images/shotgun/FX/[SHOOTING_SHELL_01] Shotgun_V1.02.png",
            framerate: 14
        }
    }
    
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

    // console.log(`Mouse Canvas Position: (${mouse_X}, ${mouse_Y})`);
});

    

function animate() {

    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    currentFloor.update_all()
    /*
    collisionBlocks1.forEach(collisionBlock => {
        collisionBlock.update()
    })
        */
    //console.log(player.position)
    player.update()
    shotgun.update()
    shotgunFX.update()
    
    if (keys.d.pressed) {
        player.velocity.x = 7}
        else if (keys.a.pressed) player.velocity.x = -7
}
animate()



window.addEventListener("click", (event) => {
    if (shotgun.shotsLeft > 0) { 
        shotgunFX.startShooting();
        shotgun.shoot();
        shotgun.switchSprite("Shoot")
    } else {
        console.log("No shots left");
    }
});

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (shotgun.shotsLeft > 0) {
            shotgunFX.startShooting()
            shotgun.shoot()
            shotgun.switchSprite("Shoot")
        } else {
            console.log("No shots left")
        }
    }
});

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





