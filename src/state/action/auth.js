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
  console.log("logout");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  console.log("hello");
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
      .get(`/user?filterByFormula=${filterQuery}`, {
        headers: {
          Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
        },
      })
      .then((res) => {
        const userDetails = res.data.records;
        if (userDetails.length === 1) {
          const expirationDate = new Date(new Date().getTime() + 100000);
          console.log(expirationDate);
          localStorage.setItem("token", userDetails[0].fields.id);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...userDetails[0].fields, password: undefined })
          );
          const users = { ...userDetails[0].fields, password: undefined };
          console.log("users ", users);
          dispatch(authSucess(users.id, users));
          console.log(userDetails);
          dispatch(checkAuthTimeout(100000));
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
