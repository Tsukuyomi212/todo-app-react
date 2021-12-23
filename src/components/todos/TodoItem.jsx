import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Modal from 'react-modal';
import { TodoForm } from './TodoForm';
Modal.setAppElement('#root');

export const TodoItem = ({ todo, removeTodo, editTodo }) => {
  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked(!clicked);
  };

  const modalStyle = {
    content: {
      height: '2em',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
    },
  };

  return (
    <div>
      <div>
        <Checkbox
          value={todo.completed}
          checked={todo.completed}
          color="default"
          onChange={() => {
            editTodo(todo.id, { completed: !todo.completed });
          }}
        />
        <span
          onClick={toggleClicked}
          style={todo.completed ? { textDecoration: 'line-through' } : {}}
        >
          {todo.title}
        </span>
        <span>
          <button className="delete-todo-icon" onClick={() => removeTodo(todo.id)}>
            x
          </button>
        </span>
      </div>

      {clicked && (
        <div>
          <Modal isOpen={clicked} onRequestClose={toggleClicked} style={modalStyle}>
            <TodoForm
              todo={todo}
              handleSubmit={values => {
                editTodo(todo.id, values);
                setClicked(false);
              }}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};
