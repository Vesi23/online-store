import './Header.css';

const Header = () => {
  return (
    <header className="header-css">
      <img src="/images/logo.JPG" alt="Logo" className="logo" />

      <nav className="nav nav-css">
        <ul className="menu">
          <li><a href="/home">Home</a></li>
          <li><a href="/">Shop</a></li>
          <li><a href="/about">About us</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
