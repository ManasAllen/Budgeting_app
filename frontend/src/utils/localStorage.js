export const setToken = (token) => {
    localStorage.setItem('budget_app_token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('budget_app_token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('budget_app_token');
  };
  
  export const setCurrentUser = (user) => {
    localStorage.setItem('budget_app_user', JSON.stringify(user));
  };
  
  export const getCurrentUser = () => {
    const user = localStorage.getItem('budget_app_user');
    return user ? JSON.parse(user) : null;
  };
  
  export const removeCurrentUser = () => {
    localStorage.removeItem('budget_app_user');
  };
  
  export const clearStorage = () => {
    removeToken();
    removeCurrentUser();
  };