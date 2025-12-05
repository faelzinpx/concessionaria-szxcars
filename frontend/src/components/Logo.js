import React from 'react';

const Logo = ({ className = "", size = "medium" }) => {
  const sizeClasses = {
    small: "w-20 h-8",
    medium: "w-24 h-10", 
    large: "w-32 h-12",
    xlarge: "w-40 h-16"
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <svg 
        viewBox="0 0 300 80" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definir gradientes */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        
        {/* Linha curva decorativa à esquerda */}
        <path 
          d="M 10 10 Q 40 30 10 50 Q 40 70 70 50" 
          stroke="#3b82f6" 
          strokeWidth="2" 
          fill="none"
        />
        
        {/* Carro estilizado pequeno */}
        <g transform="translate(25, 35)">
          <ellipse cx="0" cy="0" rx="12" ry="4" fill="#374151" opacity="0.8" />
          <rect x="-8" y="-2" width="16" height="3" fill="#4b5563" rx="1" />
          <circle cx="-5" cy="2" r="1.5" fill="#6b7280" />
          <circle cx="5" cy="2" r="1.5" fill="#6b7280" />
        </g>
        
        {/* Texto SZX */}
        <text 
          x="90" 
          y="35" 
          fontSize="28" 
          fontWeight="bold" 
          fill="url(#logoGradient)"
          fontFamily="Arial, sans-serif"
          letterSpacing="2px"
        >
          SZX
        </text>
        
        {/* Texto CARS */}
        <text 
          x="90" 
          y="55" 
          fontSize="12" 
          fontWeight="600" 
          fill="url(#logoGradient)"
          fontFamily="Arial, sans-serif"
          letterSpacing="3px"
        >
          CARS
        </text>
        
        {/* Linha curva decorativa à direita */}
        <path 
          d="M 200 20 Q 230 40 200 60" 
          stroke="#3b82f6" 
          strokeWidth="2" 
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Logo;