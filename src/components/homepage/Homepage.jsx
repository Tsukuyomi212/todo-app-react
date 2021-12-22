import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodosList } from '../todos/TodosList';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { getTodos } from '../../services/todoService';
import { LOGIN } from '../../utils/routes';
import { Sidebar } from '../sidebar/Sidebar';
import './homepage.css';

export const Homepage = () => {
  const navigate = useNavigate();
  const { authenticatedUser } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
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
            {todos && <TodosList todos={todos} />}
            <div>
              <p></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
