import "./App.css";
import { useRef, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);

  const handleStart = () => {
    const initialTime = Date.now() - time * 1000;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - initialTime) / 1000;
      setTime(elapsedTime);
    }, 10);
  };
  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const handleLap = () => {
    const lapTime = time;
    setLaps([...laps,formatTime(lapTime)]);
  };
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const milliseconds = Math.floor((timeInSeconds % 1) * 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(
      2,
      "0"
    )}`;
  };

  let  formattedTime = formatTime(time);

  return (
    <div className="App">
      <h1>Stopwatch: {formattedTime}</h1>
      <div>
        <button onClick={handleReset} disabled={isRunning}>Reset</button>
        <button onClick={isRunning ? handleStop : handleStart}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
      </div>
      <div className="laptimes">
        <h2>Lap Times</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: {lap} seconds
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
