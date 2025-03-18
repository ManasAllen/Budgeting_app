import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = ({ 
  variant = 'primary', 
  size = 'md', 
  animation = 'border',
  className = '',
  fullscreen = false,
  text
}) => {
  const spinnerSize = size === 'sm' ? { width: '1rem', height: '1rem' } :
                      size === 'lg' ? { width: '3rem', height: '3rem' } :
                      { width: '2rem', height: '2rem' };
  
  if (fullscreen) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
        <div className="text-center">
          <BootstrapSpinner 
            animation={animation}
            variant={variant}
            style={spinnerSize}
            className={className}
          />
          {text && <div className="mt-3">{text}</div>}
        </div>
      </div>
    );
  }
  
  return (
    <div className="d-flex align-items-center">
      <BootstrapSpinner 
        animation={animation}
        variant={variant}
        style={spinnerSize}
        className={className}
      />
      {text && <span className="ms-2">{text}</span>}
    </div>
  );
};

export default Spinner;