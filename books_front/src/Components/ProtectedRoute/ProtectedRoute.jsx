import { NavLink, useNavigate } from 'react-router-dom';

import './ProtectedRoute.css';

const ProtectedRoute = ({ children, ...rest }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  return (
    <div {...rest}>
      {token ? (
        children
      ) : (
        <div className={'protected-container'}>
          <h2>This content is accessible to authorized users.</h2>
          <NavLink className={'login'} to={'/login'}>
            Login here
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
