import * as actionTypes from "../action/actionTypes";

const initialState = {
  newBook: [],
  error: false,
  redirect: false,
};

const newBookSuccess = (state, action) => {
  console.log("succccccc");
  return { ...state, newBook: action.data, redirect: true };
};
const newBookError = (state, action) => {
  return { ...state, error: true, redirect: false };
};

const setRedirect = (state, action) => {
  return { ...state, redirect: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEWBOOK_SUCCESS:
      return newBookSuccess(state, action);
    case actionTypes.ADD_NEWBOOK_ERROR:
      return newBookError(state, action);

    case actionTypes.SET_NEWBOOK_REDIRECT:
      return setRedirect(state, action);
    default:
      return state;
  }
};

export default reducer;
