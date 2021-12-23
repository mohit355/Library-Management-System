import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../state/action/index";
import Catalogue from "./catalogue/Catalogue";
import "./Main.css";

const Main = (props) => {
  const [category, setCategory] = useState("");
  useEffect(() => {
    props.getCategories();
  });

  const handleDropdownChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div className="catalogue">
      <div className="catalogue-filter">
        <div>Filter by Category</div>
        <div>
          <select onChange={handleDropdownChange} value={category}>
            <option value={""}>All categories</option>
            {props.categories.map((category) => (
              <option key={category.id} value={category.fields.id}>
                {category.fields.category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="catalogue-data">
        <Catalogue category_id={category} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
