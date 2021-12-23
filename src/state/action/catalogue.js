import axios from "../../config";
import * as actionTypes from "./actionTypes";

export const getCategorySuccess = (categories) => {
  return {
    type: actionTypes.GET_CATEGORY_SUCCESS,
    data: categories,
  };
};

export const getCategoryError = (error) => {
  return {
    type: actionTypes.GET_CATEGORY_ERROR,
    error: error,
  };
};

export const getCatalogueSuccess = (catalogue) => {
  return {
    type: actionTypes.GET_CATALOGUE_SUCCESS,
    data: catalogue,
  };
};

export const getCatalogueError = (error) => {
  return {
    type: actionTypes.GET_CATALOGUE_ERROR,
    error: error,
  };
};

export const getCategories = (user) => {
  return async (dispatch) => {
    await axios
      .get(`/category`, {
        headers: {
          Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
        },
      })
      .then((res) => {
        if (res.data.records) {
          dispatch(getCategorySuccess(res.data.records));
        }
      })
      .catch((err) => {
        dispatch(getCategoryError(err));
      });
  };
};

export const getCatalogues = (catalogue = "") => {
  return async (dispatch) => {
    // const filterQuery = "OR({category_id}=" + `'${catalogue}'` + ")";
    const filterQuery = "?filterByFormula={category_id}=" + `'${catalogue}'`;
    console.log(filterQuery);
    await axios
      .get(`/library/${catalogue !== "" ? filterQuery : ""}`, {
        headers: {
          Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
        },
      })
      .then((res) => {
        console.log(res.data.records);
        if (res.data.records) {
          dispatch(getCatalogueSuccess(res.data.records));
        }
      })
      .catch((err) => {
        dispatch(getCatalogueError(err));
      });
  };
};
