import axios from "../../config";
import * as actionTypes from "./actionTypes";

export const newBookSuccess = (data) => {
  return {
    type: actionTypes.ADD_NEWBOOK_SUCCESS,
    data: data,
  };
};
export const newBookError = (error) => {
  return {
    type: actionTypes.ADD_NEWBOOK_ERROR,
    error: error,
  };
};

export const setRedirect = () => {
  return {
    type: actionTypes.SET_NEWBOOK_REDIRECT,
  };
};

export const addNewBook = (bookDetails, user_id) => {
  console.log("user_id ", user_id);
  return async (dispatch) => {
    const data = {
      records: [
        { fields: { ...bookDetails, created_by_user_id: parseInt(user_id) } },
      ],
    };
    await axios
      .post(`/library/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
        },
      })
      .then((res) => {
        dispatch(newBookSuccess(res.data.records));
      })
      .catch((err) => {
        dispatch(newBookError(err));
      });
  };
};
