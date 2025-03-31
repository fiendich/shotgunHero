class Player extends Sprite {
    constructor({ position, collisionBlocks = [], imageSrc, frameRate, animations }) {
        super({ imageSrc, frameRate })
        this.position = position // Player position (x, y)
        this.velocity = {
            x: 0,
            y: 1,
        } // Player velocity
        this.width = 50 // Player size y
        this.height = 100 // Player size x
        this.collisionBlocks = Array.isArray(collisionBlocks) ? collisionBlocks : [] // Current floor's collision blocks
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            }, // Hitbox position
            width: 10,
            height: 10
        } // Hitbox size

        this.animations = animations // All sprite animations
        this.isGrounded = false // Flag is player on the ground 
        
        // Add image object to every animation
        for (let key in this.animations) {
            const image = new Image() 
            image.src = this.animations[key].imageSrc

            this.animations[key].image = image
        }

        this.frameRate = 6 // Number of frames in animation
    }

    // Animation switch function
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
        // Visualize hitbox
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
        
        this.position.x += this.velocity.x // Update player position 
        this.updateHitbox()
        this.checkForHorizontalCollisions()
        if (this.velocity.y > 1) {
            this.isGrounded = false // Change grounded flag if mid air 
        }
        if (this.isGrounded) {
            if (this.velocity.x != 0) {
                this.switchSprite("Stop") // Slide animation if moving on the ground
            }
            else {
                this.switchSprite("Idle") // Idle animation otherwise 
                
            }
        }
        else {
            this.switchSprite("Fall") // Fall animation if not grounded 
        }
        this.applyGravity()
        this.applyTractionX()
        this.updateHitbox()
        this.checkForVerticalCollisions()
        // console.log(this.isGrounded)
    }
    // Hitbox update function
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
    // Check if player is colliding with something horrizontally 
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

                    this.position.x = collisionBlock.position.x - offset - 0.01 // Snap player away from wall to prevent out of bounds
                    break
                }
                
                if (this.velocity.x < 0) {
                    this.velocity.x = 0

                    const offset = this.hitbox.position.x - this.position.x


                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01 // Same thing but for other direction
                    break
                }
            }       
        }
    }

    // Constantly change player position y by the velocity value + add velocity while falling 
    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += GRAVITY
    }

    // Gravity but for X velocity. Has bigger effect when grounded.
    applyTractionX() {
        // console.log(this.velocity.x);
        console.log(this.velocity.x)
        let groundedMultiplier = this.isGrounded ? 0.6 : 0.125
        
        if (currentFloor.floorNumber === 4) {
            groundedMultiplier = this.isGrounded ? 0.02 : 0.125
            console.log(groundedMultiplier)
        }

        if ((this.velocity.x < 0 && this.velocity.x > -2) || (this.velocity.x > 0 && this.velocity.x < 2)) {
            groundedMultiplier *= 0.3
        }

        if (Math.abs(this.velocity.x) <= TRACTIONX * groundedMultiplier) {
            this.velocity.x = 0;
        }
        
        else if (this.velocity.x > 0) {
            this.velocity.x -= TRACTIONX * groundedMultiplier
        }
        else {
            this.velocity.x += TRACTIONX * groundedMultiplier
        }
        
    }
    
        
    // Check if player is hitting the floor or he ceiling
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
                    
                    this.position.y = collisionBlock.position.y - offset - 0.01 // Snap player back in place to prevent out of bounds
                    this.isGrounded = true
                    break
                    
                }
                
                if (this.velocity.y < 0) {
                    
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y
                    
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01 // Same as above but for other direction
                    break
                }

            }
               
        }
        
    }
}
