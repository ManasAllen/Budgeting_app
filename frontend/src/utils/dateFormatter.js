export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  export const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  
  export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  export const toUTC = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };