import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import Button from './common/Button';

const FilterBar = ({ filters, applyFilters, resetFilters }) => {
  const handleTypeChange = (e) => {
    applyFilters({ type: e.target.value || null });
  };
  
  const handleSearchChange = (e) => {
    applyFilters({ search: e.target.value });
  };
  
  const handleSortByChange = (e) => {
    applyFilters({ sortBy: e.target.value });
  };
  
  const handleSortOrderChange = (e) => {
    applyFilters({ sortOrder: e.target.value });
  };
  
  const handleReset = () => {
    resetFilters();
  };

  return (
    <div className="filter-bar bg-light p-3 rounded mb-4">
      <Row className="align-items-end">
        <Col md={3} className="mb-3 mb-md-0">
          <Form.Group>
            <Form.Label className="mb-1">
              <FaFilter className="me-1" /> Type
            </Form.Label>
            <Form.Select
              value={filters.type || ''}
              onChange={handleTypeChange}
              aria-label="Filter by type"
            >
              <option value="">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={3} className="mb-3 mb-md-0">
          <Form.Group>
            <Form.Label className="mb-1">
              <FaSearch className="me-1" /> Search
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={filters.search}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        
        <Col md={2} className="mb-3 mb-md-0">
          <Form.Group>
            <Form.Label className="mb-1">Sort By</Form.Label>
            <Form.Select
              value={filters.sortBy}
              onChange={handleSortByChange}
              aria-label="Sort by field"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={2} className="mb-3 mb-md-0">
          <Form.Group>
            <Form.Label className="mb-1">Order</Form.Label>
            <Form.Select
              value={filters.sortOrder}
              onChange={handleSortOrderChange}
              aria-label="Sort order"
            >
              <option value="desc">
                <FaSortAmountDown className="me-1" /> Descending
              </option>
              <option value="asc">
                <FaSortAmountUp className="me-1" /> Ascending
              </option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={2} className="d-flex justify-content-end align-items-center">
          <Button 
            variant="outline-secondary" 
            onClick={handleReset}
            className="w-100"
          >
            Reset Filters
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;