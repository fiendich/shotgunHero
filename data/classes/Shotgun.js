class Shotgun extends Sprite {
    constructor({position, imageSrc, frameRate}) {
        super({imageSrc, frameRate})
        this.position = position
    }


    update() {
        this.updateFrames()
        this.position = {
            x: player.position.x + 25,
            y: player.position.y + 70 - player.velocity.y,
        }
        this.draw()
    }
}