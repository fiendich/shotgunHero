class CollisionBlock {
    constructor({ position, collisionList}) {
        this.position = position
        this.width = 20
        this.height = 20
        this.collisionList = collisionList
    }
    /*
    draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }
        */
}