import './Header.css';
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/appContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';

const Header = () => {
  const [activeItem, setActiveItem] = useState('');
  const {admin}= useAppContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const isLoggedIn = admin && Object.keys(admin).length > 0;

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveItem(currentPath);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showUserMenu && !target.closest('.dropdown-container')) {
        setShowUserMenu(false);
      }
    };

    const updateDropdownPosition = () => {
      if (showUserMenu && dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
          setDropdownStyle({
            position: 'fixed',
            top: rect.bottom + 5,
            right: window.innerWidth - rect.right,
            zIndex: 999999
          });
        } else {
          setDropdownStyle({
            zIndex: 99999
          });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', updateDropdownPosition);
    updateDropdownPosition();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [showUserMenu]);  const handleNavigation = (path: string) => {
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

          {/* Admin Dropdown Menu */}
          {isLoggedIn && (
            <li className="dropdown-container" ref={dropdownRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="dropdown-btn"
              >
                <svg 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
              </button>

              {showUserMenu && (
                <div className="dropdown-menu" style={dropdownStyle}>
                  <button
                    onClick={() => {
                      handleNavigation('/create');
                      setShowUserMenu(false);
                    }}
                    className="dropdown-item"
                  >
                    <span>+ Create Feedback</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowUserMenu(false);
                    }}
                    className="dropdown-item logout"
                  >
                    <span>⏻ Logout</span>
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};  

export default Header;