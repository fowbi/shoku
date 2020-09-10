import { combineReducers } from 'redux';
import user from '../domain/User/reducer';
import login from '../application/pages/Login/reducer';

export default combineReducers({ login, user });
