import { VisibilityFilter } from "app/models/todo/VisibilityFilter";
import { ReactiveVar } from "@apollo/client";

export default function setVisibilityFilter(
  visibilityFilterVar: ReactiveVar<VisibilityFilter>
) {
  return (filter: VisibilityFilter) => {
    visibilityFilterVar(filter);
  };
}
