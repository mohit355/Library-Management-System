import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../state/action/index";
import "./Layout.css";
import Footer from "../../UI/footer/Footer";

const Layout = (props) => {
  const handleLogOut = (event) => {
    props.logout();
  };

  return (
    <div id="page-container">
      <div className="content-wrap">
        <nav className="navbar">
          <div className="navItems">
            {props.isAuthenticated ? (
              <>
                <Link className="navItem" to="/catalogue">
                  Catalogue
                </Link>
                <Link className="navItem" to="/mybooks">
                  My Books
                </Link>
                <Link className="navItem" to="/">
                  Hello😎,{props.user.username}
                </Link>
                <div onClick={handleLogOut}>
                  <Link className="navItem" to="/login">
                    LogOut
                  </Link>
                </div>
              </>
            ) : (
              <Link className="navItem" to="/login">
                Login
              </Link>
            )}
          </div>
        </nav>
        <div>{props.children}</div>
      </div>
      <Footer />
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
    logout: () => dispatch(actions.logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
