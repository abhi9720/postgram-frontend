import React from 'react'
// import { useContext } from "react";
import Feed from "../../components/feed/Feed.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
// import { AuthContext } from "../../context/AuthContext.js";
// import Sidebar from "../../components/sidebar/Sidebar.jsx";
import "./TimeLine.css";

const TimeLine = () => {
  // const { user: currentUser } = useContext(AuthContext);
  // const name = currentUser.username;
  return (
    <>
      <Topbar />
      <div className="feedsContainer">
        <Feed />
      </div>
    </>
  );
};

export default TimeLine;
