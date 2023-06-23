import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Context from "../context";
import Modal from "../Modal/Modal.js";


const TodoItem = ({ todo, index, onChange }) => {
  const { removeTodo } = useContext(Context);
  const classes = ["todo__item_description"];

  if (todo.completed) {
    classes.push("done");
  }

  const [modalActive, setModalActive] = useState(false);

  return (
    <div>
      <li onClick={() => setModalActive(true)} className={classes.join(" ")}>
        <div className="todo__item_description_num">
          <input
            onClick={(e) => e.stopPropagation}
            type="checkbox"
            checked={todo.completed}
            className="todo_checkbox"
            onChange={() => onChange(todo.id)}
          />
          <p>{index + 1 + "."}</p>
        </div>
        <p className="todo__item_description_item">{todo.title}</p>
        <p className="todo__item_description_item">{todo.priority}</p>
        <p className="todo__item_description_item">{new Date(todo.expirationDate).toLocaleDateString()}</p>
        <p className="todo__item_description_item">{todo.responsibleExecutive}</p>
        <p className="todo__item_description_item">{todo.status}</p>
        <button
          className="todo__item_description_content_delete"
          onClick={() => removeTodo(todo.id)}
        >
          &times;
        </button>
      </li>
      <Modal active={modalActive} setActive={setModalActive}>
        <h1 className="modal__title">{todo.title}</h1>
        <p><strong>Task Description: </strong>{todo.description}</p>
        <p><strong>Priority: </strong>{todo.priority}</p>
        <p><strong>Date of creation: </strong>{todo.dateOfCreation}</p>
        <p><strong>Expiration date: </strong>{new Date(todo.expirationDate).toLocaleDateString()}</p>
        <p><strong>Update date: </strong>{todo.updateDate}</p>
        <p><strong>Responsible executive: </strong>{todo.responsibleExecutive}</p>
        <p><strong>Status: </strong>{todo.status}</p>
        <p><strong>Creator: </strong>Creator</p>
        <button className="modal__button" onClick={() => setModalActive(false)}>Close</button>
      </Modal>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
