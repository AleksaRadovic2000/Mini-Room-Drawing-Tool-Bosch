import { useEffect, type Dispatch, type SetStateAction } from "react";



type Point = {
    x: number;
    y: number;
};

type CanvasWrapperProps = {
    width: number;
    height: number;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    points: Point[];
    hoveredPoint: Point | null;
    onAddPoint: (p: Point) => void;
    onHover: (p: Point | null) => void;
    isCloseRoomCalled: boolean;
    onCloseRoom: () => void;
    setIsCloseRoomCalled: Dispatch<SetStateAction<boolean>>;
};




function CanvasWrapper ({
    width,
    height,
    canvasRef,
    points,
    hoveredPoint,
    onAddPoint,
    onHover,
    isCloseRoomCalled,
    setIsCloseRoomCalled,
    onCloseRoom
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

        if(hoveredPoint) {
            ctx.fillStyle = 'blue';
            ctx.font = '15px Arial';
            ctx.fillText(`(${hoveredPoint.x}, ${hoveredPoint.y})`,
                hoveredPoint.x+10, hoveredPoint.y -10);

            if(isCloseRoomCalled) onCloseRoom();
        }

        if(isCloseRoomCalled) onCloseRoom();

    },[points, hoveredPoint, isCloseRoomCalled]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const handleClick = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = Math.round(event.clientX - rect.left);
            const y = Math.round(event.clientY - rect.top);
            onAddPoint({x, y});
            setIsCloseRoomCalled(false);
            
        };

        const handleMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const hovered = points.find( p => Math.hypot(p.x - x, p.y - y) < 3);
            onHover(hovered || null)
        }

        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mousemove', handleMove);

        return () => {
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('mousemove', handleMove)
        };
    }, [points, hoveredPoint, onAddPoint])



    return <canvas width={width} height={height}
        ref={canvasRef}
        style={{backgroundColor: 'lightblue'}}
    ></canvas>
}

export default CanvasWrapper;