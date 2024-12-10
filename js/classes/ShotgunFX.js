class ShotgunFX {
    constructor({ position, imageSrc, frameRate, animations }) {
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = 3;
        this.elapsedFrames = 0;
        this.position = position;
        this.isShooting = false;
        this.animations = animations; // Correctly assign animations from the input
        
        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;

            this.animations[key].image = image; // Preload images for animations
        }
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
    
        const centerX = cropbox.width / 2 - 30;
        const centerY = cropbox.height / 2;
    
        ctx.setTransform(1, 0, 0, 1, x, y);
        ctx.rotate(Math.atan2(looky - y, lookx - x));
        ctx.drawImage(
            img,
            cropbox.position.x, cropbox.position.y,
            cropbox.width, cropbox.height,
            -centerX, -centerY,
            cropbox.width, cropbox.height
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    
    update() {
        if (this.isShooting) {
            this.updateFrames();
            
            const offsetX = 70;
            const offsetY = 40;
    
            this.position = {
                x: shotgun.position.x,
                y: shotgun.position.y,
            };
    
            this.drawSpriteLookat(
                this.animations["Flash"].image, 
                this.position.x,
                this.position.y,
                mouse_X,
                mouse_Y
            );
            
            this.drawSpriteLookat(
                this.animations["Shell"].image, 
                this.position.x,
                this.position.y,
                mouse_X,
                mouse_Y
            )
                
            
        }
    }
    
    updateFrames() {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            } else {
                this.currentFrame = 0;
                this.isShooting = false; // Stop the animation when it's complete
            }
        }
        
    }
    
    startShooting() {
        this.isShooting = true;
        this.currentFrame = 0; // Reset to start animation from the first frame
    }
}
