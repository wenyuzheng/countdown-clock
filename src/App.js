import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const timer = 61;
  const [minute, setMinute] = useState(Math.floor(timer / 60));
  const [second, setSecond] = useState(timer % 60);
  const [start, setStart] = useState(false);

  const handleStartClick = () => {
    setStart(true);
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (start) {
        if (minute === 0 && second === 0) {
          clearInterval(countdown);
          setStart(false);
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
        clearInterval(countdown);
        setStart(false);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [start, minute, second]);

  return (
    <div className="App">
      <button onClick={handleStartClick}>Start</button>
      <div>
        {minute}:{second}
      </div>
    </div>
  );
}

export default App;
