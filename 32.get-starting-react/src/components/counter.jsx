import { useState } from "react";

function Counter(props) {
  console.log(props);
  // let count = props.initValue || 1;
  let [msg, setMsg] = useState("");
  let [count, setCount] = useState(props.initValue || 1);

  const increase = () => {
    console.log("increase");
    if (count + 1 > 10) {
      setMsg("Must be lower then 10");
      return;
    }
    setMsg("");
    setCount(count + 1);
  };

  const decrease = () => {
    console.log("decrease");
    if (count - 1 < 0) {
      setMsg("Must be positive");
      return;
    }
    setMsg("");
    setCount(count - 1);
  };

  return (
    <div>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
      <p>counter: {count}</p>
      <p>{msg}</p>
    </div>
  );
}

export default Counter;
