class Shotgun {
    constructor({ position, imageSrc, frameRate }) {
        this.image = new Image();
        this.image.onload = () => {
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        };
        this.image.src = imageSrc;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = 5;
        this.elapsedFrames = 0;
        this.position = position;
        this.degrees = 90;
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
    
        const centerX = cropbox.width / 2 - 30
        const centerY = cropbox.height / 2
    
        ctx.setTransform(1, 0, 0, 1, x, y)
        ctx.rotate(Math.atan2(looky - y, lookx - x))
        console.log(Math.atan2(looky - y, lookx - x))
        ctx.drawImage(
            img,
            cropbox.position.x, cropbox.position.y,
            cropbox.width, cropbox.height,
            -centerX, -centerY,
            cropbox.width, cropbox.height
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
    
    shoot() {
        
        player.velocity.y = -15
    }

    update() {
        this.updateFrames();
    
        
        const offsetX = 70;
        const offsetY = 40;
    
        this.position = {
            x: player.position.x + offsetX + 3,
            y: player.position.y + offsetY - player.velocity.y + 43
        };
    
        this.drawSpriteLookat(this.image, this.position.x, this.position.y, mouse_X, mouse_Y);
    }
    

    updateFrames() {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            } else {
                this.currentFrame = 0;
            }
        }
    }
}
