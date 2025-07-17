import CanvasWrapper from './components/CanvasWrapper'
import './App.css'
import { useState, useRef } from 'react';
import ConfirmModal from './components/ConfirmModal';
import { isAngleMoreHorisontal, createEdges, hasProperXIntersection } from './utils/geometryUtils';

type Point = {
    x: number;
    y: number;
};

const colors = {
  canvasBg: "rgb(255, 255, 255)",
  point: "rgb(0, 0, 0)",
  pointHover: "rgb(55, 65, 81)",
  line: "rgb(156, 163, 175)",
  dimension: "rgba(204, 14, 14, 1)"
};

const canvasFont = '13px Arial';

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCloseRoomCalled, setIsCloseRoomCalled] = useState<boolean>(false);
  const [showModalReset, setShowModalReset] = useState<boolean>(false);
  const [showModalCloseRoom, setShowModalCloseRoom] = useState<boolean>(false);


  const handleAddPoint = (p: Point) => setPoints(prev => [...prev, p]);
  const handleHover = (p: Point | null) => setHoveredPoint(p);

  const handeCloseRoom = () => {
    setIsCloseRoomCalled(true);

    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;
    if(points.length < 2) return;

    if(hasProperXIntersection(createEdges(points))) {
      setShowModalCloseRoom(true);
      return;
    }


    ctx.beginPath();
    const n = points.length;
    for(let i = 0; i < n - 1; i++){
      const p1: Point = {x: points[i].x, y: points[i].y}; 
      const p2: Point = {x: points[i+1].x, y: points[i+1].y};

      const midX = Math.round((p1.x +p2.x) / 2); 
      const midY = Math.round((p1.y +p2.y) / 2);
      const line_len = Math.round(Math.hypot(p2.x - p1.x, p2.y - p1.y));


      ctx.fillStyle = colors.dimension;
      ctx.font= canvasFont;
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


    ctx.fillStyle = colors.dimension;
    ctx.font= canvasFont;
    if(isAngleMoreHorisontal(p1, p2)){
      ctx.fillText(`${line_len} cm`, midX, midY-10);
    }else {
      ctx.fillText(`${line_len} cm`, midX+10, midY);
    }
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);

    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const handleReset = () => setShowModalReset(true);

  const confirmReset = () => {
    setPoints([]);
    setHoveredPoint(null);
    setIsCloseRoomCalled(false);
    setShowModalReset(false);
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ectx = exportCanvas.getContext('2d');
    if(!ectx) return;

    ectx.fillStyle = colors.canvasBg;
    ectx.fillRect(0, 0, canvas.width, canvas.height);
    ectx.drawImage(canvas, 0, 0);

    const image = exportCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'Room_designer_lite.png';
    link.click();
  };

  const removeLastPoint = () => {
    setPoints(prev => prev.slice(0, -1));
    setIsCloseRoomCalled(false);
  }

  const confirmCloseRoom = () => {
    setShowModalCloseRoom(false)
    setIsCloseRoomCalled(false)
  }


  return (
    <div className='flex col justify-center gap-20 align-items'>
      <h1>Room Designer Lite</h1>
      <div className='flex row gap-10 justify-around size'>
        <button className='canvas-btn' onClick={removeLastPoint}>Remove Point</button>
        <button className='canvas-btn' onClick={handeCloseRoom}>Close Room</button>
        <button className='canvas-btn' onClick={handleReset}>Reset</button>
        <button className='canvas-btn' onClick={handleExport}>Save as PNG</button>
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

      {showModalCloseRoom && (
        <ConfirmModal 
          hidden={true}
          message={`The shape is invalid. Please ensure lines don't cross and the room is convex.`}
          onConfirm={confirmCloseRoom}
        />
      )}

      {showModalReset && (
        <ConfirmModal 
          message='Are you sure you want to reset?'
          onConfirm={confirmReset}
          onCancel={()=> setShowModalReset(false)}
        />
      )}

    </div>
  )
}
export default App;