import CanvasWrapper from './components/CanvasWrapper'
import './App.css'
import { useState, useRef } from 'react';

type Point = {
    x: number;
    y: number;
};


function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleAddPoint = (p: Point) => setPoints(prev => [...prev, p]);

  const handeCloseRoom = () => {
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
  }


  return (
    <div className='flex col justify gap-10 align-items'>
      <h1>Room Designer Lite</h1>
      <div className='flex row gap-10 justify'>
        <button onClick={handeCloseRoom}>Close Room</button>
        <button onClick={handleReset}>Reset</button>
        <button>Save as PNG</button>
      </div>
      <CanvasWrapper
      canvasRef={canvasRef}
      onAddPoint={handleAddPoint}
      points={points}
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