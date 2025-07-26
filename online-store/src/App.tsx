import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './views/About/About';
import Home from './views/Home/Home';
import WhatsAppButton from './components/WhatsApp-btn/WhatsApp-btn';

function App() {

  return (
    // <AppContext.Provider value={{ ...context, setContext }}>
      <BrowserRouter>
        <Header />
        <WhatsAppButton />
        <Routes>
          <Route path="/about" element={<About/>} />
<Route path='/home' element={<Home />} />
        </Routes>
        <Footer /> 
      </BrowserRouter>

  );
}

export default App;