import { SET_VISITOR, FETCH_USER, SET_USER } from './actions';
const defaultState = { details: {}, isAuthenticated: false, isLoading: false };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_VISITOR:
      return { ...defaultState, isLoading: false };

    case FETCH_USER:
      return { ...defaultState, isLoading: true };

    case SET_USER:
      return { ...state, details: action.payload, isAuthenticated: true, isLoading: false };

    default:
      return state;
  }
};

export default reducer;
