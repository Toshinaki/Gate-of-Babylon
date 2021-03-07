import PropTypes from "prop-types";
// state
import { useReactiveVar } from "@apollo/client";
import { visibilityFilterVar } from "app/apollo/main/todo";
// functions
import clsx from "clsx";
// constants
import {
  VisibilityFilters,
  VisibilityFilter,
} from "app/models/todo/VisibilityFilter";

interface FooterProps {
  // activeVisibilityFilter: VisibilityFilter;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
  setVisibilityFilter: (filter: VisibilityFilter) => void;
}

const Footer = ({
  activeCount,
  completedCount,
  onClearCompleted,
  setVisibilityFilter,
}: FooterProps) => {
  const itemWord = activeCount === 1 ? "item" : "items";
  const activeVisibilityFilter = useReactiveVar(visibilityFilterVar);
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(VisibilityFilters)
          .map((key) => VisibilityFilters[key])
          .map((filter) => (
            <li key={filter.id}>
              <a
                className={clsx({
                  selected: activeVisibilityFilter.id === filter.id,
                })}
                style={{ cursor: "pointer" }}
                onClick={() => setVisibilityFilter(filter)}
              >
                {filter.displayName}
              </a>
            </li>
          ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  setVisibilityFilter: PropTypes.func.isRequired,
  // activeVisibilityFilter: PropTypes.shape({
  //   id: PropTypes.string,
  //   displayName: PropTypes.string,
  // }).isRequired,
};

export default Footer;
