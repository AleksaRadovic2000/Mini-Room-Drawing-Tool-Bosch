import { useEffect, type Dispatch, type SetStateAction } from "react";

type Point = {
    x: number;
    y: number;
};

type CanvasWrapperProps = {
    width: number;
    height: number;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    points: Point[];
    hoveredPoint: Point | null;
    onAddPoint: (p: Point) => void;
    onHover: (p: Point | null) => void;
    isCloseRoomCalled: boolean;
    onCloseRoom: () => void;
    setIsCloseRoomCalled: Dispatch<SetStateAction<boolean>>;
};


const colors = {
  canvasBg: "rgb(255, 255, 255)",
  point: "rgb(0, 0, 0)",
  pointHover: "rgb(55, 65, 81)",
  line: "rgb(156, 163, 175)"
};

const canvasFont = '15px Arial';

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
    onCloseRoom,
}: CanvasWrapperProps) {


    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        points.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = colors.point;
            ctx.fill()
        })

        if(hoveredPoint) {
            canvas.style.cursor = 'pointer'
            ctx.fillStyle = colors.pointHover;
            ctx.font = canvasFont;
            ctx.fillText(`(${hoveredPoint.x}, ${hoveredPoint.y})`,
                hoveredPoint.x+10, hoveredPoint.y -10);

            if(isCloseRoomCalled) onCloseRoom();
        }else{
            canvas.style.cursor = ''
        }

        if(isCloseRoomCalled) onCloseRoom();

    },[points, hoveredPoint]);

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
        };

        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mousemove', handleMove);

        return () => {
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('mousemove', handleMove)
        };
    }, [points, hoveredPoint])



    return (
        <div className="canvas-wrapper mb-10">
            <canvas width={width} height={height}
            ref={canvasRef}
            />
        </div>
    )
}

export default CanvasWrapper;