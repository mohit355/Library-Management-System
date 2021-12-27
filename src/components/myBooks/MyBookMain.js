import React from "react";
import MyBooks from "./mYBooksCatalogue/MyBooks";

const MyBookMain = (props) => {
  return (
    <div className="catalogue">
      <div className="catalogue-data">
        <MyBooks />
      </div>
    </div>
  );
};

export default MyBookMain;
