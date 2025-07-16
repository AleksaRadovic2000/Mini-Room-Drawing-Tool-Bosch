import { useEffect } from "react";



type Point = {
    x: number;
    y: number;
};

type CanvasWrapperProps = {
    width: number;
    height: number;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    points: Point[];
    onAddPoint: (p: Point) => void;
};




function CanvasWrapper ({
    width,
    height,
    canvasRef,
    points,
    onAddPoint
}: CanvasWrapperProps) {


    //Crtanje tacaka
    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        points.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill()
        })

    },[points]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const handleClick = (event : MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            onAddPoint({x, y});
        };

        canvas.addEventListener('click', handleClick);

        return () => {
            canvas.removeEventListener('click', handleClick);
        };
    }, [points, onAddPoint])



    return <canvas width={width} height={height}
        ref={canvasRef}
        style={{backgroundColor: 'lightblue'}}
    ></canvas>
}

export default CanvasWrapper;