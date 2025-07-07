interface BoundryProps {
    canvas: CanvasRenderingContext2D,
    position: {
        x: number,
        y: number
    },
    width?: number,
    height?: number,
    offset?: {
        x: number,
        y: number
    }
}

export class Boundry {
    static width = 24;
    static height = 24;
    canvas!: CanvasRenderingContext2D;
    position!: {
        x: number,
        y: number
    };
    width?: number;
    height?: number;
    offset?: {
        x: number,
        y: number
    };

    constructor({
        canvas,
        position,
        width,
        height,
        offset
    }: BoundryProps) {
        this.canvas = canvas;
        this.position = position;
        this.width = width || 24;
        this.height = height || 24;
        this.offset = offset || { x: 0, y: 0 };
    }
    
    draw?() {
        this.canvas.fillStyle = 'rgba(255, 0, 0, 0)';
        this.canvas.fillRect(
            this.position.x, 
            this.position.y, 
            this.width!, 
            this.height!
        );
    }
}