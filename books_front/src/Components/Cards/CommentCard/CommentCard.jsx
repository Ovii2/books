import { useEffect } from 'react';
import { getUserRoleFromToken } from '../../../utils/jwt';
import './CommentCard.css';

const CommentCard = ({ comment, setUpdate }) => {
  const { newComment } = comment;
  const { register, setValue, handleSubmit } = useForm();

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  useEffect(() => {
    if (comment) {
      setValue('title', comment.comment);
    }
  }, [comment, setValue]);

  return (
    <div className='comment-card'>
      <p></p>
      <p></p>
      <textarea name='' id=''>
        {newComment}
      </textarea>
      <hr />
    </div>
  );
};

export default CommentCard;
