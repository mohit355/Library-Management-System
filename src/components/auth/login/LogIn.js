import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../state/action/index";
import "./LogIn.css";
import Button from "../../../UI/button/Button";
import Input from "../../../UI/inuput/Input";
import Spinner from "../../../UI/spinner/Spinner";
const LogIn = ({ isUserValid, redirect, error, loading }) => {
  const [loginCreds, setLoginCreds] = useState({
    userName: "",
    password: "",
  });

  const handleLoginDataChange = (e) => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    isUserValid(loginCreds);
  };

  return (
    <div className="loginPage">
      {redirect ? <Navigate to="/catalogue" /> : null}
      <div className="wrapper">
        {loading ? (
          <Spinner />
        ) : (
          <form className="login">
            <p className="title">Log in to continue</p>
            {error ? "Wrong userName or password" : null}
            <Input
              type="text"
              placeholder="Username"
              autoFocus={true}
              name="userName"
              value={loginCreds.userName}
              onChange={handleLoginDataChange}
            />
            <i className="fa fa-user"></i>

            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={loginCreds.password}
              onChange={handleLoginDataChange}
            />
            <i className="fa fa-key"></i>
            <Button onClick={handleLoginFormSubmit}>Login</Button>
          </form>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    redirect: state.auth.redirect,
    loginData: state.auth.loginCreds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isUserValid: (loginCreds) => dispatch(actions.isUserValid(loginCreds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
