import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../state/action/index";
import BookCard from "../../../UI/bookCard/BookCard";
import Pagination from "../../../UI/pagination/Pagination";
import "./Catalogue.css";

const Catalogue = ({
  catalogues,
  category_id,
  error,
  offset,
  getCatalogues,
}) => {
  const [visibleCatalogues, setVisibleCatalogues] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    getCatalogues(category_id, null, true); // dynamic
    setVisibleCatalogues([]);
    setIndex(0);
  }, [category_id]);

  const searchNextPage = () => {
    getCatalogues(category_id, offset, false);
  };

  const isOffset = () => {
    return offset ? true : false;
  };

  return (
    <div id="catalogue">
      <div className="catalogue_data">
        {error ? alert("Network issue, please try again") : null}
        {visibleCatalogues &&
          visibleCatalogues.map((category) => (
            <BookCard
              key={category.id}
              title={category.fields.title}
              author={category.fields.author}
              category={category.fields.category}
              imageUrl={category.fields.image_url}
            />
          ))}
      </div>
      <div className="catalogue_pagination">
        <Pagination
          setVisibleCatalogues={setVisibleCatalogues}
          dataArray={catalogues}
          isOffset={isOffset}
          searchNextPage={searchNextPage}
          index={index}
          setIndex={setIndex}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    catalogues: state.catalogue.catalogues,
    error: state.catalogue.error,
    offset: state.catalogue.offset,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalogues: (category_id, offset, categoryChange) =>
      dispatch(actions.getCatalogues(category_id, offset, categoryChange)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
