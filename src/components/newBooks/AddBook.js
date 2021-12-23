import React, { useState } from "react";
import "./AddBook.css";
import Input from "../../UI/inuput/Input";
import Button from "../../UI/button/Button";

const AddBook = () => {
  const [newBook, setNewBook] = useState({
    bookTitle: "",
    authorName: "",
    category: "",
    imageUrl: "",
  });

  const handleNewBookData = (event) => {
    setNewBook({ ...newBook, [event.target.name]: event.target.value });
  };

  const hadleNewBookSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form>
        <Input
          type="text"
          placeholder="Enter book title"
          autoFocus={true}
          name="bookTitle"
          value={newBook.bookTitle}
          onChange={handleNewBookData}
        />

        <Input
          type="text"
          placeholder="Enter Author Name"
          autoFocus={true}
          name="authorName"
          value={newBook.authorName}
          onChange={handleNewBookData}
        />

        {/* fetch category data and populate in the dropdown */}
        <select
          onChange={handleNewBookData}
          value={newBook.category}
          name="category"
        >
          <option></option>
        </select>

        <Input
          type="text"
          placeholder="Enter book image URL"
          autoFocus={true}
          name="imageUrl"
          value={newBook.imageUrl}
          onChange={handleNewBookData}
        />

        <Button onClick={hadleNewBookSubmit}>Add book</Button>
      </form>
    </div>
  );
};

export default AddBook;
