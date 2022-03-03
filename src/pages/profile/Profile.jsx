import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import DynamicFeedSharpIcon from '@material-ui/icons/DynamicFeedSharp';


import PersonPinIcon from '@material-ui/icons/PersonPin';

import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Instagram } from "react-content-loader";
import axiosInstance from "../../utils/axiosConfig";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress, Button, Tabs, Tab, IconButton, Box, Typography } from "@material-ui/core";
import { PhotoCamera, Done, TextsmsOutlined } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { io } from "socket.io-client";
export default function Profile() {
  const [user, setUser] = useState({});
  const userid = useParams().id;

  const { status } = useQuery(userid, async () => {
    const res = await axiosInstance.get(`/user/?userId=${userid}`);
    setUser(res.data);
  });
  const { state, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    state.user?.followings.includes(user?._id)
  );
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [isloading, setIsloading] = useState(false);
  const [isloading1, setIsloading1] = useState(false);
  const [upatingProfilePhoto, setUpdatingProfilePhoto] = useState(false);
  const [upatingCoverPhoto, setUpdatingCoverPhoto] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverpicture, setCoverpicture] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);

  const socket = React.useRef();

  // ftech user by username
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axiosInstance.get(`/user/?username=${username}`);
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [username]);

  // update user details

  useEffect(() => {
    // if there is no user in that it cause error so we use ? here
    setFollowed(state.user?.followings.includes(user?._id));
    setIsFriend(state.user?.friends.includes(user?._id));
    setIsFriendRequestSent(state.user?.pendingRequest.includes(user?._id));
  }, [state.user, user]);


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  // follow if not following
  const handleFollow = async () => {
    try {
      if (followed) {
        setIsloading(true);
        // setFollowers(followers - 1);
        const res = await axiosInstance.put(`/user/${user._id}/unfollow`, {
          userId: state.user?._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });

        setUser(res.data);
      } else {
        setIsloading(true);

        const res = await axiosInstance.put(`/user/${user._id}/follow`, {
          userId: state.user?._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });

        setUser(res.data);
      }
      setFollowed(!followed);
    } catch (err) {
    } finally {
      setIsloading(false);
    }
  };

  console.log("Port : " + process.env.REACT_APP_End_Point);
  useEffect(() => {
    socket.current = io.connect(process.env.REACT_APP_End_Point);
    socket.current.emit("addUser", state.user?._id); // send request to server as user chnage and send my user id
    // so it add this userid and socket in user array
  }, [state.user]);

  const addFriend = async () => {
    try {
      setIsloading1(true);

      await axiosInstance.put(`/user/${user._id}/addNewFriends`, {
        userId: state.user?._id,
      });
      setIsFriendRequestSent(true);
      dispatch({ type: "pendingRequest", payload: user?._id });
    } catch (err) { }

    socket.current.emit("sendFriendRequest", {
      senderId: state.user?._id,
      receiverId: user?._id,
    });

    setIsloading1(false);
  };
  const unFriend = async () => {
    try {
      setIsloading1(true);

      const res = await axiosInstance.put(`/user/${user._id}/unfriend`, {
        userId: state.user?._id,
      });

      await axiosInstance.delete(`/conversation/delete/${user._id}/${state.user?._id}`);


      dispatch({ type: "UNFRIEND", payload: res.data });
      setIsFriend(false);
    } catch (err) {
    } finally {

      setIsloading1(false);
    }
  };

  useEffect(() => {
    const updateProfilePicture = async () => {
      try {
        setUpdatingProfilePhoto(true);
        const data = new FormData();

        data.append("file", profilePhoto);
        const updateddata = await axiosInstance.put(
          `/user/${user._id}/updateprofilepicture`,
          data
        );
        dispatch({ type: "Update_Profile_Pic", payload: updateddata.data });


      } catch (err) {
      } finally {
        setUpdatingProfilePhoto(false);
        setProfilePhoto(null);
      }
    };

    if (profilePhoto) {
      updateProfilePicture();
    }
  }, [profilePhoto, dispatch, user]);

  useEffect(() => {
    const updateCoverPicture = async () => {
      try {
        setUpdatingCoverPhoto(true);
        const data = new FormData();

        data.append("file", coverpicture);
        const updateddata = await axiosInstance.put(
          `/user/${user._id}/updatecoverpicture`,
          data
        );
        dispatch({ type: "Update_Cover_Pic", payload: updateddata.data });

        // window.location.reload();
      } catch (err) {
      } finally {
        setUpdatingCoverPhoto(false);
        setCoverpicture(null);
      }
    };

    if (coverpicture) {
      updateCoverPicture();
    }
  }, [coverpicture, dispatch, user]);

  const AcceptRequest = async () => {
    // here user is id of that user who send request
    // and  currentuser is who got friend request(will accept or reject )

    const res = await axiosInstance.put(`/user/${user._id}/acceptFriendRequest`, {
      userId: state.user?._id,
    });

    await axiosInstance.post("/conversation/", {
      senderId: user._id,
      receiverId: state.user?._id,
    });

    dispatch({ type: "AcceptFriendRequest", payload: res.data });
  };


  return (
    <>
      <Topbar />

      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="profile col-sm-12 col-md-9 p-0">
            <div className="d-flex flex-column">
              {status === "loading" ? (
                <div>
                  <Instagram color="#f11946" width="100%" height="400px" className="mb-5" />
                </div>
              ) : status === "error" ? (
                <div
                  className="d-flex justify-content-center align-items-center flex-column py-5"                  >
                  <h4>
                    ERROR SOME INTERNAL ERROR OCCUR <br />
                    <br /> CHECK YOUR INTERNET CONNECTIONS
                  </h4>
                  <Button
                    variant="contained" disableElevation
                    color="secondary"
                    onClick={() => window.location.reload()}
                  >
                    RELOAD PAGE
                  </Button>
                </div>
              ) : (
                <>
                  <div className="profileRightTop">
                    <div className="profileCover">
                      <div className="profileCoverImg">
                        {
                          user._id === state.user?._id ? (
                            state.user.coverpicture ? (
                              <img loading="lazy" src={state.user.coverpicture} alt="" />
                            ) : (
                              <img loading="lazy" src={"../assets/Loader.gif"} alt="" />
                            )

                          ) : (

                            user.coverpicture ? (
                              <img loading="lazy" src={user.coverpicture} alt="" />
                            ) : (
                              <img loading="lazy" src={"../assets/Loader.gif"} alt="" />
                            )
                          )


                        }
                        {user._id === state.user?._id && (
                          <Button>
                            {upatingCoverPhoto ? (
                              <CircularProgress />
                            ) : (
                              <label
                                className="uploadCoverBtn"
                                htmlFor="coverPhoto"
                              >
                                <PhotoCamera />
                                <span className="hide-sm">
                                  {" "}
                                  Update cover phtoto{" "}
                                </span>
                                <input
                                  type="file"
                                  id="coverPhoto"
                                  accept=".png,.jpeg,.jpg"
                                  onChange={(e) => {
                                    setCoverpicture(e.target.files[0]);
                                  }}
                                  style={{ display: "none" }}
                                />
                              </label>
                            )}
                          </Button>
                        )}
                      </div>
                      <div className="profileUserImg">

                        <div className="profileUserImageCover">
                          <img loading="lazy"
                            src={
                              user._id === state.user?._id ? (
                                state.user.profilePicture
                                  ? state.user.profilePicture.replace(
                                    "/upload",
                                    "/upload/w_1000,h_1000,c_thumb,g_faces"
                                  )
                                  : "../assets/person/noAvatar.png"
                              ) : (

                                user.profilePicture
                                  ? user.profilePicture.replace(
                                    "/upload",
                                    "/upload/w_1000,h_1000,c_thumb,g_faces"
                                  )
                                  : "../assets/person/noAvatar.png"

                              )



                            }
                            alt=""
                          />

                          {user._id === state.user?._id && (
                            <>
                              <div className="uploadIcon">
                                {upatingProfilePhoto ? (
                                  <CircularProgress className="upload_progress" />
                                ) : (
                                  ""
                                )}
                                <label
                                  htmlFor="profilePhoto"
                                  disabled={upatingProfilePhoto}
                                >
                                  <IconButton className="p-2" color="default" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                  </IconButton>
                                  <input
                                    type="file"
                                    id="profilePhoto"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => {
                                      setProfilePhoto(e.target.files[0]);
                                    }}
                                    style={{ display: "none" }}
                                  />
                                </label>
                              </div>
                            </>
                          )}
                        </div>

                      </div>
                    </div>
                    <div className="profileInfo">
                      <Typography variant="h5" gutterBottom component="div" className="profileInfoName">{user?.username} </Typography>

                      {/* <span className="profileInfoDesc">{user.description}</span> */}
                    </div>
                    <div className="profileFollow">


                      <div className="followInfo">
                        <table className="table table-borderless p-0 m-0">
                          <thead>
                            <tr>
                              <th>Friends</th>
                              <th>followers</th>
                              <th>followings</th>
                            </tr>
                            <tr>
                              <td>{user?.friends?.length}</td>
                              <td>{user?.followers?.length}</td>
                              <td> {user?.followings?.length} </td>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      {user._id !== state.user?._id && <div className="divider"></div>}

                      <div className="btn_function"
                        style={
                          user._id !== state.user?._id
                            ? { display: "inline-block" }
                            : { display: "none" }
                        }
                      >
                        <Link
                          to="/messenger"
                          style={
                            user._id !== state.user?._id
                              ? { display: "inline-block" }
                              : { display: "none" }
                          }
                        >
                          <Button variant="contained" color="secondary">
                            <TextsmsOutlined color="info" className="" />
                          </Button>
                        </Link>

                        {user._id !== state.user?._id && (
                          <div>
                            {state.user?.friendrequest.includes(user._id) ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={AcceptRequest}
                              >
                                Accept request
                              </Button>
                            ) : isFriend ? (
                              <Button variant="contained" onClick={unFriend}>
                                Unfriend
                                {isloading1 && (
                                  <CircularProgress color="primary" size="10px" />
                                )}
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={addFriend}
                                disabled={isFriendRequestSent}
                              >
                                {isFriendRequestSent ? (
                                  <>
                                    Request Sent <Done />
                                  </>
                                ) : (
                                  "Add Friends"
                                )}
                                {isloading1 && (
                                  <CircularProgress color="primary" size="10px" />
                                )}
                              </Button>
                            )}
                          </div>
                        )}
                        {user._id !== state.user?._id && (
                          <div>

                            <Button
                              className="rightbarFollowButton"
                              onClick={handleFollow}
                            >
                              {followed ? "Unfollow" : "Follow"}
                              {isloading ? (
                                <CircularProgress color="primary" size="10px" />
                              ) : (
                                ""
                              )}
                            </Button>
                          </div>

                        )}


                      </div>


                    </div>
                  </div>



                </>
              )}
            </div>
          </div>
        </div>

      </div>
      {
        (status !== "error" && status !== "loading") &&
        <div className="container-fluid mb-5" style={{ backgroundColor: "transparent" }}>
          <div className="row   justify-content-center">

            <div className="profile col-sm-12 col-md-9 p-0 ">
              <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>


                <Tabs className="tabspannel " value={value} onChange={handleChange} aria-label="icon tabs example" centered
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"

                >
                  <Tab className="tab1 w-50" icon={<DynamicFeedSharpIcon />} aria-label="phone" label="Post" />
                  <Tab className="tab2 w-50" icon={<PersonPinIcon />} aria-label="favorite" label="connections" />
                </Tabs>

                {
                  value === 0 ?
                    <Feed userid={userid} profile={true} />
                    :
                    <Rightbar user={user} profile={true} />
                }

              </Box>

            </div>



          </div>
        </div>
      }


    </>
  );
}
