// state
import { visibilityFilterVar, todosVar } from "app/apollo/main/todo";
import { todoMutations } from "app/apollo/main/todo/mutations";
// components
import TodoList from "./components/TodoList";
// constants
import {
  VisibilityFilter,
  VisibilityFilters,
} from "app/models/todo/VisibilityFilter";
import { Todos } from "app/models/todo/Todos";

function filterTodosByVisibility(
  visibilityFilter: VisibilityFilter,
  todos: Todos
) {
  switch (visibilityFilter.id) {
    case VisibilityFilters.SHOW_ALL.id:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED.id:
      return todos.filter((t) => t.completed);
    case VisibilityFilters.SHOW_ACTIVE.id:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error("Unknown filter: " + visibilityFilter);
  }
}

export default function VisibleTodoList() {
  const { completeTodo, deleteTodo, editTodo } = todoMutations;
  const todos = todosVar();
  const filteredTodos = filterTodosByVisibility(visibilityFilterVar(), todos);

  return (
    <TodoList
      filteredTodos={filteredTodos}
      actions={{
        completeTodo,
        deleteTodo,
        editTodo,
      }}
    />
  );
}
