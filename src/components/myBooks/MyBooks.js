import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../state/action/index";
import BookCard from "../../UI/bookCard/BookCard";
import Button from "../../UI/button/Button";
import Pagination from "../../UI/pagination/Pagination";

import "./MyBooks.css";
const MyBooks = (props) => {
  const id = props.user_id || localStorage.getItem("token");
  useEffect(() => {
    if (id) {
      props.getMyBooks(id);
    }
  }, []);

  return (
    <div className="myBooks">
      <div>
        Want to add a new book in the library
        <Link to="/mybooks/addbook">Add a new Book</Link>
      </div>
      <div>List of all your books</div>
      <div className="myBooksList">
        {props.myBooks &&
          props.myBooks.map((myBook) => (
            <BookCard
              key={myBook.id}
              title={myBook.fields.title}
              author={myBook.fields.author}
              category={myBook.fields.category}
              imageUrl={myBook.fields.image_url}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myBooks: state.myBooks.myBooks,
    error: state.myBooks.error,
    user_id: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyBooks: (user_id) => dispatch(actions.getMyBooks(user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
