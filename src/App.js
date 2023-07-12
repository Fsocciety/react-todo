import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/todos");
    const data = await response.json();
    setItems(data);
  };

  function addItem() {
    let date = new Date(Date.now());
    date = date.toISOString().replace(/T/, " ").split(".")[0];

    let data = {
      todo: newItem,
      datetime: date,
    };

    axios.post("http://localhost:8080/todos", data).then(() => {
      console.log("success");
    });

    // Ako uradim ovako radi, nemam id koji treba dole posle za list item
    setItems((oldItems) => [...oldItems, data]);
  }

  function deleteItem(id) {
    axios.delete(`http://localhost:8080/todos/${id}`).then((response) => {
      setItems(items.filter((value) => value.id == id));
    });
  }

  return (
    <div className="App">
      <h1>Todo List App</h1>

      <input
        type="text"
        placeholder="Add an item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={() => addItem()}>Add</button>

      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              {item.id} {item.todo}{" "}
              {item.datetime.replace(/T/, " ").split(".")[0]}
              <button onClick={() => deleteItem(item.id)}>X</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
