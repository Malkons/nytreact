import React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
      NYT SEARCH
    </a>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/"><button type="button" className="btn btn-primary">Home</button></Link>
      </li>
      <li className="nav-item">
        <Link to="/savedArticles"><button type="button" className="btn btn-primary">Saved Articles</button></Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
