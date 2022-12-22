import React from 'react'
import Topbar from "../../components/topbar/Topbar.jsx";
// import Sidebar from "../../components/sidebar/Sidebar.jsx";
import BackToTop from 'react-custom-back-to-top-button';
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import "./home.css";
import SuggesTop from '../../components/rightbar/SuggesTop.jsx';

const Home = () => {
  return (
    <div className='main'>
      <Topbar />
      <div className="homeContainer container" >

        <Feed />
        <Rightbar />

      </div>

      <BackToTop width="2.4rem" height="2.4rem" style={window.screen.width > 850 ? { right: 20, bottom: 40 } : { right: 3, bottom: 60 }} />
    </div>
  );
};

export default Home;
