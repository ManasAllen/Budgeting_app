import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({
  show,
  onHide,
  title,
  children,
  footer,
  size = 'lg',
  centered = true,
  closeButton = true,
  primaryButtonText = 'Save',
  secondaryButtonText = 'Cancel',
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonDisabled = false,
  secondaryButtonDisabled = false,
  primaryButtonVariant = 'primary',
  secondaryButtonVariant = 'secondary',
  showFooterButtons = true
}) => {
  return (
    <BootstrapModal 
      show={show} 
      onHide={onHide} 
      centered={centered} 
      size={size}
    >
      <BootstrapModal.Header closeButton={closeButton}>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        {footer ? (
          footer
        ) : (
          showFooterButtons && (
            <>
              <Button 
                variant={secondaryButtonVariant} 
                onClick={onSecondaryButtonClick || onHide}
                disabled={secondaryButtonDisabled}
              >
                {secondaryButtonText}
              </Button>
              <Button 
                variant={primaryButtonVariant} 
                onClick={onPrimaryButtonClick}
                disabled={primaryButtonDisabled}
              >
                {primaryButtonText}
              </Button>
            </>
          )
        )}
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;