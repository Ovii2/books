import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './CommentCard.css';
import { deleteComment } from '../../../services/delete';
import { getUserRoleFromToken } from '../../../utils/jwt';
import { useParams } from 'react-router-dom';

const CommentCard = ({ comment, setUpdate }) => {
  const { comment: newComment, date, username, user, id: commentId } = comment;
  // console.log(comment.comment);
  // console.log(comment.id);
  // console.log(comment.user.username);
  // console.log(user);
  const { id: bookId } = useParams();
  const [error, setError] = useState(null);
  const { register, setValue, handleSubmit } = useForm();

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const handleDelete = async () => {
    console.log('commentId ===', commentId);
    console.log('bookId ===', bookId);
    try {
      const confirmed = window.confirm(`Are you sure you want to delete comment?`);
      if (confirmed && role === 'ADMIN') {
        await deleteComment(bookId, commentId);
        setUpdate((update) => update + 1);
      }
    } catch (error) {
      toast.error(`Error deleting comment: ${error.message}`);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (comment) {
      setValue('comment', comment.comment);
    }
  }, [comment, setValue]);

  return (
    <div className='comment-card-container'>
      <div className='comment-card'>
        <div className='username-date'>
          <p>{comment.user.username}</p>
          <p>{date}</p>
        </div>
        <input type='text' className='comment-text' name='' id='' defaultValue={newComment} />
      </div>
      <DeleteForeverIcon
        sx={{ color: 'var(--tomato)', cursor: 'pointer', marginLeft: '2rem' }}
        onClick={() => handleDelete(bookId, commentId)}
      />
    </div>
  );
};

export default CommentCard;
