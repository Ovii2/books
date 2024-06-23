import { useContext, useState } from 'react';
import CommentsContext from '../../Context/CommentsContext/CommentContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { postComment } from '../../services/post';

import './CommentsForm.css';

const CommentsForm = () => {
  const { setUpdate, setComments } = useContext(CommentsContext);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const formSubmitHandler = async (data) => {
    try {
      const response = await postComment(data);
      setUpdate((update) => update + 1);
      // setIsFormOpen(false);
      reset();
      //   navigate('/books');
      toast.success('Comment added!');
      return response;
    } catch (error) {
      setError(error.message);
      toast.error('Error adding comment');
    }
  };

  return (
    <form className='comments-form' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
      <textarea
        {...register('comment', {
          required: { value: true, message: 'Comment is required' },
        })}
        className='comment-input'
        name=''
        id='comment'
        placeholder='Add comment'
      ></textarea>
      {errors.comment && <div className='error'>{errors.comment.message}</div>}
      <button className='add-comment-btn' type='submit'>
        Add comment
      </button>
    </form>
  );
};

export default CommentsForm;
