import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserNameFromToken, getUserRoleFromToken } from '../../utils/jwt';

import './Navigation.css';

const Navigation = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const userName = isLoggedIn ? getUserNameFromToken(token) : null;
  const role = isLoggedIn ? getUserRoleFromToken(token) : '';

  const logoutHandler = () => {
    localStorage.clear();
    toast.success('Logged out!');
    navigate('/login', { replace: true });
  };

  return (
    <nav>
      {userName && <span className='username'>Account: {userName}</span>}
      {!isLoggedIn && (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            to='/login'
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            to='/register'
          >
            Register
          </NavLink>
        </>
      )}
      {isLoggedIn && (
        <>
          {role === 'ADMIN' && (
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              to='/categories'
            >
              Categories
            </NavLink>
          )}
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            to='/books'
          >
            Books
          </NavLink>
          <button className='logout' onClick={logoutHandler}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navigation;
