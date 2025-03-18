import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Button from './common/Button';
import { formatDate } from '../utils/dateFormatter';

const EntryItem = ({ entry, onEdit, onDelete }) => {
  const { id, name, description, type, date, amount } = entry;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="entry-item p-3 mb-3 border rounded bg-white shadow-sm">
      <Row className="align-items-center">
        <Col xs={12} md={6}>
          <div className="d-flex align-items-center">
            <div 
              className={`icon-container rounded-circle p-2 me-3 ${
                type === 'Income' ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'
              }`}
            >
              {type === 'Income' ? (
                <FaArrowUp className="text-success" />
              ) : (
                <FaArrowDown className="text-danger" />
              )}
            </div>
            <div>
              <h5 className="mb-1">{name}</h5>
              {description && <p className="text-muted mb-0 small">{description}</p>}
            </div>
          </div>
        </Col>
        
        <Col xs={6} md={2} className="mt-2 mt-md-0">
          <div className="text-md-center">
            <div className="text-muted small">Date</div>
            <div>{formatDate(date)}</div>
          </div>
        </Col>
        
        <Col xs={6} md={2} className="mt-2 mt-md-0">
          <div className="text-md-center">
            <div className="text-muted small">Amount</div>
            <div className={type === 'Income' ? 'text-success' : 'text-danger'}>
              <Badge bg={type === 'Income' ? 'success' : 'danger'} className="me-2">
                {type}
              </Badge>
              {formatCurrency(amount)}
            </div>
          </div>
        </Col>
        
        <Col xs={12} md={2} className="mt-3 mt-md-0 text-end">
          <Button 
            variant="outline-primary" 
            size="sm" 
            className="me-2"
            onClick={() => onEdit(entry)}
          >
            <FaEdit />
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => onDelete(id)}
          >
            <FaTrash />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default EntryItem;