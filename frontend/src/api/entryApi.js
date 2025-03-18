import apiClient from './apiClient';


export const getAllEntries = async (username, sort = null) => {
  let url = `/${username}/entry/getAll`;
  
  if (sort) {
    url += `?sort=${sort}`;
  }
  
  try {
    console.log('Fetching all entries from:', url);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching entries:', error);
    throw error;
  }
};

export const getFilteredEntries = async (username, filters = {}) => {
  const { type, search, sortBy, sortOrder } = filters;
  let queryParams = [];
  
  if (type) queryParams.push(`type=${type}`);
  if (search) queryParams.push(`search=${search}`);
  if (sortBy) queryParams.push(`sort_by=${sortBy}`);
  if (sortOrder) queryParams.push(`sort_order=${sortOrder}`);
  
  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  const url = `/${username}/entry/getFiltered${queryString}`;
  
  try {
    console.log('Fetching filtered entries from:', url);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered entries:', error);
    throw error;
  }
};

export const createEntry = async (username, entryData) => {
  const url = `/${username}/entry/addNew`;
  
  try {
    console.log('Creating entry at:', url, 'with data:', entryData);
    const response = await apiClient.post(url, entryData);
    return response.data;
  } catch (error) {
    console.error('Error creating entry:', error);
    throw error;
  }
};

export const updateEntry = async (username, entryId, entryData) => {
  const url = `/${username}/entry/${entryId}/edit`;
  
  try {
    console.log('Updating entry at:', url, 'with data:', entryData);
    const response = await apiClient.put(url, entryData);
    return response.data;
  } catch (error) {
    console.error('Error updating entry:', error);
    throw error;
  }
};

export const deleteEntry = async (username, entryId) => {
  const url = `/${username}/entry/${entryId}`;
  
  try {
    console.log('Deleting entry at:', url);
    const response = await apiClient.delete(url);
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw error;
  }
};

export const getSummary = async (username) => {
  const url = `/${username}/entry/summary`;
  
  try {
    console.log('Fetching summary from:', url);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching summary:', error);
    
    return {
      total_income: 0,
      total_expense: 0,
      balance: 0
    };
  }
};