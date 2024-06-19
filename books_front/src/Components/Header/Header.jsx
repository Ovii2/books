import './Header.css';
import '../../../src/variables.css';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-logo'>logo</div>
      <Navigation />
    </div>
  );
};

export default Header;
