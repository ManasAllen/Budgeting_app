import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Modal from './common/Modal';
import Input from './common/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { validateEntryForm } from '../utils/validators';
import { formatDateForInput } from '../utils/dateFormatter';

const EntryForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Expense',
    date: new Date(),
    amount: ''
  });
  
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || '',
        type: initialData.type,
        date: new Date(initialData.date),
        amount: initialData.amount
      });
    } else {

        setFormData({
        name: '',
        description: '',
        type: 'Expense',
        date: new Date(),
        amount: ''
      });
    }
    
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date
    }));
    
    if (errors.date) {
      setErrors(prev => ({
        ...prev,
        date: null
      }));
    }
  };

  const handleSubmit = () => {

    const { isValid, errors: validationErrors } = validateEntryForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    
    
    onSubmit(formData);
    console.log(formData);
    onClose();
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      title={isEditing ? 'Edit Entry' : 'Add New Entry'}
      primaryButtonText={isEditing ? 'Update' : 'Save'}
      onPrimaryButtonClick={handleSubmit}
      onSecondaryButtonClick={onClose}
    >
      <Form>
        <Row>
          <Col md={8}>
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Salary, Grocery, Rent"
              error={errors.name}
              required
            />
          </Col>
          
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Type<span className="text-danger ms-1">*</span></Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                isInvalid={!!errors.type}
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </Form.Select>
              {errors.type && (
                <Form.Control.Feedback type="invalid">
                  {errors.type}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date<span className="text-danger ms-1">*</span></Form.Label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                dateFormat="yyyy-MM-dd"
              />
              {errors.date && (
                <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                  {errors.date}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Input
              label="Amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              error={errors.amount}
              min="0.01"
              step="0.01"
              required
            />
          </Col>
        </Row>
        
        <Input
          label="Description (Optional)"
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add notes or details about this entry"
          rows={3}
        />
      </Form>
    </Modal>
  );
};

export default EntryForm;