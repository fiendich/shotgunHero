const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 700; //set your canvas width...
const CANVAS_HEIGHT = canvas.height = 860;

floor1Collisions.forEach((row) => {
    row.forEach((symbol => {
        if (symbol != 0) {
            console.log("draw")
        }
    }))
})
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

    player.update()
    shotgun.update()
    
    //console.log(mouse_X, mouse_Y);


}
animate()



addEventListener("click", (event) => {
    shotgun.shoot()
});

addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        shotgun.shoot()
    }
})






