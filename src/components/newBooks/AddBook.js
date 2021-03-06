import React, { useEffect, useState } from "react";
import "./AddBook.css";
import { connect } from "react-redux";
import * as actions from "../../state/action/index";
import Input from "../../UI/inuput/Input";
import { Navigate } from "react-router-dom";

const AddBook = ({
  getCategories,
  user_id,
  addNewBook,
  redirect,
  categories,
  error,
}) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    image_url: "",
    category_id: "",
  });

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewBookData = (event) => {
    setNewBook({ ...newBook, [event.target.name]: event.target.value });
  };
  const handleNewBookCategoryData = (event) => {
    let str = event.target.value;
    setNewBook({
      ...newBook,
      [event.target.name]: str.substr(str.indexOf(" ") + 1),
      category_id: parseInt(str.substr(0, str.indexOf(" "))),
    });
  };

  const hadleNewBookSubmit = (event) => {
    event.preventDefault();
    const id = user_id || localStorage.getItem("token");
    addNewBook(newBook, id);
  };

  return (
    <div className="addBook">
      {redirect ? (
        <Navigate to="/mybooks" />
      ) : (
        <div className="container">
          <form id="contact" onSubmit={hadleNewBookSubmit}>
            <h3>Add a new book in the library</h3>
            <h4>Give your contribuation</h4>
            <Input
              type="text"
              placeholder="Book Title"
              name="title"
              autoFocus
              tabIndex="1"
              required
              onChange={handleNewBookData}
            />
            <Input
              placeholder="Enter author name"
              type="text"
              name="author"
              tabIndex="2"
              required
              onChange={handleNewBookData}
            />
            <Input
              placeholder="Image url"
              name="image_url"
              type="url"
              tabIndex="4"
              required
              onChange={handleNewBookData}
            />
            <select
              className="addbook_category"
              name="category"
              onChange={handleNewBookCategoryData}
              value={newBook.category}
              required
            >
              <option value="" disabled hidden>
                Select book category
              </option>
              {categories.map((category) => (
                <option
                  key={category.fields.id}
                  value={category.fields.id + " " + category.fields.category}
                >
                  {category.fields.category}
                </option>
              ))}
            </select>
            <div className="submitButton">
              <button name="submit" type="submit" id="contact-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.newBook.error,
    redirect: state.newBook.redirect,
    categories: state.catalogue.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(actions.getCategories()),
    addNewBook: (book, id) => dispatch(actions.addNewBook(book, id)),
    setRedirect: () => dispatch(actions.setRedirect()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
