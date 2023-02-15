import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import Task from "./Task";

export default function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let generateId = Date.now().toString();
    if (name && date) {
      tasks.push({
        id: generateId,
        name: name,
        date: date,
      });

      toast.success("task added successfully");
    } else {
      toast.error("Please fill all fields");
    }

    clearFields();
  };

  const editTask = (e) => {
    e.preventDefault();
    let recentTask = tasks.map((newTask) => {
      if (newTask.id === id) {
        return { ...newTask, name: name, date: date };
      }
      return newTask;
    });
    console.log(recentTask);
    setTasks(recentTask);
    setIsEditing(false);
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setDate("");
  };
  return (
    <div className="w-full bg-gray-300 min-h-screen flex justify-between items-center flex-col p-5">
      <ToastContainer />
      <div className="w-[600px] bg-blue-600 min-h-[800px] ">
        <p className="text-3xl font-bold text-white p-5">
          Task Management System
        </p>
        <form
          action=""
          className="flex flex-col space-y-5 p-5"
          onSubmit={isEditing ? editTask : handleSubmit}
        >
          <p>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              className="py-2 border border-blue-500 w-full px-2"
              placeholder="Task Name"
              onChange={(e) => setName(e.target.value)}
            />
          </p>

          <p>
            <input
              type="date"
              id="title"
              name="title"
              value={date}
              className="py-2 border border-blue-500 w-full px-2"
              placeholder="Task Date"
              onChange={(e) => setDate(e.target.value)}
            />
          </p>
          <p>
            <button
              className="bg-orange-500 py-2 px-5 transition ease-in-out hover:bg-blue-800 rounded-sm w-full
            "
            >
              {isEditing ? "Update Task" : "Save Task"}
            </button>
          </p>
        </form>

        <div className="w-full p-5">
          <h2 className="text-3xl font-bold font-sans text-white py-3">
            Task List
          </h2>
          <hr className="bg-white" />
          <br />
          <div className="space-y-3">
            {tasks.length !== 0 ? (
              tasks.map((task) => (
                <Task
                  task={task}
                  setTasks={setTasks}
                  key={task.id}
                  tasks={tasks}
                  id={id}
                  setId={setId}
                  setName={setName}
                  setDate={setDate}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              ))
            ) : (
              <p className="text-white text-lg">No Task Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
