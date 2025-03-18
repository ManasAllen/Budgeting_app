import React, { useState, useEffect } from 'react';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaPlus, FaBug, FaSync } from 'react-icons/fa';
import Summary from './Summary';
import FilterBar from './FilterBar';
import EntryList from './EntryList';
import EntryForm from './EntryForm';
import useEntries from '../hooks/useEntries';
import useAuth from '../hooks/useAuth';
import Spinner from './common/Spinner';
import Card from './common/Card';

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    entries, 
    summary, 
    loading, 
    error, 
    filters,
    addEntry,
    editEntry,
    removeEntry,
    applyFilters,
    resetFilters,
    refreshEntries,
    refreshSummary
  } = useEntries();
  
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  
  
  useEffect(() => {
    if (user) {
      console.log('Dashboard mounted, refreshing entries');
      refreshEntries();
      refreshSummary();
    }
  }, [user, refreshEntries, refreshSummary]);

  
  const handleAddEntry = () => {
    setEditingEntry(null);
    setShowEntryForm(true);
  };
  
  
  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setShowEntryForm(true);
  };
  
  const handleSubmitEntry = async (formData) => {
    if (editingEntry) {
      await editEntry(editingEntry.id, formData);
    } else {
      await addEntry(formData);
    }
  };
  
  
  const handleDeleteEntry = async (entryId) => {
    try {
      setDeleteError(null);
      const success = await removeEntry(entryId);
      
      if (!success) {
        setDeleteError('Failed to delete the entry. Please try again.');
      }
    } catch (err) {
      setDeleteError('An error occurred while deleting the entry.');
    }
  };
  

  const handleManualRefresh = () => {
    refreshEntries();
    refreshSummary();
  };

  if (!user) {
    return (
      <Container className="py-4">
        <Alert variant="warning">
          Please log in to view your budget dashboard.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Budget Dashboard</h1>
        <div>
          <Button 
            variant="outline-secondary" 
            onClick={handleManualRefresh}
            className="me-2"
            disabled={loading}
            title="Refresh Data"
          >
            <FaSync className={loading ? 'spin' : ''} />
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddEntry}
            disabled={loading}
          >
            <FaPlus className="me-2" />
            Add New Entry
          </Button>
        </div>
      </div>
      
      
      {/* Summary Cards */}
      <Summary summary={summary} />
      
      {/* Filter Bar */}
      <FilterBar 
        filters={filters} 
        applyFilters={applyFilters} 
        resetFilters={resetFilters} 
      />
      
      {/* Error Alerts */}
      {error && (
        <Alert 
          variant="danger" 
          dismissible 
          onClose={() => {}}
          className="mb-4"
        >
          {error}
        </Alert>
      )}
      
      {deleteError && (
        <Alert 
          variant="danger" 
          dismissible 
          onClose={() => setDeleteError(null)}
          className="mb-4"
        >
          {deleteError}
        </Alert>
      )}
      
      {/* No Entries Message */}
      {!loading && entries.length === 0 && !error && (
        <Card className="mb-4">
          <Row className="align-items-center">
            <Col>
              <p className="mb-0">No entries found. Get started by adding your first income or expense!</p>
            </Col>
            <Col xs="auto">
              <Button 
                variant="success" 
                size="sm"
                onClick={handleAddEntry}
              >
                <FaPlus className="me-1" /> Add Entry
              </Button>
            </Col>
          </Row>
        </Card>
      )}
      
      {/* Entries List */}
      <EntryList 
        entries={entries}
        loading={loading}
        error={error}
        onEdit={handleEditEntry}
        onDelete={handleDeleteEntry}
      />
      
      {loading && <Spinner text="Loading data..." />}
      
      {/* Entry Form Modal */}
      <EntryForm 
        isOpen={showEntryForm}
        onClose={() => setShowEntryForm(false)}
        onSubmit={handleSubmitEntry}
        initialData={editingEntry}
        isEditing={!!editingEntry}
      />
    </Container>
  );
};

export default Dashboard;