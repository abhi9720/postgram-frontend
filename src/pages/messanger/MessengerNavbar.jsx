import React from "react";
import { NavLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { KeyboardReturnOutlined } from "@material-ui/icons";

const MessengerNavbar = () => {
  return (
    <AppBar position="sticky" className="navbar_css messagerNav" id="navbar">
      <Toolbar>
        <NavLink
          to="/"
          style={{
            color: "white",
          }}
        >
          <span className=" me-5">
            <KeyboardReturnOutlined style={{ fontSize: 30 }} />

          </span>
        </NavLink>


        <span className="logo ml-3">Messenger </span>
      </Toolbar>
    </AppBar>
  );
};

export default MessengerNavbar;
