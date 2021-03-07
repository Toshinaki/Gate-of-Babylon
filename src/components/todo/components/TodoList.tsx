import PropTypes from "prop-types";
// components
import TodoItem from "./TodoItem";
// constants
import { Todo } from "app/models/todo/Todos";

const TodoList = ({ filteredTodos, actions }: any) => (
  <ul className="todo-list">
    {filteredTodos.map((todo: Todo) => (
      <TodoItem key={todo.id} todo={todo} {...actions} />
    ))}
  </ul>
);

TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  actions: PropTypes.object.isRequired,
};

export default TodoList;
