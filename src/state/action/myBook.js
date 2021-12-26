import axios from "../../config";
import * as actionTypes from "./actionTypes";

export const myBooksSuccess = (myBooks, offset, categoryChange) => {
  return {
    type: actionTypes.GET_MYBOOKS_SUCCESS,
    data: myBooks,
    offset: offset,
    categoryChange: categoryChange,
  };
};
export const myBooksError = (error) => {
  return {
    type: actionTypes.GET_MYBOOKS_ERROR,
    error: error,
  };
};

export const setMyBookLoading = (value) => {
  return {
    type: actionTypes.SET_MYBOOK_LOADING,
    value: value,
  };
};

export const getMyBooks = (user_id, offset, categoryChange) => {
  return async (dispatch) => {
    let filterQuery = "";

    if (user_id) {
      filterQuery = "filterByFormula={created_by_user_id}=" + user_id;
    }

    if (offset) {
      offset = `offset=${offset}&`;
      filterQuery = offset + filterQuery;
    }

    filterQuery =
      "?sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc&" +
      filterQuery;
    await axios
      .get(`/library${filterQuery}`, {
        headers: {
          Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
        },
      })
      .then((res) => {
        const data = res.data;
        if (res.data.records) {
          dispatch(myBooksSuccess(data.records, data.offset, categoryChange));
        }
      })
      .catch((err) => {
        dispatch(myBooksError(err));
      });
  };
};
