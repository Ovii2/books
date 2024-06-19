import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserRoleFromToken } from '../../utils/jwt';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children, adminOnly, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    let role = '';

    if (token) {
      role = getUserRoleFromToken(token);
      if (role) setIsAuthorized(true);
      if (role == 'ADMIN') setIsAdmin(true);
    }
  }, []);

  if (!isAuthorized) {
    return (
      <div className='protected-container'>
        <h2>This content is accessible to authorized users.</h2>
        <NavLink className='protected-nav-link' to='/login'>
          Login here
        </NavLink>
      </div>
    );
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className='protected-container'>
        <h2>This content is accessible to admins only.</h2>
        <NavLink className='protected-nav-link' to='/Books'>
          Go back to Books
        </NavLink>
      </div>
    );
  }

  return <div {...rest}>{children}</div>;
};

export default ProtectedRoute;
