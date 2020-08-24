import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PropTypes from 'prop-types';
import api from '../../../api';

const DeleteMealDialog = (props) => {
  const { id, message, handleClose, open, onSuccess } = props;

  const handleDeleteMeal = () => {
    api.deleteMeal(id).then(() => onSuccess());
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Delete meal {message}</DialogTitle>
      <DialogContent />
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleDeleteMeal}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteMealDialog.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default DeleteMealDialog;
