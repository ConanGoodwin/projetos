import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import questions from './questions';
import player from './player';

const rootReducer = combineReducers({ user, token, questions, player });

export default rootReducer;
