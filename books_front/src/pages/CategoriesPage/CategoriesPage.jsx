import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import CategoriesForm from '../../Components/CategoriesForm/CategoriesForm';
import CategoriesList from '../../Components/Lists/CategoriesList/CategoriesList';
import CategoriesContext from '../../Context/CategoriesContext/CategoriesContext';
import './CategoriesPage.css';
import { getAllDataAuth } from '../../services/get';

const CategoriesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { update, setCategories, categories } = useContext(CategoriesContext);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllDataAuth();
      setCategories(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <>
      <h1 className='categories-title'>Categories</h1>
      <div className='categories-page'>
        <CategoriesForm />
        {isLoading ? (
          <p>Loading...</p>
        ) : categories.length === 0 ? (
          <p className='no-categories'>No categories available</p>
        ) : (
          <CategoriesList />
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
