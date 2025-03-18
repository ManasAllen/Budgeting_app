import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  id,
  error,
  disabled = false,
  required = false,
  className = '',
  containerClassName = '',
  as,
  options,
  ...rest
}) => {
  const renderInput = () => {
    if (as === 'select') {
      return (
        <Form.Select
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={className}
          isInvalid={!!error}
          {...rest}
        >
          <option value="">{placeholder || 'Select...'}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      );
    }

    if (as === 'textarea') {
      return (
        <Form.Control
          as="textarea"
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={className}
          isInvalid={!!error}
          {...rest}
        />
      );
    }

    return (
      <Form.Control
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={className}
        isInvalid={!!error}
        {...rest}
      />
    );
  };

  return (
    <Form.Group className={`mb-3 ${containerClassName}`}>
      {label && <Form.Label>{label}{required && <span className="text-danger ms-1">*</span>}</Form.Label>}
      {renderInput()}
      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default Input;