import React from "react";
import { NavLink } from "react-router-dom";
import "./messenger.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { KeyboardReturnOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const MessengerNavbar = () => {
  return (
    <AppBar position="sticky" className="navbar_css messagerNav" id="navbar">
      <Toolbar>
        <NavLink
          to="/"
        >
          <span className=" me-5">
            <IconButton>
              <KeyboardReturnOutlined style={{ fontSize: 30 }} />
            </IconButton>

          </span>
        </NavLink>


        <span className="logo ml-3">Messenger </span>
      </Toolbar>
    </AppBar>
  );
};

export default MessengerNavbar;
