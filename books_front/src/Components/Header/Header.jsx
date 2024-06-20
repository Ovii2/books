import './Header.css';
import '../../../src/variables.css';
import Navigation from '../Navigation/Navigation';

import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <img className='header-logo' src='/img/books.jpg' alt='books' />
      <Navigation />
    </div>
  );
};

export default Header;
