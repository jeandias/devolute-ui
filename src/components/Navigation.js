import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default () => {
  const [collapsed, toggleNavbar] = useState(true);

  const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
  const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

  let history = useHistory();
  let redirect = () => { history.push("/") };

  const toggleButton = () => {
    if(localStorage.getItem("token")) {
      return <div className="navbar-nav">
        <button type="button"
                className="btn btn-link nav-link text-left"
                onClick={() => {
                  localStorage.clear();
                  redirect();
                }}>
          Sign out
        </button>
      </div>
    } else {
      return <div className="navbar-nav">
        <Link className="nav-link" to="/signin">Sign in</Link>
        <Link className="nav-link" to="/signup">Sign up</Link>
      </div>
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark transparent-nav">
      <div className="container">
        <Link className="navbar-brand" to="/">devolute</Link>
        <button onClick={() => toggleNavbar(currentCollapsed => !currentCollapsed)}
                className={`${classTwo}`}
                type="button" data-toggle="collapse"
                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className={`${classOne}`} id="navbarResponsive">
          <div className="mr-auto navbar-nav">
            <Link className="nav-link" to="/images">Images</Link>
            <Link className="nav-link" to="/uploader">Uploader</Link>
          </div>
          {toggleButton()}
        </div>
      </div>
    </nav>
  );
}
