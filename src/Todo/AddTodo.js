import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const useInputValueHeader = (defaultValue = "") => {
  const [valueHeader, setValue] = useState(defaultValue);

  return {
    bind: {
      value: valueHeader,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => valueHeader,
  };
};

const useInputValueDescription = (defaultValue = "") => {
  const [valueDescription, setValue] = useState(defaultValue);

  return {
    bind: {
      value: valueDescription,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => valueDescription,
  };
};

const useInputValuePriority = (defaultValue = "") => {
  const [valuePriority, setValue] = useState(defaultValue);

  return {
    bind: {
      value: valuePriority,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => valuePriority,
  };
};

const useInputValueResponsible = (defaultValue = "") => {
  const [valueResponsible, setValue] = useState(defaultValue);

  return {
    bind: {
      value: valueResponsible,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => valueResponsible,
  };
};

const useInputValueExpirationDate = () => {
  const [date, setDate] = useState(new Date());
  return {
    bind: {
      value: date,
      onChange: (date) => setDate(date),
    },
    clear: () => setDate(""),
    value: () => date,
  };
};

const AddTodo = ({ onCreate }) => {
  const [modalActive, setModalActive] = useState(false);
  const [calendarActive, setCalendarActive] = useState(false);

  const inputHeader = useInputValueHeader("");
  const inputDescription = useInputValueDescription("");
  const inputPriority = useInputValuePriority("");
  const inputResponsible = useInputValueResponsible("");
  const inputExpirationDate = useInputValueExpirationDate("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      inputHeader.value().trim() &&
      inputDescription.value().trim() &&
      inputPriority.value().trim() &&
      inputResponsible.value().trim() &&
      inputExpirationDate.value()
    ) {
      onCreate(
        inputHeader.value(),
        inputDescription.value(),
        inputPriority.value(),
        inputResponsible.value(),
        inputExpirationDate.value()
      );
      inputHeader.clear();
      inputDescription.clear();
      inputPriority.clear();
      inputResponsible.clear();
      inputExpirationDate.clear();
    }
  };

  return (
    <div>
      <button className="form__button" onClick={() => setModalActive(true)}>
        Add task
      </button>
      <Modal
        style={{ height: 400 }}
        active={modalActive}
        setActive={setModalActive}
      >
        <form className="form" onSubmit={submitHandler}>
          Add task
          <input
            className="form__input"
            placeholder="what needs to be done?"
            {...inputHeader.bind}
          />
          Add description
          <input
            className="form__input"
            placeholder="description"
            {...inputDescription.bind}
          />
          Add priority
          <select
            className="form__input"
            placeholder="Priority"
            {...inputPriority.bind}
          >
            <option default disabled></option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          Add responsible executive
          <input
            className="form__input"
            placeholder="responsible executive"
            {...inputResponsible.bind}
          />
          Add expiration date
          <div>
            <button
              type="button"
              className="modal__button_calendar"
              onClick={() => {
                if (calendarActive) {
                  setCalendarActive(false);
                } else {
                  setCalendarActive(true);
                }
              }}
            >
              {calendarActive ? "close calendar" : "open calendar"}
            </button>
            <Calendar
              className={calendarActive ? "calendar__active" : "calendar"}
              {...inputExpirationDate.bind}
            />
            <p className="calendar__date">
              {inputExpirationDate.value() ? new Date(inputExpirationDate.value()).toLocaleDateString():'data is not chosen'}
            </p>
          </div>
          <button
            type="button"
            className="modal__button"
            onClick={() => {
              setModalActive(false);
              setCalendarActive(false);
            }}
          >
            Close
          </button>
          <button
            type="submit"
            onClick={() => {
              if (
                inputHeader.value().trim() &&
                inputDescription.value().trim() &&
                inputPriority.value().trim() &&
                inputResponsible.value().trim() &&
                inputExpirationDate.value()
              ) {
                setModalActive(false);
                setCalendarActive(false);
              } else {
                alert("Fill in all the fields");
                return;
              }
            }}
            className="modal__button"
          >
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
};

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
export default AddTodo;
