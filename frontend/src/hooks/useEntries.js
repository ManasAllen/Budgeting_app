import { useState, useEffect, useCallback } from 'react';
import useAuth from './useAuth';
import { 
  getAllEntries, 
  getFilteredEntries, 
  createEntry, 
  updateEntry, 
  deleteEntry, 
  getSummary
} from '../api/entryApi';
import { toUTC } from '../utils/dateFormatter';

const useEntries = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [summary, setSummary] = useState({ 
    total_income: 0, 
    total_expense: 0, 
    balance: 0 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: null,
    search: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const fetchEntries = useCallback(async () => {
    if (!user || !user.username) {
      console.log('No user or username available, skipping fetch entries');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching entries for user:', user.username);
      const sortString = `${filters.sortBy},${filters.sortOrder}`;
      const data = await getAllEntries(user.username, sortString);
      
      console.log('Entries fetched successfully:', data);
      setEntries(data);
      
      if (!filters.type && !filters.search) {
        setFilteredEntries(data);
      }
    } catch (err) {
      console.error('Error fetching entries:', err);
      setError(err.response?.data?.detail || 'Failed to fetch entries. Please try again later.');
      setEntries([]);
      setFilteredEntries([]);
    } finally {
      setLoading(false);
    }
  }, [user, filters.sortBy, filters.sortOrder]);

  const fetchFilteredEntries = useCallback(async () => {
    if (!user || !user.username) return;
    
    if (!filters.type && !filters.search) {
      setFilteredEntries(entries);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching filtered entries with filters:', filters);
      const data = await getFilteredEntries(user.username, filters);
      
      console.log('Filtered entries fetched successfully:', data);
      setFilteredEntries(data);
    } catch (err) {
      console.error('Error fetching filtered entries:', err);
      setError(err.response?.data?.detail || 'Failed to filter entries. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [user, filters, entries]);

  const fetchSummary = useCallback(async () => {
    if (!user || !user.username) return;
    
    try {
      console.log('Fetching summary for user:', user.username);
      const data = await getSummary(user.username);
      console.log('Summary fetched successfully:', data);
      setSummary(data);
    } catch (err) {
      console.error('Failed to fetch summary:', err);
    }
  }, [user]);

  const addEntry = async (entryData) => {
    if (!user || !user.username) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      const formattedData = {
        ...entryData,
        date: toUTC(entryData.date)
      };
      
      console.log('Adding new entry:', formattedData);
      const newEntry = await createEntry(user.username, formattedData);
      
      console.log('Entry added successfully:', newEntry);
      
      setEntries(prevEntries => [newEntry, ...prevEntries]);
      
      await fetchSummary();
      
      return newEntry;
    } catch (err) {
      console.error('Error adding entry:', err);
      setError(err.response?.data?.detail || 'Failed to add entry. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editEntry = async (entryId, entryData) => {
    if (!user || !user.username) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      const formattedData = {
        ...entryData,
        date: toUTC(entryData.date)
      };
      
      console.log('Updating entry:', entryId, formattedData);
      const updatedEntry = await updateEntry(user.username, entryId, formattedData);
      
      console.log('Entry updated successfully:', updatedEntry);
      
      setEntries(prevEntries => 
        prevEntries.map(entry => 
          entry.id === entryId ? updatedEntry : entry
        )
      );
      
      await fetchSummary();
      
      return updatedEntry;
    } catch (err) {
      console.error('Error updating entry:', err);
      setError(err.response?.data?.detail || 'Failed to update entry. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };


  const removeEntry = async (entryId) => {
    if (!user || !user.username) return false;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Deleting entry:', entryId);
      const success = await deleteEntry(user.username, entryId);
      
      if (success) {
        console.log('Entry deleted successfully');
        
        setEntries(prevEntries => 
          prevEntries.filter(entry => entry.id !== entryId)
        );
        

        await fetchSummary();
      } else {
        console.error('Delete operation did not return success');
        setError('Failed to delete entry. The server did not confirm deletion.');
      }
      
      return success;
    } catch (err) {
      console.error('Error deleting entry:', err);
      setError(err.response?.data?.detail || 'Failed to delete entry. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (newFilters) => {
    console.log('Applying filters:', newFilters);
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    console.log('Resetting filters');
    setFilters({
      type: null,
      search: '',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  useEffect(() => {
    if (user && user.username) {
      console.log('User changed, fetching data for:', user.username);
      fetchEntries();
      fetchSummary();
    } else {
      console.log('No user, clearing entries and summary');
      setEntries([]);
      setFilteredEntries([]);
      setSummary({ total_income: 0, total_expense: 0, balance: 0 });
    }
  }, [user, fetchEntries, fetchSummary]);


  useEffect(() => {
    if (filters.type || filters.search) {
      fetchFilteredEntries();
    } else if (entries.length > 0) {
      setFilteredEntries(entries);
    }
  }, [filters, entries, fetchFilteredEntries]);

  return {
    entries: filteredEntries,
    summary,
    loading,
    error,
    filters,
    addEntry,
    editEntry,
    removeEntry,
    applyFilters,
    resetFilters,
    refreshEntries: fetchEntries,
    refreshSummary: fetchSummary
  };
};

export default useEntries;