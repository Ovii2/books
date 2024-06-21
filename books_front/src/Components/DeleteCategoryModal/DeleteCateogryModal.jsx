import { useState, useContext } from 'react';
import CategoriesContext from '../../Context/CategoriesContext/CategoriesContext';
import Button from '@mui/joy/Button';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import './DeleteCategoryModal.css';
import { deleteCategory } from '../../services/delete';

const DeleteCategoryModal = ({ category }) => {
  const { setUpdate } = useContext(CategoriesContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const { id } = category;

  const handleDelete = async () => {
    try {
      await deleteCategory(id);
      setUpdate((update) => update + 1);
      setOpen(false);
    } catch (error) {
      toast.error('Error deleting category:', error);
      setError(error.message);
    }
  };

  return (
    <>
      <Button
        className='delete-btn'
        variant='contained'
        color='danger'
        endDecorator={<ClearIcon />}
        onClick={() => setOpen(true)}
        sx={{ color: 'tomato', position: 'absolute' }}
      ></Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant='outlined' role='alertdialog'>
          <DialogContent>Are you sure you want to delete {category.title}?</DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='outlined'
              color='neutral'
              onClick={() => setOpen(false)}
              sx={{ padding: '0.5rem 2rem' }}
            >
              Cancel
            </Button>
            <Button
              variant='solid'
              onClick={() => handleDelete(category.id)}
              sx={{
                backgroundColor: 'var(--primary-blue)',
                marginRight: '0.5rem',
                padding: '0.5rem 2rem',
                '&:hover': { backgroundColor: 'var(--primary-blue)' },
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default DeleteCategoryModal;
