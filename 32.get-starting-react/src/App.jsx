import Counter from "./components/counter";
import "./App.css";

export function App() {
  const title = "Counting App";
  return (
    <div>
      <p>{title}</p>
      <Counter a={2} b={2} initValue={4} />
      {/* {Counter({initValue: 10})} */}
    </div>
  );
}

// const counter = () => {
//   const count = 1;
//   return `<p>counter: ${count}</p>`
// }

// const app = () => {
//   const msg = "salam";
//   return `<div>
//     <p>${msg} ok ok</p>
//     ${counter()}
//   </div>`
// }
