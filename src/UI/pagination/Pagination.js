import React, { useEffect, useState } from "react";
import "./Pagination.css";

const Pagination = ({
  isOffset,
  dataArray = [],
  setVisibleCatalogues,
  searchNextPage,
  index,
  setIndex,
  setLoading,
}) => {
  const [nextDisable, setNextDisable] = useState(true);

  useEffect(() => {
    setVisibleCatalogues(dataArray[index]);
    setNextDisable(isOffset() ? false : true);
  }, [dataArray]);

  const handlePreviousPage = (event) => {
    setVisibleCatalogues(dataArray[index - 1]);
    setIndex(index - 1);
    setNextDisable(false);
  };
  const handleNextPage = (event) => {
    if (dataArray[index + 1] === undefined) {
      setIndex(index + 1);
      setLoading(true);
      searchNextPage();
    } else {
      setVisibleCatalogues(dataArray[index + 1]);
      setIndex(index + 1);
    }
  };

  return (
    <div className="pagination">
      <div className="pageItemCount">
        <p>
          Number of books in this page :{" "}
          {dataArray[index] ? dataArray[index].length : 0}
        </p>
      </div>
      <div className="pagination_button">
        <button
          className={`pageButton ${index === 0 ? "disable" : null}`}
          disabled={index === 0}
          onClick={handlePreviousPage}
        >
          Prev
        </button>
        <button
          className={`pageButton ${nextDisable ? "disable" : null}`}
          disabled={nextDisable}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
