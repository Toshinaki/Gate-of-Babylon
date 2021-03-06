import { Todo, Todos } from "app/models/todo/Todos";
import { ReactiveVar } from "@apollo/client";

export default function editTodo(todosVar: ReactiveVar<Todos>) {
  return (id: number, text: string) => {
    let todosWithEditedTodo = todosVar().map((todo: Todo) =>
      todo.id === id ? { ...todo, text } : todo
    );

    todosVar(todosWithEditedTodo);
  };
}
