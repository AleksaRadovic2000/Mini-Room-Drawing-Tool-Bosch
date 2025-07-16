import CanvasWrapper from './components/CanvasWrapper'
import './App.css'
import { useState } from 'react';

type Point = {
    x: number;
    y: number;
};


function App() {
  const [points, setPoints] = useState<Point[]>([])


  const handleAddPoint = (p: Point) => setPoints(prev => [...prev, p])

  return (
    <div className='flex col justify gap-10 align-items'>
      <h1>Room Designer Lite</h1>
      <div className='flex row gap-10 justify'>
        <button>Close Room</button>
        <button>Reset</button>
        <button>Save as PNG</button>
      </div>
      <CanvasWrapper
      onAddPoint={handleAddPoint}
      points={points}
      width={800} height={800}
      />
    </div>
  )
}

export default App;
