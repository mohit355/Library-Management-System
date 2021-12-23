import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../state/action/index";
import BookCard from "../../UI/bookCard/BookCard";

import "./MyBooks.css";
const MyBooks = (props) => {
  useEffect(() => {
    // console.log(props.user_id);
    if (props.user_id) {
      props.getMyBooks(props.user_id);
    }
  }, []);

  return (
    <div className="myBooks">
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
    user_id: state.auth.loginCreds.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyBooks: (user_id) => dispatch(actions.getMyBooks(user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
