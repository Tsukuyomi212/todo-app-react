import { TodoItem } from './TodoItem';

export const TodosList = ({ todos }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem todo={todo} index={index} />
      ))}
    </div>
  );
};
