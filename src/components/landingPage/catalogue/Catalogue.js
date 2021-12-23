import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../state/action/index";
import BookCard from "../../../UI/bookCard/BookCard";
import "./Catalogue.css";

const Catalogue = (props) => {
  useEffect(() => {
    props.getCatalogues(props.category_id);
  }, [props.category_id]);

  return (
    <div id="catalogue">
      {props.error ? alert("Network issue, please try again") : null}
      {props.catalogues.length &&
        props.catalogues.map((category) => (
          <BookCard
            key={category.id}
            title={category.fields.title}
            author={category.fields.author}
            category={category.fields.category}
            imageUrl={category.fields.image_url}
          />
        ))}
      {props.catalogues.length === 0 ? <div>No Book found</div> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    catalogues: state.catalogue.catalogues,
    error: state.catalogue.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalogues: (category_id) =>
      dispatch(actions.getCatalogues(category_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
