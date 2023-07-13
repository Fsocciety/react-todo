import { useState } from "react";
import axios from "axios";

export const Modal = ({ task, isOpen, onClose, id, setItemList }) => {
  const [value, setValue] = useState("");
  if (!isOpen) {
    return null;
  }

  const updateItem = async (id) => {
    const currentDate = new Date(Date.now())
      .toISOString()
      .replace(/T/, " ")
      .split(".")[0]
      .split(" ");
    let time = currentDate[1].split(":");

    // Temporary solution, mysql timezone problem
    time = parseInt(time[0]) + 2 + ":" + time[1] + ":" + time[2];

    const data = {
      title: value,
      date: currentDate[0],
      time: time,
    };
    console.log(data);
    await axios.put(`http://localhost:8080/todos/${id}`, data);
    const response = await axios.get("http://localhost:8080/todos");
    const jsonData = response.data;
    setItemList(jsonData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="modal-title">Update task</h2>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Update the title..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="update-btn modal-btn"
            onClick={() => updateItem(id)}
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};
