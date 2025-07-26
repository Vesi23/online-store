const Header = () => {
  return (
    <header className="header">
      <img src="/images/logo.JPG" alt="Logo" className="logo" />
      <nav className="nav">
        <ul>
            <li><a href="/home">Home</a></li>
          <li><a href="/">Контакти</a></li>
          <li><a href="/profile">Свържи се с нас</a></li>
          <li><a href="/products">Продукти</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
