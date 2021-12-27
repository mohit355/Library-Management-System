import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../state/action/index";
import BookCard from "../../../UI/bookCard/BookCard";
import Pagination from "../../../UI/pagination/Pagination";
import Spinner from "../../../UI/spinner/Spinner";
import "./MyBooks.css";

const MyBooks = ({
  user_id,
  getMyBooks,
  error,
  myBooks,
  offset,
  loading,
  setMyBookLoading,
}) => {
  const [visibleCatalogues, setVisibleCatalogues] = useState([]);
  const [index, setIndex] = useState(0);
  const id = user_id || localStorage.getItem("token");

  useEffect(() => {
    if (id) {
      setMyBookLoading(true);
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
      {error ? (
        alert("Network error")
      ) : (
        <>
          <div className="addNewBook">
            <div className="text">Add a new book in the library</div>
            <Link className="addbook_button" to="/mybooks/addbook">
              Add a new Book
            </Link>
          </div>
          <div className="myBook-title">Here is your BookList</div>
          {loading ? (
            <Spinner />
          ) : (
            <>
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
                  setLoading={setMyBookLoading}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myBooks: state.myBooks.myBooks,
    error: state.myBooks.error,
    user_id: state.auth.token,
    offset: state.myBooks.offset,
    loading: state.myBooks.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyBooks: (user_id, offset) =>
      dispatch(actions.getMyBooks(user_id, offset)),
    setMyBookLoading: (value) => dispatch(actions.setMyBookLoading(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
