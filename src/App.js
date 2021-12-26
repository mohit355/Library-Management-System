import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./state/action/index";
import LogIn from "./components/auth/login/LogIn";
import Catalogue from "./components/landingPage/Main";
import MyBooksMain from "./components/myBooks/MyBookMain";
import AddBook from "./components/newBooks/AddBook";
import Layout from "./hoc/layout/Layout";
import "./App.css";

function App(props) {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  return (
    <Layout isAuthenticated={props.isAuthenticated} user={props.user}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              props.isAuthenticated ? <Navigate to="/catalogue" /> : <LogIn />
            }
          ></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route
            path="/catalogue"
            element={props.isAuthenticated ? <Catalogue /> : <LogIn />}
          ></Route>
          <Route
            path="/mybooks"
            element={props.isAuthenticated ? <MyBooksMain /> : <LogIn />}
          ></Route>
          <Route
            path="/mybooks/addbook"
            element={props.isAuthenticated ? <AddBook /> : <LogIn />}
          ></Route>
        </Routes>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
