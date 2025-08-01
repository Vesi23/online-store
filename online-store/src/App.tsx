import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './views/About/About';
import Home from './views/Home/Home';
import Create from './views/Create/Create';
import WhatsAppButton from './components/WhatsApp-btn/WhatsApp-btn';
import Shop from './views/Shop/Shop';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/shop' element={<Shop />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;