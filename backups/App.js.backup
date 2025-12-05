import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Carros from './pages/Carros';
import Contato from './pages/Contato';
import AdminSetup from './pages/AdminSetup';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { initAllAnimations } from './animations';
import './App.css';

function App() {
  useEffect(() => {
    // Inicializar todas as animações quando o app carregar
    initAllAnimations();
    
    // Adicionar efeito ripple nos botões
    const addRippleEffect = (e) => {
      const button = e.currentTarget;
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      button.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    };
    
    // Adicionar efeito ripple a todos os botões
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', addRippleEffect);
    });
    
    // Cleanup
    return () => {
      document.querySelectorAll('.btn').forEach(btn => {
        btn.removeEventListener('click', addRippleEffect);
      });
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rotas com layout completo */}
        <Route path="/" element={
          <div className="App min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Homepage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/carros" element={
          <div className="App min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Carros />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/contato" element={
          <div className="App min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Contato />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/admin-setup" element={
          <div className="App min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <AdminSetup />
            </main>
            <Footer />
          </div>
        } />
        
        {/* Rotas sem layout (login e admin) */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
