import { NEW_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, { type, payLoad }) => {
  switch (type) {
  case NEW_LOGIN:
    return { ...state, ...payLoad };
  default:
    return state;
  }
};

export default user;
