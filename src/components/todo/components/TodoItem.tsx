import { useState } from "react";
import PropTypes from "prop-types";
// functions
import clsx from "clsx";
// components
import TodoTextInput from "./TodoTextInput";

const TodoItem = ({ todo, editTodo, deleteTodo, completeTodo }: any) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => setIsEditing(true);

  const handleSave = (id: number, text: string) => {
    if (text.length === 0) deleteTodo(id);
    else editTodo(id, text);
    setIsEditing(false);
  };

  return (
    <li
      className={clsx({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      {isEditing ? (
        <TodoTextInput
          text={todo.text}
          isEditing={isEditing}
          onSave={(text: string) => handleSave(todo.id, text)}
        />
      ) : (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => {
              completeTodo(todo.id);
            }}
          />
          <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      )}
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
