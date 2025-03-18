import apiClient from './apiClient';

export const login = async (username, password) => {

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const response = await apiClient.post('/user/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const register = async (username, password) => {
  const response = await apiClient.post('/user/register', {
    username,
    password,
  });
  return response.data;
};

export const getUserProfile = async (username) => {
  const response = await apiClient.get(`/user/${username}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await apiClient.get('/user/getAll');
  return response.data;
};