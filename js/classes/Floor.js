class Floor extends Sprite {
    constructor({ position, imageSrc, frameRate = 1, floors, collisions}) {
        super({ imageSrc, frameRate })
        this.floorNumber = 0 // Current floor number
        this.position = position // Position relative to canvas (always 0, 0)
        this.floors = floors // All floors
        this.collisions = collisions // All collision blocks 
        this.currentCollisions = collisions[0] // Collision blocks for current floor
        this.floorKeys = ["Floor1", "Floor2", "Floor3", "Floor4", "Floor5"] // Keys for iteration

        //Add image object to every floor
        for (let key in this.floors) {
            const image = new Image()
            image.src = this.floors[key].imageSrc

            this.floors[key].image = image
            
        }
    }   
    // Floor swap
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
        this.update();
        // Floor up swap condition
        if (player.position.y < -player.height) {
            this.floorNumber++;
            // Credits after last floor
            if (this.floorNumber >= 5) {
                player.position.y = 0;
                setTimeout(() => {
                    window.location.href = 'credit.html';
                }, 50);
                return;
            }
            
            player.position.y = canvas.height - player.height // Teleport player to the bottom on canvas
            player.collisionBlocks = this.collisions[this.floorNumber] // Swap to next floor collisions
        }
        // Floor down swap condition
        else if (player.position.y > player.height + canvas.height) {
            this.floorNumber--
            player.position.y = 0
            player.collisionBlocks = this.collisions[this.floorNumber]
        }
        // Swap floor
        if (this.floorNumber != 5) {
            let keyy = this.floorKeys[this.floorNumber]
            this.switchFloor(keyy)
        }
    }
    
}