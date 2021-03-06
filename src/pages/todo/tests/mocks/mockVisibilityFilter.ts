import { createMockReactiveVar } from "app/apollo/tests/createMockReactiveVar";
import {
  VisibilityFilter,
  VisibilityFilters,
} from "app/models/todo/VisibilityFilter";

export const mockVisibilityFilter = createMockReactiveVar<VisibilityFilter>(
  VisibilityFilters.SHOW_ALL
);
