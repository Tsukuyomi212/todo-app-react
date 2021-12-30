import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { TodosList } from '../todos/TodosList';
import { TodoForm } from '../todos/TodoForm';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../../services/todoService';
import { Sidebar } from '../sidebar/Sidebar';
import './homepage.css';
import { LOGIN } from '../../utils/routes';

export const Homepage = () => {
  const { authenticatedUser } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  const addTodo = async values => {
    await createTodo(values);
    fetchTodos();
  };

  const editTodo = async (id, values) => {
    await updateTodo(id, values);
    fetchTodos();
  };

  const removeTodo = async id => {
    await deleteTodo(id);
    fetchTodos();
  };

  useEffect(() => {
    if (authenticatedUser) {
      fetchTodos();
    } else {
      navigate(LOGIN);
    }
  }, [authenticatedUser, navigate]);

  return (
    <>
      {authenticatedUser && (
        <div>
          <Sidebar />
          <div className="content">
            <h1>Things to do:</h1>
            {todos.length > 0 && (
              <TodosList todos={todos} removeTodo={removeTodo} editTodo={editTodo} />
            )}
            <TodoForm handleSubmit={addTodo} />
            <div>
              <p></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
