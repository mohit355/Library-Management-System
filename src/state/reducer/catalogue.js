import * as actionTypes from "../action/actionTypes";

const initialState = {
  categories: [],
  error: false,
  catalogues: [],
  offset: null,
};

const getCategorySuccess = (state, action) => {
  return { ...state, categories: action.data };
};
const getCategoryError = (state, action) => {
  return { ...state, error: true };
};

const getCatalogueSuccess = (state, action) => {
  let catalogue = [];
  if (action.categoryChange) {
    catalogue = [action.data];
  } else {
    catalogue = [...state.catalogues, action.data];
  }
  return {
    ...state,
    catalogues: catalogue,
    offset: action.offset,
  };
};
const getCatalogueError = (state, action) => {
  return { ...state, error: true };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY_SUCCESS:
      return getCategorySuccess(state, action);

    case actionTypes.GET_CATEGORY_ERROR:
      return getCategoryError(state, action);

    case actionTypes.GET_CATALOGUE_SUCCESS:
      return getCatalogueSuccess(state, action);

    case actionTypes.GET_CATALOGUE_ERROR:
      return getCatalogueError(state, action);

    default:
      return state;
  }
};

export default reducer;
