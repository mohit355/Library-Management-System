import * as actionTypes from "../action/actionTypes";
const initialState = {
  loginCreds: {
    fieldId: "",
    userName: "",
    password: "",
    user_id: "",
  },
  loading: false,
  redirect: false,
  error: false,
};

const authSucess = (state, action) => {
  const loginCreds = {
    fieldId: action.user.id,
    userName: action.user.fields.username,
    password: action.user.fields.password,
    user_id: action.user.fields.id,
  };
  return {
    ...state,
    loginCreds: loginCreds,
    loading: false,
    error: false,
    redirect: true,
  };
};

const authFail = (state, action) => {
  return { ...state, error: action.data, redirect: false, loading: false };
};

const authError = (state, action) => {
  return { ...state, error: action.error, redirect: false, loading: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSucess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_ERROR:
      return authError(state, action);
    default:
      return state;
  }
};

export default reducer;
