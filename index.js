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

const player = new Player({
    position: {
        x: 300,
        y: 400,
    },
    collisionBlocks: collisionBlocks1,
    imageSrc: "./assets/images/character/idle.png",
    frameRate: 6,
    animations: {
        Idle: {
            imageSrc: "./assets/images/character/idle.png",
            frameRate: 6,
        },
        Fall: {
            imageSrc: "./assets/images/character/fall.png",
            frameRate: 6,
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

let mouse_X, mouse_Y

window.addEventListener('mousemove', (e) => {
    mouse_X = e.offsetX
    mouse_Y = e.offsetY
})
    

function animate() {

    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    background.update()
    collisionBlocks1.forEach(collisionBlock => {
        collisionBlock.update()
    })

    player.update()
    shotgun.update()
    
    
    if (keys.d.pressed) {
        player.velocity.x = 7}
        else if (keys.a.pressed) player.velocity.x = -7
    //console.log(mouse_X, mouse_Y);


}
animate()



window.addEventListener("click", (event) => {
    shotgun.shoot()
});

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        shotgun.shoot()
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





