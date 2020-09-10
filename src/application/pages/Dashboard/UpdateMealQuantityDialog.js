import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import api from '../../../api';
import IncrDecrButton from '../../shared/IncrDecrButton';

const UpdateMealQuantityDialog = (props) => {
  const { id, quantity, handleClose, open, onSuccess } = props;

  const handleSetQuantity = (newQuantity) => {
    api.setMealQuantity(id, newQuantity).then(() => onSuccess());
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Update Quantity</DialogTitle>
      <DialogContent>
        <IncrDecrButton
          currentCounter={quantity}
          incrementAction={handleSetQuantity}
          decrementAction={handleSetQuantity}
        />
      </DialogContent>
    </Dialog>
  );
};

UpdateMealQuantityDialog.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default UpdateMealQuantityDialog;
