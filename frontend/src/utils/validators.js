export const validateUsername = (username) => {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    return null;
  };
  
  export const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };
  
  export const validateEntryName = (name) => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return null;
  };
  
  export const validateAmount = (amount) => {
    if (amount === undefined || amount === null || amount === '') 
      return 'Amount is required';
    
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount)) return 'Amount must be a valid number';
    if (numAmount <= 0) return 'Amount must be greater than 0';
    
    return null;
  };
  
  export const validateEntryType = (type) => {
    if (!type) return 'Type is required';
    if (type !== 'Income' && type !== 'Expense') 
      return 'Type must be either Income or Expense';
    
    return null;
  };
  
  export const validateDate = (date) => {
    if (!date) return 'Date is required';
    
    try {
      new Date(date);
    } catch (error) {
      return 'Date is invalid';
    }
    
    return null;
  };
  
  export const validateEntryForm = (formData) => {
    const errors = {};
    
    const nameError = validateEntryName(formData.name);
    if (nameError) errors.name = nameError;
    
    const amountError = validateAmount(formData.amount);
    if (amountError) errors.amount = amountError;
    
    const typeError = validateEntryType(formData.type);
    if (typeError) errors.type = typeError;
    
    const dateError = validateDate(formData.date);
    if (dateError) errors.date = dateError;
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };