import { Todos } from "app/models/todo/Todos";
import { createMockReactiveVar } from "app/apollo/tests/mocks/createMockReactiveVar";

export const mockTodosVar = createMockReactiveVar<Todos>([]);