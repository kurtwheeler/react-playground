import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, { useState } from "react";
import Todo from "./components/Todo";

import { nanoid } from "nanoid";


function App(props) {
  const initial_tasks = [{id: nanoid(), name: "Eat", completed: true},
                         {id: nanoid(), name: "Sleep", completed: false},
                         {id: nanoid(), name: "Repeat", completed: false}]
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState(initial_tasks);
  const [filtering, setFiltering] = useState("All")

  function filterTasks(task) {
    if (filtering === "All") {
      return true
    }
    else if (filtering === "Active") {
      return !task.completed
    }
    else if (filtering === "Completed") {
      return task.completed
    }
  }

  function addTask(task) {
    setTasks([...tasks, task])
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if ( task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function editTask(id, newName) {
    const updatedTasks = tasks.map((task) => {
      if ( task.id === id) {
        return {...task, name: newName};
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>Kurt's Dope To Do Jawn</h1>
      <Form name={name} setName={setName} addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {["All", "Active", "Completed"].map((filter) =>
          <FilterButton key={filter}
                        filter={filter}
                        setFiltering={setFiltering}
          isPressed={filter===filtering} />
        )}
      </div>
      <h2 id="list-heading">
        {tasks.filter(task => !task.completed).length} tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasks.filter(filterTasks).map((task) =>
          <Todo id ={task.id}
                key={task.id}
                name={task.name}
                completed={task.completed}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask} />
        )}
      </ul>
    </div>
  );
}

export default App;
