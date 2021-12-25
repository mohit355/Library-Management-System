import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../state/action/index";
import BookCard from "../../../UI/bookCard/BookCard";
import Pagination from "../../../UI/pagination/Pagination";
import "./MyBooks.css";

const MyBooks = ({ user_id, getMyBooks, error, myBooks, offset }) => {
  const [visibleCatalogues, setVisibleCatalogues] = useState([]);
  const [index, setIndex] = useState(0);
  const id = user_id || localStorage.getItem("token");

  useEffect(() => {
    if (id) {
      getMyBooks(id, offset);
      setVisibleCatalogues([]);
      setIndex(0);
    }
  }, []);

  const searchNextPage = () => {
    getMyBooks(id, offset);
  };

  const isOffset = () => {
    return offset ? true : false;
  };

  return (
    <div className="myBooks">
      <div>
        Want to add a new book in the library
        <Link to="/mybooks/addbook">Add a new Book</Link>
      </div>
      <div>List of all your books</div>
      <div className="myBooksList">
        {visibleCatalogues &&
          visibleCatalogues.map((myBook) => (
            <BookCard
              key={myBook.id}
              title={myBook.fields.title}
              author={myBook.fields.author}
              category={myBook.fields.category}
              imageUrl={myBook.fields.image_url}
            />
          ))}
      </div>
      <div className="pagination">
        <Pagination
          setVisibleCatalogues={setVisibleCatalogues}
          dataArray={myBooks}
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
    myBooks: state.myBooks.myBooks,
    error: state.myBooks.error,
    user_id: state.auth.token,
    offset: state.myBooks.offset,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyBooks: (user_id, offset) =>
      dispatch(actions.getMyBooks(user_id, offset)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
