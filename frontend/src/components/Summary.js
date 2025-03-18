import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from './common/Card';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';

const Summary = ({ summary }) => {
  const { total_income, total_expense, balance } = summary;
  

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Row className="summary-section mb-4">
      <Col md={4} className="mb-3 mb-md-0">
        <Card className="h-100 summary-card income-card">
          <div className="d-flex align-items-center">
            <div className="icon-container bg-success bg-opacity-10 p-3 rounded me-3">
              <FaArrowUp className="text-success fs-3" />
            </div>
            <div>
              <h6 className="mb-1">Total Income</h6>
              <h3 className="mb-0 text-success">{formatCurrency(total_income)}</h3>
            </div>
          </div>
        </Card>
      </Col>
      
      <Col md={4} className="mb-3 mb-md-0">
        <Card className="h-100 summary-card expense-card">
          <div className="d-flex align-items-center">
            <div className="icon-container bg-danger bg-opacity-10 p-3 rounded me-3">
              <FaArrowDown className="text-danger fs-3" />
            </div>
            <div>
              <h6 className="mb-1">Total Expense</h6>
              <h3 className="mb-0 text-danger">{formatCurrency(total_expense)}</h3>
            </div>
          </div>
        </Card>
      </Col>
      
      <Col md={4}>
        <Card className="h-100 summary-card balance-card">
          <div className="d-flex align-items-center">
            <div className="icon-container bg-primary bg-opacity-10 p-3 rounded me-3">
              <FaBalanceScale className="text-primary fs-3" />
            </div>
            <div>
              <h6 className="mb-1">Balance</h6>
              <h3 className={`mb-0 ${balance >= 0 ? 'text-primary' : 'text-danger'}`}>
                {formatCurrency(balance)}
              </h3>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Summary;