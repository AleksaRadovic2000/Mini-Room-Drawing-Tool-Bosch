import CanvasWrapper from './components/CanvasWrapper'
import './App.css'
import { useState, useRef } from 'react';

type Point = {
    x: number;
    y: number;
};


function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCloseRoomCalled, setIsCloseRoomCalled] = useState<boolean>(false);

  const handleAddPoint = (p: Point) => setPoints(prev => [...prev, p]);
  const handleHover = (p: Point | null) => setHoveredPoint(p);

  const handeCloseRoom = () => {
    setIsCloseRoomCalled(true);

    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    ctx.beginPath();
    const n = points.length;
    for(let i = 0; i < n - 1; i++){
      const p1: Point = {x: points[i].x, y: points[i].y}; 
      const p2: Point = {x: points[i+1].x, y: points[i+1].y};

      const midX = Math.round((p1.x +p2.x) / 2); 
      const midY = Math.round((p1.y +p2.y) / 2);
      const line_len = Math.round(Math.hypot(p2.x - p1.x, p2.y - p1.y));

      ctx.fillStyle = 'green';
      ctx.font= '12px Arial';
      if(isAngleMoreHorisontal(p1, p2)){
        ctx.fillText(`${line_len} cm`, midX, midY-10);
      }else {
        ctx.fillText(`${line_len} cm`, midX+10, midY);
      }
      
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }


    const p1: Point = {x: points[n-1].x, y: points[n-1].y};      
    const p2: Point = {x: points[0].x, y: points[0].y};

    const midX = Math.round((p1.x +p2.x) / 2); 
    const midY = Math.round((p1.y +p2.y) / 2);
    const line_len = Math.round(Math.hypot(p2.x - p1.x, p2.y - p1.y));

    ctx.fillStyle = 'green';
    ctx.font= '12px Arial';
    if(isAngleMoreHorisontal(p1, p2)){
      ctx.fillText(`${line_len} cm`, midX, midY-10);
    }else {
      ctx.fillText(`${line_len} cm`, midX+10, midY);
    }

    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const handleReset = () => {
    setPoints([]);
    setHoveredPoint(null);
    setIsCloseRoomCalled(false)
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ectx = exportCanvas.getContext('2d');
    if(!ectx) return;

    ectx.fillStyle = 'white';
    ectx.fillRect(0, 0, canvas.width, canvas.height);
    ectx.drawImage(canvas, 0, 0);

    const image = exportCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'Room_designer_lite.png';
    link.click();
  };


  return (
    <div className='flex col justify gap-10 align-items'>
      <h1>Room Designer Lite</h1>
      <div className='flex row gap-10 justify'>
        <button onClick={handeCloseRoom}>Close Room</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleExport}>Save as PNG</button>
      </div>
      <CanvasWrapper
      isCloseRoomCalled={isCloseRoomCalled}
      setIsCloseRoomCalled={setIsCloseRoomCalled}
      onCloseRoom={handeCloseRoom}
      canvasRef={canvasRef}
      onHover={handleHover}
      onAddPoint={handleAddPoint}
      points={points}
      hoveredPoint={hoveredPoint}
      width={800} height={800}
      />
    </div>
  )
}
export default App;


function isAngleMoreHorisontal(p1: Point, p2: Point) : boolean {
  const dx = p2.x -p1.x;
  const dy = p2.y -p1.y;

  const magnitude = Math.sqrt(dx * dx + dy * dy);

  if(magnitude === 0) return true;

  const cosX = dx / magnitude;
  const cosY = dy / magnitude;

  return Math.abs(cosX) > Math.abs(cosY)
}