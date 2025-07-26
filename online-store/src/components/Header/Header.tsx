import './Header.css';
import { useState, useEffect } from 'react';

const Header = () => {
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveItem(currentPath);
  }, []);

  const handleNavigation = (path: string) => {
    setActiveItem(path);
    window.location.href = path;
  };

  return (
    <header className="header-css">
      <img src="/images/logo.JPG" alt="Logo" className="logo" />

      <nav className="nav nav-css">
        <ul className="menu">
          <li 
            className={activeItem === '/home' ? 'active' : ''}
            onClick={() => handleNavigation('/home')}
          >
            <span>Home</span>
          </li>
          <li 
            className={activeItem === '/' ? 'active' : ''}
            onClick={() => handleNavigation('/')}
          >
            <span>Shop</span>
          </li>
          <li 
            className={activeItem === '/about' ? 'active' : ''}
            onClick={() => handleNavigation('/about')}
          >
            <span>About us</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;