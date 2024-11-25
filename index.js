const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 700; //set your canvas width...
const CANVAS_HEIGHT = canvas.height = 860;

const GRAVITY = 0.5



const player = new Player({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/images/character/idle.png",
    frameRate: 6,
})

const shotgun = new Shotgun({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/images/shotgun/Weapon/shooting_chamber_closed.png",
    frameRate: 14,

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
    imageSrc: "assets/images/floors/floor_1.jpg",  
})

let mouse_X, mouse_Y

window.addEventListener('mousemove', (e) => {
    mouse_X = e.offsetX
    mouse_Y = e.offsetY
    console.log(e)
})
    

function animate() {

    window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    background.update()

    player.update()
    shotgun.update()
    
    //console.log(mouse_X, mouse_Y);

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
            shotgun.shoot()
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








