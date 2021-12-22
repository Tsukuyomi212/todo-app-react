import Checkbox from '@mui/material/Checkbox';

export const TodoItem = ({ todo, index }) => {
  return (
    <div key={index}>
      <Checkbox value={todo.completed} color="default" />
      <span style={todo.completed ? { textDecoration: 'line-through' } : {}}>{todo.title}</span>
      <span>
        <button className="delete-todo-icon">x</button>
      </span>
    </div>
  );
};
