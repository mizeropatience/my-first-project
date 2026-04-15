import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", completed: true },
    { id: 2, text: "Study React for exam", completed: false },
    { id: 3, text: "Finish project documentation", completed: false },
  ]);

  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md">

        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-4 rounded-t-xl text-lg font-semibold">
          ✅ My To-Do List
        </div>

        {/* Progress */}
        <div className="p-4">
          <p className="text-center text-gray-500 text-sm mb-2">
            {completedCount} of {tasks.length} tasks completed
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{
                width: `${(completedCount / tasks.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2 p-4">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 border rounded-lg px-3 py-2 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="p-4 space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex justify-between items-center p-3 rounded-lg border ${
                task.completed ? "bg-green-100" : "bg-gray-50"
              }`}
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => toggleTask(task.id)}
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    task.completed
                      ? "bg-green-500 text-white"
                      : ""
                  }`}
                >
                  {task.completed && "✓"}
                </div>

                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-600"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}