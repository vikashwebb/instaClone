import {SET_POST, ERROR_POST} from '../action/action.type';

const initialState = {
  post: null,
  error: false,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: false,
      };
    case ERROR_POST:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
      console.log('asdfadf SET_POST', SET_POST);
  }
};
