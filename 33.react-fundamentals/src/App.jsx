import { useState } from "react";
import styles from "./App.module.css";

function itemGenerator() {
  let id = 1;
  return function Item(name) {
    this.id = id;
    this.name = name;
    id += 1;
  };
}

const Item = itemGenerator();

// duplication - remove - error msg

export function App() {
  const [msg, setMsg] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([
    new Item("Milk"),
    new Item("Cake"),
    new Item("Coffee"),
  ]);

  const changeInput = (event) => {
    setInputValue(event.target.value);
    setMsg("");
  };

  const addItem = () => {
    if (!inputValue?.length) {
      return setMsg("Empty input");
    }
    const duplicate = list.find(
      (el) => el.name.toLowerCase() === inputValue.toLowerCase()
    );
    if (duplicate) {
      return setMsg("Duplicated");
    }
    setList([...list, new Item(inputValue)]);
    setInputValue("");
  };

  const removeItem = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.title}>Cart Items</p>
        {list.map((el) => (
          <div key={el.id} className={styles["cart-row"]}>
            <p>{el.name}</p>
            <button
              className={styles["del-btn"]}
              onClick={() => removeItem(el.id)}
              // onClick={removeItem.bind({}, el.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={changeInput}
          className={styles.inp}
        />
        <button onClick={addItem} className={styles["form-btn"]}>
          Add
        </button>
      </div>
      {/* {false ? <p>ok1</p> : <p>ok2</p>} */}
      {msg.length > 0 && (
        <div className={styles["msg-err"]}>
          <p>{msg}</p>
        </div>
      )}
      {/* <div className={msg.length > 0 ? styles["msg-err"] : "hide"}>
        <p>{msg}</p>
      </div> */}
      {/* <div className={styles["msg-err"]}>
        <p>{msg}</p>
      </div> */}
    </div>
  );
}
