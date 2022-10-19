import { REQUEST_TOKEN, CURRENT_TOKEN, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  tokenObj: {
    token: '',
  },
  error: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isFetching: true,
    };
  case CURRENT_TOKEN:
    return {
      ...state,
      tokenObj: action.tokenObj,
      isFetching: false,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      isFetching: true,
      error: action.errorMsg,
      tokenObj: {
        token: '',
      },
    };
  default:
    return state;
  }
};

export default token;
