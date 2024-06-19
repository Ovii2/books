import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import CategoriesForm from '../../Components/CategoriesForm/CategoriesForm';
import CategoriesList from '../../Components/Lists/CategoriesList/CategoriesList';
import CategoriesContext from '../../Context/CategoriesContext/CategoriesContext';
import './CategoriesPage.css';
import { getAllDataAuth } from '../../services/get';

const CategoriesPage = () => {
  const [isLoading, setIsloading] = useState(true);
  const { update, setUpdate, categories, setCategories } = useContext(CategoriesContext);

  const fetchData = async () => {
    // setIsloading(true);
    try {
      const data = await getAllDataAuth();
      setCategories(data);
      // setFilteredPets(categories);
    } catch (error) {
      toast.error(error.message);
    } finally {
      // setIsloading(false);
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
        <CategoriesList />
      </div>
    </>
  );
};

export default CategoriesPage;
