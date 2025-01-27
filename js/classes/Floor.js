class Floor extends Sprite {
    constructor({ position, imageSrc, frameRate = 1, floors, collisions}) {
        super({ imageSrc, frameRate })
        this.floorNumber = 0
        this.position = position
        this.floors = floors
        this.collisions = collisions
        this.currentCollisions = collisions[0]
        this.floorKeys = ["Floor1", "Floor2", "Floor3", "Floor4", "Floor5"]

        for (let key in this.floors) {
            const image = new Image()
            image.src = this.floors[key].imageSrc

            this.floors[key].image = image
            
        }
    }   

    switchFloor(key) {
        if (this.image === this.floors[key].image){
            return
        } 
        console.log(this.floors[key].image)
        this.frameRate = this.floors[key].frameRate
        this.image = this.floors[key].image
        this.currentFrame = 0
    }   


    
    update_all() {
        // console.log(this.floorNumber)
        this.update()
    if (player.position.y < -player.height) {
        this.floorNumber++
        player.position.y = canvas.height - player.height
        player.collisionBlocks = this.collisions[this.floorNumber]
    }
    else if (player.position.y > player.height + canvas.height) {
        this.floorNumber--
        player.position.y = 0
        player.collisionBlocks = this.collisions[this.floorNumber]
    }
    let keyy = this.floorKeys[this.floorNumber]
    this.switchFloor(keyy)

    }
}