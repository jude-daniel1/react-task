import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

const Task = ({
  task,
  setTasks,
  tasks,
  setId,
  setName,
  setDate,
  isEditing,
  setIsEditing,
}) => {
  const handleDelete = () => {
    let result = tasks.filter((myTask) => myTask.id !== task.id);
    setTasks(result);
  };

  const handleEdit = () => {
    setName(task.name);
    setDate(task.date);
    setId(task.id);
    setIsEditing(!isEditing);
  };
  return (
    <div className="flex justify-between p-4 bg-white text-black rounded-md shadow-md hover:bg-blue-200 transition ease-in-out duration-300">
      <div>
        <p>
          <span className="font-bold text-lg">Task: </span>
          <span>{task.name}</span>
        </p>
        <p>
          <span className="font-bold text-sm">Date: </span>
          <span>{task.date}</span>
        </p>
      </div>
      <div>
        <button>
          <TrashIcon className="h-6 w-6 text-red-500" onClick={handleDelete} />
        </button>

        <button>
          <PencilSquareIcon
            className="h-6 w-6 text-blue-500"
            onClick={handleEdit}
          />
        </button>
      </div>
    </div>
  );
};

export default Task;
