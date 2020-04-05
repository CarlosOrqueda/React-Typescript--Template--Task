import React, { useState, FormEvent, useRef } from "react";
import { ITask } from "./interfaces/ITask";

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null)

  const handleInput = (e: FormEvent<HTMLInputElement>): void => {
    setNewTask(e.currentTarget.value);
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus()
  };

  const toggleDoneTask = (index : number) : void => {
    const newTasks : ITask[] = [...tasks]
    newTasks[index].done = !newTasks[index].done
    setTasks(newTasks)
  }

  const removeTask = (index: number) : void => {
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(index,1)
    setTasks(newTasks)
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <div className="card">
        <div className="card-body">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
            <input
              type="text"
              onChange={(e) => handleInput(e)}
              value={newTask}
              className="form-control"
              ref={taskInput}
              autoFocus
            />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success btn-block mt-2">Save</button>
            </div>
          </form>
        </div>
      </div>
      {tasks.map((task: ITask, index: number) => (
        <div className="card card-body mt-2" key={index}>
          <h2 style={{textDecoration: task.done ? 'line-through' : ''}}>{task.name}</h2>
          <div>
          <button className="btn btn-secondary" onClick={() => toggleDoneTask(index)}>
            {task.done ? '✓' : 'x'}
          </button>
          <button className="btn btn-danger" onClick={() => removeTask(index)}>
          🗑
          </button>
        </div>
        </div>
      ))}
        </div>
      </div>
    </div>
  );
}

export default App;
