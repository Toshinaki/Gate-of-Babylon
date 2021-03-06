import { todosVar } from "./todo";

export default {
  todos: {
    read() {
      return todosVar();
    },
  },
};
