import React from 'react';
import { Alert } from 'react-bootstrap';
import EntryItem from './EntryItem';
import Spinner from './common/Spinner';

const EntryList = ({ entries, loading, error, onEdit, onDelete }) => {
  if (loading) {
    return <Spinner text="Loading entries..." />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (entries.length === 0) {
    return (
      <Alert variant="info">
        No entries found. Add your first income or expense to get started!
      </Alert>
    );
  }

  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <EntryItem
          key={entry.id}
          entry={entry}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EntryList;