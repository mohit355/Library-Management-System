import * as actionTypes from "../action/actionTypes";

const initialState = {
  myBooks: [],
  error: false,
};

const myBooksSuccess = (state, action) => {
  console.log(action);
  return { ...state, myBooks: action.data };
};

const myBooksError = (state, action) => {
  return { ...state, error: action.error };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MYBOOKS_SUCCESS:
      return myBooksSuccess(state, action);
    case actionTypes.GET_MYBOOKS_ERROR:
      return myBooksError(state, action);
    default:
      return state;
  }
};

export default reducer;
