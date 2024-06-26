import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import './CommentCard.css';
import { deleteComment } from '../../../services/delete';
import { getUserNameFromToken, getUserRoleFromToken } from '../../../utils/jwt';
import { useParams } from 'react-router-dom';
import { updateCommentAuth } from '../../../services/update';

const CommentCard = ({ comment, setUpdate }) => {
  const { comment: newComment, date, id: commentId, user } = comment;
  const [editComment, setEditComment] = useState(false);
  const { id: bookId } = useParams();
  const [error, setError] = useState(null);
  const { register, setValue, handleSubmit } = useForm();

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);
  const currentUser = getUserNameFromToken(token);

  const handleCommentChange = async (data) => {
    try {
      if (user.role === 'ADMIN' || currentUser === user.username) {
        await updateCommentAuth(bookId, commentId, { comment: data.comment });
        setUpdate((prev) => !prev);
        setEditComment(false);
      }
    } catch (error) {
      toast.error(`Error updating comment: ${error.message}`);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this comment?');
      if (confirmed && (role === 'ADMIN' || currentUser === user.username)) {
        await deleteComment(commentId);
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
          <p>{user.username}</p>
          <p>{date}</p>
        </div>
        {editComment ? (
          <div className='edit-comment'>
            <input type='text' {...register('comment')} defaultValue={newComment} />
            <CheckIcon
              sx={{ color: 'green', cursor: 'pointer' }}
              onClick={handleSubmit(handleCommentChange)}
            />
            <CloseIcon
              sx={{ color: 'tomato', cursor: 'pointer' }}
              onClick={() => setEditComment(false)}
            />
          </div>
        ) : (
          <div className='comment-text'>
            <p>{newComment}</p>
            {(role === 'ADMIN' || currentUser === user.username) && (
              <EditIcon
                sx={{ color: 'brown', cursor: 'pointer', marginLeft: '0.2rem' }}
                onClick={() => setEditComment(true)}
              />
            )}
          </div>
        )}
      </div>
      {(role === 'ADMIN' || currentUser === user.username) && (
        <DeleteForeverIcon
          sx={{ color: 'var(--tomato)', cursor: 'pointer', marginLeft: '2rem' }}
          onClick={handleDelete}
        />
      )}
    </div>
  );
};

export default CommentCard;
