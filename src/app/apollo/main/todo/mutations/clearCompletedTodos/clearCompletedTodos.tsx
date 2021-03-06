import { ReactiveVar } from "@apollo/client";
import { Todos } from "app/models/todo/Todos";

export default function createClearCompletedTodos(
  todosVar: ReactiveVar<Todos>
) {
  return () => {
    const nonCompletedTodos = todosVar().filter((t) => t.completed !== true);

    todosVar(nonCompletedTodos);
  };
}
