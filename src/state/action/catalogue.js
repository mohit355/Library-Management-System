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

export const getCatalogueSuccess = (catalogue, offset, categoryChange) => {
  return {
    type: actionTypes.GET_CATALOGUE_SUCCESS,
    data: catalogue,
    offset: offset,
    categoryChange: categoryChange,
  };
};

export const setLoading = (value) => {
  return {
    type: actionTypes.SET_CATALOGUE_LOADING,
    value: value,
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
      .get(
        `/category?sort%5B0%5D%5Bfield%5D=category&sort%5B0%5D%5Bdirection%5D=asc`,
        {
          headers: {
            Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
          },
        }
      )
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

export const getCatalogues = (
  category_id = undefined,
  offset,
  categoryChange = false
) => {
  return async (dispatch) => {
    console.log("category id ", category_id);
    let filterQuery = "";
    if (category_id) {
      filterQuery = "filterByFormula={category_id}=" + `'${category_id}'`;
    }
    console.log("filterQuery ", filterQuery);
    if (offset) {
      offset = `offset=${offset}&`;
      filterQuery = offset + filterQuery;
    }

    filterQuery =
      "?sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc&pageSize=50&" +
      filterQuery;

    console.log(filterQuery);
    await axios
      .get(`/library${filterQuery}`, {
        headers: {
          Authorization: `Bearer keyoPS4nMgbO1Ug6m`,
        },
      })
      .then((res) => {
        console.log("response data of catalogu from action ", res.data);
        if (res.data.records) {
          dispatch(
            getCatalogueSuccess(
              res.data.records,
              res.data.offset,
              categoryChange
            )
          );
        }
      })
      .catch((err) => {
        dispatch(getCatalogueError(err));
      });
  };
};
