class Shotgun {
    constructor({ position, imageSrc, frameRate, animations }) {
        this.image = new Image();
        this.image.onload = () => {
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        };
        this.image.src = imageSrc; // Animation source
        this.frameRate = frameRate; // Animation framerate
        this.currentFrame = 0; // Current frame of sprite
        this.frameBuffer = 5; // Speed of animation (faster if frameBuffer low)
        this.elapsedFrames = 0; // Frame counter
        this.position = position; // Position x, y
        this.degrees = 90; // For calculating rotation to mouse
        this.lookRadian; // Same as above...
        this.shotsLeft = 0; // Start with no shots loaded
        this.maxShots = 2; // Maximum shots after reload
        this.animations = animations;
        this.isReloading = false;
        this.reloadCycles = 0; // Tracks how many reload animations completed
        this.targetReloadCycles = 2; // Reload completes after this many cycles
        this.partialReload = false; // Tracks if mid-reload shooting happens

        // Creating image object for each animation
        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            this.animations[key].image = image;
        }
        
    }

    // Update visibility
    updateShellVisibility() {
        const shell1 = document.getElementById("shell1");
        const shell2 = document.getElementById("shell2");
    
        if (!shell1 || !shell2) {
            console.error("Shotgun shell elements not found.");
            return; 
        }
    
       
        shell1.style.visibility = this.shotsLeft > 0 ? "visible" : "hidden";
        shell2.style.visibility = this.shotsLeft > 1 ? "visible" : "hidden";
    }
    

    switchSprite(key) {
        if (!this.animations[key]) {
            console.log(`Animation '${key}' does not exist.`);
            return;
        }
        if (this.image === this.animations[key].image) {
            return;
        }
        this.frameRate = this.animations[key].frameRate;
        this.image = this.animations[key].image;
        this.currentFrame = 0;
        this.frameBuffer = this.animations[key].frameBuffer;
    }

    drawSpriteLookat(img, x, y, lookx, looky) {
        const cropbox = {
            position: {
                x: this.currentFrame * (img.width / this.frameRate),
                y: 0
            },
            width: img.width / this.frameRate,
            height: img.height
        };

        let centerX = cropbox.width / 2 - 30;
        if (this.isReloading) {
            centerX += 16;
        }
        let centerY = cropbox.height / 2;

        ctx.setTransform(1, 0, 0, 1, x, y);
        ctx.rotate(Math.atan2(looky - y, lookx - x));
        this.lookRadian = Math.atan2(looky - y, lookx - x);
        ctx.drawImage(
            img,
            cropbox.position.x, cropbox.position.y,
            cropbox.width, cropbox.height,
            -centerX, -centerY,
            cropbox.width, cropbox.height
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    
    shoot() {
        if (this.shotsLeft > 0) {
            this.shotsLeft--;
            // Update shell visibility after shooting
            this.updateShellVisibility();
            
            // Player recoil logic...
            player.isGrounded = false;
            let acceleration = 15;
            let addVelocityX = -Math.cos(this.lookRadian) * acceleration;
            let addVelocityY = -Math.sin(this.lookRadian) * acceleration;
            player.velocity.x = addVelocityX;
            player.velocity.y = addVelocityY;
            
            if (this.isReloading) {
                this.isReloading = true;
                this.reloadCycles = 0;
                this.partialReload = true;
                this.shotsLeft = 0;
            }
        }
    }

    update() {
        this.updateFrames();

        // Reloading logic...
        if (player.isGrounded && this.shotsLeft !== this.targetReloadCycles && !this.isReloading) {
            this.isReloading = true;
            this.reloadCycles = this.targetReloadCycles - this.shotsLeft;
        }

        if (this.isReloading) {
            this.reload();
        } else if (!shotgunFX.isShooting && this.shotsLeft > 0) {
            this.switchSprite("Idle");
        }

        // Update shell visibility while reloading
        this.updateShellVisibility();

        let offsetX = 70;
        let offsetY = 40;

        this.position = {
            x: player.position.x + offsetX + 3,
            y: player.position.y + offsetY - player.velocity.y + 43
        };

        this.drawSpriteLookat(this.image, this.position.x, this.position.y, mouse_X, mouse_Y);
    }

    reload() {
        if (!player.isGrounded) {
            // Prevent reload if the player is midair
            //console.log("Cannot reload while midair!");
            this.isReloading = false;
            return;
        }

        this.switchSprite("Reload");
        this.frameBuffer = this.animations["Reload"].frameBuffer;
    }

    updateFrames() {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            } else {
                if (this.isReloading) {
                    this.reloadCycles++;
                    this.shotsLeft++; // Add one shot per reload cycle
                    // console.log(`Shot added! Shots left: ${this.shotsLeft}`);

                    if (this.shotsLeft >= this.maxShots || this.reloadCycles >= this.targetReloadCycles) {
                        this.isReloading = false; // Stop reloading when fully reloaded
                        this.partialReload = false;
                        // console.log("Reload complete.");
                    }
                }
                this.currentFrame = 0;
            }
        }
    }
}
