import { createMockReactiveVar } from "app/apollo/tests/mocks/createMockReactiveVar";
import {
  VisibilityFilter,
  VisibilityFilters,
} from "app/models/todo/VisibilityFilter";

export const mockVisibilityFilter = createMockReactiveVar<VisibilityFilter>(
  VisibilityFilters.SHOW_ALL
);
