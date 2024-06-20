import BooksForm from '../../Components/BooksForm/BooksForm';
import BooksContext from '../../Context/BooksContext/BooksContext';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import './BooksPage.css';
import { getAllBooksAuth } from '../../services/get';
import BooksList from '../../Components/Lists/BooksList/BooksList';

const BooksPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { update, setBooks, books } = useContext(BooksContext);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllBooksAuth();
      setBooks(data);
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
      <h1 className='books-title'>Books</h1>
      <div className='books-page'>
        <BooksForm />
        {isLoading ? (
          <p>Loading...</p>
        ) : books.length === 0 ? (
          <p className='no-books'>No books available</p>
        ) : (
          <BooksList />
        )}
      </div>
    </>
  );
};

export default BooksPage;
