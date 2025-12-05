import React, { useState } from 'react';

const CarImage = ({ src, alt, className, fallback }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleLoad = () => {
    setImageLoading(false);
  };

  const defaultFallback = (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
      </svg>
    </div>
  );

  if (imageError) {
    return fallback || defaultFallback;
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        style={{ display: imageLoading ? 'none' : 'block' }}
      />
    </div>
  );
};

export default CarImage;