import React from "react";


const TodoFooter = ({setStatus}) => {  

  const statusHandler = (event) => {
    setStatus(event.target.value)
  };

  return (
    <div className="footer">
      <button 
      onClick={statusHandler} 
      className="footer__all item" 
      value="All">
        All
      </button>
      <button
        onClick={statusHandler}
        className="footer__active item"
        value="Active" 
       
      >
        Active
      </button>
      <button
        onClick={statusHandler}
        className="footer__completed item"
        value="Completed"
        
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFooter;
