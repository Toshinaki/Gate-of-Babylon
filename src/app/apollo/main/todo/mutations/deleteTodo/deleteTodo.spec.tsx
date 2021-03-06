import createDeleteTodo from "./deleteTodo";
import { mockTodosVar } from "app/apollo/tests/mocks/todo/mockTodosVar";

const deleteTodo = createDeleteTodo(mockTodosVar);

describe("deleteTodo hook", () => {
  beforeEach(() => mockTodosVar([]));

  it("should delete a todo from the list of todos", () => {
    mockTodosVar([{ id: 0, text: "First todo", completed: false }]);
    deleteTodo(0);

    expect(mockTodosVar().length).toEqual(0);
  });
});
