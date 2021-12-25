import React, { useEffect, useState } from "react";
import * as actions from "../../state/action/index";
import { connect } from "react-redux";

const Filter = ({ getCategories, categories, category, setCategory }) => {
  useEffect(() => {
    getCategories();
  });

  const handleDropdownChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div className="catalogue-filter">
      <div>Filter by Category</div>
      <div>
        <select onChange={handleDropdownChange} value={category}>
          <option value={""}>All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.fields.id}>
              {category.fields.category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.catalogue.categories,
    error: state.catalogue.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(actions.getCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
