import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllData = async () => {
  try {
    const resp = await axios.get(API_URL);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getOne = async (id) => {
  try {
    const resp = await axios.get(`${API_URL}/${id}`);
    return resp.data;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}: ${error.message}`);
  }
};

export const getOneBook = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const resp = await axios.get(`${API_URL}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.error(`Error fetching book for ID ${id}: ${error.message}`);
  }
};

export const getAllDataAuth = async () => {
  const token = localStorage.getItem('token');
  try {
    const resp = await axios.get(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getCategories = async () => {
  const token = localStorage.getItem('token');
  try {
    const resp = await axios.get(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getAllBooksAuth = async () => {
  const token = localStorage.getItem('token');
  try {
    const resp = await axios.get(`${API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};
