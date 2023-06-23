import React, { useContext } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import Context from "../context";
import { FaSort } from "react-icons/fa";

const TodoList = (props) => {
  const { filterHandlerByDate } = useContext(Context);
  return (
    <ul>
      <div className="list__header">
        <div className="list__header_num">
          <p className="list__header_item">№</p>
        </div>
        <p className="list__header_item">Task</p>
        <p className="list__header_item">Priority</p>
        <div className="list__header_box">
          <p className="list__header_item">Expiration date</p>
          <button onClick={() => filterHandlerByDate(props.filteredTodos)}>
            <FaSort />
          </button>
        </div>

        <p className="list__header_item">Responsible executive</p>
        <p className="list__header_item">Status</p>
      </div>
      {props.filteredTodos.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            index={index}
            onChange={props.onToggle}
          />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoList;
