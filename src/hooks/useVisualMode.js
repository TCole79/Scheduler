import { useState } from "react";


// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]); // This line is new!
//   // the rest of your code //

//   function transition(mode) {
//     setMode(mode); // return is not needed
//   }

//   function back() {
//   }

//   return { mode, transition, back, history };
// }


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) back();
    setHistory((prev) => [...prev, newMode]);
    return setMode(newMode);
  };
  const back = () => {
    if (history.length > 1) { // not sure why changing this to '>= 1' makes the tests fail
      const newHistory = [...history.slice(0, history.length - 1)]; // alternate way is to use push and pop
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}