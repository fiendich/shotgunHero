// Initializing canvas
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 860;

const collisionBlocks = [[], [], [], [], []]; // Array of arrays for different floors

// Populating collision blocks for a given floor
function populateCollisionBlocks(floorCollisions, collisionBlocksArray) {
    floorCollisions.forEach((row, y) => {
        if (!Array.isArray(row)) {
            console.warn(`Invalid row at index ${y}:`, row);
            return; // Skip invalid rows
        }
        row.forEach((symbol, x) => {
            if (symbol != 0) {
                collisionBlocksArray.push(
                    new CollisionBlock({
                        position: {
                            x: x * 20,
                            y: y * 20
                        }
                    })
                );
            }
        });
    });
}

// Call the function for each floor
populateCollisionBlocks(floor1Collisions, collisionBlocks[0]);
populateCollisionBlocks(floor2Collisions, collisionBlocks[1]);
populateCollisionBlocks(floor3Collisions, collisionBlocks[2]);
populateCollisionBlocks(floor4Collisions, collisionBlocks[3]);
populateCollisionBlocks(floor5Collisions, collisionBlocks[4]);


// Gravity and x-axis traction 
const GRAVITY = 0.5
const TRACTIONX = 1

// Creating floor object
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
        Floor3: {
            imageSrc: "assets/images/floors/floor3.png",
            frameRate: 1,
        },
        Floor4: {
            imageSrc: "assets/images/floors/floor4.png",
            frameRate: 1,
        },
        Floor5: {
            imageSrc: "assets/images/floors/floor5.png",
            frameRate: 1,
        }
    },
    collisions: collisionBlocks,
});

// Creating player object
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

// Creating shotgun object
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
            frameBuffer: 2
        }
    },
})

// Creating shotgunFX object 
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
/*
// Movement for testing 
const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}
    */

// Creating background sprite object
const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "assets/images/floors/floor1.png",  
})
// Mouse position variables 
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
    // console.log(player.position)
    // console.log(player.isGrounded)
    player.update()
    shotgun.update()
    shotgunFX.update()
    /*
    if (keys.d.pressed) {
        player.velocity.x = 7}
        else if (keys.a.pressed) player.velocity.x = -7
    */
}
animate()

/*
// Movement for testing
window.addEventListener("keydown", (event) => {
    // console.log(`Key down: ${event.key}`);
    switch (event.key) {
        case "d":
            keys.d.pressed = true;
            break;
        case "a":
            keys.a.pressed = true;
            break;
        case "w":
            player.velocity.y = -20;
            break;
    }
});

window.addEventListener("keyup", (event) => {
    // console.log(`Key up: ${event.key}`);
    switch (event.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
    }
})
*/

// Shooting mechanic (mouse)
window.addEventListener("click", () => {
    if (shotgun.shotsLeft > 0) { 
        shotgunFX.startShooting()
        shotgun.shoot()
        shotgun.switchSprite("Shoot")
    } else {
        console.log("No shots left")
    }
})

// Shooting mechanic (Spacebar)
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






