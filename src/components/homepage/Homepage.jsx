import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
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
            <div>
              {todos &&
                todos.map((todo, index) => (
                  <p key={index}>
                    <Checkbox value={todo.completed} color="secondary" />
                    <span>{todo.title}</span>
                    <span className="delete-todo-icon">
                      <ClearIcon />
                    </span>
                  </p>
                ))}
            </div>
            <div>
              <p></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
