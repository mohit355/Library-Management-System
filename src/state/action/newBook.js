import axios from "../../config";
import * as actionTypes from "./actionTypes";

export const newBookSuccess = () => {
  return {
    type: actionTypes.ADD_NEWBOOK_SUCCESS,
  };
};
export const myBookError = (error) => {
  return {
    type: actionTypes.ADD_NEWBOOK_ERROR,
    error: error,
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
    console.log(data);
    await axios
      .post(`/library/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(newBookSuccess());
      })
      .catch((err) => {
        dispatch(myBookError(err));
      });
  };
};
