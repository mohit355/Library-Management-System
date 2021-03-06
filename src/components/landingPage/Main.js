import React, { useState } from "react";
import Filter from "../../UI/categoryFilter/Filter";
import Catalogue from "./catalogue/Catalogue";
import "./Main.css";

const Main = (props) => {
  const [category, setCategory] = useState("");

  return (
    <div className="catalogue">
      <Filter category={category} setCategory={setCategory} />
      <div className="catalogue-data">
        <Catalogue category_id={category} />
      </div>
    </div>
  );
};

export default Main;
