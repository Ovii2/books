import axios from 'axios';
// import jwtDecode from 'jwt-decode';
const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');

export const postData = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const postRegister = async (data) => {
  try {
    let response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const loginPost = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const postCategory = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save category ${error.message}`);
  }
};

export const postBook = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/books`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save book ${error.message}`);
  }
};

export const postComment = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/books/comments`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save comment ${error.message}`);
  }
};
