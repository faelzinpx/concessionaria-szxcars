import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const handleLinkClick = (path) => {
    console.log('🔗 CLICK NO LINK:', path);
    console.log('📍 Location atual:', location.pathname);
    console.log('🎯 Navegando para:', path);
  };
  
  console.log('🧭 HEADER RENDERIZANDO - Location:', location.pathname);
  
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-blue-100">{console.log('🎨 Header JSX sendo renderizado')}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <Logo size="medium" className="group-hover:scale-105 transition-transform" />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              onClick={() => handleLinkClick('/')}
              className={`hidden md:block transition-colors text-sm ${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Início
            </Link>
            <Link 
              to="/carros" 
              onClick={() => handleLinkClick('/carros')}
              className={`hidden md:block transition-colors text-sm ${isActive('/carros') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Catálogo
            </Link>
            <Link 
              to="/contato" 
              onClick={() => handleLinkClick('/contato')}
              className={`hidden md:block transition-colors text-sm ${isActive('/contato') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Contato
            </Link>
            
            {/* Botão Login com estilos forçados */}
            <Link 
              to="/login" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s',
                opacity: '1',
                visibility: 'visible',
                zIndex: '1000'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
              title="Área Administrativa"
            >
              <svg 
                style={{ width: '16px', height: '16px' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Login</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;