class Player extends Sprite {
    constructor({position, imageSrc, frameRate}) {
        super({imageSrc, frameRate})
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.height = 100
    }

    update() {
        this.updateFrames()
        ctx.fillStyle = "rgba(0, 255, 0, 0.2)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.draw();
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height < CANVAS_HEIGHT) {
            this.velocity.y += GRAVITY
        }
        else {
            this.velocity.y = 0
        }
    }
}