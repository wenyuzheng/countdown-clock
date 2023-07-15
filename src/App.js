import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [timer, setTimer] = useState(2);
  const [minute, setMinute] = useState(Math.floor(timer / 60));
  const [second, setSecond] = useState(timer % 60);
  const [start, setStart] = useState(false);

  const handleStartClick = () => {
    setStart(true);
  };

  const handlePausClick = () => {
    setStart(false);
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
    const newTimer = timer + 60;
    setTimer(newTimer);
    setMinute(Math.floor(newTimer / 60));
    setSecond(newTimer % 60);
  };

  const decrementTimer = () => {
    const newTimer = timer - 60;
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
      <button onClick={handlePausClick}>Pause</button>
      <div>
        {minute}:{second}
      </div>
    </div>
  );
}

export default App;
