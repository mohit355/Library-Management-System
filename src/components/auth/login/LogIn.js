import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../state/action/index";
import "./LogIn.css";
import Button from "../../../UI/button/Button";
import Input from "../../../UI/inuput/Input";

const LogIn = (props) => {
  const [loginCreds, setLoginCreds] = useState({
    userName: "",
    password: "",
  });

  const handleLoginDataChange = (e) => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    props.isUserValid(loginCreds);
  };

  return (
    <div className="loginPage">
      {props.redirect ? <Navigate to="/catalogue" /> : null}
      <div className="wrapper">
        <form className="login">
          <p className="title">Log in</p>
          {props.error ? "Wrong userName or password" : null}

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
          <Button onClick={handleLoginFormSubmit}>
            {props.loading ? "Loading..." : "Log in"}
          </Button>
        </form>
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
