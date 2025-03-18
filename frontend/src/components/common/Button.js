import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  block = false,
  onClick,
  type = 'button',
  ...rest 
}) => {
  return (
    <BootstrapButton
      variant={variant}
      size={size}
      disabled={disabled}
      className={`${className} ${block ? 'w-100' : ''}`}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </BootstrapButton>
  );
};

export default Button;