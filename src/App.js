import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Task from "./Task";

import { useReducer, useState } from "react";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_TASK":
      console.log("*************");
      console.log(action.payload);
      console.log("(((((()))))))))))");
      console.log({ ...state, myTasks: [...state.myTasks, action.payload] });
      return { ...state, myTasks: [...state.myTasks, action.payload] };

    case "DELETE_TASK":
      let newTask = state.myTasks.filter(
        (tasks) => tasks.id !== action.payload
      );
      console.log(newTask);
      return { ...state, myTasks: newTask };
    case "EDIT_TASK":
      return { ...state, editing: true };
    case "UPDATE_TASK":
      let newTasks = state.myTasks.map((tasks) =>
        tasks.id === action.payload.id ? action.payload : tasks
      );
      return { ...state, editing: false, myTasks: newTasks };

    default:
      return state;
  }
};

export default function App() {
  let initialTask = {
    myTasks: [],
    editing: false,
  };
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");

  const [tasks, dispatch] = useReducer(tasksReducer, initialTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    let generateId = Date.now().toString();
    if (name && date) {
      dispatch({
        type: "ADD_TO_TASK",
        payload: { id: generateId, name: name, date: date },
      });

      toast.success("task added successfully");
    } else {
      toast.error("Please fill all fields");
    }

    clearFields();
  };

  const editTask = (e) => {
    e.preventDefault();
    if (name && date) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { id: id, name: name, date: date },
      });
    }
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
          onSubmit={tasks.editing ? editTask : handleSubmit}
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
              {tasks.editing ? "Update Task" : "Save Task"}
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
            {tasks.myTasks.length !== 0 ? (
              tasks.myTasks.map((task) => (
                <Task
                  task={task}
                  dispatch={dispatch}
                  key={task.id}
                  id={id}
                  setId={setId}
                  setName={setName}
                  setDate={setDate}
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
