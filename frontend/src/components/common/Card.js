import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = ({ 
  children, 
  title, 
  subtitle,
  className = '', 
  bodyClassName = '',
  headerClassName = '',
  footerContent,
  footerClassName = '',
  ...rest 
}) => {
  return (
    <BootstrapCard className={`shadow-sm ${className}`} {...rest}>
      {(title || subtitle) && (
        <BootstrapCard.Header className={headerClassName}>
          {title && <BootstrapCard.Title>{title}</BootstrapCard.Title>}
          {subtitle && <BootstrapCard.Subtitle className="text-muted">{subtitle}</BootstrapCard.Subtitle>}
        </BootstrapCard.Header>
      )}
      
      <BootstrapCard.Body className={bodyClassName}>
        {children}
      </BootstrapCard.Body>
      
      {footerContent && (
        <BootstrapCard.Footer className={footerClassName}>
          {footerContent}
        </BootstrapCard.Footer>
      )}
    </BootstrapCard>
  );
};

export default Card;