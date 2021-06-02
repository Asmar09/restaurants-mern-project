import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getLocalStorage } from "../helpers/localStorage";
import {logout} from '../helpers/auth';

const Header = ({history}) => {

    const handleLogout = (evt) =>{
      logout(() =>{
        history.push('/signin')
      })
    }
  // MavBar
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!getLocalStorage() && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                  <i class="fas fa-home"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                  <i class="fas fa-user-edit"></i> Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                  <i class="fas fa-sign-in-alt"></i>  Signin
                  </Link>
                </li>
              </>
            )}

            {getLocalStorage() && getLocalStorage().role === 0 && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/dashboard">
                  <i class="fas fa-house-user"></i> Dashboard
                  </Link>
                </li>
              </>
            )}

            {getLocalStorage() && getLocalStorage().role === 1 && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/dashboard">
                  <i class="fas fa-house-user"></i> Dashboard
                  </Link>
                </li>
              </>
            )}

            {getLocalStorage() && (
              <>
                <li className="nav-item">
                  <button className="btn btn-link text-secondary text-decoration-none pl-0" onClick={handleLogout}>
                  <i class="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
