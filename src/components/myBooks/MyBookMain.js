import React, { useEffect, useState } from "react";
import * as actions from "../../state/action/index";
import Filter from "../../UI/categoryFilter/Filter";
import MyBooks from "./mYBooksCatalogue/MyBooks";
// import "./Main.css";

const MyBookMain = (props) => {
  // const [category, setCategory] = useState("");

  return (
    <div className="catalogue">
      {/* <Filter category={category} setCategory={setCategory} /> */}
      <div className="catalogue-data">
        <MyBooks />
      </div>
    </div>
  );
};

export default MyBookMain;
