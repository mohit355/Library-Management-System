import * as actionTypes from "../action/actionTypes";
const initialState = {
  loginCreds: {
    fieldId: "",
    userName: "",
    password: "",
    user_id: "",
  },
  token: "",
  user: "",
  loading: false,
  redirect: false,
  error: false,
};

const authStart = (state, action) => {
  return { ...state, loading: true, error: false };
};

const authSucess = (state, action) => {
  return {
    ...state,
    token: action.token,
    user: action.user,
    loading: false,
    error: false,
    redirect: true,
  };
};

const authFail = (state, action) => {
  return { ...state, error: action.error, redirect: false, loading: false };
};

const authLogout = (state, action) => {
  return { ...state, token: null, user: null, loading: false, redirect: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSucess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    default:
      return state;
  }
};

export default reducer;
