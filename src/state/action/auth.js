import axios from "../../config";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSucess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
    token: token,
  };
};

export const authFail = (userDetails) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: "Wrong username or password",
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const isUserValid = (user) => {
  return (dispatch) => {
    const filterQuery =
      "AND({username}=" +
      `'${user.userName}'` +
      ",{password}=" +
      `'${user.password}'` +
      ")";

    dispatch(authStart());
    axios
      .get(`/user?fields=id&fields=username&filterByFormula=${filterQuery}`, {
        headers: {
          Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
        },
      })
      .then((res) => {
        const userDetails = res.data.records;
        if (userDetails.length === 1) {
          const time = 4 * 60 * 60 * 60 * 100;
          const expirationDate = new Date(new Date().getTime() + time);
          localStorage.setItem("token", userDetails[0].fields.id);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...userDetails[0].fields, password: undefined })
          );
          const users = { ...userDetails[0].fields, password: undefined };
          dispatch(authSucess(users.id, users));
          dispatch(checkAuthTimeout(time));
        } else {
          dispatch(authFail(userDetails));
        }
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch(authSucess(token, user));
        dispatch(
          checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
        );
      }
    }
  };
};
