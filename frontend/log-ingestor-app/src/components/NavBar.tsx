import React from "react";

import Search from "./Search";

import dyteLogo from "../assets/dyteLogo.svg";

import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="nav-bar-container">
        <a href="https://dyte.io/">
          <img src={dyteLogo} alt="Logo" />
        </a>
        <div className="nav-bar-content">
          <div className="title">LOGS VIEWER</div>
          <Search />
        </div>
      </div>
    </>
  );
};

export default NavBar;
