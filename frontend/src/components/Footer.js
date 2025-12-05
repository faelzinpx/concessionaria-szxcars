import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"></div>
      <div className="container py-12 relative z-10 footer-content">
        <div className="grid grid-3 desktop-grid-3 gap-8">
          <div className="space-y-4">
            <div className="mb-4">
              <Logo size="small" className="mb-2" />
            </div>
            <p className="text-gray-300 leading-relaxed">Concessionária de veículos com qualidade e confiança.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Contato</h3>
            <div className="space-y-4 text-gray-300">
              <p>Rua das Flores, 123 - Centro</p>
              <p>(11) 9999-8888</p>
              <p>contato@szxcars.com.br</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Horários</h3>
            <div className="space-y-3 text-gray-300 mb-6">
              <p>Seg-Sex: 8h - 18h</p>
              <p>Sábado: 8h - 16h</p>
              <p>Domingo: Fechado</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 mb-2">2025 SZX CARS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
