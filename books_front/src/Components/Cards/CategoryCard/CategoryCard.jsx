import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import './CategoryCard.css';

const CategoryCard = ({ category, setUpdate }) => {
  const { title, description } = category;

  const { setValue } = useForm();

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('admin'));
    // if (user && user.data && user.data.role) {
    //   setUserRole(user.data.role);
    // }

    if (category) {
      setValue('title', category.title);
      setValue('description', category.description);
    }
  }, [category, setValue]);

  return (
    <div className='category-card'>
      <h4>Title: {title}</h4>
      <p>Description: {description}</p>
    </div>
  );
};

export default CategoryCard;
