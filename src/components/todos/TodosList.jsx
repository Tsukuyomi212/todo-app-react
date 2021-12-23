import { TodoItem } from './TodoItem';

export const TodosList = ({ todos, removeTodo, editTodo }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem todo={todo} key={index} removeTodo={removeTodo} editTodo={editTodo} />
      ))}
    </div>
  );
};
