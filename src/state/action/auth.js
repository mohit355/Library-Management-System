import axios from "../../config";
import * as actionTypes from "./actionTypes";

export const authSucess = (userDetails) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: userDetails,
  };
};

export const authFail = (userDetails) => {
  return {
    type: actionTypes.AUTH_FAIL,
    data: "Wrong username or password",
  };
};

export const authError = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: error,
  };
};

export const isUserValid = (user) => {
  return async (dispatch) => {
    const filterQuery =
      "AND({username}=" +
      `'${user.userName}'` +
      ",{password}=" +
      `'${user.password}'` +
      ")";

    await axios
      .get(`/user?filterByFormula=${filterQuery}`, {
        headers: {
          Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
        },
      })
      .then((res) => {
        if (res.data.records.length === 1) {
          dispatch(authSucess(res.data.records[0]));
        } else {
          dispatch(authFail(res.data.records));
        }
      })
      .catch((err) => {
        dispatch(authError(err));
      });
  };
};
