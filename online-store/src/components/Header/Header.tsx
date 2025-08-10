import './Header.css';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';

const Header = () => {
  const [activeItem, setActiveItem] = useState('');
  const {admin}= useAppContext();
  const isLoggedIn = admin && Object.keys(admin).length > 0;

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveItem(currentPath);
  }, []);

  const handleNavigation = (path: string) => {
    setActiveItem(path);
    window.location.href = path;
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Firebase authentication listener ще обнови контекста автоматично
      // Пренасочваме към началната страница
      window.location.href = '/';
    } catch (error) {
      console.error('Грешка при излизане:', error);
    }
  };

  return (
    <header className="header-css">
      <span>
        <img src="/images/logo.JPG" alt="Logo" className="logo" onClick={() => handleNavigation('/')} />
      </span>

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
            onClick={() => handleNavigation('/shop')}
          >
            <span>Shop</span>
          </li>
          <li 
            className={activeItem === '/about' ? 'active' : ''}
            onClick={() => handleNavigation('/about')}
          >
            <span>About us</span>
          </li>
          {isLoggedIn && (
            <li 
              className={activeItem === '/create' ? 'active' : ''}
              onClick={() => handleNavigation('/create')}
            >
              <span>Admin Panel</span>
            </li>
          )}
          {isLoggedIn && (
            <li 
              onClick={handleLogout}
              style={{ background: '#dc2626', color: 'white' }}
            >
              <span>Излез</span>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;