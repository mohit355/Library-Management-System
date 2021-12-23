import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

const Layout = (props) => {
  return (
    <div>
      <nav className="navbar">
        <div className="navItems">
          <Link className="navItem" to="/mybooks">
            My Books
          </Link>
          <Link className="navItem" to="/login">
            Login
          </Link>
        </div>
      </nav>
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
