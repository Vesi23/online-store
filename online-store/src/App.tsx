import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './views/About/About';
import Home from './views/Home/Home';
import Create from './views/Create/Create';
import WhatsAppButton from './components/WhatsApp-btn/WhatsApp-btn';
import Shop from './views/Shop/Shop';
import Feedback from './views/Feedback/Feedback';
import Product from './views/Shop/Product';
import Authenticated from './components/Authenticated/Authenticated';
import { AppContext, type Admin as AdminType, type AdminData } from './context/appContext';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase-config';

function App() {
  const [context, setContext] = useState<{ admin: AdminType | any; adminData: AdminData | any }>({
    admin: {},
    adminData: {}
  });

  useEffect(() => {
    // Проверяваме за запазени данни в localStorage
    const savedAdmin = localStorage.getItem('admin');
    const savedAdminData = localStorage.getItem('adminData');
    if (savedAdmin && savedAdminData) {
      try {
        setContext({
          admin: JSON.parse(savedAdmin),
          adminData: JSON.parse(savedAdminData)
        })
      } catch (error) {
        console.error('Грешка при зареждане на данните:', error);
      }
    }

    // Firebase authentication listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Потребителят е влязъл
        const adminData = {
          admin: { email: user.email },
          adminData: { email: user.email }
        };
        setContext(adminData);
        localStorage.setItem('admin', JSON.stringify(adminData.admin));
        localStorage.setItem('adminData', JSON.stringify(adminData.adminData));
      } else {
        // Потребителят е излязъл
        setContext({
          admin: {},
          adminData: {}
        });
        localStorage.removeItem('admin');
        localStorage.removeItem('adminData');
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  // Функция за обновяване на контекста
  const updateContext = (newContext: { admin: AdminType | any, adminData: AdminData | any }) => {
    setContext(newContext);

    if (newContext.admin && Object.keys(newContext.admin).length > 0) {
      localStorage.setItem('admin', JSON.stringify(newContext.admin));
      localStorage.setItem('adminData', JSON.stringify(newContext.adminData));
    } else {
      localStorage.removeItem('admin');
      localStorage.removeItem('adminData');

    }
  };

  const isLoggedIn = context.admin && Object.keys(context.admin).length > 0;


  return (
    <AppContext.Provider value={{
      admin: context.admin,
      adminData: context.adminData,
      setContext: updateContext,
      isLoggedIn
    }}>
      <BrowserRouter>
        <Header />
        <WhatsAppButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/create" element={<Authenticated><Create /></Authenticated>} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;