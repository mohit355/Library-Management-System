import React from "react";
import "./BookCard.css";

const BookCard = ({ title, author, category, imageUrl }) => {
  return (
    <div className="img-card iCard-style2">
      <div className="card-content">
        <div className="card-image">
          <img src={imageUrl} alt="" />
        </div>

        <span className="card-title">
          {title && title.length > 20
            ? title.substring(0, 20)
            : title
            ? title
            : "NO TITLE"}
        </span>

        <div className="card-text">
          <p>By: {author ? author : "Not available"}</p>
          <p>{category ? category : "Uncategorised"}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
