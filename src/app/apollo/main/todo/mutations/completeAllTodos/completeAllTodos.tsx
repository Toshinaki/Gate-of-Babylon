import { Todo, Todos } from "app/models/todo/Todos";
import { ReactiveVar } from "@apollo/client";

export default function completeAllTodos(todosVar: ReactiveVar<Todos>) {
  return () => {
    const allTodosCompleted = todosVar().map((t: Todo) => ({
      ...t,
      completed: true,
    }));

    todosVar(allTodosCompleted);
  };
}
