import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  // makeStyles,
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import api from '../../../api';
import { mealTypeOptions } from '../../shared/MealType';

// const useStyles = makeStyles((theme) => ({}));

const AddMealDialog = (props) => {
  const { date, handleClose, open, onSuccess } = props;
  // const classes = useStyles(props);

  const [formData, setFormData] = useState({
    type: '',
    what: '',
    when: date,
    location: '',
  });

  const handleDateChange = (date) => {
    setFormData({ ...formData, when: date });
  };

  const handleLocationChange = (event) => {
    setFormData({ ...formData, location: event.target.value });
  };

  const handleTypeChange = (event) => {
    setFormData({ ...formData, type: event.target.value });
  };

  const handleWhatChange = (event) => {
    setFormData({ ...formData, what: event.target.value });
  };

  const handleAddMeal = () => {
    api
      .addMeal({
        type: formData.type,
        what: formData.what,
        when: formData.when.format('YYYY-MM-DD HH:mm:ss'),
        location: formData.location,
      })
      .then(() => onSuccess());
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add meal for {date.format('YYYY-MM-DD')}</DialogTitle>
      <DialogContent>
        <form>
          <FormControl>
            <InputLabel htmlFor="type">Type</InputLabel>
            <NativeSelect
              native
              inputProps={{
                name: 'type',
                id: 'type',
              }}
              margin="dense"
              fullWidth
              onChange={handleTypeChange}
            >
              <option aria-label="None" value="" />
              {mealTypeOptions.map((type) => (
                <option value={type.id} key={type.id}>
                  {type.value}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <TextField id="what" label="What" multiline rowsMax={4} fullWidth onChange={handleWhatChange} />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
              autoOk={false}
              disableToolbar
              disableFuture
              variant="inline"
              format="YYYY-MM-DD HH:mm:ss"
              margin="normal"
              id="when"
              ampm={false}
              label="When"
              value={formData.when}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField margin="dense" id="location" label="Location" fullWidth onChange={handleLocationChange} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button color="secondary" onClick={handleAddMeal}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddMealDialog.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddMealDialog;
