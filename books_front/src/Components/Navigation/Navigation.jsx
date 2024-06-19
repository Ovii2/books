import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserNameFromToken } from '../../utils/jwt';

import './Navigation.css';

const Navigation = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  // const userName = getUserNameFromToken(token);
  const userName = isLoggedIn ? getUserNameFromToken(token) : null;

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
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
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            to='/categories'
          >
            Categories
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
