import './Header.css';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [activeItem, setActiveItem] = useState('');
  const { admin } = useAppContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isLoggedIn = admin && Object.keys(admin).length > 0;
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveItem(currentPath);
    
    // Слушател за промени в URL-а
    const handleLocationChange = () => {
      setActiveItem(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Затваряме менюто при кликване извън него
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const adminMenu = target.closest('.admin-menu-container');
      if (!adminMenu && showUserMenu) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  const handleNavigation = (path: string) => {
    setActiveItem(path);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
            className={activeItem === '/' || activeItem === '/home' ? 'active' : ''}
            onClick={() => handleNavigation('/')}
          >
            <span>Начало</span>
          </li>
          <li
            className={activeItem === '/shop' ? 'active' : ''}
            onClick={() => handleNavigation('/shop')}
          >
            <span>Продукти</span>
          </li>
          <li
            className={activeItem === '/about' ? 'active' : ''}
            onClick={() => handleNavigation('/about')}
          >
            <span>За нас</span>
          </li>


        </ul>
      </nav>

      {/* Admin Menu - извън nav за да не влияе на другите бутони */}
      {isLoggedIn && (
        <div className="admin-menu-container" style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="admin-menu-btn"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '8px',
              color: '#fff',
              fontSize: '18px'
            }}
            aria-label="Admin menu"
          >
            ⚙️
          </button>
          {showUserMenu && (
            <ul
              className="dropdown-menu"
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                minWidth: '160px',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 9999,
                padding: '8px 0',
                margin: '4px 0 0 0',
                listStyle: 'none'
              }}
            >
              <li 
                style={{ 
                  padding: '12px 16px', 
                  cursor: 'pointer', 
                  fontSize: '14px',
                  color: '#333',
                  borderBottom: '1px solid #eee'
                }} 
                onClick={() => {
                  handleNavigation('/create');
                  setShowUserMenu(false);
                }}
              >
                📝 Създай продукт
              </li>
              <li 
                style={{ 
                  padding: '12px 16px', 
                  cursor: 'pointer', 
                  fontSize: '14px',
                  color: '#333',
                  borderBottom: '1px solid #eee'
                }} 
                onClick={() => {
                  handleNavigation('/feedback');
                  setShowUserMenu(false);
                }}
              >
                💬 Обратна връзка
              </li>
              <li 
                style={{ 
                  padding: '12px 16px', 
                  cursor: 'pointer', 
                  fontSize: '14px',
                  color: '#dc3545'
                }} 
                onClick={() => {
                  handleLogout();
                  setShowUserMenu(false);
                }}
              >
                🚪 Изход
              </li>
            </ul>
          )}
        </div>
      )}

      {/* Responsive styles for dropdown */}
      <style>{`
        @media (max-width: 600px) {
          .dropdown-menu {
            right: 0 !important;
            left: auto !important;
            min-width: 120px !important;
            font-size: 15px !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;