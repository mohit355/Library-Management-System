import React, { useEffect, useState } from "react";
import "./Pagination.css";

const Pagination = ({
  isOffset,
  dataArray = [],
  setVisibleCatalogues,
  searchNextPage,
  index,
  setIndex,
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
      searchNextPage();
    } else {
      setVisibleCatalogues(dataArray[index + 1]);
      setIndex(index + 1);
    }
  };

  return (
    <div className="pagination">
      <div>
        <div>
          <p>Catalogue per page : 30</p>
        </div>
      </div>
      <div className="pagination_button">
        <div>
          <button
            className={`${index === 0 ? "disable" : null}`}
            disabled={index === 0}
            onClick={handlePreviousPage}
          >
            Prev
          </button>
        </div>
        <div>
          <button
            className={`${nextDisable ? "disable" : null}`}
            disabled={nextDisable}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
