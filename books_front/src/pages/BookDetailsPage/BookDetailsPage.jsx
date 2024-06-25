import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BookDetailsCard from '../../Components/Cards/BookDetailsCard/BookDetailsCard';
import CommentsForm from '../../Components/CommentsForm/CommentsForm';

import './BookDetailsPage.css';
import CommentsContext from '../../Context/CommentsContext/CommentContext';
import CommentsList from '../../Components/Lists/CommentsList/CommentsList';
import { getAllCommentsAuth } from '../../services/get';
import { useParams } from 'react-router-dom';

const BookDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { update, comments, setComments } = useContext(CommentsContext);
  const { id: bookId, commentId } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCommentsAuth(bookId);
      setComments(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchData();
    }
  }, [update, bookId, commentId]);

  return (
    <div className='books-details-page-container'>
      <BookDetailsCard />
      <CommentsForm />
      {isLoading ? (
        <p>Loading...</p>
      ) : comments.length === 0 ? (
        <p className='no-comments'>No comments available</p>
      ) : (
        <CommentsList className='comments-list' />
      )}
    </div>
  );
};

export default BookDetailsPage;
