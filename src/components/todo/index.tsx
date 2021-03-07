// import PropTypes from "prop-types";
// state
import { useReactiveVar } from "@apollo/client";
import { todosVar } from "app/apollo/main/todo";
// functions
import { todoMutations } from "app/apollo/main/todo/mutations";
// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import VisibleTodoList from "./VisibleTodoList";

/**
 * This is a view component. It doesn't define anything that
 * is responsible for querying or mutating, it just relies
 * on it from the upper layer component (namely, actions)
 */

const Container = () => {
  const todos = useReactiveVar(todosVar);
  // const activeVisibilityFilter = useReactiveVar(visibilityFilterVar);

  const todosCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="wrapper">
      <Header addTodo={todoMutations.addTodo} />

      <section className="main">
        {!!todosCount && (
          <span>
            <input
              className="toggle-all"
              type="checkbox"
              checked={completedCount === todosCount}
              readOnly
            />
            <label onClick={todoMutations.completeAllTodos} />
          </span>
        )}
        <VisibleTodoList />
        {!!todosCount && (
          <Footer
            // activeVisibilityFilter={activeVisibilityFilter}
            completedCount={completedCount}
            activeCount={todosCount - completedCount}
            onClearCompleted={todoMutations.clearCompletedTodos}
            setVisibilityFilter={todoMutations.setVisibilityFilter}
          />
        )}
      </section>
    </div>
  );
};

export default Container;
