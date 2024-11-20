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
        ctx.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    update() {
        console.log(this.position.y, " | ", this.velocity.y)
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