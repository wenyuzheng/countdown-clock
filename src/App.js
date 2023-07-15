import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const count = 2;
  const [timer, setTimer] = useState(count);
  const [minute, setMinute] = useState(Math.floor(count / 60));
  const [second, setSecond] = useState(count % 60);
  const [start, setStart] = useState(false);

  const handleStartClick = () => {
    setStart(true);
  };

  const handlePauseClick = () => {
    setStart(false);
  };

  const handleResetClick = () => {
    setStart(false);
    setTimer(count);
    setMinute(Math.floor(count / 60));
    setSecond(count % 60);
  };

  useEffect(() => {
    const stopCountdown = () => {
      clearInterval(countdown);
      setStart(false);
    };

    const countdown = setInterval(() => {
      if (start) {
        if (minute === 0 && second === 0) {
          stopCountdown();
          return;
        }
        const newSec = second - 1;
        if (newSec < 0) {
          setSecond(59);
          setMinute(minute - 1);
        } else {
          setSecond(newSec);
        }
      } else {
        stopCountdown();
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [start, minute, second]);

  const incrementTimer = () => {
    if (start) return;
    const newTimer = timer + 60;
    setTimer(newTimer);
    setMinute(Math.floor(newTimer / 60));
    setSecond(newTimer % 60);
  };

  const decrementTimer = () => {
    const newTimer = timer - 60;
    if (start || newTimer < 0) return;

    setTimer(newTimer);
    setMinute(Math.floor(newTimer / 60));
    setSecond(newTimer % 60);
  };

  return (
    <div className="App">
      <div onClick={incrementTimer}>+</div>
      <div>{timer}</div>
      <div onClick={decrementTimer}>-</div>

      <button onClick={handleStartClick}>Start</button>
      <button onClick={handlePauseClick}>Pause</button>
      <button onClick={handleResetClick}>Reset</button>

      <div>
        {minute}:{second}
      </div>
    </div>
  );
}

export default App;
