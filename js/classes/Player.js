class Player extends Sprite {
    constructor({ position, collisionBlocks = [], imageSrc, frameRate, animations }) {
        super({ imageSrc, frameRate })
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.width = 50
        this.height = 100
        this.collisionBlocks = Array.isArray(collisionBlocks) ? collisionBlocks : []
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10
        }

        this.animations = animations
        this.isGrounded = false
        

        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc

            this.animations[key].image = image
        }

        this.frameRate = 6
    }

    switchSprite(key) {
        if (this.image === this.animations[key].image){
            return
        } 
        this.frameRate = this.animations[key].frameRate
        this.image = this.animations[key].image
        this.currentFrame = 0
    }

    update() {
        
        this.updateFrames()
        this.updateHitbox()
        /*
        ctx.fillStyle = "rgba(0, 255, 0, 0.2)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        ctx.fillStyle = "rgba(255, 0, 255, 0.5)"
        ctx.fillRect(
            this.hitbox.position.x,
            this.hitbox.position.y,
            this.hitbox.width,
            this.hitbox.height
        )
            */
        
        this.draw()
        
        this.position.x += this.velocity.x
        this.updateHitbox()
        this.checkForHorizontalCollisions()
        if (this.velocity.y > 1) {
            this.isGrounded = false
        }
        if (this.isGrounded) {
            if (this.velocity.x != 0) {
                this.switchSprite("Stop")
            }
            else {
                this.switchSprite("Idle")
                
            }
        }
        else {
            this.switchSprite("Fall")
        }
        this.applyGravity()
        this.applyTractionX()
        this.updateHitbox()
        this.checkForVerticalCollisions()
        // console.log(this.isGrounded)
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 45,
                y: this.position.y + 41,
            },
            width: 49,
            height: 67
        }
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (
                collision({ 
                    object1: this.hitbox,
                    object2: collisionBlock
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
                
                if (this.velocity.x < 0) {
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x


                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
            }       
        }
    }

    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += GRAVITY
    }

    applyTractionX() {
        // console.log(this.velocity.x);
        
        let groundedMultiplier = this.isGrounded ? 0.6 : 0.125;
        
        if (currentFloor.floorNumber === 4) {
            groundedMultiplier = this.isGrounded ? 0.02 : 0.125
            console.log(groundedMultiplier)
        }
        if (Math.abs(this.velocity.x) <= TRACTIONX * groundedMultiplier) {
            this.velocity.x = 0;
        }
        
        else if (this.velocity.x > 0) {
            this.velocity.x -= TRACTIONX * groundedMultiplier;
        }
        else {
            this.velocity.x += TRACTIONX * groundedMultiplier;
        }
        
    }
    
        

    checkForVerticalCollisions() {
        

        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            //console.log(this.velocity.y)
            
            
            
            if (
                collision({ 
                    object1: this.hitbox,
                    object2: collisionBlock
                })
                
            )
            
             {
                if (this.velocity.y > 0) {
                    
                    
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    this.isGrounded = true
                    break
                    
                }
                
                if (this.velocity.y < 0) {
                    
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y
                    
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }

            }
               
        }
        
    }
}
