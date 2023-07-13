import { useState, useEffect } from "react";
import axios from "axios";
import { ListItem } from "./components/ListItem";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/todos");
    const jsonData = await response.data;
    setItemList(jsonData);
  };

  let currentDate = new Date(Date.now())
    .toISOString()
    .replace(/T/, " ")
    .split(".")[0];
  let datetime = currentDate.split(" ");
  let date = datetime[0];
  let time = datetime[1];
  let data = {
    title: value,
    date: date,
    time: time,
  };
  const addItem = async () => {
    await axios.post("http://localhost:8080/todos", data);
    const response = await axios.get("http://localhost:8080/todos");
    const jsonData = await response.data;
    setItemList(jsonData);
    setValue("");
  };

  return (
    <div className="App">
      <h1 className="todo-header">Todo List</h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Add an item..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="add-btn" onClick={() => addItem()}>
          ADD
        </button>
      </div>
      <ul>
        {itemList.map((item) => (
          <ListItem key={item.id} task={item} setItemList={setItemList} />
        ))}
      </ul>
    </div>
  );
}

export default App;
