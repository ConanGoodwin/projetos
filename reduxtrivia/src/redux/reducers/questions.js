import { REQUEST_QUESTION, CURRENT_QUESTION, FAILED_QUESTION } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  response_code: 0,
  results: [
    {
      category: '',
      type: '',
      difficulty: '',
      question: '',
      correct_answer: '',
      incorrect_answers: [],
    },
  ],
  error: '',
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTION:
    return {
      ...state,
      isFetching: true,
    };
  case CURRENT_QUESTION:
    return {
      ...state,
      ...action.questionObj,
      isFetching: false,
    };
  case FAILED_QUESTION:
    return {
      ...state,
      isFetching: true,
      error: action.errorMsg,
      response_code: 3,
      results: [],
    };
  default:
    return state;
  }
};

export default questions;
