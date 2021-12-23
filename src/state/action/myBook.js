import axios from "../../config";
import * as actionTypes from "./actionTypes";

export const myBooksSuccess = (myBooks) => {
  return {
    type: actionTypes.GET_MYBOOKS_SUCCESS,
    data: myBooks,
  };
};
export const myBooksError = (error) => {
  return {
    type: actionTypes.GET_MYBOOKS_ERROR,
    error: error,
  };
};

export const getMyBooks = (user_id) => {
  console.log(user_id);
  return async (dispatch) => {
    // const filterQuery = "OR({category_id}=" + `'${catalogue}'` + ")";
    const filterQuery = "?filterByFormula={created_by_user_id}=" + user_id;
    console.log(filterQuery);
    await axios
      .get(`/library${filterQuery}`, {
        headers: {
          Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
        },
      })
      .then((res) => {
        if (res.data.records) {
          dispatch(myBooksSuccess(res.data.records));
        }
      })
      .catch((err) => {
        dispatch(myBooksError(err));
      });
  };
};
