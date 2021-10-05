import React, { useState } from "react";

const Todo = ({id, name, completed, toggleTaskCompleted, deleteTask, editTask}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  function handleCheckboxChange(e) {
    toggleTaskCompleted(id)
  }

  function handleNameChange(e) {
    setNewName(e.target.value)
  }

  function toggleIsEditing(e) {
    setIsEditing(!isEditing)
  }

  function handleDelete(e) {
    e.preventDefault();
    deleteTask(id)
  }

  function handleSaveEdit(e) {
    e.preventDefault()
    editTask(id, newName)
    toggleIsEditing()
  }

  const editingTemplate = (
    <form className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input id={id} type="text" className="todo-text" value={newName} onChange={handleNameChange} />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={toggleIsEditing}>
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" onClick={handleSaveEdit} className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input id={name} type="checkbox" defaultChecked={completed} onChange={handleCheckboxChange} />
        <label className="todo-label" htmlFor="todo-0">
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={toggleIsEditing}>
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button type="button" onClick={handleDelete} className="btn btn__danger">
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
