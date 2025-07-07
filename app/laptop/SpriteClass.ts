interface SpriteProps { 
    canvas: CanvasRenderingContext2D,
    position: { 
        x: number,
        y: number 
    }, 
    image: HTMLImageElement,
    sprites?: any,
    width?: number,
    height?: number,
    frames?: {
        max: number,
        val?: number,
        elapsed?: number
    },
    velocity: { 
        x: number, 
        y: number 
    },
    offset?: {
        x: number,
        y: number
    },
    moving?: boolean
} 

export class Sprite {
    canvas: CanvasRenderingContext2D;
    position: {
        x: number,
        y: number
    };
    width?: number;
    height?: number;
    frames?: {
        max: number,
        val?: number,
        elapsed?: number
    };
    image: HTMLImageElement;
    sprites?: any;
    velocity: {
        x: number,
        y: number
    };
    offset?: {
        x: number,
        y: number
    };
    moving?: boolean;
    SingleWidth?: number;
    SingleHeight?: number;

    constructor({
        canvas,
        position,
        width,
        height,
        frames,
        image,
        sprites,
        velocity,
        offset
    }: SpriteProps) {
        this.canvas = canvas;
        this.position = position;
        this.width = width;
        this.height = height;
        this.image = image;
        this.sprites = sprites;
        this.velocity = velocity || { x: 1, y: 1 };
        this.offset = offset || { x: 0, y: 0 };
        this.frames = frames || { max: 1, val: 0, elapsed: 0 };
        this.image.onload = () => {
            this.SingleWidth = this.image.width / this.frames!.max;
            this.SingleHeight = this.image.height;
        }
        this.moving = false;
        
    }

    draw() {
        this.canvas?.drawImage(
            this.image,
            this.frames!.val! * this.SingleWidth!,
            0,
            this.width! / this.frames!.max,
            this.height!,
            this.position.x,
            this.position.y,
            this.image.width / this.frames!.max,
            this.image.height
        );

        if (!this.moving) return;
        if (this.frames!.elapsed! % 20 === 0) {
            if (this.frames!.val! < this.frames!.max - 1) {
                this.frames!.val! += 1;
            } else {
                this.frames!.val! = 0;
            }
        }
    }

    animate({ animation, play }: { animation: string, play?: boolean }) {
        if (!play) { return }
        if (animation === 'flicker') {
            let opacity = 1;
            const flickerInterval = setInterval(() => {
            this.canvas.globalAlpha = opacity;
            this.draw();
            opacity = opacity === 0 ? 1 : 0; 
            }, 1);

            setTimeout(() => {
            clearInterval(flickerInterval);
            this.canvas.globalAlpha = 1;
            this.draw();
            }, 50);
        }
    }
}