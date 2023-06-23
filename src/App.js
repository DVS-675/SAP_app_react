import React, { useState, useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";
import TodoFooter from "./Todo/TodoFooter";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);  

  useEffect(() => {
    getLocalTodos();
    
  }, []);

  useEffect(() => {
    filterHandler();    
  }, [todos, status]); 
  

  const filterHandler = () => {
    switch (status) {
      case "Completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "Active":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const filterHandlerByDate = () => {
    console.log(new Date(todos[0].expirationDate))
    console.log(todos)    
    const newTodos = todos.sort((a, b) =>
      new Date(a.expirationDate) - new Date(b.expirationDate) 
    );
    console.log(newTodos);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        todo.status = "completed";
        todo.updateDate = new Intl.DateTimeFormat("ru", {
          hour: "numeric",
          minute: "numeric",
          day: "numeric",
          month: "long",
          year: "numeric",
          weekday: "long",
        })
          .format(new Date())
          .replace(/(\s?\г\.?)/, "");
      }
      if (todo.completed) {
        todo.status = "completed";
      } else {
        todo.status = "active";
      }
      return todo;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const addTodo = (
    title,
    description,
    priority,
    responsibleExecutive,
    expirationDate
  ) => {
    const newTodos = todos.concat([
      {
        title,
        id: Date.now(),
        completed: false,
        description,
        priority,
        dateOfCreation: new Intl.DateTimeFormat("ru", {
          year: "2-digit",
          month: "numeric",
          day: "numeric",
          timezone: "UTC",
          hour: "numeric",
          minute: "2-digit",
        })
          .format(new Date())
          .replace(/(\s?\г\.?)/, ""),
        status: "active",
        responsibleExecutive,
        expirationDate: new Date(expirationDate),
        updateDate: new Intl.DateTimeFormat("ru", {
          year: "2-digit",
          month: "numeric",
          day: "numeric",
          timezone: "UTC",
          hour: "numeric",
          minute: "2-digit",
        })
          .format(new Date())
          .replace(/(\s?\г\.?)/, ""),
      },
    ]);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      console.log(todoLocal);
      setTodos(todoLocal);
    }
  };

  

  return (
    <Context.Provider value={{ removeTodo, filterHandlerByDate }}>
      <div className="wrapper">
        <h1 className="wrapper__title">Task table</h1>
        <AddTodo onCreate={addTodo} />

        {todos.length ? (
          <TodoList
            filteredTodos={filteredTodos}            
            todos={todos}
            onToggle={toggleTodo}            
          />
        ) : (
          <p>no Todos</p>
        )}
        <TodoFooter setStatus={setStatus} />
      </div>
    </Context.Provider>
  );
};

export default App;
