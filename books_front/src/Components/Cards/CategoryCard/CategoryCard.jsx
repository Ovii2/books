import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './CategoryCard.css';

const CategoryCard = ({ category, setUpdate }) => {
  const { title, description } = category;

  const { setValue } = useForm();

  useEffect(() => {  

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
