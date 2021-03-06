import { makeVar } from "@apollo/client";
import { Todos } from "app/models/todo/Todos";
import {
  VisibilityFilter,
  VisibilityFilters,
} from "app/models/todo/VisibilityFilter";

// Create the initial value
const todosInitialValue: Todos = [
  {
    id: 0,
    completed: false,
    text: "Use Apollo Client 3",
  },
];

// Create the todos var and initialize it with the initial value
export const todosVar = makeVar<Todos>(todosInitialValue);

export const visibilityFilterVar = makeVar<VisibilityFilter>(
  VisibilityFilters.SHOW_ALL
);
