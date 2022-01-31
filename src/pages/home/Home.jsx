import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import "./home.css";

const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div className="hide-sm">
          <Sidebar />
        </div>
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
