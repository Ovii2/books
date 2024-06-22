import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { getUserRoleFromToken } from '../../../utils/jwt';
import DeleteCategoryModal from '../../DeleteCategoryModal/DeleteCateogryModal';
import { updateDataAuth } from '../../../services/update';

import './CategoryCard.css';

const CategoryCard = ({ category, setUpdate }) => {
  const { title, description } = category;
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const { register, setValue, handleSubmit } = useForm();

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const handleCategoryTitleChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`categories/${category.id}`, { title: data.title });
        setUpdate((prev) => !prev);
        setEditTitle(false);
      }
    } catch (error) {
      console.error('Error updating title:', error.message);
    }
  };

  const handleCategoryDescriptionChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`categories/${category.id}`, { description: data.description });
        setUpdate((prev) => !prev);
        setEditDescription(false);
      }
    } catch (error) {
      console.error('Error updating description:', error.message);
    }
  };

  useEffect(() => {
    if (category) {
      setValue('title', category.title);
      setValue('description', category.description);
    }
  }, [category, setValue]);

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
            onClick={handleSubmit(handleCategoryTitleChange)}
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
            onClick={() => {
              setEditTitle(true);
              setEditDescription(false);
            }}
          />
        </h4>
      )}

      {editDescription && role === 'ADMIN' ? (
        <div className='edit-description'>
          <textarea {...register('description')} defaultValue={description} />
          <CheckIcon
            sx={{ color: 'green', cursor: 'pointer' }}
            onClick={handleSubmit(handleCategoryDescriptionChange)}
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
            onClick={() => {
              setEditDescription(true);
              setEditTitle(false);
            }}
          />
        </p>
      )}
    </div>
  );
};

export default CategoryCard;
