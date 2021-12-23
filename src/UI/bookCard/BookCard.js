import React from "react";
import "./BookCard.css";

const BookCard = ({ title, author, category, imageUrl }) => {
  return (
    <div className="img-card iCard-style2">
      <div className="card-content">
        <div className="card-image">
          <img src={imageUrl} alt="" />
        </div>

        <span className="card-title">{title}</span>

        <div className="card-text">
          <p>By: {author}</p>
          <p>{category}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
