import React, { useEffect } from "react";
import "./rightbar.css";
// import { Users } from '../../dummyData';
// import Online from '../online/Online';
import { useState } from "react";

import ContentLoader from 'react-content-loader'
// import { AuthContext } from "../../context/AuthContext";
import Friends from "../friends/Friends";
import { Button } from "@material-ui/core";

import axiosInstance from "../../utils/axiosConfig";
import { Link } from "react-router-dom";

import Suggestion from "./Suggestion";

export default function Rightbar({ user }) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // const { user: currentUser } = useContext(AuthContext);

  // /connection/suggestion
  const [suggestion, setSuggestion] = useState([]);
  const [fetching, setfetching] = useState(false);
  useEffect(() => {
    const getSuggestion = async () => {
      try {
        setfetching(true)
        const res = await axiosInstance.get(`/user/connection/suggestion`);
        setSuggestion(res.data || []);

      } catch (err) {
        console.log(err);
      }
      finally {
        setfetching(false)
      }
    };
    if (window.screen.width > 800) {
      getSuggestion();
    }
  }, []);

  const MyLoader = () => (
    <ContentLoader
      speed={2}
      width={400}
      height={150}
      viewBox="0 0 400 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"

    >


      <rect x="48" y="6" width="52" height="6" rx="3" />
      <rect x="35" y="10" rx="5" ry="5" width="150" height="10" />
      <rect x="35" y="45" rx="5" ry="5" width="150" height="10" />
      <rect x="35" y="80" rx="5" ry="5" width="150" height="10" />
      <rect x="35" y="115" rx="5" ry="5" width="150" height="10" />
      <rect x="3" y="5" rx="4" ry="4" width="20" height="20" />
      <rect x="3" y="40" rx="4" ry="4" width="20" height="20" />
      <rect x="3" y="75" rx="4" ry="4" width="20" height="20" />
      <rect x="3" y="110" rx="4" ry="4" width="20" height="20" />
    </ContentLoader>
  )

  const HomeRightbar = () => {
    return (
      <div className="homeright" >
        <div className="homewrapper">

          {
            fetching ? <MyLoader></MyLoader>
              :
              <>
                <div className="d-flex justify-content-between gx-3">
                  <p className=""


                  >Suggestions For You</p>
                  {/* <NavLink className="text-muted" to="/community">
                    see all
                  </NavLink> */}
                </div>
                {
                  suggestion.map((data) => {
                    return (
                      <Link
                        className="friend_name"
                        key={data?._id}
                        to={"/profile/" + data?._id}
                        style={{ textDecoration: "none" }}

                      >
                        <Suggestion key={data._id} user={data} />
                      </Link>
                    )
                  })
                }

              </>
          }



        </div>



      </div>
    );
  };

  const ProfileRightbar = ({ user }) => {
    const [friends, setFriends] = useState([]);
    useEffect(() => {
      const getFriends = async () => {
        try {
          if (user && Object.entries(user).length) {
            const friendList = await axiosInstance.get("/user/?userId=" + user?._id);
            setFriends(friendList.data.friends);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }, [user]);
    // const [isedit, setIsEdit] = useState(false);
    // const info = useRef({ ...user });

    // const saveInfo = async () => {
    //   setIsEdit(!isedit);
    //   if (isedit) {
    //     try {
    //       await axiosInstance.put(`/user/${info.current._id}`, info.current);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // };

    const [text, setText] = useState(" Friends");
    // const inputEvent = (event) => {
    //   info.current[event.target.id] = event.target.innerText;
    // };

    const fetchFriend = () => {
      setText(" Friends");
      setFriends(user?.friends);
    };

    const fetchFollowers = () => {
      setText(" Followers");
      setFriends(user?.followers);
    };

    const fetchFollwings = () => {
      setText(" Followings");
      setFriends(user?.followings);
    };

    return (
      <div className={'profile_status' + (user ? ' mx-2' : '')} >
        {/* <h4
          className="rightbarTitle"
          style={
            user.username !== currentUser.username
              ? { marginTop: "30px" }
              : { marginTop: "0px" }
          }
        >
          User Information
          {user.username === currentUser.username ? (
            isedit ? (
              <button onClick={saveInfo}> Save </button>
            ) : (
              <button onClick={saveInfo}>Edit </button>
            )
          ) : (
            ""
          )}
        </h4> */}
        {/* <div className="rightbarInfo">
          <div key="city" className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              {" "}
              <LocationOnIcon />
            </span>
            <span
              className="rightbarInfoValue"
              name="city"
              id="city"
              contentEditable={isedit}
              suppressContentEditableWarning={true}
              value={info.city}
              onBlur={inputEvent}
            >
              {user.city}
            </span>
          </div>

          <div key="from" className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <BusinessCenterIcon />
            </span>
            <span
              className="rightbarInfoValue"
              name="from"
              id="from"
              contentEditable={isedit}
              suppressContentEditableWarning={true}
              value={info.from}
              onBlur={inputEvent}
            >
              {user.from}
            </span>
          </div>
          <div key="relationships" className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <FavoriteIcon />
            </span>
            <span
              type="range"
              className="rightbarInfoValue"
              name="relationships"
              id="relationships"
              contentEditable={isedit}
              suppressContentEditableWarning={true}
              value={info.relationships}
              onBlur={inputEvent}
            >
              {info.current.relationships === 1
                ? "Single"
                : info.current.relationships === 2
                  ? "married"
                  : "N/A"}
            </span>
          </div>
        </div> */}

        {/* // users friend  */}

        <div className="rightbarconnections">
          <Button color="primary" onClick={fetchFriend}>
            friends
          </Button>
          <Button color="primary" onClick={fetchFollowers}>
            followers
          </Button>
          <Button color="primary" onClick={fetchFollwings}>
            followings
          </Button>
        </div>
        <div className="rightbarFollowings">
          <span > {"User" + text + "  ( " + friends?.length + " ) "}</span>
          <div className="rightbarFollowings_display">
            {friends?.map((id) => (
              <Friends key={id} userId={id} />
            ))}


            {friends.length === 0 &&
              <p className='py-5'>
                First One to Connect with Him
              </p>
            }


          </div>
        </div>
      </div>
    );
  };
  return (
    <>

      {user ? (
        <div className="rightbar">
          <div className="rightbarWrapper">
            <ProfileRightbar key={user._id} user={user} />
          </div>
        </div>
      ) : (
        <div className="rightbarHome">
          <div className="rightbarHomeWrapper">
            <HomeRightbar key="HomeRightbar12" />
          </div>

        </div>
      )}

    </>
  );
}
