import { AUTHENTICATE, AUTHENTICATION_ERROR, AUTHENTICATION_SUCCESS } from './actions';
const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTHENTICATION_ERROR:
      return { ...defaultState, hasError: true };

    case AUTHENTICATION_SUCCESS:
      return { ...defaultState, hasError: false };

    case AUTHENTICATE:
    default:
      return state;
  }
};

export default reducer;
