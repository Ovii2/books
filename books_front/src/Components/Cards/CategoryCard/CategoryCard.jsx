import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

import './CategoryCard.css';
import { getUserRoleFromToken } from '../../../utils/jwt';
import DeleteCategoryModal from '../../DeleteCategoryModal/DeleteCateogryModal';

const API_URL = import.meta.env.VITE_API_URL;

const CategoryCard = ({ category, setUpdate }) => {
  const { title, description } = category;
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const { register, setValue, handleSubmit } = useForm();

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  useEffect(() => {
    if (category) {
      setValue('title', category.title);
      setValue('description', category.description);
    }
  }, [category, setValue]);

  const handleTitleChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await axios.patch(
          `${API_URL}/categories/${category.id}`,
          { title: data.title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUpdate((prev) => !prev);
        setEditTitle(false);
      }
    } catch (error) {
      console.error('Error updating title:', error.message);
    }
  };

  const handleDescriptionChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await axios.patch(
          `${API_URL}/categories/${category.id}`,
          { description: data.description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUpdate((prev) => !prev);
        setEditDescription(false);
      }
    } catch (error) {
      console.error('Error updating description:', error.message);
    }
  };

  return (
    <div className='category-card'>
      <DeleteCategoryModal
        category={category}
        sx={{ color: 'tomato', cursor: 'pointer' }}
        onClick={() => setUpdate((prev) => !prev)}
      />

      {editTitle && role === 'ADMIN' ? (
        <div className='edit-title'>
          <input {...register('title')} defaultValue={title} />
          <CheckIcon
            sx={{ color: 'green', cursor: 'pointer' }}
            onClick={handleSubmit(handleTitleChange)}
          />
          <CancelIcon
            sx={{ color: 'tomato', cursor: 'pointer' }}
            onClick={() => setEditTitle(false)}
          />
        </div>
      ) : (
        <h4>
          Title: {title}
          <ModeOutlinedIcon
            sx={{ color: 'brown', cursor: 'pointer', marginLeft: '0.2rem' }}
            onClick={() => setEditTitle(true)}
          />
        </h4>
      )}

      {editDescription && role === 'ADMIN' ? (
        <div className='edit-description'>
          <textarea {...register('description')} defaultValue={description} />
          <CheckIcon
            sx={{ color: 'green', cursor: 'pointer' }}
            onClick={handleSubmit(handleDescriptionChange)}
          />
          <CancelIcon
            sx={{ color: 'tomato', cursor: 'pointer' }}
            onClick={() => setEditDescription(false)}
          />
        </div>
      ) : (
        <p>
          Description: {description}
          <ModeOutlinedIcon
            sx={{ color: 'brown', cursor: 'pointer', marginLeft: '0.2rem' }}
            onClick={() => setEditDescription(true)}
          />
        </p>
      )}
    </div>
  );
};

export default CategoryCard;
