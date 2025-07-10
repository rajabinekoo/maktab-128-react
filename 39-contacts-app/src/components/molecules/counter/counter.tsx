import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../redux/store";
import { counterActions } from "../../../redux/slices/counterSlice";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(counterActions.increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(counterActions.decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
