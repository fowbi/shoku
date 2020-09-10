import React, { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import PropTypes from 'prop-types';
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';

const IncrDecrButton = (props) => {
  const { currentCounter, incrementAction, decrementAction } = props;
  const [counter, setCounter] = useState(currentCounter);

  const handleIncrement = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    incrementAction(newCounter);
  };

  const handleDecrement = () => {
    const newCounter = counter - 1;
    setCounter(newCounter);
    decrementAction(newCounter);
  };

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button onClick={handleDecrement}>-</Button>
      <Button disabled>{counter}</Button>
      <Button onClick={handleIncrement}>+</Button>
    </ButtonGroup>
  );
};

IncrDecrButton.defaultProps = {
  incrementAction: (counter) => {
    console.log(counter);
  },
  decrementAction: (counter) => {
    console.log(counter);
  },
};

IncrDecrButton.propTypes = {
  currentCounter: PropTypes.number.isRequired,
  incrementAction: PropTypes.func,
  decrementAction: PropTypes.func,
};

export default IncrDecrButton;
