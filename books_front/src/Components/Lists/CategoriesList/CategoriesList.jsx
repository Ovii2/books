import { useContext } from 'react';
import CategoryCard from '../../Cards/CategoryCard/CategoryCard';
import CategoriesContext from '../../../Context/CategoriesContext/CategoriesContext';

import './CategoriesLists.css';

const CategoriesList = () => {
  const { setUpdate, categories } = useContext(CategoriesContext);
  return (
    <>
      <div className='categories-list'>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} setUpdate={setUpdate} />
        ))}
      </div>
    </>
  );
};

export default CategoriesList;
