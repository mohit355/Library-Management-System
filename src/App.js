import React, { useState } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import LogIn from "./components/auth/login/LogIn";
import Catalogue from "./components/landingPage/Main";
import MyBooks from "./components/myBooks/MyBooks";
import AddBook from "./components/newBooks/AddBook";
import Layout from "./hoc/layout/Layout";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Layout>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/catalogue" element={<Catalogue />}></Route>
          <Route path="/mybooks" element={<MyBooks />}>
            <Route path="addbook" element={<AddBook />}></Route>
          </Route>
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
