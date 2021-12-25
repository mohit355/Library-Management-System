import * as actionTypes from "../action/actionTypes";

const initialState = {
  myBooks: [],
  error: false,
  offset: null,
};

const myBooksSuccess = (state, action) => {
  let books = [];
  if (action.categoryChange) {
    books = [action.data];
  } else {
    books = [...state.myBooks, action.data];
  }
  return { ...state, myBooks: books, offset: action.offset };
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
